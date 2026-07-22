import { Link } from "react-router-dom";
import { ArrowRight, Droplets, CupSoda } from "lucide-react";
import { waterPlan } from "@/data/water";

export default function WaterOverview() {
  const { totalAmount, cups, schedule } = waterPlan;

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Droplets className="w-7 h-7 text-blue-400" />
            <h2 className="section-title">喝水计划</h2>
          </div>
          <p className="section-subtitle mx-auto">
            科学补水，每天{totalAmount}ml，分{schedule.length}次喝够
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="glass-card p-6 text-center">
              <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-2xl font-display text-white">{totalAmount}ml</p>
              <p className="text-gym-muted text-xs mt-1">每日推荐</p>
            </div>
            <div className="glass-card p-6 text-center">
              <CupSoda className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-2xl font-display text-white">{cups}杯</p>
              <p className="text-gym-muted text-xs mt-1">约{cups}杯水</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-2xl font-display text-blue-400">{schedule.length}</p>
              <p className="text-gym-muted text-xs mt-1">分段饮水</p>
            </div>
          </div>

          {/* Timeline preview */}
          <div className="glass-card p-6 md:p-8">
            <h3 className="font-display text-lg text-white tracking-wider mb-6">每日饮水时间线</h3>
            <div className="space-y-3">
              {schedule.slice(0, 5).map((item) => (
                <div key={item.time + item.label} className="flex items-center gap-4 pb-3 border-b border-white/5 last:border-0">
                  <span className="text-blue-400 font-display text-sm w-14 shrink-0">{item.time}</span>
                  <div className="flex-1">
                    <span className="text-white text-sm">{item.label}</span>
                  </div>
                  <span className="text-gym-text/60 text-sm font-mono">{item.amount}ml</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 pt-3 border-t border-white/5">
              <p className="text-gym-muted text-xs mb-4">还有{schedule.length - 5}个时段，查看完整计划</p>
              <Link to="/water" className="btn-ghost text-xs inline-flex items-center gap-2">
                查看完整计划
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}