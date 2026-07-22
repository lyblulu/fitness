import { useState } from "react";
import { homePlans } from "@/data/homeTraining";
import { Home, Target, Flame, Dumbbell, Clock, Play, CheckCircle2 } from "lucide-react";

export default function HomeTraining() {
  const [activePlan, setActivePlan] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const plan = homePlans[activePlan];
  const day = plan.days[activeDay];

  return (
    <section className="py-20 md:py-32 bg-gym-darker/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">居家训练平替版</h2>
          </div>
          <p className="section-subtitle mx-auto">
            没时间去健身房？在家也能练！零器械或家用物品替代，增肌减脂方案都有
          </p>
        </div>

        {/* Plan tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {homePlans.map((p, i) => (
            <button
              key={p.title}
              onClick={() => { setActivePlan(i); setActiveDay(0); }}
              className={`flex items-center gap-2 px-8 py-3 font-display text-lg uppercase tracking-wider transition-all duration-300 rounded-sm ${
                activePlan === i
                  ? "bg-gym-accent text-white"
                  : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
              }`}
            >
              {p.goal === "增肌" ? <Target className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
              {p.title}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Plan info */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <Clock className="w-5 h-5 text-gym-accent mx-auto mb-2" />
                <p className="text-white font-display text-lg">{plan.frequency}</p>
                <p className="text-gym-muted text-xs">训练频率</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-gym-text/70 text-sm leading-relaxed">{plan.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Dumbbell className="w-4 h-4 text-gym-accent" />
                  <span className="text-gym-text/60 text-xs">所需器材：{plan.equipment}</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {plan.tips.map((tip, i) => (
                <div key={i} className="flex items-center gap-2 text-gym-text/60 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gym-accent shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {plan.days.map((d, i) => (
              <button
                key={d.dayName}
                onClick={() => setActiveDay(i)}
                className={`px-4 py-2 text-xs font-display uppercase tracking-wider transition-all duration-300 rounded-sm ${
                  activeDay === i
                    ? "bg-gym-accent text-white"
                    : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
                }`}
              >
                {d.dayName}
              </button>
            ))}
          </div>

          {/* Day detail */}
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-xl text-white tracking-wider">{day.dayName}</h3>
                <p className="text-gym-muted text-xs mt-1">训练部位：{day.focus}</p>
              </div>
            </div>

            <div className="space-y-3">
              {day.exercises.map((ex, i) => (
                <div
                  key={ex.name}
                  className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0 opacity-0 animate-fade-up"
                  style={{ animationDelay: `${0.1 + i * 0.08}s`, animationFillMode: "forwards" }}
                >
                  <span className="text-gym-muted text-sm font-mono w-6 shrink-0 text-center">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-white text-sm font-semibold">{ex.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gym-accent text-xs font-mono">{ex.sets}组 × {ex.reps}</span>
                        <span className="text-gym-muted text-[10px] bg-gym-card px-1.5 py-0.5 rounded-sm">{ex.equipment}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gym-muted text-xs leading-relaxed">{ex.notes}</p>
                      {ex.videoQuery && (
                        <a
                          href={`https://search.bilibili.com/all?keyword=${encodeURIComponent(ex.videoQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-gym-accent/80 hover:text-gym-accent transition-colors ml-auto shrink-0"
                        >
                          <Play className="w-3 h-3" />
                          <span>看演示</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}