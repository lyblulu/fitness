import { useRef, useState } from "react";
import {
  Camera, ScanLine, Flame, Beef, Wheat, Zap, RefreshCw, Loader2,
  KeyRound, AlertCircle, ImagePlus, X,
} from "lucide-react";

const API_KEY_STORAGE = "sf_api_key";
const MODEL_STORAGE = "sf_model";
// 硅基流动支持浏览器 CORS 直连(大陆可达),视觉模型在保存 Key 时自动发现
const SF_API = "https://api.siliconflow.cn/v1/chat/completions";
const SF_MODELS_API = "https://api.siliconflow.cn/v1/models";
const MODEL_FALLBACK = "Qwen/Qwen2.5-VL-7B-Instruct";

// 按优先级排序的候选视觉模型(名称含 VL),前面的优先
const MODEL_PREFERENCE = [
  "Qwen/Qwen2.5-VL-7B-Instruct",
  "Qwen/Qwen3-VL-8B-Instruct",
  "Qwen/Qwen2.5-VL-32B-Instruct",
  "Qwen/Qwen2-VL-7B-Instruct",
  "Qwen/Qwen2.5-VL-72B-Instruct",
];

const SCAN_PROMPT = `你是营养分析专家。识别图片中的食物,估算一整份的营养成分。
只输出一个JSON对象,不要输出任何其他内容,格式:
{"name":"食物名称","calories":整数,"protein":整数,"carbs":整数,"fat":整数,"note":"一句话营养建议"}
其中calories单位为千卡,protein/carbs/fat单位为克,均为整数估算值。多种食物时合并估算总量。`;

interface NutritionResult {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  note: string;
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const maxEdge = 640;
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("图片读取失败"));
    };
    img.src = url;
  });
}

function extractJson(text: string): NutritionResult {
  const cleaned = String(text).replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("模型返回格式异常,请重试一次");
  return JSON.parse(cleaned.slice(start, end + 1));
}

function toInt(v: unknown): number {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n > 0 ? Math.min(n, 10000) : 0;
}

// 验证 Key 并从账号可用模型中挑选视觉模型(名称含 VL 的)
async function verifyAndPickModel(apiKey: string): Promise<string> {
  const res = await fetch(SF_MODELS_API, { headers: { Authorization: `Bearer ${apiKey}` } });
  if (res.status === 401) throw new Error("API Key 无效,请检查是否复制完整");
  if (!res.ok) throw new Error(`无法验证 Key(${res.status}),请稍后再试`);
  const data = await res.json().catch(() => null);
  const ids: string[] = Array.isArray(data?.data)
    ? data.data.map((m: { id?: string }) => String(m?.id || "")).filter(Boolean)
    : [];
  const visionModels = ids.filter((id) => /VL/i.test(id));
  for (const pref of MODEL_PREFERENCE) {
    if (visionModels.includes(pref)) return pref;
  }
  // 没有命中偏好列表就用第一个 VL 模型;一个都没有则回退默认(识别时再报具体错误)
  return visionModels[0] || MODEL_FALLBACK;
}

async function callAnalyze(apiKey: string, imageBase64: string): Promise<NutritionResult> {
  const model = localStorage.getItem(MODEL_STORAGE) || MODEL_FALLBACK;
  const res = await fetch(SF_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: imageBase64 } },
            { type: "text", text: SCAN_PROMPT },
          ],
        },
      ],
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) throw new Error("API Key 无效或已过期,请删除后重新填写");
    if (res.status === 429) throw new Error("请求过于频繁,请稍后再试");
    const detail = data?.message || data?.error?.message || "";
    if (detail.includes("Model") || detail.includes("model") || detail.includes("不存在")) {
      throw new Error(`模型 ${model} 不可用,请点击"更换 Key"重新保存一次以自动选择可用模型`);
    }
    throw new Error(detail || `识别服务返回错误(${res.status})`);
  }

  const content = Array.isArray(data?.choices?.[0]?.message?.content)
    ? data.choices[0].message.content.filter((c: { type?: string }) => c.type === "text").map((c: { text?: string }) => c.text).join("")
    : data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("模型未返回识别结果,请重试一次");

  const parsed = extractJson(content);
  return {
    name: String(parsed.name || "未知食物").slice(0, 50),
    calories: toInt(parsed.calories),
    protein: toInt(parsed.protein),
    carbs: toInt(parsed.carbs),
    fat: toInt(parsed.fat),
    note: String(parsed.note || "").slice(0, 200),
  };
}

