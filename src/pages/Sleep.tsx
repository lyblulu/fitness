import { sleepPlan } from "@/data/sleep";
import { Moon, BedDouble, Clock, Info, CheckCircle2, Timer, Sunset, Zap } from "lucide-react";

export default function Sleep() {
  const { recommendedHours, description, schedule, principles } = sleepPlan;

  return (
    <main>
      <div className="h-20" />

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-dark via-gym-darker to-gym-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,80,255,0.08)_0%,_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Moon className="w-8 h-8 text-indigo-400" />
            <h1 className="section-title">睡眠与恢复</h1>
          </div>
          <p className="section-subtitle mx-auto">
            训练撕裂肌肉，饮食提供原料，睡眠让肌肉真正生长。健身的三大支柱缺一不可
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-10 md:py-16 bg-gym-darker/50 -mt-20">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="glass-card p-6 md:p-8 text-center min-w-[160px]">
              <BedDouble className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-display text-white">{recommendedHours}h</p>
              <p className="text-gym-muted text-sm mt-1">每日推荐睡眠</p>
            </div>
            <div className="glass-card p-6 md:p-8 text-center min-w-[160px]">
              <Timer className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-display text-white">23:00</p>
              <p className="text-gym-muted text-sm mt-1">最佳入睡时间</p>
            </div>
            <div className="glass-card p-6 md:p-8 text-center min-w-[160px]">
              <Sunset className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-display text-white">06:30</p>
              <p className="text-gym-muted text-sm mt-1">建议起床时间</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3 bg-indigo-500/5 border border-indigo-500/10 rounded-sm p-4 mb-12 max-w-3xl mx-auto">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-gym-text/70 text-sm leading-relaxed">{description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Timeline - takes 3 cols */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-2xl text-white tracking-wider mb-8">
                睡前作息时间线
              </h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-indigo-500/20" />

                <div className="space-y-6">
                  {schedule.map((item, index) => (
                    <div
                      key={item.time + item.label}
                      className="relative flex items-start gap-5 opacity-0 animate-fade-up"
                      style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
                    >
                      <div className="relative z-10 flex items-center justify-center w-12 md:w-16 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-indigo-400 border-2 border-gym-dark" />
                      </div>
                      <div className="shrink-0 pt-0.5">
                        <p className="text-indigo-400 font-display text-sm">{item.time}</p>
                      </div>
                      <div className="glass-card p-4 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold text-sm">{item.label}</h3>
                          {item.duration !== '—' && (
                            <span className="text-indigo-400/70 text-xs font-mono">{item.duration}</span>
                          )}
                        </div>
                        <p className="text-gym-muted text-xs">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Principles - takes 2 cols */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl text-white tracking-wider mb-8">
                为什么睡眠如此重要
              </h2>

              <div className="space-y-4">
                {principles.map((p, index) => (
                  <div
                    key={p.title}
                    className="glass-card p-5 opacity-0 animate-fade-up"
                    style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
                  >
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold text-sm mb-1">{p.title}</h3>
                        <p className="text-gym-text/60 text-xs leading-relaxed">{p.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom tips */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="glass-card p-6 md:p-8">
              <h3 className="font-display text-lg text-white tracking-wider mb-6 text-center">睡眠质量自检清单</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  '每天固定时间入睡和起床',
                  '睡前1小时不碰手机和电脑',
                  '卧室保持完全黑暗',
                  '室温控制在18-22°C',
                  '睡前不吃大量食物',
                  '下午2点后不喝咖啡',
                  '睡前做10分钟拉伸放松',
                  '床只用来看书和睡觉',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gym-text/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}