import { useState } from "react";
import { Play } from "lucide-react";
import { bodyPartExercises } from "@/data/training";

export default function ExerciseLibrary() {
  const [activePart, setActivePart] = useState(0);
  const currentPart = bodyPartExercises[activePart];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">训练动作库</h2>
          <p className="section-subtitle mx-auto">
            按部位分类查看训练动作，掌握标准动作要领
          </p>
        </div>

        {/* Body Part Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {bodyPartExercises.map((part, index) => (
            <button
              key={part.bodyPart}
              onClick={() => setActivePart(index)}
              className={`px-6 py-2 font-display text-base uppercase tracking-wider transition-all duration-300 rounded-sm ${
                activePart === index
                  ? "bg-gym-accent text-white"
                  : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
              }`}
            >
              {part.bodyPart}
            </button>
          ))}
        </div>

        {/* Exercises */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8">
            <h3 className="font-display text-2xl text-white tracking-wider mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gym-accent" />
              {currentPart.bodyPart}部训练
              <span className="w-8 h-0.5 bg-gym-accent" />
            </h3>
            <div className="space-y-4">
              {currentPart.exercises.map((exercise, i) => (
                <div key={exercise.name} className="flex items-center justify-between p-4 bg-gym-dark/50 rounded-sm border border-white/5 group">
                  <div className="flex items-center gap-4">
                    <span className="text-gym-accent font-display text-lg">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-white font-semibold">{exercise.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gym-text/60 text-sm font-mono">{exercise.sets}组 &times; {exercise.reps}次</span>
                    {exercise.videoQuery && (
                      <a
                        href={`https://search.bilibili.com/all?keyword=${encodeURIComponent(exercise.videoQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-gym-accent hover:text-gym-accent/80 transition-all"
                        title="观看演示视频"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}