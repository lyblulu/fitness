export interface Meal {
  meal: string;
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
  foodExamples: string[];
  image?: string;
}

export interface NutritionPlan {
  title: string;
  totalCalories: number;
  description: string;
  meals: Meal[];
  image?: string;
}

export const nutritionPlans: NutritionPlan[] = [
  {
    title: '增肌期营养方案（75kg训练者参考）',
    totalCalories: 2800,
    description: '适合75kg左右的中等强度训练者，蛋白质按2g/kg体重、碳水按4g/kg体重、脂肪按0.8g/kg体重分配。',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    meals: [
      {
        meal: '早餐（7:00-8:00）',
        carbs: 80,
        protein: 35,
        fat: 15,
        calories: 600,
        foodExamples: ['燕麦片100g', '全蛋3个', '蛋白2个', '全麦面包2片', '香蕉1根'],
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
      },
      {
        meal: '午餐（12:00-13:00）',
        carbs: 100,
        protein: 50,
        fat: 20,
        calories: 780,
        foodExamples: ['糙米/红薯200g', '鸡胸肉/牛肉200g', '西兰花/菠菜不限量', '橄榄油10ml'],
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      },
      {
        meal: '训练前加餐（16:00-17:00）',
        carbs: 40,
        protein: 20,
        fat: 5,
        calories: 285,
        foodExamples: ['香蕉1根', '全麦面包1片', '花生酱15g', '黑咖啡'],
        image: 'https://images.unsplash.com/photo-1571771894821-ce9f04e1a0b4?w=800&q=80',
      },
      {
        meal: '训练后加餐（18:30-19:00）',
        carbs: 50,
        protein: 40,
        fat: 5,
        calories: 405,
        foodExamples: ['米饭/馒头150g', '蛋白粉1.5勺', '快速吸收碳水'],
        image: 'https://images.unsplash.com/photo-1622485830050-1e0c0baf3ec6?w=800&q=80',
      },
      {
        meal: '晚餐（20:00-21:00）',
        carbs: 70,
        protein: 50,
        fat: 20,
        calories: 660,
        foodExamples: ['红薯/紫薯200g', '鱼肉/虾仁200g', '蔬菜沙拉', '亚麻籽油10ml'],
        image: 'https://images.unsplash.com/photo-1519708227418-c8dd9b85c5f8?w=800&q=80',
      },
    ],
  },
  {
    title: '减脂期营养方案（75kg训练者参考）',
    totalCalories: 2100,
    description: '适合75kg左右的减脂期训练者，保持高蛋白防止肌肉流失，碳水围绕训练时间安排。',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    meals: [
      {
        meal: '早餐（7:00-8:00）',
        carbs: 50,
        protein: 40,
        fat: 15,
        calories: 495,
        foodExamples: ['燕麦片50g', '全蛋3个', '蛋白2个', '蓝莓50g'],
        image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f1?w=800&q=80',
      },
      {
        meal: '午餐（12:00-13:00）',
        carbs: 70,
        protein: 45,
        fat: 15,
        calories: 595,
        foodExamples: ['糙米/南瓜150g', '鸡胸肉/牛肉180g', '大量蔬菜', '橄榄油5ml'],
        image: 'https://images.unsplash.com/photo-1546069901-e5f0d0a9e8c0?w=800&q=80',
      },
      {
        meal: '训练前加餐（16:00）',
        carbs: 30,
        protein: 15,
        fat: 3,
        calories: 207,
        foodExamples: ['苹果1个', '乳清蛋白1勺'],
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80',
      },
      {
        meal: '训练后加餐（17:30）',
        carbs: 40,
        protein: 35,
        fat: 5,
        calories: 345,
        foodExamples: ['白米饭100g', '无糖酸奶200g', '蜂蜜10g'],
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2c1cf?w=800&q=80',
      },
      {
        meal: '晚餐（19:30-20:00）',
        carbs: 30,
        protein: 45,
        fat: 18,
        calories: 462,
        foodExamples: ['少量红薯100g', '鱼肉/虾仁200g', '绿叶蔬菜不限量', '坚果15g'],
        image: 'https://images.unsplash.com/photo-1498837167922-d6eb29f2c2b5?w=800&q=80',
      },
    ],
  },
];