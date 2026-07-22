import { useState } from "react";
import { Beef, Wheat, Flame, Target, Ruler, Weight, Calculator, ArrowRight, RefreshCw, UtensilsCrossed } from "lucide-react";
import { dishes } from "@/data/dishes";

type Goal = "增肌" | "减脂";
type Activity = "久坐" | "轻度" | "中等" | "活跃" | "高强度";

const activityMultipliers: Record<Activity, number> = {
  "久坐": 1.2,
  "轻度": 1.375,
  "中等": 1.55,
  "活跃": 1.725,
  "高强度": 1.9,
};

interface Result {
  bmi: number;
  bmiLabel: string;
  tdee: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tips: string[];
}

function calcBMR(weight: number, height: number, age: number): number {
  return 10 * weight + 6.25 * height - 5 * age + 5;
}

function getBMILabel(bmi: number): string {
  if (bmi < 18.5) return "偏瘦";
  if (bmi < 24) return "正常";
  if (bmi < 27) return "超重";
  return "肥胖";
}

function calculate(weight: number, height: number, age: number, goal: Goal, activity: Activity): Result | null {
  if (!weight || !height || weight < 20 || weight > 200 || height < 100 || height > 250) return null;

  const bmi = Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
  const bmiLabel = getBMILabel(bmi);
  const bmr = calcBMR(weight, height, age);
  const tdee = Math.round(bmr * activityMultipliers[activity]);
  const calGoal = goal === "增肌" ? tdee + 300 : tdee - 500;
  const calories = Math.max(calGoal, 1400);

  let protein: number, carbs: number, fat: number;

  if (goal === "增肌") {
    protein = Math.round(weight * 2.0);
    carbs = Math.round(weight * 5.5);
    fat = Math.round(weight * 1.0);
  } else {
    protein = Math.round(weight * 2.0);
    carbs = Math.round(weight * 2.5);
    fat = Math.round(weight * 0.8);
  }

  const tips: string[] = [];
  if (goal === "增肌") {
    if (bmi < 18.5) tips.push("你的BMI偏瘦，增肌是第一目标，不要害怕吃碳水，热量盈余要保证");
    else tips.push("你的BMI正常，增肌同时控制脂肪摄入，避免增脂过多");
    tips.push("蛋白质按2g/kg摄入，每餐分配25-30g，分4-5餐吃");
    tips.push("碳水是增肌的关键，训练前后各安排一顿高碳水餐");
    tips.push("建议每周增重0.3-0.5kg，太快容易长脂肪");
    tips.push("训练后30分钟内补充碳水和蛋白，吸收效率最高");
  } else {
    if (bmi >= 27) tips.push("你的BMI偏高，建议先减脂再增肌，注意保护关节");
    else if (bmi >= 24) tips.push("你的BMI超重，减脂同时要保住肌肉，蛋白质一定吃够");
    else tips.push("你的BMI正常，减脂期注意保留肌肉，不要节食");
    tips.push("蛋白质按2g/kg摄入，高蛋白防掉肌肉、增加饱腹感");
    tips.push("碳水集中在训练前后吃，其他时间多吃蔬菜代替");
    tips.push("建议每周减重0.5-1kg，太快容易反弹和掉肌肉");
    tips.push("睡前3小时尽量不进食，实在饿可以吃黄瓜/蛋清");
  }

  return { bmi, bmiLabel, tdee, calories, protein, carbs, fat, tips };
}

