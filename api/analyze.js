// Vercel Serverless 代理:浏览器无法直连智谱 API(无 CORS 头),由本函数转发
// API Key 由用户在自己浏览器保存,随请求传入,不在服务端存储
const GLM_ENDPOINT = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

const PROMPT = `你是营养分析专家。识别图片中的食物,估算一整份的营养成分。
只输出一个JSON对象,不要输出任何其他内容,格式:
{"name":"食物名称","calories":整数,"protein":整数,"carbs":整数,"fat":整数,"note":"一句话营养建议"}
其中calories单位为千卡,protein/carbs/fat单位为克,均为整数估算值。多种食物时合并估算总量。`;

function extractJson(text) {
  const cleaned = String(text).replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("NO_JSON_IN_RESPONSE");
  return JSON.parse(cleaned.slice(start, end + 1));
}

function clampNumber(value) {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, 10000);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "仅支持 POST 请求" });

  const { apiKey, imageBase64 } = req.body || {};
  if (!apiKey || typeof apiKey !== "string") return res.status(400).json({ error: "缺少 API Key" });
  if (!imageBase64 || !imageBase64.startsWith("data:image/")) {
    return res.status(400).json({ error: "缺少有效的图片数据" });
  }

  try {
    const glmRes = await fetch(GLM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "glm-4v-flash",
        temperature: 0.1,
        messages: [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: { url: imageBase64 } },
              { type: "text", text: PROMPT },
            ],
          },
        ],
      }),
    });

    if (!glmRes.ok) {
      const status = glmRes.status;
      const detail = await glmRes.text().catch(() => "");
      if (status === 401) return res.status(401).json({ error: "API Key 无效或已过期,请检查后重新填写" });
      if (status === 429) return res.status(429).json({ error: "请求过于频繁,请稍后再试" });
      return res.status(502).json({ error: `视觉模型返回错误(${status})`, detail: detail.slice(0, 200) });
    }

    const data = await glmRes.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return res.status(502).json({ error: "模型未返回识别结果" });

    const parsed = extractJson(content);
    return res.status(200).json({
      name: String(parsed.name || "未知食物").slice(0, 50),
      calories: clampNumber(parsed.calories),
      protein: clampNumber(parsed.protein),
      carbs: clampNumber(parsed.carbs),
      fat: clampNumber(parsed.fat),
      note: String(parsed.note || "").slice(0, 200),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      error: msg === "NO_JSON_IN_RESPONSE" ? "模型返回格式异常,请重试一次" : "识别服务异常,请稍后再试",
    });
  }
}
