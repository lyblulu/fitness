import { Link } from "react-router-dom";
import { ArrowRight, Dumbbell, Layout, GitFork, Target, Flame } from "lucide-react";
import { splitPlans } from "@/data/training";

const planIcons = [Dumbbell, Layout, GitFork, Target, Flame];

export default function TrainingOverview() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">训练方案</h2>
          <p className="section-subtitle mx-auto">
            选择适合你的训练分化方案，系统化打造完美身材
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {splitPlans.map((plan, index) => {
            const Icon = planIcons[index % planIcons.length];
            return (
            <Link
              key={plan.type}
              to="/training"
              className="glass-card p-8 card-hover group opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.15}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6 text-gym-accent" />
                <h3 className="font-display text-2xl text-white tracking-wider">{plan.type}训练</h3>
              </div>
              <p className="text-gym-text/60 text-sm leading-relaxed mb-6">
                {plan.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {plan.days.map((day) => (
                  <span key={day.dayName} className="text-xs bg-gym-accent/10 text-gym-accent px-3 py-1 rounded-sm">
                    {day.dayName.split("（")[0]}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gym-accent text-sm uppercase tracking-wider font-bold group-hover:gap-4 transition-all">
                <span>查看详情</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}