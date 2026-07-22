import { useState } from "react";
import { dishes } from "@/data/dishes";
import { Flame, Beef, Wheat, Info, UtensilsCrossed } from "lucide-react";

export default function DishRecommendations() {
  const [activeCategory, setActiveCategory] = useState<'家常菜' | '学生党'>('家常菜');
  const filtered = dishes.filter((d) => d.category === activeCategory);

  return (
    <section className="py-20 md:py-32 bg-gym-darker/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <UtensilsCrossed className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">常见菜肴营养分析</h2>
          </div>
          <p className="section-subtitle mx-auto">
            家常菜和学生党都能吃的健身餐，每道菜都标注了碳蛋脂，帮你放心吃
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('家常菜')}
            className={`px-8 py-3 font-display text-lg uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center gap-2 ${
              activeCategory === '家常菜'
                ? "bg-gym-accent text-white"
                : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
            }`}
          >
            <Beef className="w-5 h-5" />
            家常菜
          </button>
          <button
            onClick={() => setActiveCategory('学生党')}
            className={`px-8 py-3 font-display text-lg uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center gap-2 ${
              activeCategory === '学生党'
                ? "bg-gym-accent text-white"
                : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
            }`}
          >
            <Flame className="w-5 h-5" />
            学生党
          </button>
        </div>

        {/* Dish grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filtered.map((dish, index) => (
            <div
              key={dish.name}
              className="glass-card p-6 opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.08}s`, animationFillMode: "forwards" }}
            >
              {/* Title & Calories */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg text-white tracking-wider">{dish.name}</h3>
                <span className="text-gym-accent font-display text-lg shrink-0 ml-4">{dish.nutrition.calories}kcal</span>
              </div>

              {/* Description */}
              <p className="text-gym-text/60 text-xs leading-relaxed mb-4">{dish.description}</p>

              {/* Nutrition bar */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gym-dark/50 rounded-sm p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Beef className="w-3.5 h-3.5 text-gym-accent" />
                  </div>
                  <p className="text-white font-display text-base">{dish.nutrition.protein}g</p>
                  <p className="text-gym-muted text-xs">蛋白质</p>
                </div>
                <div className="bg-gym-dark/50 rounded-sm p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Wheat className="w-3.5 h-3.5 text-gym-gold" />
                  </div>
                  <p className="text-white font-display text-base">{dish.nutrition.carbs}g</p>
                  <p className="text-gym-muted text-xs">碳水</p>
                </div>
                <div className="bg-gym-dark/50 rounded-sm p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <p className="text-white font-display text-base">{dish.nutrition.fat}g</p>
                  <p className="text-gym-muted text-xs">脂肪</p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-3">
                <p className="text-gym-muted text-xs mb-1.5">主要食材：</p>
                <div className="flex flex-wrap gap-1.5">
                  {dish.ingredients.map((ing) => (
                    <span key={ing} className="text-xs bg-gym-accent/8 text-gym-text/70 px-2 py-0.5 rounded-sm border border-white/5">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="flex items-start gap-2 bg-gym-accent/5 border border-gym-accent/10 rounded-sm p-3">
                <Info className="w-4 h-4 text-gym-accent shrink-0 mt-0.5" />
                <p className="text-gym-text/60 text-xs leading-relaxed">{dish.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}