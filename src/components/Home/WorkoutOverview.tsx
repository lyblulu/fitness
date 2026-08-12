import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ClipboardList, ArrowRight, TrendingUp, Dumbbell } from "lucide-react";

export default function WorkoutOverview() {
  const { user, isAuthenticated } = useAuth();

  const records = isAuthenticated && user
    ? JSON.parse(localStorage.getItem(`workout_records_${user.id}`) || "[]") as { totalVolume: number; date: string }[]
    : [];

  const totalWorkouts = records.length;
  const thisWeek = records.filter((r) => {
    const d = new Date(r.date);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    return d >= weekStart;
  }).length;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ClipboardList className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">训练记录</h2>
          </div>
          <p className="section-subtitle mx-auto">
            记录每次训练数据，追踪你的力量增长轨迹
          </p>
        </div>

        <Link
          to={isAuthenticated ? "/workout" : "/login"}
          className="glass-card p-8 block group hover:border-gym-accent/20 transition-all relative overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gym-accent/5 to-transparent rounded-bl-full" />

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-gym-accent/10 rounded-sm shrink-0">
              <Dumbbell className="w-8 h-8 text-gym-accent" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-white font-display text-lg tracking-wider mb-1">
                {isAuthenticated ? "开始今日训练" : "登录后开始记录训练"}
              </h3>
              <p className="text-gym-text/60 text-sm">
                选择训练计划，记录每组重量和次数，自动计算训练容量
              </p>
            </div>

            <div className="flex items-center gap-6">
              {isAuthenticated && (
                <>
                  <div className="text-center">
                    <div className="text-xl font-display text-gym-accent">{totalWorkouts}</div>
                    <div className="text-gym-text/50 text-xs">总训练</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-display text-gym-gold">{thisWeek}</div>
                    <div className="text-gym-text/50 text-xs">本周</div>
                  </div>
                </>
              )}
              <ArrowRight className="w-5 h-5 text-gym-text/30 group-hover:text-gym-accent group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>

        {isAuthenticated && (
          <div className="text-center mt-6">
            <Link
              to="/workout/history"
              className="text-sm text-gym-text/50 hover:text-gym-accent transition-colors inline-flex items-center gap-1"
            >
              <TrendingUp className="w-4 h-4" />
              查看训练历史和进度图表
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}