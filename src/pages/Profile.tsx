import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User, Dumbbell, History, LogOut, Calendar, Flame } from "lucide-react";

interface WorkoutRecord {
  id: string;
  userId: string;
  date: string;
  planName: string;
  exercises: { name: string; sets: { weight: number; reps: number }[] }[];
  totalVolume: number;
  duration: number;
}

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <User className="w-16 h-16 text-gym-accent/30 mx-auto mb-4" />
          <h2 className="text-xl font-display text-white mb-2">请先登录</h2>
          <p className="text-gym-text/60 text-sm mb-6">登录后查看你的训练记录和个人资料</p>
          <Link to="/login" className="btn-primary px-6 py-3 inline-block">前往登录</Link>
        </div>
      </div>
    );
  }

  const records: WorkoutRecord[] = JSON.parse(localStorage.getItem(`workout_records_${user.id}`) || "[]");
  const totalWorkouts = records.length;
  const totalVolume = records.reduce((sum, r) => sum + r.totalVolume, 0);
  const thisWeek = records.filter((r) => {
    const d = new Date(r.date);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    return d >= weekStart;
  }).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gym-accent/10 flex items-center justify-center">
              <User className="w-10 h-10 text-gym-accent" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-display text-white">{user.username}</h1>
              <p className="text-gym-text/60 text-sm">{user.email}</p>
              <p className="text-gym-text/40 text-xs mt-1">加入于 {new Date(user.createdAt).toLocaleDateString("zh-CN")}</p>
            </div>
            <button onClick={handleLogout} className="text-gym-text/40 hover:text-red-400 transition-colors" title="退出登录">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-6 text-center">
            <Dumbbell className="w-8 h-8 text-gym-accent mx-auto mb-3" />
            <div className="text-3xl font-display text-white">{totalWorkouts}</div>
            <div className="text-gym-text/60 text-sm">总训练次数</div>
          </div>
          <div className="glass-card p-6 text-center">
            <Flame className="w-8 h-8 text-gym-gold mx-auto mb-3" />
            <div className="text-3xl font-display text-white">{totalVolume.toLocaleString()}</div>
            <div className="text-gym-text/60 text-sm">总训练容量(kg)</div>
          </div>
          <div className="glass-card p-6 text-center">
            <Calendar className="w-8 h-8 text-gym-accent mx-auto mb-3" />
            <div className="text-3xl font-display text-white">{thisWeek}</div>
            <div className="text-gym-text/60 text-sm">本周训练</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to="/workout" className="glass-card p-6 hover:border-gym-accent/20 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gym-accent/10 rounded-sm">
                <Dumbbell className="w-6 h-6 text-gym-accent" />
              </div>
              <div>
                <h3 className="text-white font-semibold">开始训练</h3>
                <p className="text-gym-text/60 text-sm">记录今天的训练数据</p>
              </div>
            </div>
          </Link>
          <Link to="/workout/history" className="glass-card p-6 hover:border-gym-accent/20 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gym-gold/10 rounded-sm">
                <History className="w-6 h-6 text-gym-gold" />
              </div>
              <div>
                <h3 className="text-white font-semibold">训练历史</h3>
                <p className="text-gym-text/60 text-sm">查看历史记录和进度</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-8">
          <h2 className="text-lg font-display text-white mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-gym-accent" />
            最近训练
          </h2>
          {records.length === 0 ? (
            <p className="text-gym-text/40 text-sm text-center py-8">还没有训练记录，开始你的第一次训练吧！</p>
          ) : (
            <div className="space-y-3">
              {records.slice(-5).reverse().map((r) => (
                <div key={r.id} className="flex items-center justify-between p-4 bg-gym-dark/50 rounded-sm border border-white/5">
                  <div>
                    <p className="text-white text-sm font-medium">{r.planName}</p>
                    <p className="text-gym-text/50 text-xs">{new Date(r.date).toLocaleDateString("zh-CN")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gym-accent text-sm">{r.totalVolume.toLocaleString()} kg</p>
                    <p className="text-gym-text/50 text-xs">{r.exercises.length} 个动作</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}