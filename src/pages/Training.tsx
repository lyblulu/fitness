import TrainingPhilosophy from "@/components/Training/TrainingPhilosophy";
import SplitPlan from "@/components/Training/SplitPlan";
import HomeTraining from "@/components/Training/HomeTraining";
import ExerciseLibrary from "@/components/Training/ExerciseLibrary";
import OneRepMax from "@/components/Training/OneRepMax";

export default function Training() {
  return (
    <main>
      <div className="h-20" /> {/* Spacer for fixed header */}
      <TrainingPhilosophy />
      <SplitPlan />
      <HomeTraining />
      <ExerciseLibrary />
      <OneRepMax />
    </main>
  );
}