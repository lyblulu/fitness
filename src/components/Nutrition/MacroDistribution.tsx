import { useState } from "react";
import { nutritionPlans } from "@/data/nutrition";

export default function MacroDistribution() {
  const [activePlan, setActivePlan] = useState(0);
  const plan = nutritionPlans[activePlan];

  const macroPercent = (meals: typeof plan.meals) => {
    const totalCarbs = meals.reduce((s, m) => s + m.carbs, 0);
    const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
    const totalFat = meals.reduce((s, m) => s + m.fat, 0);
    const total = totalCarbs * 4 + totalProtein * 4 + totalFat * 9;
    return {
      carbs: Math.round((totalCarbs * 4 / total) * 100),
      protein: Math.round((totalProtein * 4 / total) * 100),
      fat: Math.round((totalFat * 9 / total) * 100),
    };
  };

  const percent = macroPercent(plan.meals);

  return (
    <section className="py-20 md:py-32 bg-gym-darker/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">宏量营养素分配</h2>
          <p className="section-subtitle mx-auto">{plan.description}</p>
        </div>

        {/* Tab Switcher */}
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

        {/* Total Calories */}
        <div className="text-center mb-12">
          <span className="text-gym-muted text-sm uppercase tracking-wider">每日总热量</span>
          <div className="text-6xl md:text-7xl font-display text-white mt-2">
            {plan.totalCalories}
            <span className="text-2xl text-gym-text/40 ml-2">kcal</span>
          </div>
        </div>

        {/* Macro distribution bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex h-4 rounded-full overflow-hidden">
            <div className="bg-gym-accent transition-all duration-500" style={{ width: `${percent.carbs}%` }} />
            <div className="bg-gym-gold transition-all duration-500" style={{ width: `${percent.protein}%` }} />
            <div className="bg-white/30 transition-all duration-500" style={{ width: `${percent.fat}%` }} />
          </div>
          <div className="flex justify-center gap-8 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gym-accent rounded-sm" />
              <span className="text-gym-text/60">碳水 {percent.carbs}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gym-gold rounded-sm" />
              <span className="text-gym-text/60">蛋白质 {percent.protein}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-white/30 rounded-sm" />
              <span className="text-gym-text/60">脂肪 {percent.fat}%</span>
            </div>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plan.meals.map((meal, index) => (
            <div
              key={meal.meal}
              className="glass-card overflow-hidden opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
            >
              {/* Food Image */}
              {meal.image && (
                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url(${meal.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-gym-card via-transparent to-transparent" />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-lg text-white tracking-wider mb-1">{meal.meal}</h3>
                <p className="text-gym-accent font-display text-2xl mb-4">{meal.calories} <span className="text-sm text-gym-text/40">kcal</span></p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gym-accent/80">碳水</span>
                    <span className="text-white font-mono">{meal.carbs}g</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gym-gold/80">蛋白质</span>
                    <span className="text-white font-mono">{meal.protein}g</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gym-text/40">脂肪</span>
                    <span className="text-white font-mono">{meal.fat}g</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <p className="text-gym-muted text-xs mb-2">食物示例</p>
                  <div className="flex flex-wrap gap-1.5">
                    {meal.foodExamples.map((food) => (
                      <span key={food} className="text-xs bg-gym-dark/50 text-gym-text/60 px-2 py-0.5 rounded-sm">
                        {food}
                      </span>
                    ))}
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