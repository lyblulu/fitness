import { Link } from "react-router-dom";
import { ArrowRight, Moon, BedDouble, Timer, CheckCircle2 } from "lucide-react";
import { sleepPlan } from "@/data/sleep";

export default function SleepOverview() {
  const { recommendedHours, principles } = sleepPlan;

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-7 h-7 text-indigo-400" />
            <h2 className="section-title">睡眠与恢复</h2>
          </div>
          <p className="section-subtitle mx-auto">
            训练撕裂肌肉，睡眠让肌肉生长。每天{recommendedHours}小时高质量睡眠，让健身效果翻倍
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
          <div className="glass-card p-6 text-center">
            <BedDouble className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <p className="text-2xl font-display text-white">{recommendedHours}小时</p>
            <p className="text-gym-muted text-xs mt-1">每日推荐睡眠</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Timer className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <p className="text-2xl font-display text-white">23:00</p>
            <p className="text-gym-muted text-xs mt-1">最佳入睡时间</p>
          </div>
          <div className="glass-card p-6 text-center">
            <Moon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
            <p className="text-2xl font-display text-white">06:30</p>
            <p className="text-gym-muted text-xs mt-1">建议起床时间</p>
          </div>
        </div>

        {/* Key principles */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.slice(0, 4).map((p, i) => (
              <div key={i} className="glass-card p-5">
                <h3 className="text-white font-semibold text-sm mb-2">{p.title}</h3>
                <p className="text-gym-text/60 text-xs leading-relaxed">{p.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/sleep" className="btn-ghost text-sm inline-flex items-center gap-2">
            <Moon className="w-4 h-4" />
            查看完整睡眠计划
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}