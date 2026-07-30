import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Dumbbell, Plus, Minus, Check, Save, Play, ArrowLeft, Link as LinkIcon } from "lucide-react";
import { bodyPartExercises, splitPlans } from "@/data/training";

interface ExerciseSet {
  weight: number;
  reps: number;
}

interface LoggedExercise {
  name: string;
  sets: ExerciseSet[];
  videoQuery?: string;
}

export default function WorkoutTracker() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"plan" | "exercise" | "review">("plan");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [exercises, setExercises] = useState<LoggedExercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState("");
  const [currentSets, setCurrentSets] = useState<ExerciseSet[]>([{ weight: 0, reps: 0 }]);
  const [duration, setDuration] = useState(60);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Collect all exercise names from training data
  const allExercises = Array.from(
    new Set([
      ...bodyPartExercises.flatMap((bp) => bp.exercises.map((e) => e.name)),
      ...splitPlans.flatMap((sp) => sp.days.flatMap((d) => d.exercises.map((e) => e.name))),
    ])
  ).sort();

  const filteredExercises = searchQuery
    ? allExercises.filter((name) => name.includes(searchQuery))
    : allExercises;

  const addExercise = (name: string, videoQuery?: string) => {
    if (!exercises.find((e) => e.name === name)) {
      setExercises([...exercises, { name, sets: [{ weight: 0, reps: 0 }], videoQuery }]);
    }
    setShowSearch(false);
    setSearchQuery("");
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof ExerciseSet, value: number) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets[setIndex] = { ...updated[exerciseIndex].sets[setIndex], [field]: value };
    setExercises(updated);
  };

  const addSet = (exerciseIndex: number) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets.push({ weight: 0, reps: 0 });
    setExercises(updated);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(updated);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const saveWorkout = () => {
    if (!user) return;
    const totalVolume = exercises.reduce((sum, ex) => {
      return sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0);
    }, 0);

    const record = {
      id: "wr_" + Date.now(),
      userId: user.id,
      date: new Date().toISOString(),
      planName: selectedPlan || "自由训练",
      exercises,
      totalVolume,
      duration,
    };

    const existing = JSON.parse(localStorage.getItem(`workout_records_${user.id}`) || "[]");
    existing.push(record);
    localStorage.setItem(`workout_records_${user.id}`, JSON.stringify(existing));
    setStep("review");
  };

  if (step === "plan") {
    return (
      <div className="min-h-screen px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gym-accent/10 mb-4">
              <Dumbbell className="w-8 h-8 text-gym-accent" />
            </div>
            <h1 className="text-2xl font-display text-white">开始训练</h1>
            <p className="text-gym-text/60 text-sm mt-2">选择训练计划或自由训练</p>
          </div>

          <div className="space-y-3 mb-8">
            <button
              onClick={() => { setSelectedPlan("自由训练"); setStep("exercise"); }}
              className="w-full glass-card p-5 text-left hover:border-gym-accent/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gym-accent/10 rounded-sm">
                  <Plus className="w-6 h-6 text-gym-accent" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">自由训练</h3>
                  <p className="text-gym-text/60 text-sm">自行选择动作，自定义组数和重量</p>
                </div>
              </div>
            </button>

            {splitPlans.map((plan) => (
              <div key={plan.type} className="glass-card p-5">
                <h3 className="text-white font-semibold mb-2">{plan.type}</h3>
                <p className="text-gym-text/60 text-xs mb-3">{plan.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plan.days.map((day) => (
                    <button
                      key={day.dayName}
                      onClick={() => {
                        setSelectedPlan(`${plan.type} - ${day.dayName}`);
                        setExercises(
                          day.exercises.map((ex) => ({
                            name: ex.name,
                            sets: [{ weight: 0, reps: 0 }],
                            videoQuery: ex.videoQuery,
                          }))
                        );
                        setStep("exercise");
                      }}
                      className="text-left p-3 bg-gym-dark/50 rounded-sm border border-white/5 hover:border-gym-accent/20 transition-all text-sm"
                    >
                      <div className="text-gym-accent/80 text-xs mb-1">{day.bodyParts.join("、")}</div>
                      <div className="text-white text-sm">{day.dayName}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === "review") {
    const totalVolume = exercises.reduce((sum, ex) => {
      return sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0);
    }, 0);

    return (
      <div className="min-h-screen px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-xl font-display text-white mb-2">训练完成！</h2>
            <p className="text-gym-text/60 text-sm mb-6">{selectedPlan}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gym-dark/50 rounded-sm p-4">
                <div className="text-2xl font-display text-gym-accent">{totalVolume.toLocaleString()}</div>
                <div className="text-gym-text/50 text-xs">总容量(kg)</div>
              </div>
              <div className="bg-gym-dark/50 rounded-sm p-4">
                <div className="text-2xl font-display text-gym-accent">{exercises.length}</div>
                <div className="text-gym-text/50 text-xs">动作数</div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={() => { setStep("plan"); setExercises([]); }} className="btn-primary px-6 py-3 text-sm">
                再来一次
              </button>
              <button onClick={() => navigate("/workout/history")} className="px-6 py-3 text-sm border border-white/10 text-gym-text/70 hover:text-white rounded-sm transition-colors">
                查看历史
              </button>
              <button onClick={() => navigate("/profile")} className="px-6 py-3 text-sm border border-white/10 text-gym-text/70 hover:text-white rounded-sm transition-colors">
                返回个人中心
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setStep("plan")} className="flex items-center gap-2 text-gym-text/60 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <div className="text-center">
            <h1 className="text-lg font-display text-white">{selectedPlan}</h1>
            <p className="text-gym-text/50 text-xs">{exercises.length} 个动作</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-16 bg-gym-dark border border-white/10 rounded-sm px-2 py-1 text-white text-xs text-center"
              min={1}
            />
            <span className="text-gym-text/60 text-xs">分钟</span>
          </div>
        </div>

        {/* Add Exercise Button */}
        <div className="relative mb-6">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="w-full border-2 border-dashed border-white/10 rounded-sm p-4 text-gym-text/40 hover:text-gym-accent hover:border-gym-accent/30 transition-all text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            添加动作
          </button>

          {showSearch && (
            <div className="absolute top-full left-0 right-0 mt-2 z-10 glass-card p-4 max-h-80 overflow-y-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索动作名称..."
                className="w-full bg-gym-dark border border-white/10 rounded-sm px-3 py-2 text-white text-sm mb-3 focus:outline-none focus:border-gym-accent/50"
                autoFocus
              />
              <div className="grid grid-cols-2 gap-1">
                {filteredExercises.map((name) => {
                  const found = bodyPartExercises.find((bp) =>
                    bp.exercises.some((e) => e.name === name)
                  );
                  const videoQuery = found?.exercises.find((e) => e.name === name)?.videoQuery;
                  return (
                    <button
                      key={name}
                      onClick={() => addExercise(name, videoQuery)}
                      className="text-left px-3 py-2 text-sm text-gym-text/70 hover:text-white hover:bg-gym-accent/10 rounded-sm transition-colors"
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Exercise List */}
        <div className="space-y-4">
          {exercises.map((ex, exIndex) => (
            <div key={exIndex} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-sm">{ex.name}</h3>
                  {ex.videoQuery && (
                    <a
                      href={`https://search.bilibili.com/all?keyword=${encodeURIComponent(ex.videoQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gym-accent/60 hover:text-gym-accent transition-colors"
                      title="查看动作视频"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => removeExercise(exIndex)}
                  className="text-gym-text/30 hover:text-red-400 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              {/* Set Table Header */}
              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 mb-2 text-xs text-gym-text/50 px-2">
                <span>组</span>
                <span>重量(kg)</span>
                <span>次数</span>
                <span className="w-8" />
              </div>

              {/* Sets */}
              {ex.sets.map((set, setIndex) => (
                <div key={setIndex} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center mb-1">
                  <span className="text-gym-text/60 text-xs px-2">第{setIndex + 1}组</span>
                  <input
                    type="number"
                    value={set.weight || ""}
                    onChange={(e) => updateSet(exIndex, setIndex, "weight", Number(e.target.value))}
                    className="bg-gym-dark border border-white/10 rounded-sm px-2 py-1.5 text-white text-sm w-full"
                    placeholder="0"
                    min={0}
                  />
                  <input
                    type="number"
                    value={set.reps || ""}
                    onChange={(e) => updateSet(exIndex, setIndex, "reps", Number(e.target.value))}
                    className="bg-gym-dark border border-white/10 rounded-sm px-2 py-1.5 text-white text-sm w-full"
                    placeholder="0"
                    min={0}
                  />
                  <button
                    onClick={() => removeSet(exIndex, setIndex)}
                    className="text-gym-text/30 hover:text-red-400 transition-colors p-1"
                    disabled={ex.sets.length === 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => addSet(exIndex)}
                className="mt-2 text-xs text-gym-accent/60 hover:text-gym-accent transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                添加一组
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        {exercises.length > 0 && (
          <div className="mt-8 text-center">
            <button onClick={saveWorkout} className="btn-primary px-8 py-3 text-sm flex items-center gap-2 mx-auto">
              <Save className="w-4 h-4" />
              保存训练记录
            </button>
          </div>
        )}
      </div>
    </div>
  );
}