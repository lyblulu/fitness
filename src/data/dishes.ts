export interface DishNutrition {
  calories: number;
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
}

export interface Dish {
  name: string;
  category: '家常菜' | '学生党';
  description: string;
  nutrition: DishNutrition;
  ingredients: string[];
  tip: string;
}

export const dishes: Dish[] = [
  // ===== 家常菜 =====
  {
    name: '番茄炒蛋 + 米饭',
    category: '家常菜',
    description: '国民家常菜，番茄富含维生素C，鸡蛋提供优质蛋白，搭配米饭碳水资源，增肌减脂都适合。',
    nutrition: { calories: 520, protein: 28, carbs: 65, fat: 16 },
    ingredients: ['鸡蛋3个', '番茄2个', '米饭200g', '油10ml', '盐/糖少许'],
    tip: '少油少糖版本：用不粘锅炒，番茄多放，糖减半或改用代糖。',
  },
  {
    name: '青椒肉丝 + 米饭',
    category: '家常菜',
    description: '瘦肉丝提供优质蛋白和铁，青椒富含维生素C帮助铁吸收，经典下饭菜。',
    nutrition: { calories: 550, protein: 32, carbs: 65, fat: 15 },
    ingredients: ['猪瘦肉150g', '青椒3个', '米饭200g', '油10ml', '生抽/淀粉少许'],
    tip: '选里脊肉更瘦，想控制脂肪可以用鸡胸肉代替猪肉。',
  },
  {
    name: '红烧鸡腿 + 杂粮饭',
    category: '家常菜',
    description: '鸡腿肉蛋白质含量高，带皮烹制风味更佳，杂粮饭增加膳食纤维和B族维生素。',
    nutrition: { calories: 580, protein: 38, carbs: 55, fat: 18 },
    ingredients: ['鸡腿2个', '土豆1个', '杂粮米150g', '酱油/姜片/八角', '油5ml'],
    tip: '去皮后烹饪可减少约8g脂肪，热量降至480kcal左右。',
  },
  {
    name: '蒜蓉西兰花炒虾仁 + 糙米饭',
    category: '家常菜',
    description: '高蛋白低脂肪的完美搭配，虾仁蛋白质吸收率高，西兰花富含膳食纤维和抗氧化物质。',
    nutrition: { calories: 420, protein: 35, carbs: 50, fat: 8 },
    ingredients: ['虾仁150g', '西兰花200g', '糙米150g', '蒜末/油8ml', '盐/黑胡椒'],
    tip: '虾仁可以用料酒和姜腌制去腥，西兰花焯水后再炒口感更好。',
  },
  {
    name: '麻婆豆腐 + 米饭',
    category: '家常菜',
    description: '豆腐是大豆蛋白的优质来源，价格便宜，适合学生和预算有限的健身人群。',
    nutrition: { calories: 450, protein: 25, carbs: 60, fat: 12 },
    ingredients: ['嫩豆腐1盒', '猪肉末50g', '米饭200g', '豆瓣酱/花椒', '油8ml'],
    tip: '想增肌可以多加50g肉末，蛋白质冲到32g；减脂期少放油和豆瓣酱。',
  },
  {
    name: '清蒸鱼 + 红薯',
    category: '家常菜',
    description: '鱼肉蛋白吸收率高，脂肪以不饱和脂肪酸为主，红薯是低GI优质碳水。',
    nutrition: { calories: 460, protein: 36, carbs: 55, fat: 10 },
    ingredients: ['鲈鱼/草鱼200g', '红薯200g', '葱姜/蒸鱼豉油', '油5ml'],
    tip: '清蒸是最健康的烹饪方式，鱼肉不要蒸太久，8-10分钟即可。',
  },
  {
    name: '土豆炖牛肉 + 米饭',
    category: '家常菜',
    description: '牛肉富含肌酸和铁，土豆提供缓释碳水，适合训练日作为正餐，能量持久。',
    nutrition: { calories: 620, protein: 40, carbs: 60, fat: 20 },
    ingredients: ['牛腩150g', '土豆1个', '胡萝卜1根', '米饭150g', '酱油/八角'],
    tip: '牛腩脂肪较高，可以选牛腱子肉代替，脂肪减少约一半。',
  },
  {
    name: '鸡蛋炒饭（健身版）',
    category: '家常菜',
    description: '隔夜米饭搭配鸡蛋、蔬菜和瘦肉，一锅出省时省力，营养均衡。',
    nutrition: { calories: 530, protein: 30, carbs: 65, fat: 14 },
    ingredients: ['米饭200g', '鸡蛋2个', '鸡胸肉50g', '胡萝卜/青豆', '油8ml'],
    tip: '用糙米饭代替白米饭，加一把青豆和玉米粒，维生素和纤维更丰富。',
  },
  // ===== 学生党 =====
  {
    name: '牛肉汉堡（非油炸）',
    category: '学生党',
    description: '汉堡不等于垃圾食品！去掉酱料和芝士，牛肉饼本身是优秀的高蛋白来源。',
    nutrition: { calories: 480, protein: 32, carbs: 45, fat: 16 },
    ingredients: ['汉堡胚1个', '牛肉饼100g', '生菜/番茄片', '酸黄瓜', '番茄酱少量'],
    tip: '避雷：不要点双层芝士和炸鸡汉堡，不要额外加蛋黄酱/沙拉酱。选单层牛肉汉堡，去掉一片面包胚可再减100kcal。',
  },
  {
    name: '鸡腿饭（食堂版）',
    category: '学生党',
    description: '大学食堂最常见的搭配，只要选对部位和做法，就是不错的一餐。',
    nutrition: { calories: 550, protein: 35, carbs: 65, fat: 14 },
    ingredients: ['琵琶腿1个', '米饭200g', '青菜1份', '卤汁少量'],
    tip: '避雷：不要选炸鸡腿、糖醋里脊、红烧肉。选卤鸡腿/蒸鸡腿，青菜多打一份，米饭吃一半留一半。',
  },
  {
    name: '牛肉面/拉面（清汤版）',
    category: '学生党',
    description: '面食是学生党的主食主力，清汤牛肉面搭配牛肉和青菜，碳水和蛋白兼备。',
    nutrition: { calories: 520, protein: 28, carbs: 72, fat: 12 },
    ingredients: ['面条200g', '牛肉片80g', '青菜/葱花', '清汤底', '辣椒油少许'],
    tip: '避雷：不要喝汤底（高盐高脂），不要点红烧牛肉面（油大）。加一份牛肉/卤蛋，蛋白质拉到35g+。',
  },
  {
    name: '全麦鸡胸三明治',
    category: '学生党',
    description: '便利店或烘焙店可买，全麦面包+鸡胸肉+蔬菜，优质碳水和蛋白的组合。',
    nutrition: { calories: 400, protein: 30, carbs: 42, fat: 10 },
    ingredients: ['全麦面包2片', '鸡胸肉100g', '生菜/番茄', '低脂沙拉酱', '煎蛋1个'],
    tip: '避雷：不要买白面包版本，不要加培根和芝士片。便利店选标注"全麦"的，搭配一杯无糖豆浆。',
  },
  {
    name: '麻辣烫（清汤版）',
    category: '学生党',
    description: '麻辣烫是学生党的隐藏健身餐！选对食材和汤底，就是完美的减脂增肌餐。',
    nutrition: { calories: 450, protein: 32, carbs: 45, fat: 14 },
    ingredients: ['牛肉片/鸡胸肉', '豆腐/豆皮', '各种蔬菜', '魔芋丝', '清汤底'],
    tip: '避雷：不要选丸子类（淀粉多）、方便面、油条。汤底选清汤/番茄汤，不要麻酱和辣油。推荐食材：牛肉、鸡蛋、豆腐、蔬菜、魔芋丝。',
  },
  {
    name: '饺子/馄饨（蒸煮版）',
    category: '学生党',
    description: '饺子皮是碳水，馅料提供蛋白和脂肪，一餐吃10-12个，营养均衡方便快捷。',
    nutrition: { calories: 480, protein: 26, carbs: 55, fat: 16 },
    ingredients: ['饺子12个', '醋/生抽蘸料', '青菜1份'],
    tip: '避雷：不要煎饺/锅贴（油大），不要买速冻猪肉饺（肥肉多）。推荐：韭菜鸡蛋饺、鲜虾馄饨、牛肉芹菜饺。',
  },
  {
    name: '杂粮煎饼（去薄脆）',
    category: '学生党',
    description: '路边摊杂粮煎饼去掉薄脆就是不错的一餐，杂粮面糊提供缓释碳水，鸡蛋提供蛋白。',
    nutrition: { calories: 380, protein: 18, carbs: 50, fat: 12 },
    ingredients: ['杂粮面糊', '鸡蛋2个', '生菜', '少量酱料'],
    tip: '避雷：一定要去薄脆（油炸的），酱料少刷。加一个鸡蛋和一份鸡胸肉/里脊，蛋白质拉到30g+。',
  },
  {
    name: '螺蛳粉（少油版）',
    category: '学生党',
    description: '螺蛳粉虽然碳水偏高，但偶尔吃一次也问题不大，关键是控制调料和配料。',
    nutrition: { calories: 550, protein: 20, carbs: 75, fat: 18 },
    ingredients: ['米粉150g', '螺蛳肉/腐竹', '酸笋/木耳', '青菜', '辣油减半'],
    tip: '避雷：辣油只放1/3，腐竹少吃（油炸的），多加一份青菜和一个鸡蛋/豆腐泡，平衡营养。',
  },
  // ===== 新增米面主食类 =====
  {
    name: '蛋炒饭（普通版）',
    category: '家常菜',
    description: '最家常的蛋炒饭，鸡蛋提供优质蛋白，米饭提供碳水，加一把葱花就是经典。适合训练日快速补充能量。',
    nutrition: { calories: 550, protein: 22, carbs: 72, fat: 18 },
    ingredients: ['米饭250g', '鸡蛋2个', '葱花', '油12ml', '盐少许'],
    tip: '想增肌可以加50g鸡胸肉丁或虾仁，蛋白质拉到30g+。减脂期用隔夜饭炒（抗性淀粉更多），油减半。',
  },
  {
    name: '扬州炒饭',
    category: '家常菜',
    description: '经典中式炒饭，火腿、虾仁、鸡蛋、青豆搭配，食材丰富，碳蛋脂均衡。',
    nutrition: { calories: 580, protein: 26, carbs: 70, fat: 20 },
    ingredients: ['米饭250g', '虾仁30g', '火腿丁30g', '鸡蛋1个', '青豆/胡萝卜', '油12ml'],
    tip: '火腿可换成鸡胸肉丁，减少钠摄入。虾仁可以多加，蛋白质更高。',
  },
  {
    name: '炒河粉（瘦肉版）',
    category: '学生党',
    description: '河粉是广东经典主食，搭配瘦肉和蔬菜，一餐搞定碳水和蛋白。街头小吃也能吃出健身餐。',
    nutrition: { calories: 520, protein: 24, carbs: 68, fat: 16 },
    ingredients: ['河粉250g', '猪瘦肉80g', '豆芽/韭菜', '生抽', '油10ml'],
    tip: '避雷：不要点干炒牛河（油太大），选瘦肉版。可以加一份鸡蛋，蛋白质拉到30g+。',
  },
  {
    name: '炒米粉（三丝版）',
    category: '学生党',
    description: '米粉比面条热量低，搭配瘦肉丝、胡萝卜丝、豆芽，口感丰富，碳水质优。',
    nutrition: { calories: 460, protein: 22, carbs: 62, fat: 14 },
    ingredients: ['米粉200g', '猪瘦肉50g', '胡萝卜丝', '豆芽', '油8ml'],
    tip: '避雷：不要加太多油和酱油。加一个煎蛋或鸡胸肉丝，蛋白质拉到28g+。',
  },
  {
    name: '炒面（瘦肉炒面）',
    category: '学生党',
    description: '面条是学生党最常见的主食，搭配瘦肉和蔬菜，比纯素面营养均衡很多。',
    nutrition: { calories: 540, protein: 24, carbs: 72, fat: 16 },
    ingredients: ['面条200g', '猪瘦肉80g', '包菜/胡萝卜', '生抽', '油10ml'],
    tip: '避雷：不要点炒面时加太多油。选瘦肉炒面，不要肥肉炒面。加一份卤蛋，蛋白质拉到30g+。',
  },
  {
    name: '炒意面（鸡胸肉版）',
    category: '家常菜',
    description: '意面是低GI碳水，鸡胸肉高蛋白低脂肪，搭配番茄酱和蔬菜，健身餐标准搭配。',
    nutrition: { calories: 500, protein: 32, carbs: 60, fat: 12 },
    ingredients: ['意面150g', '鸡胸肉100g', '番茄酱', '洋葱/青椒', '油8ml'],
    tip: '选全麦意面GI更低，鸡胸肉可以提前腌制更嫩。番茄酱选无糖版本，热量更低。',
  },
  {
    name: '炒乌冬面（牛肉版）',
    category: '学生党',
    description: '乌冬面口感Q弹，牛肉提供铁和肌酸，搭配蔬菜一锅出，适合训练日正餐。',
    nutrition: { calories: 560, protein: 28, carbs: 68, fat: 16 },
    ingredients: ['乌冬面200g', '牛肉片80g', '洋葱/青椒', '生抽', '油10ml'],
    tip: '避雷：不要加太多炒面酱/蚝油（钠含量高）。牛肉选瘦的，不要肥牛卷。',
  },
  {
    name: '炒饭（加蛋加肉版）',
    category: '学生党',
    description: '食堂或路边摊最常见的炒饭，加蛋加肉后蛋白和碳水的比例更均衡，比纯蛋炒饭营养好。',
    nutrition: { calories: 580, protein: 28, carbs: 70, fat: 20 },
    ingredients: ['米饭250g', '鸡蛋1个', '瘦肉丁50g', '青菜碎', '油12ml'],
    tip: '避雷：让老板少油少盐，不要加火腿肠（淀粉多）。加一份煎蛋，蛋白质拉到33g+。',
  },
];