import { waterPlan } from "@/data/water";
import { Droplets, Clock, CupSoda, Info } from "lucide-react";

export default function Water() {
  const { totalAmount, cups, description, schedule } = waterPlan;

  return (
    <main>
      <div className="h-20" /> {/* Spacer for fixed header */}

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-dark via-gym-darker to-gym-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,150,255,0.08)_0%,_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Droplets className="w-8 h-8 text-blue-400" />
            <h1 className="section-title">喝水计划</h1>
          </div>
          <p className="section-subtitle mx-auto">
            科学补水是训练表现和身体恢复的关键，每天喝够水，状态翻倍
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-16 bg-gym-darker/50 -mt-20">
        <div className="container mx-auto px-4">
          {/* Total stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="glass-card p-6 md:p-8 text-center min-w-[160px]">
              <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-display text-white">{totalAmount}ml</p>
              <p className="text-gym-muted text-sm mt-1">每日推荐总量</p>
            </div>
            <div className="glass-card p-6 md:p-8 text-center min-w-[160px]">
              <CupSoda className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-display text-white">{cups}杯</p>
              <p className="text-gym-muted text-sm mt-1">约等于{cups}杯水</p>
            </div>
            <div className="glass-card p-6 md:p-8 text-center min-w-[160px]">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-display text-white">{schedule.length}次</p>
              <p className="text-gym-muted text-sm mt-1">分{schedule.length}次饮用</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/10 rounded-sm p-4 mb-12 max-w-3xl mx-auto">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-gym-text/70 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl text-white text-center tracking-wider mb-10">
              每日饮水时间表
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-blue-500/20" />

              <div className="space-y-6">
                {schedule.map((item, index) => {
                  const progress = (index / (schedule.length - 1)) * 100;
                  return (
                    <div
                      key={item.time + item.label}
                      className="relative flex items-start gap-5 opacity-0 animate-fade-up"
                      style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-12 md:w-16 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-gym-dark" />
                      </div>

                      {/* Time */}
                      <div className="shrink-0 pt-0.5">
                        <p className="text-blue-400 font-display text-sm">{item.time}</p>
                      </div>

                      {/* Card */}
                      <div className="glass-card p-4 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold text-sm">{item.label}</h3>
                          <span className="text-blue-400 font-display text-sm">{item.amount}ml</span>
                        </div>
                        <p className="text-gym-muted text-xs">{item.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom tip */}
          <div className="text-center mt-16">
            <p className="text-gym-muted text-sm">
              💡 建议使用带刻度的水杯，方便掌控饮水量
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}