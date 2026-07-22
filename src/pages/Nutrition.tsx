import NutritionPrinciples from "@/components/Nutrition/NutritionPrinciples";
import MacroDistribution from "@/components/Nutrition/MacroDistribution";
import MealPlan from "@/components/Nutrition/MealPlan";
import DishRecommendations from "@/components/Nutrition/DishRecommendations";
import MacroCalculator from "@/components/Nutrition/MacroCalculator";

export default function Nutrition() {
  return (
    <main>
      <div className="h-20" /> {/* Spacer for fixed header */}
      <NutritionPrinciples />
      <MacroDistribution />
      <MealPlan />
      <DishRecommendations />
      <MacroCalculator />
    </main>
  );
}