import { Link } from "react-router-dom";
import { ArrowRight, Flame, Apple, ScanLine } from "lucide-react";
import { nutritionPlans } from "@/data/nutrition";

export default function NutritionOverview() {
  return (
    <section className="py-20 md:py-32 bg-gym-darker/50 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
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
              className="glass-card p-8 card-hover group opacity-0 animate-fade-up relative overflow-hidden"
              style={{ animationDelay: `${0.2 + index * 0.2}s`, animationFillMode: "forwards" }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gym-accent/5 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gym-accent/5 to-transparent rounded-tr-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-gym-accent/10 rounded-sm">
                    {index === 0 ? (
                      <Flame className="w-5 h-5 text-gym-accent" />
                    ) : (
                      <Apple className="w-5 h-5 text-gym-accent" />
                    )}
                  </div>
                  <h3 className="font-display text-2xl text-white tracking-wider">{plan.title.split("（")[0]}</h3>
                </div>
                <p className="text-gym-text/60 text-sm leading-relaxed mb-4">
                  {plan.description}
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <div className="bg-gym-dark/50 px-4 py-2 rounded-sm border border-white/5">
                    <span className="text-gym-accent font-display text-2xl">{plan.totalCalories}</span>
                    <span className="text-gym-text/40 text-xs ml-1">kcal/日</span>
                  </div>
                  <div className="text-gym-text/40 text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gym-accent rounded-full" />
                    {plan.meals.length}餐/日
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gym-accent text-sm uppercase tracking-wider font-bold group-hover:gap-4 transition-all">
                  <span>查看详情</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}

          {/* 拍照识营养入口 */}
          <Link
            to="/nutrition"
            className="glass-card p-8 card-hover group opacity-0 animate-fade-up relative overflow-hidden border-gym-accent/20"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gym-accent/10 to-transparent rounded-bl-full" />
            <div className="relative z-10 flex items-start gap-5">
              <div className="p-3 bg-gym-accent/15 rounded-sm shrink-0">
                <ScanLine className="w-7 h-7 text-gym-accent" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-white tracking-wider mb-2">
                  拍照识营养
                  <span className="ml-2 align-middle text-[10px] font-bold bg-gym-accent text-white px-2 py-0.5 rounded-sm uppercase">AI</span>
                </h3>
                <p className="text-gym-text/60 text-sm leading-relaxed mb-4">
                  给食物拍张照,AI 帮你估算这份餐的卡路里和碳蛋脂
                </p>
                <div className="flex items-center gap-2 text-gym-accent text-sm uppercase tracking-wider font-bold group-hover:gap-4 transition-all">
                  <span>立即体验</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}