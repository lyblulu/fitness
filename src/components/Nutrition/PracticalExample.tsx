import { useState } from "react";
import { Beef, Wheat, Flame, Target, Ruler, Weight, Calculator, ArrowRight } from "lucide-react";

interface ExampleData {
  title: string;
  goal: string;
  weight: number;
  height: number;
  bmi: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tips: string[];
}

const examples: ExampleData[] = [
  {
    title: "增肌方案",
    goal: "热量盈余 · 高碳水",
    weight: 50,
    height: 170,
    bmi: 17.3,
    calories: 2200,
    protein: 100,
    carbs: 300,
    fat: 50,
    tips: [
      "你的BMI偏瘦，增肌是第一目标，不要害怕吃碳水",
      "蛋白质按2g/kg计算，每餐分配约25-30g，容易吸收",
      "碳水是增肌的关键，训练前后各吃一顿高碳水餐",
      "建议每周增重0.3-0.5kg，太快容易长脂肪",
      "训练后30分钟内补充碳水和蛋白，吸收效率最高",
    ],
  },
  {
    title: "减脂方案",
    goal: "热量缺口 · 高蛋白",
    weight: 75,
    height: 170,
    bmi: 25.9,
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 55,
    tips: [
      "你的BMI处于超重区间，减脂同时要保住肌肉",
      "蛋白质按2g/kg体重计算，高蛋白防掉肌肉、增加饱腹感",
      "碳水集中在训练前后吃，其他时间多吃蔬菜",
      "建议每周减重0.5-1kg，太快容易反弹和掉肌肉",
      "睡前3小时尽量不吃饭，实在饿可以吃黄瓜/蛋清",
    ],
  },
];

export default function PracticalExample() {
  const [active, setActive] = useState(0);
  const data = examples[active];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">实际案例计算</h2>
          </div>
          <p className="section-subtitle mx-auto">
            根据体重和训练目标，算算你每天该吃多少蛋白质和碳水
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-4 mb-12">
          {examples.map((e, i) => (
            <button
              key={e.title}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-8 py-3 font-display text-lg uppercase tracking-wider transition-all duration-300 rounded-sm ${
                active === i
                  ? "bg-gym-accent text-white"
                  : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
              }`}
            >
              {i === 0 ? <Target className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
              {e.title}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Basic info */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-white tracking-wider">{data.title}</h3>
              <span className="text-xs bg-gym-accent/20 text-gym-accent px-3 py-1 rounded-sm uppercase tracking-wider">
                {data.goal}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Weight className="w-4 h-4 text-gym-accent" />
                </div>
                <p className="text-2xl md:text-3xl font-display text-white">{data.weight}<span className="text-sm text-gym-muted">kg</span></p>
                <p className="text-gym-muted text-xs">体重</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Ruler className="w-4 h-4 text-gym-accent" />
                </div>
                <p className="text-2xl md:text-3xl font-display text-white">{data.height}<span className="text-sm text-gym-muted">cm</span></p>
                <p className="text-gym-muted text-xs">身高</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Calculator className="w-4 h-4 text-gym-accent" />
                </div>
                <p className="text-2xl md:text-3xl font-display text-white">{data.bmi}</p>
                <p className="text-gym-muted text-xs">BMI</p>
              </div>
            </div>
          </div>

          {/* Macro result */}
          <div className="glass-card p-8 md:p-10 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.03]">
              <Target className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <p className="text-gym-muted text-xs uppercase tracking-wider mb-1">每日推荐摄入</p>
              <p className="text-4xl md:text-5xl font-display text-white mb-8">
                {data.calories}
                <span className="text-lg text-gym-text/40 ml-2">kcal</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gym-dark/50 rounded-sm p-5 text-center border border-gym-accent/10">
                  <Beef className="w-6 h-6 text-gym-accent mx-auto mb-2" />
                  <p className="text-3xl font-display text-white">{data.protein}g</p>
                  <p className="text-gym-muted text-xs mb-2">蛋白质</p>
                  <p className="text-gym-text/40 text-xs">
                    {data.protein * 4}kcal / {Math.round((data.protein * 4 / data.calories) * 100)}%
                  </p>
                </div>
                <div className="bg-gym-dark/50 rounded-sm p-5 text-center border border-gym-gold/10">
                  <Wheat className="w-6 h-6 text-gym-gold mx-auto mb-2" />
                  <p className="text-3xl font-display text-white">{data.carbs}g</p>
                  <p className="text-gym-muted text-xs mb-2">碳水</p>
                  <p className="text-gym-text/40 text-xs">
                    {data.carbs * 4}kcal / {Math.round((data.carbs * 4 / data.calories) * 100)}%
                  </p>
                </div>
                <div className="bg-gym-dark/50 rounded-sm p-5 text-center border border-white/5">
                  <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-3xl font-display text-white">{data.fat}g</p>
                  <p className="text-gym-muted text-xs mb-2">脂肪</p>
                  <p className="text-gym-text/40 text-xs">
                    {data.fat * 9}kcal / {Math.round((data.fat * 9 / data.calories) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Per kg breakdown */}
          <div className="glass-card p-6 mb-8">
            <h3 className="text-white font-semibold text-sm mb-4">按每公斤体重计算</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-display text-gym-accent">{data.protein / data.weight}g</p>
                <p className="text-gym-muted text-xs">蛋白质 / kg</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-display text-gym-gold">{data.carbs / data.weight}g</p>
                <p className="text-gym-muted text-xs">碳水 / kg</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-display text-orange-400">{data.fat / data.weight}g</p>
                <p className="text-gym-muted text-xs">脂肪 / kg</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold text-sm mb-4">给{data.title === "增肌方案" ? "瘦子" : "减脂者"}的建议</h3>
            <div className="space-y-3">
              {data.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-gym-accent shrink-0 mt-0.5" />
                  <p className="text-gym-text/70 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}