export default function MacroCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("25");
  const [goal, setGoal] = useState<Goal>("增肌");
  const [activity, setActivity] = useState<Activity>("中等");
  const [result, setResult] = useState<Result | null>(null);
  const [calculated, setCalculated] = useState(false);

  const handleCalc = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age) || 25;
    const r = calculate(w, h, a, goal, activity);
    setResult(r);
    setCalculated(true);
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">营养素计算器</h2>
          </div>
          <p className="section-subtitle mx-auto">
            输入你的身高体重，立刻算出每天该吃多少蛋白质和碳水
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="glass-card p-6 md:p-8">
              <h3 className="font-display text-xl text-white tracking-wider mb-6">输入你的数据</h3>

              <div className="space-y-5">
                {/* Weight */}
                <div>
                  <label className="flex items-center gap-2 text-gym-text/70 text-sm mb-2">
                    <Weight className="w-4 h-4 text-gym-accent" />
                    体重
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="例如 70"
                      className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-lg text-white font-display focus:outline-none focus:border-gym-accent/50 transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gym-muted text-sm">kg</span>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="flex items-center gap-2 text-gym-text/70 text-sm mb-2">
                    <Ruler className="w-4 h-4 text-gym-accent" />
                    身高
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="例如 170"
                      className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-lg text-white font-display focus:outline-none focus:border-gym-accent/50 transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gym-muted text-sm">cm</span>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="flex items-center gap-2 text-gym-text/70 text-sm mb-2">
                    <RefreshCw className="w-4 h-4 text-gym-accent" />
                    年龄
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-lg text-white font-display focus:outline-none focus:border-gym-accent/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Goal */}
                <div>
                  <label className="flex items-center gap-2 text-gym-text/70 text-sm mb-2">
                    <Target className="w-4 h-4 text-gym-accent" />
                    训练目标
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGoal("增肌")}
                      className={`py-3 font-display text-sm uppercase tracking-wider rounded-sm transition-all ${
                        goal === "增肌"
                          ? "bg-gym-accent text-white"
                          : "bg-gym-card text-gym-text/60 border border-white/5 hover:text-white"
                      }`}
                    >
                      增肌
                    </button>
                    <button
                      onClick={() => setGoal("减脂")}
                      className={`py-3 font-display text-sm uppercase tracking-wider rounded-sm transition-all ${
                        goal === "减脂"
                          ? "bg-gym-accent text-white"
                          : "bg-gym-card text-gym-text/60 border border-white/5 hover:text-white"
                      }`}
                    >
                      减脂
                    </button>
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <label className="flex items-center gap-2 text-gym-text/70 text-sm mb-2">
                    <Flame className="w-4 h-4 text-gym-accent" />
                    日常活动量
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {(["久坐", "轻度", "中等", "活跃", "高强度"] as Activity[]).map((a) => (
                      <button
                        key={a}
                        onClick={() => setActivity(a)}
                        className={`py-2 text-xs font-display uppercase tracking-wider rounded-sm transition-all ${
                          activity === a
                            ? "bg-gym-accent text-white"
                            : "bg-gym-card text-gym-text/60 border border-white/5 hover:text-white"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                  <p className="text-gym-muted text-xs mt-1">
                    {activity === "久坐" && "几乎不运动，办公室工作"}
                    {activity === "轻度" && "每周1-3次训练"}
                    {activity === "中等" && "每周3-5次训练"}
                    {activity === "活跃" && "每周6-7次训练"}
                    {activity === "高强度" && "每天高强度训练或体力劳动"}
                  </p>
                </div>

                {/* Calculate button */}
                <button
                  onClick={handleCalc}
                  disabled={!weight || !height}
                  className="w-full btn-primary py-3 text-sm inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Calculator className="w-4 h-4" />
                  计算我的营养需求
                </button>
              </div>
            </div>

            {/* Results */}
            <div>
              {!calculated ? (
                <div className="glass-card p-6 md:p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Calculator className="w-16 h-16 text-gym-muted/20 mx-auto mb-4" />
                    <p className="text-gym-muted text-sm">输入左侧数据，点击计算</p>
                    <p className="text-gym-muted/50 text-xs mt-2">即可看到你的每日营养需求</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {/* BMI & Basic info */}
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-lg text-white tracking-wider">你的身体数据</h3>
                      <span className={`text-xs font-display uppercase tracking-wider px-3 py-1 rounded-sm ${
                        result.bmiLabel === "偏瘦" ? "bg-blue-500/10 text-blue-400" :
                        result.bmiLabel === "正常" ? "bg-green-500/10 text-green-400" :
                        result.bmiLabel === "超重" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-red-500/10 text-red-400"
                      }`}>
                        BMI {result.bmiLabel}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-display text-white">{weight}<span className="text-sm text-gym-muted">kg</span></p>
                        <p className="text-gym-muted text-xs">体重</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-display text-white">{height}<span className="text-sm text-gym-muted">cm</span></p>
                        <p className="text-gym-muted text-xs">身高</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-display text-white">{result.bmi}</p>
                        <p className="text-gym-muted text-xs">BMI</p>
                      </div>
                    </div>
                  </div>

                  {/* Macro results */}
                  <div className="glass-card p-6 md:p-8">
                    <p className="text-gym-muted text-xs uppercase tracking-wider mb-1">每日推荐摄入</p>
                    <p className="text-3xl md:text-4xl font-display text-white mb-6">
                      {result.calories}
                      <span className="text-base text-gym-text/40 ml-2">kcal</span>
                    </p>

                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      <div className="bg-gym-dark/50 rounded-sm p-4 text-center border border-gym-accent/10">
                        <Beef className="w-5 h-5 text-gym-accent mx-auto mb-2" />
                        <p className="text-2xl font-display text-white">{result.protein}g</p>
                        <p className="text-gym-muted text-xs">蛋白质</p>
                        <p className="text-gym-text/40 text-xs mt-1">{result.protein * 4}kcal</p>
                      </div>
                      <div className="bg-gym-dark/50 rounded-sm p-4 text-center border border-gym-gold/10">
                        <Wheat className="w-5 h-5 text-gym-gold mx-auto mb-2" />
                        <p className="text-2xl font-display text-white">{result.carbs}g</p>
                        <p className="text-gym-muted text-xs">碳水</p>
                        <p className="text-gym-text/40 text-xs mt-1">{result.carbs * 4}kcal</p>
                      </div>
                      <div className="bg-gym-dark/50 rounded-sm p-4 text-center border border-white/5">
                        <Flame className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                        <p className="text-2xl font-display text-white">{result.fat}g</p>
                        <p className="text-gym-muted text-xs">脂肪</p>
                        <p className="text-gym-text/40 text-xs mt-1">{result.fat * 9}kcal</p>
                      </div>
                    </div>

                    {/* Per kg */}
                    <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-white/5">
                      <div className="text-center">
                        <p className="text-lg font-display text-gym-accent">{result.protein / parseFloat(weight)}g</p>
                        <p className="text-gym-muted text-xs">蛋白/kg</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-display text-gym-gold">{result.carbs / parseFloat(weight)}g</p>
                        <p className="text-gym-muted text-xs">碳水/kg</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-display text-orange-400">{result.fat / parseFloat(weight)}g</p>
                        <p className="text-gym-muted text-xs">脂肪/kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="glass-card p-6">
                    <h3 className="text-white font-semibold text-sm mb-4">
                      {goal === "增肌" ? "💪 增肌建议" : "🔥 减脂建议"}
                    </h3>
                    <div className="space-y-2.5">
                      {result.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <ArrowRight className="w-3.5 h-3.5 text-gym-accent shrink-0 mt-0.5" />
                          <p className="text-gym-text/70 text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended dishes */}
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <UtensilsCrossed className="w-4 h-4 text-gym-accent" />
                      <h3 className="text-white font-semibold text-sm">
                        {goal === "增肌" ? "推荐你吃的菜肴" : "推荐你吃的菜肴"}
                      </h3>
                    </div>
                    <p className="text-gym-muted text-xs mb-4">
                      {goal === "增肌"
                        ? "以下菜肴蛋白质含量高，适合增肌期食用"
                        : "以下菜肴热量控制好、蛋白高，适合减脂期食用"}
                    </p>
                    <div className="space-y-3">
                      {dishes
                        .filter((d) => goal === "增肌" ? d.nutrition.protein >= 25 : d.nutrition.calories <= 500)
                        .sort((a, b) => goal === "增肌"
                          ? b.nutrition.protein - a.nutrition.protein
                          : a.nutrition.calories - b.nutrition.calories
                        )
                        .slice(0, 5)
                        .map((dish, i) => (
                          <div key={dish.name} className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0">
                            <span className="text-gym-muted text-xs font-mono w-4 shrink-0">{i + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-semibold truncate">{dish.name}</p>
                              <p className="text-gym-muted text-xs">{dish.category}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 text-xs">
                              <span className="text-gym-accent">{dish.nutrition.protein}g蛋白</span>
                              <span className="text-gym-gold">{dish.nutrition.carbs}g碳水</span>
                              <span className="text-gym-text/60">{dish.nutrition.calories}kcal</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-6 md:p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gym-muted text-sm">请输入有效的身高体重</p>
                    <p className="text-gym-muted/50 text-xs mt-2">体重范围 20-200kg，身高范围 100-250cm</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}