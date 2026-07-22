import { nutritionPlans } from "@/data/nutrition";
import { useState } from "react";

export default function MealPlan() {
  const [activePlan, setActivePlan] = useState(0);
  const plan = nutritionPlans[activePlan];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">三餐搭配示例</h2>
          <p className="section-subtitle mx-auto">
            具体的食物选择比数字更重要，以下是推荐的食材搭配
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {nutritionPlans.map((p, index) => (
            <button
              key={p.title}
              onClick={() => setActivePlan(index)}
              className={`px-8 py-3 font-display text-lg uppercase tracking-wider transition-all duration-300 rounded-sm ${
                activePlan === index
                  ? "bg-gym-accent text-white"
                  : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
              }`}
            >
              {p.title.split("（")[0]}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {plan.meals.map((meal, index) => (
            <div
              key={meal.meal}
              className="glass-card overflow-hidden opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Food Image */}
                {meal.image && (
                  <div className="md:w-48 h-48 md:h-auto bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${meal.image})` }} />
                )}
                <div className="p-6 md:p-8 flex-1 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-40 shrink-0">
                    <h3 className="font-display text-lg text-white tracking-wider">{meal.meal}</h3>
                    <p className="text-gym-accent font-display text-xl">{meal.calories} kcal</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {meal.foodExamples.map((food) => (
                        <span key={food} className="bg-gym-dark/50 text-gym-text/80 text-sm px-3 py-1.5 rounded-sm border border-white/5">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}