export interface HomeExercise {
  name: string;
  sets: number;
  reps: string;
  equipment: string;
  notes?: string;
  videoQuery?: string;
}

export interface HomeTrainingDay {
  dayName: string;
  focus: string;
  exercises: HomeExercise[];
}

export interface HomePlan {
  title: string;
  goal: '增肌' | '减脂';
  description: string;
  frequency: string;
  equipment: string;
  tips: string[];
  days: HomeTrainingDay[];
}

export const homePlans: HomePlan[] = [
  {
    title: '居家增肌训练',
    goal: '增肌',
    description: '零器械或最少器械的居家增肌方案，利用自重和家用物品实现渐进超负荷。适合无法去健身房但想增肌的人群，每周3-4练，每次30-45分钟。',
    frequency: '每周3-4天',
    equipment: '瑜伽垫、椅子（可选）、装满水的矿泉水瓶/背包负重（可选）',
    tips: [
      '增肌关键在于渐进超负荷：每周增加次数、缩短组间休息或增加负重',
      '训练前5分钟热身：开合跳+肩部绕环+深蹲徒手',
      '每组之间休息60-90秒，控制动作节奏（2秒下放，1秒发力）',
      '力竭前1-2个动作保留1-2次余量，安全第一',
      '训练后及时补充蛋白质，居家训练同样需要吃够',
    ],
    days: [
      {
        dayName: '第一天 · 上肢推+下肢',
        focus: '胸部、肩部、大腿前侧',
        exercises: [
          { name: '标准俯卧撑', sets: 4, reps: '12-15', equipment: '无', notes: '肩胛收紧，身体呈直线，下落时胸部贴近地面', videoQuery: '标准俯卧撑 标准动作 教学' },
          { name: '宽距俯卧撑', sets: 3, reps: '10-12', equipment: '无', notes: '手距比肩宽一倍，侧重刺激胸大肌外侧', videoQuery: '宽距俯卧撑 标准动作 教学' },
          { name: '椅子臂屈伸', sets: 3, reps: '10-12', equipment: '椅子', notes: '双手撑在椅面边缘，身体下降至肘部90度', videoQuery: '椅子臂屈伸 标准动作 教学' },
          { name: '自重深蹲', sets: 4, reps: '15-20', equipment: '无', notes: '膝盖与脚尖方向一致，下蹲至大腿与地面平行', videoQuery: '自重深蹲 标准动作 教学' },
          { name: '保加利亚分腿蹲', sets: 3, reps: '每腿10-12', equipment: '椅子', notes: '后脚搭在椅子上，前腿下蹲至大腿平行地面', videoQuery: '保加利亚分腿蹲 标准动作 教学' },
          { name: '提踵', sets: 3, reps: '20', equipment: '无', notes: '站在台阶边缘或平地，踮起脚尖最高点停顿1秒', videoQuery: '提踵 标准动作 教学' },
        ],
      },
      {
        dayName: '第二天 · 上肢拉+核心',
        focus: '背部、肱二头肌、核心',
        exercises: [
          { name: '桌下/门框划船', sets: 4, reps: '10-12', equipment: '桌子/门框', notes: '抓住桌沿或门框，身体后倾，拉胸向手靠近', videoQuery: '桌下/门框划船 标准动作 教学' },
          { name: '超人式', sets: 3, reps: '12-15', equipment: '无', notes: '俯卧同时抬起上下肢，感受背部发力，停顿1秒', videoQuery: '超人式 标准动作 教学' },
          { name: '自重反向划船', sets: 3, reps: '8-10', equipment: '桌子', notes: '双手撑桌沿，身体在桌下，拉胸至桌面', videoQuery: '自重反向划船 标准动作 教学' },
          { name: '平板支撑', sets: 4, reps: '30-60秒', equipment: '无', notes: '肘在肩下，身体直线，核心收紧不塌腰', videoQuery: '平板支撑 标准动作 教学' },
          { name: '仰卧卷腹', sets: 3, reps: '15-20', equipment: '无', notes: '下背部贴地，上背部离地，颈部保持中立', videoQuery: '仰卧卷腹 标准动作 教学' },
          { name: '俄罗斯转体', sets: 3, reps: '每侧15', equipment: '无', notes: '坐姿双脚离地，双手左右交替转体，可手持水瓶', videoQuery: '俄罗斯转体 标准动作 教学' },
        ],
      },
      {
        dayName: '第三天 · 下肢+肩部',
        focus: '臀部、大腿后侧、肩部',
        exercises: [
          { name: '臀桥', sets: 4, reps: '15-20', equipment: '无', notes: '仰卧屈膝，臀部发力抬起至身体呈直线，顶峰收缩', videoQuery: '臀桥 标准动作 教学' },
          { name: '单腿臀桥', sets: 3, reps: '每腿12', equipment: '无', notes: '单腿支撑，另一腿抬起，感受单侧臀部发力', videoQuery: '单腿臀桥 标准动作 教学' },
          { name: '侧弓步', sets: 3, reps: '每侧12', equipment: '无', notes: '向侧方跨一大步，屈膝下蹲，另一腿伸直', videoQuery: '侧弓步 标准动作 教学' },
          { name: '背包/水瓶推举', sets: 4, reps: '12-15', equipment: '背包/水瓶', notes: '手持负重从肩部推至头顶，控制下落速度', videoQuery: '背包/水瓶推举 标准动作 教学' },
          { name: '侧平举（水瓶）', sets: 3, reps: '12-15', equipment: '水瓶', notes: '双手持水瓶向两侧抬起至肩高，肘微屈', videoQuery: '侧平举（水瓶） 标准动作 教学' },
          { name: '面拉（弹力带）', sets: 3, reps: '12-15', equipment: '弹力带（可选）', notes: '双手拉弹力带向面部，肩胛后收，改善圆肩', videoQuery: '面拉（弹力带） 标准动作 教学' },
        ],
      },
      {
        dayName: '第四天 · 全身综合',
        focus: '全身整合+体能',
        exercises: [
          { name: '波比跳', sets: 3, reps: '8-10', equipment: '无', notes: '俯卧撑→收腿→跳起，动作连贯不中断', videoQuery: '波比跳 标准动作 教学' },
          { name: '登山者', sets: 3, reps: '30秒', equipment: '无', notes: '俯卧撑位交替提膝至胸口，核心保持稳定', videoQuery: '登山者 标准动作 教学' },
          { name: '弓步蹲走', sets: 3, reps: '每腿12', equipment: '无', notes: '向前跨步下蹲，交替前进，保持上身直立', videoQuery: '弓步蹲走 标准动作 教学' },
          { name: '钻石俯卧撑', sets: 3, reps: '8-10', equipment: '无', notes: '双手拇指食指呈钻石形，侧重肱三头肌和胸中缝', videoQuery: '钻石俯卧撑 标准动作 教学' },
          { name: '死虫式', sets: 3, reps: '每侧10', equipment: '无', notes: '仰卧对侧手脚同时伸展和收回，核心全程收紧', videoQuery: '死虫式 标准动作 教学' },
        ],
      },
    ],
  },
  {
    title: '居家减脂训练',
    goal: '减脂',
    description: '高强度间歇训练（HIIT）+ 循环训练组合，0器械全覆盖。通过短时间内高强度输出，持续燃脂24小时以上（后燃效应）。适合居家减脂，每周4-5练，每次20-30分钟。',
    frequency: '每周4-5天',
    equipment: '瑜伽垫、水杯（休息时补水）',
    tips: [
      'HIIT关键在于"高强度"：每组尽全力，组间休息不超过30秒',
      '训练前3分钟动态热身：肩部绕环+高抬腿+开合跳',
      '每动作做40秒，休息20秒，完成一轮后休息2分钟，共3-4轮',
      '减脂的核心是热量缺口，训练配合饮食控制效果翻倍',
      '训练后拉伸5分钟：大腿前侧、后侧、胸部、背部各拉伸30秒',
    ],
    days: [
      {
        dayName: '第一天 · 全身燃脂循环',
        focus: '全身爆发力+心肺',
        exercises: [
          { name: '开合跳', sets: 3, reps: '40秒', equipment: '无', notes: '手脚同步开合，保持节奏，心率拉起来', videoQuery: '开合跳 标准动作 教学' },
          { name: '深蹲跳', sets: 3, reps: '40秒', equipment: '无', notes: '深蹲到底后爆发跳起，落地缓冲', videoQuery: '深蹲跳 标准动作 教学' },
          { name: '俯卧撑', sets: 3, reps: '40秒', equipment: '无', notes: '能做多少做多少，力竭可改跪姿俯卧撑', videoQuery: '俯卧撑 标准动作 教学' },
          { name: '高抬腿', sets: 3, reps: '40秒', equipment: '无', notes: '大腿抬至与地面平行，快速交替', videoQuery: '高抬腿 标准动作 教学' },
          { name: '波比跳', sets: 3, reps: '40秒', equipment: '无', notes: 'HIIT王牌动作，全力完成', videoQuery: '波比跳 标准动作 教学' },
          { name: '平板支撑交替抬腿', sets: 3, reps: '40秒', equipment: '无', notes: '平板支撑位交替抬腿离地，核心绷紧', videoQuery: '平板支撑交替抬腿 标准动作 教学' },
        ],
      },
      {
        dayName: '第二天 · 下肢燃脂',
        focus: '臀腿+心肺',
        exercises: [
          { name: '交替弓步跳', sets: 3, reps: '40秒', equipment: '无', notes: '弓步姿势跳起交换前后腿，保持上身稳定', videoQuery: '交替弓步跳 标准动作 教学' },
          { name: '宽距深蹲', sets: 3, reps: '40秒', equipment: '无', notes: '脚距宽于肩，下蹲至大腿平行地面，全程不站直', videoQuery: '宽距深蹲 标准动作 教学' },
          { name: '侧弓步', sets: 3, reps: '40秒', equipment: '无', notes: '左右交替侧弓步，保持节奏', videoQuery: '侧弓步 标准动作 教学' },
          { name: '波比跳', sets: 3, reps: '40秒', equipment: '无', notes: '全力输出，可简化去掉俯卧撑', videoQuery: '波比跳 标准动作 教学' },
          { name: '登山者', sets: 3, reps: '40秒', equipment: '无', notes: '快速交替提膝，屁股不要抬太高', videoQuery: '登山者 标准动作 教学' },
          { name: '蝎子式', sets: 3, reps: '40秒', equipment: '无', notes: '俯卧撑位，脚后跟向对侧手方向触碰，交替进行', videoQuery: '蝎子式 标准动作 教学' },
        ],
      },
      {
        dayName: '第三天 · 核心+上肢燃脂',
        focus: '腹部+上肢耐力',
        exercises: [
          { name: '开合跳', sets: 3, reps: '40秒', equipment: '无', notes: '热身拉心率', videoQuery: '开合跳 标准动作 教学' },
          { name: '登山者', sets: 3, reps: '40秒', equipment: '无', notes: '保持核心稳定，膝尽量向胸口收', videoQuery: '登山者 标准动作 教学' },
          { name: '俯卧撑', sets: 3, reps: '40秒', equipment: '无', notes: '尽全力完成次数', videoQuery: '俯卧撑 标准动作 教学' },
          { name: '仰卧单车', sets: 3, reps: '40秒', equipment: '无', notes: '手放耳侧，对侧肘膝触碰，交替进行', videoQuery: '仰卧单车 标准动作 教学' },
          { name: '俄罗斯转体', sets: 3, reps: '40秒', equipment: '无', notes: '双脚离地，左右快速转体', videoQuery: '俄罗斯转体 标准动作 教学' },
          { name: '平板支撑', sets: 3, reps: '30秒', equipment: '无', notes: '最后一项，坚持住，核心全程收紧', videoQuery: '平板支撑 标准动作 教学' },
        ],
      },
      {
        dayName: '第四天 · 全身HIIT',
        focus: 'Tabata风格全力冲刺',
        exercises: [
          { name: '波比跳', sets: 4, reps: '20秒', equipment: '无', notes: 'Tabata模式：20秒全力，10秒休息，重复4轮', videoQuery: '波比跳 标准动作 教学' },
          { name: '深蹲跳', sets: 4, reps: '20秒', equipment: '无', notes: '20秒全力，10秒休息，重复4轮', videoQuery: '深蹲跳 标准动作 教学' },
          { name: '高抬腿', sets: 4, reps: '20秒', equipment: '无', notes: '20秒全力，10秒休息，重复4轮', videoQuery: '高抬腿 标准动作 教学' },
          { name: '俯卧撑', sets: 4, reps: '20秒', equipment: '无', notes: '20秒全力，10秒休息，重复4轮', videoQuery: '俯卧撑 标准动作 教学' },
        ],
      },
      {
        dayName: '第五天 · 低强度有氧+核心',
        focus: '积极恢复+核心稳定',
        exercises: [
          { name: '慢速开合跳', sets: 3, reps: '30秒', equipment: '无', notes: '放慢速度，保持呼吸节奏', videoQuery: '慢速开合跳 标准动作 教学' },
          { name: '平板支撑', sets: 3, reps: '45秒', equipment: '无', notes: '保持身体直线，感受核心发力', videoQuery: '平板支撑 标准动作 教学' },
          { name: '臀桥', sets: 3, reps: '15', equipment: '无', notes: '顶峰收缩2秒，感受臀部发力，慢放慢起', videoQuery: '臀桥 标准动作 教学' },
          { name: '猫牛式', sets: 3, reps: '10', equipment: '无', notes: '四足位交替弓背和塌腰，放松脊柱', videoQuery: '猫牛式 标准动作 教学' },
          { name: '鸟狗式', sets: 3, reps: '每侧8', equipment: '无', notes: '四足位对侧手脚同时伸展，核心稳定', videoQuery: '鸟狗式 标准动作 教学' },
          { name: '婴儿式放松', sets: 1, reps: '60秒', equipment: '无', notes: '跪姿身体前倾，额头贴地，双臂前伸，深呼吸', videoQuery: '婴儿式放松 标准动作 教学' },
        ],
      },
    ],
  },
];