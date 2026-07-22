import Hero from "@/components/Home/Hero";
import TrainingOverview from "@/components/Home/TrainingOverview";
import NutritionOverview from "@/components/Home/NutritionOverview";
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
      <NutritionOverview />
      <MusicOverview />
      <WaterOverview />
      <ForumOverview />
      <SleepOverview />
      <LatestArticles />
    </main>
  );
}