export default function FoodScanner() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(API_KEY_STORAGE) || "");
  const [keyInput, setKeyInput] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(() => !localStorage.getItem(API_KEY_STORAGE));
  const [verifying, setVerifying] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);

  const handlePickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setResult(null);
    try {
      setImageData(await compressImage(file));
    } catch {
      setError("图片读取失败,请换一张试试");
    }
    e.target.value = "";
  };

  const handleAnalyze = async () => {
    if (!imageData) return;
    if (!apiKey) {
      setError("请先在下方填写并保存 API Key(免费注册即可获得),再开始识别");
      return;
    }
    setAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      setResult(await callAnalyze(apiKey, imageData));
    } catch (err) {
      setError(err instanceof Error ? err.message : "识别失败,请稍后再试");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveKey = async () => {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    setVerifying(true);
    setKeyError(null);
    try {
      const model = await verifyAndPickModel(trimmed);
      localStorage.setItem(API_KEY_STORAGE, trimmed);
      localStorage.setItem(MODEL_STORAGE, model);
      setApiKey(trimmed);
      setKeyInput("");
      setShowKeyInput(false);
    } catch (err) {
      setKeyError(err instanceof Error ? err.message : "Key 验证失败,请稍后再试");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ScanLine className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">拍照识营养</h2>
          </div>
          <p className="section-subtitle mx-auto">
            给食物拍张照,AI 帮你估算这份餐的卡路里和碳蛋脂
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧:拍照与预览 */}
            <div className="glass-card p-6 md:p-8">
              <h3 className="font-display text-xl text-white tracking-wider mb-6">第一步 · 拍下你的食物</h3>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePickFile}
              />

              {imageData ? (
                <div className="relative mb-6">
                  <img
                    src={imageData}
                    alt="待识别食物"
                    className="w-full rounded-sm border border-white/10 max-h-72 object-cover"
                  />
                  <button
                    onClick={() => { setImageData(null); setResult(null); setError(null); }}
                    className="absolute top-2 right-2 p-1.5 bg-gym-dark/80 rounded-full text-white/80 hover:text-white"
                    aria-label="移除图片"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-white/15 rounded-sm py-14 mb-6 flex flex-col items-center gap-3 text-gym-text/50 hover:text-gym-accent hover:border-gym-accent/40 transition-colors"
                >
                  <ImagePlus className="w-10 h-10" />
                  <span className="text-sm">点击拍照或从相册选择</span>
                </button>
              )}

              {imageData && (
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full btn-primary py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI 正在识别…
                    </>
                  ) : (
                    <>
                      <ScanLine className="w-4 h-4" />
                      开始识别营养
                    </>
                  )}
                </button>
              )}

              {imageData && !analyzing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full mt-3 py-2.5 text-xs text-gym-text/50 hover:text-white inline-flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  重新拍一张
                </button>
              )}

              {/* API Key 设置 */}
              <div className="mt-8 pt-5 border-t border-white/5">
                {!showKeyInput && apiKey ? (
                  <div className="flex items-center justify-between">
                    <p className="text-gym-muted text-xs flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-gym-accent" />
                      已配置识别服务
                    </p>
                    <button
                      onClick={() => setShowKeyInput(true)}
                      className="text-gym-text/40 hover:text-white text-xs"
                    >
                      更换 Key
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="flex items-center gap-2 text-gym-text/70 text-sm mb-2">
                      <KeyRound className="w-4 h-4 text-gym-accent" />
                      硅基流动 API Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="粘贴你的 API Key"
                        className="flex-1 bg-gym-dark border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gym-accent/50 transition-colors"
                      />
                      <button
                        onClick={handleSaveKey}
                        disabled={!keyInput.trim() || verifying}
                        className="px-4 py-2.5 bg-gym-card text-gym-text/80 text-xs font-display uppercase tracking-wider rounded-sm border border-white/5 hover:text-white disabled:opacity-40 inline-flex items-center gap-1.5"
                      >
                        {verifying ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            验证中
                          </>
                        ) : (
                          "保存"
                        )}
                      </button>
                    </div>
                    {keyError && <p className="text-red-400 text-xs mt-2">{keyError}</p>}
                    {!keyError && (
                      <p className="text-gym-muted text-xs mt-2">
                        保存时会自动验证并选择可用的识别模型。Key 只存在你自己的浏览器里。还没有?
                        <a
                          href="https://cloud.siliconflow.cn/account/ak"
                          target="_blank"
                          rel="noreferrer"
                          className="text-gym-accent hover:underline ml-1"
                        >
                          免费注册硅基流动领取 Key
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 右侧:结果 */}
            <div>
              {error ? (
                <div className="glass-card p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                  <AlertCircle className="w-14 h-14 text-red-400/60 mx-auto mb-4" />
                  <p className="text-white text-sm font-semibold mb-2">识别遇到问题</p>
                  <p className="text-gym-muted text-sm max-w-xs">{error}</p>
                  <button
                    onClick={handleAnalyze}
                    className="mt-5 btn-ghost py-2.5 px-6 text-xs inline-flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    重试
                  </button>
                </div>
              ) : analyzing ? (
                <div className="glass-card p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-14 h-14 text-gym-accent/40 mx-auto mb-4 animate-spin" />
                  <p className="text-gym-muted text-sm">AI 正在分析食物成分…</p>
                  <p className="text-gym-muted/50 text-xs mt-2">通常需要 3-10 秒</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="glass-card p-6 md:p-8 border-gym-accent/20">
                    <p className="text-gym-muted text-xs uppercase tracking-wider mb-1">识别结果</p>
                    <p className="text-3xl md:text-4xl font-display text-white mb-2">{result.name}</p>
                    <p className="text-2xl font-display text-gym-accent">
                      ≈ {result.calories}
                      <span className="text-sm text-gym-text/40 ml-1">kcal</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="glass-card p-4 text-center">
                      <Beef className="w-5 h-5 text-gym-accent mx-auto mb-2" />
                      <p className="text-2xl font-display text-white">{result.protein}g</p>
                      <p className="text-gym-muted text-xs">蛋白质</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <Wheat className="w-5 h-5 text-gym-gold mx-auto mb-2" />
                      <p className="text-2xl font-display text-white">{result.carbs}g</p>
                      <p className="text-gym-muted text-xs">碳水</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <Flame className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                      <p className="text-2xl font-display text-white">{result.fat}g</p>
                      <p className="text-gym-muted text-xs">脂肪</p>
                    </div>
                  </div>

                  {result.note && (
                    <div className="glass-card p-6">
                      <div className="flex items-start gap-2.5">
                        <Zap className="w-4 h-4 text-gym-accent shrink-0 mt-0.5" />
                        <p className="text-gym-text/70 text-sm">{result.note}</p>
                      </div>
                    </div>
                  )}

                  <p className="text-gym-muted/50 text-xs text-center">
                    AI 估算值,仅供参考。精确控制饮食请以食物称重为准。
                  </p>
                </div>
              ) : (
                <div className="glass-card p-6 md:p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <ScanLine className="w-16 h-16 text-gym-muted/20 mx-auto mb-4" />
                    <p className="text-gym-muted text-sm">拍一张食物照片,点击识别</p>
                    <p className="text-gym-muted/50 text-xs mt-2">即可看到估算的卡路里和碳蛋脂</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
