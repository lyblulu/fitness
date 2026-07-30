import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { splitPlans } from "@/data/training";
import { Play, Dumbbell, Flame } from "lucide-react";

const musclePlans = splitPlans.filter((p) => p.type !== "减脂");
const fatLossPlans = splitPlans.filter((p) => p.type === "减脂");

export default function SplitPlan() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<"muscle" | "fatloss">("muscle");
  const [activePlan, setActivePlan] = useState(0);

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan === "fatloss") {
      setCategory("fatloss");
    } else {
      setCategory("muscle");
      setActivePlan(0);
    }
  }, [searchParams]);

  const currentPlans = category === "muscle" ? musclePlans : fatLossPlans;
  const plan = currentPlans[category === "fatloss" ? 0 : activePlan];

  return (
    <section className="py-20 md:py-32 bg-gym-darker/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">健身房训练</h2>
          </div>
          <p className="section-subtitle mx-auto">
            专业健身房训练计划，涵盖增肌与减脂，自由重量与固定器械结合，满足不同训练目标
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => { setCategory("muscle"); setActivePlan(0); }}
            className={`flex items-center gap-2 px-10 py-3 font-display text-lg uppercase tracking-wider transition-all duration-300 rounded-sm ${
              category === "muscle"
                ? "bg-gym-accent text-white"
                : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            增肌训练
          </button>
          <button
            onClick={() => setCategory("fatloss")}
            className={`flex items-center gap-2 px-10 py-3 font-display text-lg uppercase tracking-wider transition-all duration-300 rounded-sm ${
              category === "fatloss"
                ? "bg-gym-accent text-white"
                : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
            }`}
          >
            <Flame className="w-5 h-5" />
            减脂训练
          </button>
        </div>

        {/* Sub Tab Switcher (only for muscle) */}
        {category === "muscle" && (
          <div className="flex justify-center gap-4 mb-12">
            {musclePlans.map((p, index) => (
              <button
                key={p.type}
                onClick={() => setActivePlan(index)}
                className={`px-8 py-3 font-display text-base uppercase tracking-wider transition-all duration-300 rounded-sm ${
                  activePlan === index
                    ? "bg-gym-accent text-white"
                    : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
                }`}
              >
                {p.type}训练
              </button>
            ))}
          </div>
        )}

        {/* Plan Description */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="glass-card p-5 text-center">
            <p className="text-gym-text/70 text-sm leading-relaxed">{plan.description}</p>
          </div>
        </div>

        {/* Training Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plan.days.map((day, index) => (
            <div
              key={day.dayName}
              className={`glass-card p-6 opacity-0 animate-fade-up ${
                plan.days.length === 4 && index === 3 ? "md:col-start-2" : ""
              }`}
              style={{ animationDelay: `${0.1 + index * 0.15}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-3 mb-4">
                {category === "fatloss" ? (
                  <Flame className="w-5 h-5 text-gym-accent" />
                ) : (
                  <Dumbbell className="w-5 h-5 text-gym-accent" />
                )}
                <h3 className="font-display text-xl text-white tracking-wider">{day.dayName}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {day.bodyParts.map((part) => (
                  <span key={part} className="text-xs bg-gym-accent/10 text-gym-accent px-2 py-1">
                    {part}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                {day.exercises.map((exercise, i) => (
                  <div key={exercise.name} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0">
                    <span className="text-gym-muted text-sm font-mono w-6 shrink-0">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-semibold">{exercise.name}</span>
                        <span className="text-gym-accent text-xs font-mono">{exercise.sets}组 &times; {exercise.reps}次</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        {exercise.notes && (
                          <p className="text-gym-muted text-xs">{exercise.notes}</p>
                        )}
                        {exercise.videoQuery && (
                          <a
                            href={`https://search.bilibili.com/all?keyword=${encodeURIComponent(exercise.videoQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-gym-accent/80 hover:text-gym-accent transition-colors ml-auto"
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
          ))}
        </div>
      </div>
    </section>
  );
}