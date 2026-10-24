import { useState } from "react";
import { Dumbbell, Calculator, TrendingUp, Weight, Repeat, Info } from "lucide-react";

// 常用强度区间:百分比对应的建议重复次数与训练目标
const intensityZones = [
  { percent: 95, reps: "1-2次", goal: "极限力量" },
  { percent: 90, reps: "2-4次", goal: "最大力量" },
  { percent: 85, reps: "4-6次", goal: "力量" },
  { percent: 80, reps: "6-8次", goal: "力量+围度" },
  { percent: 75, reps: "8-10次", goal: "肌肥大" },
  { percent: 70, reps: "10-12次", goal: "肌肥大" },
  { percent: 65, reps: "12-15次", goal: "肌耐力" },
  { percent: 60, reps: "15-20次", goal: "肌耐力/热身" },
];

// Epley 与 Brzycki 公式取平均,减少单一公式的偏差
function estimateOneRepMax(weight: number, reps: number): number {
  const epley = weight * (1 + reps / 30);
  const brzycki = weight * (36 / (37 - reps));
  return Math.round(((epley + brzycki) / 2) * 10) / 10;
}

function validate(weight: number, reps: number): string | null {
  if (!weight || weight < 1 || weight > 500) return "重量范围 1-500kg";
  if (!reps || reps < 1 || reps > 20) return "次数范围 1-20次";
  return null;
}

export default function OneRepMax() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [oneRm, setOneRm] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalc = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);
    const invalid = validate(w, r);
    setError(invalid);
    if (invalid) {
      setOneRm(null);
      return;
    }
    setOneRm(estimateOneRepMax(w, r));
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">1RM 力量计算器</h2>
          </div>
          <p className="section-subtitle mx-auto">
            输入一组完成的重量和次数,算出你的极限重量,并得到各强度区间的训练重量
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="glass-card p-6 md:p-8">
              <h3 className="font-display text-xl text-white tracking-wider mb-6">输入你的一组表现</h3>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-gym-text/70 text-sm mb-2">
                    <Weight className="w-4 h-4 text-gym-accent" />
                    重量 (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="例如 80"
                    className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-lg text-white font-display focus:outline-none focus:border-gym-accent/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gym-text/70 text-sm mb-2">
                    <Repeat className="w-4 h-4 text-gym-accent" />
                    完成次数
                  </label>
                  <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="例如 5"
                    className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-lg text-white font-display focus:outline-none focus:border-gym-accent/50 transition-colors"
                  />
                  <p className="text-gym-muted text-xs mt-1">标准动作、不借力的情况下力竭前完成的次数</p>
                </div>

                <button
                  onClick={handleCalc}
                  disabled={!weight || !reps}
                  className="w-full btn-primary py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Calculator className="w-4 h-4" />
                  计算我的极限重量
                </button>

                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}

                <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                  <Info className="w-3.5 h-3.5 text-gym-muted shrink-0 mt-0.5" />
                  <p className="text-gym-muted text-xs">
                    采用 Epley 与 Brzycki 公式取平均。次数越多估算误差越大,建议用 1-10 次内的组数计算。
                    大重量测试请做好保护,量力而行。
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              {oneRm === null ? (
                <div className="glass-card p-6 md:p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-gym-muted/20 mx-auto mb-4" />
                    <p className="text-gym-muted text-sm">输入重量和次数,点击计算</p>
                    <p className="text-gym-muted/50 text-xs mt-2">即可看到你的 1RM 和训练重量区间</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 1RM headline */}
                  <div className="glass-card p-6 md:p-8 border-gym-accent/20">
                    <p className="text-gym-muted text-xs uppercase tracking-wider mb-1">你的估算极限重量</p>
                    <p className="text-4xl md:text-5xl font-display text-white mb-2">
                      {oneRm}
                      <span className="text-base text-gym-text/40 ml-2">kg</span>
                    </p>
                    <p className="text-gym-text/60 text-sm">
                      以 {weight}kg × {reps}次 推算,训练中挑战大重量时以此作为参考基准
                    </p>
                  </div>

                  {/* Intensity table */}
                  <div className="glass-card p-6 md:p-8">
                    <h3 className="font-display text-lg text-white tracking-wider mb-4">训练强度区间</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {intensityZones.map((zone) => (
                        <div
                          key={zone.percent}
                          className="bg-gym-dark/50 rounded-sm p-3 text-center border border-white/5"
                        >
                          <p className="text-gym-accent font-display text-sm">{zone.percent}%</p>
                          <p className="text-xl font-display text-white mt-1">
                            {(oneRm * zone.percent / 100).toFixed(1)}
                            <span className="text-xs text-gym-muted ml-0.5">kg</span>
                          </p>
                          <p className="text-gym-muted text-xs mt-1">{zone.reps}</p>
                          <p className="text-gym-text/40 text-xs">{zone.goal}</p>
                        </div>
                      ))}
                    </div>
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
