import Hero from "@/components/Home/Hero";
import TrainingOverview from "@/components/Home/TrainingOverview";
import MacroCalculator from "@/components/Nutrition/MacroCalculator";
import MusicOverview from "@/components/Home/MusicOverview";
import WaterOverview from "@/components/Home/WaterOverview";
import ForumOverview from "@/components/Home/ForumOverview";
import SleepOverview from "@/components/Home/SleepOverview";
import LatestArticles from "@/components/Home/LatestArticles";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrainingOverview />
      <MacroCalculator />
      <MusicOverview />
      <WaterOverview />
      <ForumOverview />
      <SleepOverview />
      <LatestArticles />
    </main>
  );
}