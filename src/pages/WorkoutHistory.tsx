import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { History, Dumbbell, TrendingUp, Calendar, Flame, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface ExerciseSet {
  weight: number;
  reps: number;
}

interface LoggedExercise {
  name: string;
  sets: ExerciseSet[];
  videoQuery?: string;
}

interface WorkoutRecord {
  id: string;
  userId: string;
  date: string;
  planName: string;
  exercises: LoggedExercise[];
  totalVolume: number;
  duration: number;
}

export default function WorkoutHistory() {
  const { user, isAuthenticated } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const records: WorkoutRecord[] = useMemo(() => {
    if (!user) return [];
    return JSON.parse(localStorage.getItem(`workout_records_${user.id}`) || "[]");
  }, [user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <History className="w-16 h-16 text-gym-accent/30 mx-auto mb-4" />
          <h2 className="text-xl font-display text-white mb-2">请先登录</h2>
          <p className="text-gym-text/60 text-sm">登录后查看训练历史</p>
        </div>
      </div>
    );
  }

  // Chart data: volume per session
  const volumeChartData = records.map((r, i) => ({
    name: new Date(r.date).toLocaleDateString("zh-CN", { month: "short", day: "numeric" }),
    volume: Math.round(r.totalVolume / 100) * 100,
    index: i,
  }));

  // Chart data: per-exercise max weight progression
  const exerciseNames = Array.from(new Set(records.flatMap((r) => r.exercises.map((e) => e.name))));
  const exerciseMaxWeight: Record<string, { date: string; maxWeight: number }[]> = {};
  exerciseNames.forEach((name) => {
    exerciseMaxWeight[name] = records
      .map((r) => {
        const ex = r.exercises.find((e) => e.name === name);
        if (!ex) return null;
        const maxWeight = Math.max(...ex.sets.map((s) => s.weight));
        return { date: new Date(r.date).toLocaleDateString("zh-CN", { month: "short", day: "numeric" }), maxWeight };
      })
      .filter((d): d is { date: string; maxWeight: number } => d !== null && d.maxWeight > 0);
  });

  const [selectedExercise, setSelectedExercise] = useState(exerciseNames[0] || "");
  const exerciseChartData = selectedExercise ? exerciseMaxWeight[selectedExercise] || [] : [];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/profile" className="text-gym-text/60 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-display text-white">训练历史</h1>
            <p className="text-gym-text/60 text-sm">共 {records.length} 次训练记录</p>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Dumbbell className="w-12 h-12 text-gym-accent/30 mx-auto mb-4" />
            <p className="text-gym-text/60 mb-4">还没有训练记录</p>
            <Link to="/workout" className="btn-primary px-6 py-3 inline-block text-sm">开始第一次训练</Link>
          </div>
        ) : (
          <>
            {/* Volume Chart */}
            <div className="glass-card p-6 mb-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gym-accent" />
                训练容量趋势
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4 }}
                      labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                    />
                    <Bar dataKey="volume" fill="#ff4d00" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Exercise Progression Chart */}
            {exerciseNames.length > 0 && (
              <div className="glass-card p-6 mb-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gym-gold" />
                  动作重量趋势
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {exerciseNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => setSelectedExercise(name)}
                      className={`px-3 py-1 text-xs rounded-sm transition-colors ${
                        selectedExercise === name
                          ? "bg-gym-accent text-white"
                          : "bg-gym-dark border border-white/10 text-gym-text/60 hover:text-white"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                {exerciseChartData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={exerciseChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                        <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4 }}
                          labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                        />
                        <Line type="monotone" dataKey="maxWeight" stroke="#c9a84c" strokeWidth={2} dot={{ fill: "#c9a84c", r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-gym-text/40 text-sm text-center py-8">暂无该动作的重量数据</p>
                )}
              </div>
            )}

            {/* Record List */}
            <div className="space-y-3">
              {records.slice().reverse().map((r) => (
                <div key={r.id} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-gym-accent/10 rounded-sm">
                        <Dumbbell className="w-4 h-4 text-gym-accent" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{r.planName}</p>
                        <p className="text-gym-text/50 text-xs">
                          {new Date(r.date).toLocaleDateString("zh-CN")} · {r.duration}分钟
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-gym-accent text-sm">{r.totalVolume.toLocaleString()} kg</p>
                        <p className="text-gym-text/50 text-xs">{r.exercises.length} 个动作</p>
                      </div>
                      {expandedId === r.id ? <ChevronUp className="w-4 h-4 text-gym-text/40" /> : <ChevronDown className="w-4 h-4 text-gym-text/40" />}
                    </div>
                  </button>

                  {expandedId === r.id && (
                    <div className="px-5 pb-5 border-t border-white/5 pt-3">
                      {r.exercises.map((ex, i) => (
                        <div key={i} className="mb-3 last:mb-0">
                          <p className="text-white text-sm mb-1">{ex.name}</p>
                          <div className="grid grid-cols-4 gap-1 text-xs text-gym-text/50 px-2 mb-1">
                            <span>组</span><span>重量(kg)</span><span>次数</span><span>容量</span>
                          </div>
                          {ex.sets.map((set, si) => (
                            <div key={si} className="grid grid-cols-4 gap-1 text-xs text-gym-text/70 px-2 py-0.5">
                              <span>{si + 1}</span>
                              <span>{set.weight}</span>
                              <span>{set.reps}</span>
                              <span>{set.weight * set.reps}</span>
                            </div>
                          ))}
                          <div className="text-xs text-gym-accent/60 mt-1 px-2">
                            小计：{ex.sets.reduce((s, set) => s + set.weight * set.reps, 0)} kg
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}