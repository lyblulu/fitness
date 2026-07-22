import { Link } from "react-router-dom";
import { ArrowRight, Flame, Apple } from "lucide-react";
import { nutritionPlans } from "@/data/nutrition";

export default function NutritionOverview() {
  return (
    <section className="py-20 md:py-32 bg-gym-darker/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">营养饮食</h2>
          <p className="section-subtitle mx-auto">
            科学的营养分配是训练效果的保障，精准计算每一餐的宏量营养素
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {nutritionPlans.map((plan, index) => (
            <Link
              key={plan.title}
              to="/nutrition"
              className="glass-card p-8 card-hover group opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.2 + index * 0.2}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-3 mb-4">
                {index === 0 ? (
                  <Flame className="w-6 h-6 text-gym-accent" />
                ) : (
                  <Apple className="w-6 h-6 text-gym-accent" />
                )}
                <h3 className="font-display text-2xl text-white tracking-wider">{plan.title.split("（")[0]}</h3>
              </div>
              <p className="text-gym-text/60 text-sm leading-relaxed mb-4">
                {plan.description}
              </p>
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <span className="text-gym-accent font-display text-2xl">{plan.totalCalories}</span>
                  <span className="text-gym-text/40 text-xs ml-1">kcal/日</span>
                </div>
                <div className="text-gym-text/40 text-sm">
                  {plan.meals.length}餐/日
                </div>
              </div>
              <div className="flex items-center gap-2 text-gym-accent text-sm uppercase tracking-wider font-bold group-hover:gap-4 transition-all">
                <span>查看详情</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}