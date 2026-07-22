export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
  videoQuery?: string;
}

export interface TrainingDay {
  dayName: string;
  bodyParts: string[];
  exercises: Exercise[];
}

export interface SplitPlan {
  type: '二分化' | '三分化' | '四分化' | '五分化' | '减脂';
  description: string;
  days: TrainingDay[];
}

export interface BodyPartExercise {
  bodyPart: string;
  exercises: Exercise[];
}

export const splitPlans: SplitPlan[] = [
  {
    type: '二分化',
    description: '上下肢二分化训练是最经典的入门分化方案，每周训练4天，每个部位每周训练2次。适合没有太多空余时间但又想保持健康身体的人群，高效实用。',
    days: [
      {
        dayName: '上肢日（胸部+背部+肩部+手臂）',
        bodyParts: ['胸', '背', '肩', '肱二头', '肱三头'],
        exercises: [
          { name: '杠铃平板卧推', sets: 4, reps: '8-12', notes: '上肢日的核心推力动作', videoQuery: '杠铃平板卧推标准动作教学' },
          { name: '杠铃划船', sets: 4, reps: '8-12', notes: '保持背部挺直', videoQuery: '杠铃划船正确姿势' },
          { name: '杠铃站姿推举', sets: 3, reps: '8-12', videoQuery: '杠铃站姿推举教学' },
          { name: '高位下拉', sets: 3, reps: '10-12', videoQuery: '高位下拉标准动作' },
          { name: '杠铃弯举（肱二头）', sets: 3, reps: '10-12', videoQuery: '杠铃弯举标准动作' },
          { name: '绳索下压（肱三头）', sets: 3, reps: '10-15', videoQuery: '绳索下压肱三头肌训练' },
        ],
      },
      {
        dayName: '下肢日（股四头+腘绳肌+臀部+小腿+腹部）',
        bodyParts: ['腿部', '腹'],
        exercises: [
          { name: '杠铃深蹲', sets: 4, reps: '8-10', notes: '核心动作，深度至大腿平行地面', videoQuery: '杠铃深蹲标准动作教学' },
          { name: '罗马尼亚硬拉', sets: 4, reps: '8-12', videoQuery: '罗马尼亚硬拉正确姿势' },
          { name: '腿举', sets: 3, reps: '10-12', videoQuery: '腿举标准动作' },
          { name: '腿弯举', sets: 3, reps: '12-15', videoQuery: '腿弯举正确姿势' },
          { name: '站姿提踵', sets: 4, reps: '15-20', videoQuery: '站姿提踵训练' },
          { name: '悬垂举腿（腹部）', sets: 3, reps: '15-20', videoQuery: '悬垂举腿正确做法' },
        ],
      },
    ],
  },
  {
    type: '三分化',
    description: '推/拉/腿三分化训练是经典的训练频率优化方案，每周训练6天，每个部位每周训练2次。适合学生党等时间相对充裕、追求高效进步的训练者。',
    days: [
      {
        dayName: '推日（胸部+肩部+肱三头）',
        bodyParts: ['胸', '肩', '肱三头'],
        exercises: [
          { name: '杠铃平板卧推', sets: 4, reps: '8-12', notes: '全程控制，感受胸肌收缩', videoQuery: '杠铃平板卧推标准动作教学' },
          { name: '上斜哑铃卧推', sets: 4, reps: '8-12', videoQuery: '上斜哑铃卧推正确姿势' },
          { name: '哑铃飞鸟', sets: 3, reps: '12-15', videoQuery: '哑铃飞鸟标准动作' },
          { name: '杠铃站姿推举', sets: 4, reps: '8-12', notes: '核心收紧，避免腰部代偿', videoQuery: '杠铃站姿推举教学' },
          { name: '哑铃侧平举', sets: 4, reps: '12-15', videoQuery: '哑铃侧平举正确做法' },
          { name: '绳索下压（肱三头）', sets: 4, reps: '10-15', videoQuery: '绳索下压肱三头肌训练' },
        ],
      },
      {
        dayName: '拉日（背部+肱二头）',
        bodyParts: ['背', '肱二头'],
        exercises: [
          { name: '引体向上', sets: 4, reps: '力竭', notes: '可采用负重或辅助', videoQuery: '引体向上标准动作教学' },
          { name: '杠铃划船', sets: 4, reps: '8-12', notes: '保持背部挺直', videoQuery: '杠铃划船正确姿势' },
          { name: '高位下拉', sets: 4, reps: '10-12', videoQuery: '高位下拉标准动作' },
          { name: '坐姿绳索划船', sets: 3, reps: '12-15', videoQuery: '坐姿绳索划船教学' },
          { name: '杠铃弯举（肱二头）', sets: 4, reps: '10-12', videoQuery: '杠铃弯举标准动作' },
          { name: '锤式弯举', sets: 3, reps: '12-15', videoQuery: '锤式弯举正确做法' },
        ],
      },
      {
        dayName: '腿日（股四头+腘绳肌+小腿+腹部）',
        bodyParts: ['腿部', '腹'],
        exercises: [
          { name: '杠铃深蹲', sets: 4, reps: '8-10', notes: '深度至大腿平行地面', videoQuery: '杠铃深蹲标准动作教学' },
          { name: '罗马尼亚硬拉', sets: 4, reps: '8-12', videoQuery: '罗马尼亚硬拉正确姿势' },
          { name: '腿举', sets: 4, reps: '10-12', videoQuery: '腿举标准动作' },
          { name: '腿弯举', sets: 3, reps: '12-15', videoQuery: '腿弯举正确姿势' },
          { name: '站姿提踵', sets: 4, reps: '15-20', videoQuery: '站姿提踵训练' },
          { name: '悬垂举腿（腹部）', sets: 4, reps: '15-20', videoQuery: '悬垂举腿正确做法' },
        ],
      },
    ],
  },
  {
    type: '四分化',
    description: '四分化训练将身体分为四个部位进行更精细的刺激，每周训练4天。适合学生党等有一定训练基础、希望针对性强化部位的训练者。',
    days: [
      {
        dayName: '胸部+肱三头',
        bodyParts: ['胸', '肱三头'],
        exercises: [
          { name: '杠铃平板卧推', sets: 5, reps: '6-10', notes: '大重量日', videoQuery: '杠铃平板卧推标准动作教学' },
          { name: '上斜杠铃卧推', sets: 4, reps: '8-12', videoQuery: '上斜杠铃卧推教学' },
          { name: '双杠臂屈伸', sets: 4, reps: '8-12', videoQuery: '双杠臂屈伸标准动作' },
          { name: '哑铃飞鸟', sets: 3, reps: '12-15', videoQuery: '哑铃飞鸟标准动作' },
          { name: '绳索下压', sets: 4, reps: '10-15', videoQuery: '绳索下压肱三头肌训练' },
          { name: '窄距卧推', sets: 3, reps: '10-12', videoQuery: '窄距卧推肱三头肌' },
        ],
      },
      {
        dayName: '背部+肱二头',
        bodyParts: ['背', '肱二头'],
        exercises: [
          { name: '硬拉', sets: 4, reps: '5-8', notes: '大重量复合动作', videoQuery: '硬拉标准动作教学' },
          { name: '引体向上', sets: 4, reps: '力竭', videoQuery: '引体向上标准动作教学' },
          { name: 'T杠划船', sets: 4, reps: '8-12', videoQuery: 'T杠划船正确姿势' },
          { name: '单臂哑铃划船', sets: 3, reps: '10-12', videoQuery: '单臂哑铃划船教学' },
          { name: '牧师凳弯举', sets: 4, reps: '10-12', videoQuery: '牧师凳弯举标准动作' },
          { name: '集中弯举', sets: 3, reps: '12-15', videoQuery: '集中弯举正确做法' },
        ],
      },
      {
        dayName: '肩部+腹部',
        bodyParts: ['肩', '腹'],
        exercises: [
          { name: '杠铃坐姿推举', sets: 4, reps: '8-12', notes: '全程控制', videoQuery: '杠铃坐姿推举教学' },
          { name: '哑铃侧平举', sets: 5, reps: '12-15', notes: '高次数', videoQuery: '哑铃侧平举正确做法' },
          { name: '哑铃前平举', sets: 3, reps: '12-15', videoQuery: '哑铃前平举标准动作' },
          { name: '面拉', sets: 4, reps: '15-20', notes: '后束训练', videoQuery: '面拉标准动作教学' },
          { name: '卷腹', sets: 4, reps: '20', videoQuery: '卷腹正确做法' },
          { name: '俄罗斯转体', sets: 4, reps: '20', videoQuery: '俄罗斯转体标准动作' },
        ],
      },
      {
        dayName: '腿部（股四头+腘绳肌+小腿）',
        bodyParts: ['腿部'],
        exercises: [
          { name: '杠铃深蹲', sets: 5, reps: '6-10', notes: '大重量日', videoQuery: '杠铃深蹲标准动作教学' },
          { name: '腿举', sets: 4, reps: '10-12', videoQuery: '腿举标准动作' },
          { name: '保加利亚分腿蹲', sets: 3, reps: '10-12', videoQuery: '保加利亚分腿蹲教学' },
          { name: '罗马尼亚硬拉', sets: 4, reps: '8-12', videoQuery: '罗马尼亚硬拉正确姿势' },
          { name: '腿弯举', sets: 4, reps: '12-15', videoQuery: '腿弯举正确姿势' },
          { name: '站姿提踵', sets: 5, reps: '15-20', videoQuery: '站姿提踵训练' },
        ],
      },
    ],
  },
  {
    type: '五分化',
    description: '五分化训练将身体分为五个部位进行极致精细的训练，每个部位每周训练1次。适合热爱健身、有空余时间的人以及以健身为职业的训练者。',
    days: [
      {
        dayName: '推日（胸部+三角肌前束）',
        bodyParts: ['胸', '肩'],
        exercises: [
          { name: '杠铃平板卧推', sets: 5, reps: '6-10', notes: '大重量复合动作', videoQuery: '杠铃平板卧推标准动作教学' },
          { name: '上斜哑铃卧推', sets: 4, reps: '8-12', videoQuery: '上斜哑铃卧推正确姿势' },
          { name: '双杠臂屈伸', sets: 4, reps: '8-12', videoQuery: '双杠臂屈伸标准动作' },
          { name: '哑铃飞鸟', sets: 3, reps: '12-15', videoQuery: '哑铃飞鸟标准动作' },
          { name: '绳索夹胸', sets: 3, reps: '12-15', videoQuery: '绳索夹胸标准动作' },
        ],
      },
      {
        dayName: '拉日（背部+三角肌后束）',
        bodyParts: ['背', '肩'],
        exercises: [
          { name: '硬拉', sets: 4, reps: '5-8', notes: '全身后链核心动作', videoQuery: '硬拉标准动作教学' },
          { name: '引体向上', sets: 4, reps: '力竭', videoQuery: '引体向上标准动作教学' },
          { name: 'T杠划船', sets: 4, reps: '8-12', videoQuery: 'T杠划船正确姿势' },
          { name: '高位下拉', sets: 3, reps: '10-12', videoQuery: '高位下拉标准动作' },
          { name: '面拉', sets: 4, reps: '15-20', notes: '后束+肩袖健康', videoQuery: '面拉标准动作教学' },
        ],
      },
      {
        dayName: '腿日（股四头+腘绳肌+小腿）',
        bodyParts: ['腿部'],
        exercises: [
          { name: '杠铃深蹲', sets: 5, reps: '6-10', notes: '大重量日', videoQuery: '杠铃深蹲标准动作教学' },
          { name: '罗马尼亚硬拉', sets: 4, reps: '8-12', videoQuery: '罗马尼亚硬拉正确姿势' },
          { name: '保加利亚分腿蹲', sets: 3, reps: '10-12', videoQuery: '保加利亚分腿蹲教学' },
          { name: '腿弯举', sets: 4, reps: '12-15', videoQuery: '腿弯举正确姿势' },
          { name: '站姿提踵', sets: 5, reps: '15-20', videoQuery: '站姿提踵训练' },
        ],
      },
      {
        dayName: '肩日（三角肌中束+前束+后束）',
        bodyParts: ['肩'],
        exercises: [
          { name: '杠铃坐姿推举', sets: 4, reps: '8-12', videoQuery: '杠铃坐姿推举教学' },
          { name: '哑铃侧平举', sets: 5, reps: '12-15', notes: '高次数，中束为主', videoQuery: '哑铃侧平举正确做法' },
          { name: '哑铃前平举', sets: 3, reps: '12-15', videoQuery: '哑铃前平举标准动作' },
          { name: '面拉', sets: 4, reps: '15-20', videoQuery: '面拉标准动作教学' },
          { name: '阿诺德推举', sets: 3, reps: '10-12', videoQuery: '阿诺德推举教学' },
        ],
      },
      {
        dayName: '臂日（肱二头+肱三头+前臂+腹部）',
        bodyParts: ['肱二头', '肱三头', '腹'],
        exercises: [
          { name: '窄距卧推', sets: 4, reps: '8-12', videoQuery: '窄距卧推肱三头肌' },
          { name: '绳索下压', sets: 4, reps: '10-15', videoQuery: '绳索下压肱三头肌训练' },
          { name: '杠铃弯举', sets: 4, reps: '10-12', videoQuery: '杠铃弯举标准动作' },
          { name: '锤式弯举', sets: 3, reps: '12-15', videoQuery: '锤式弯举正确做法' },
          { name: '卷腹', sets: 4, reps: '20', videoQuery: '卷腹正确做法' },
          { name: '悬垂举腿', sets: 4, reps: '15-20', videoQuery: '悬垂举腿正确做法' },
        ],
      },
    ],
  },
  {
    type: '减脂',
    description: '高频率减脂训练计划，以全身循环和高代谢消耗为核心，配合较高次数和短间歇，最大化燃脂效率。适合想要减脂增肌的训练者。',
    days: [
      {
        dayName: '全身循环日（上肢力量+有氧）',
        bodyParts: ['胸', '背', '肩'],
        exercises: [
          { name: '杠铃平板卧推', sets: 4, reps: '12-15', notes: '高次数，短间歇60秒', videoQuery: '杠铃平板卧推高次数训练' },
          { name: '高位下拉', sets: 4, reps: '12-15', videoQuery: '高位下拉高次数' },
          { name: '哑铃坐姿推举', sets: 3, reps: '12-15', videoQuery: '哑铃坐姿推举' },
          { name: '开合跳', sets: 3, reps: '30秒', notes: '有氧间歇', videoQuery: '开合跳燃脂' },
          { name: '平板支撑', sets: 3, reps: '45秒', videoQuery: '平板支撑标准动作' },
        ],
      },
      {
        dayName: '下肢循环日（燃脂+塑形）',
        bodyParts: ['腿部', '腹'],
        exercises: [
          { name: '杠铃深蹲', sets: 4, reps: '12-15', notes: '高次数，短间歇45秒', videoQuery: '杠铃深蹲高次数训练' },
          { name: '罗马尼亚硬拉', sets: 3, reps: '12-15', videoQuery: '罗马尼亚硬拉' },
          { name: '保加利亚分腿蹲', sets: 3, reps: '12-15', videoQuery: '保加利亚分腿蹲' },
          { name: '波比跳', sets: 3, reps: '12次', notes: '高强度燃脂', videoQuery: '波比跳燃脂训练' },
          { name: '悬垂举腿', sets: 4, reps: '15-20', videoQuery: '悬垂举腿' },
        ],
      },
      {
        dayName: '有氧+核心日',
        bodyParts: ['腹', '全身'],
        exercises: [
          { name: '跳绳', sets: 5, reps: '60秒', notes: '间歇30秒', videoQuery: '跳绳燃脂训练' },
          { name: '登山跑', sets: 4, reps: '30秒', videoQuery: '登山跑核心训练' },
          { name: '卷腹', sets: 4, reps: '20', videoQuery: '卷腹正确做法' },
          { name: '俄罗斯转体', sets: 4, reps: '20', videoQuery: '俄罗斯转体' },
          { name: '平板支撑开合跳', sets: 3, reps: '30秒', videoQuery: '平板支撑开合跳' },
        ],
      },
      {
        dayName: '上肢力量耐力日',
        bodyParts: ['胸', '背', '肩', '肱二头', '肱三头'],
        exercises: [
          { name: '哑铃卧推', sets: 4, reps: '12-15', notes: '超级组：哑铃卧推+划船', videoQuery: '哑铃卧推训练' },
          { name: '哑铃划船', sets: 4, reps: '12-15', videoQuery: '哑铃划船正确姿势' },
          { name: '哑铃侧平举', sets: 4, reps: '15-20', videoQuery: '哑铃侧平举' },
          { name: '绳索下压', sets: 3, reps: '15-20', videoQuery: '绳索下压' },
          { name: '锤式弯举', sets: 3, reps: '15-20', videoQuery: '锤式弯举' },
        ],
      },
      {
        dayName: '全身HIIT日',
        bodyParts: ['全身'],
        exercises: [
          { name: '深蹲跳', sets: 4, reps: '15次', notes: 'HIIT循环，每组间休息30秒', videoQuery: '深蹲跳HIIT' },
          { name: '俯卧撑', sets: 4, reps: '力竭', videoQuery: '俯卧撑标准动作' },
          { name: '波比跳', sets: 4, reps: '12次', videoQuery: '波比跳标准动作' },
          { name: '高抬腿', sets: 4, reps: '30秒', videoQuery: '高抬腿燃脂' },
          { name: '平板支撑', sets: 4, reps: '45秒', videoQuery: '平板支撑' },
        ],
      },
    ],
  },
];

export const bodyPartExercises: BodyPartExercise[] = [
  {
    bodyPart: '胸',
    exercises: [
      { name: '杠铃平板卧推', sets: 4, reps: '8-12', videoQuery: '杠铃平板卧推标准动作教学' },
      { name: '上斜哑铃卧推', sets: 4, reps: '8-12', videoQuery: '上斜哑铃卧推正确姿势' },
      { name: '下斜杠铃卧推', sets: 3, reps: '10-12', videoQuery: '下斜杠铃卧推教学' },
      { name: '哑铃飞鸟', sets: 3, reps: '12-15', videoQuery: '哑铃飞鸟标准动作' },
      { name: '双杠臂屈伸', sets: 4, reps: '8-12', videoQuery: '双杠臂屈伸标准动作' },
      { name: '绳索夹胸', sets: 4, reps: '12-15', videoQuery: '绳索夹胸标准动作' },
    ],
  },
  {
    bodyPart: '肩',
    exercises: [
      { name: '杠铃坐姿推举', sets: 4, reps: '8-12', videoQuery: '杠铃坐姿推举教学' },
      { name: '哑铃侧平举', sets: 5, reps: '12-15', videoQuery: '哑铃侧平举正确做法' },
      { name: '哑铃前平举', sets: 3, reps: '12-15', videoQuery: '哑铃前平举标准动作' },
      { name: '面拉', sets: 4, reps: '15-20', videoQuery: '面拉标准动作教学' },
      { name: '阿诺德推举', sets: 3, reps: '10-12', videoQuery: '阿诺德推举教学' },
    ],
  },
  {
    bodyPart: '背',
    exercises: [
      { name: '硬拉', sets: 4, reps: '5-8', videoQuery: '硬拉标准动作教学' },
      { name: '引体向上', sets: 4, reps: '力竭', videoQuery: '引体向上标准动作教学' },
      { name: '杠铃划船', sets: 4, reps: '8-12', videoQuery: '杠铃划船正确姿势' },
      { name: '高位下拉', sets: 4, reps: '10-12', videoQuery: '高位下拉标准动作' },
      { name: '坐姿绳索划船', sets: 3, reps: '12-15', videoQuery: '坐姿绳索划船教学' },
      { name: '单臂哑铃划船', sets: 3, reps: '10-12', videoQuery: '单臂哑铃划船教学' },
    ],
  },
  {
    bodyPart: '腹',
    exercises: [
      { name: '悬垂举腿', sets: 4, reps: '15-20', videoQuery: '悬垂举腿正确做法' },
      { name: '卷腹', sets: 4, reps: '20', videoQuery: '卷腹正确做法' },
      { name: '俄罗斯转体', sets: 4, reps: '20', videoQuery: '俄罗斯转体标准动作' },
      { name: '平板支撑', sets: 4, reps: '60秒', videoQuery: '平板支撑标准动作' },
      { name: '仰卧抬腿', sets: 3, reps: '15-20', videoQuery: '仰卧抬腿训练' },
    ],
  },
  {
    bodyPart: '肱二头',
    exercises: [
      { name: '杠铃弯举', sets: 4, reps: '10-12', videoQuery: '杠铃弯举标准动作' },
      { name: '锤式弯举', sets: 3, reps: '12-15', videoQuery: '锤式弯举正确做法' },
      { name: '牧师凳弯举', sets: 4, reps: '10-12', videoQuery: '牧师凳弯举标准动作' },
      { name: '集中弯举', sets: 3, reps: '12-15', videoQuery: '集中弯举正确做法' },
      { name: '绳索弯举', sets: 3, reps: '12-15', videoQuery: '绳索弯举训练' },
    ],
  },
  {
    bodyPart: '肱三头',
    exercises: [
      { name: '窄距卧推', sets: 4, reps: '8-12', videoQuery: '窄距卧推肱三头肌' },
      { name: '绳索下压', sets: 4, reps: '10-15', videoQuery: '绳索下压肱三头肌训练' },
      { name: '双杠臂屈伸', sets: 4, reps: '8-12', videoQuery: '双杠臂屈伸标准动作' },
      { name: '仰卧臂屈伸', sets: 3, reps: '10-12', videoQuery: '仰卧臂屈伸教学' },
      { name: '颈后臂屈伸', sets: 3, reps: '12-15', videoQuery: '颈后臂屈伸训练' },
    ],
  },
  {
    bodyPart: '腿部',
    exercises: [
      { name: '杠铃深蹲', sets: 5, reps: '6-10', videoQuery: '杠铃深蹲标准动作教学' },
      { name: '腿举', sets: 4, reps: '10-12', videoQuery: '腿举标准动作' },
      { name: '保加利亚分腿蹲', sets: 3, reps: '10-12', videoQuery: '保加利亚分腿蹲教学' },
      { name: '罗马尼亚硬拉', sets: 4, reps: '8-12', videoQuery: '罗马尼亚硬拉正确姿势' },
      { name: '腿弯举', sets: 4, reps: '12-15', videoQuery: '腿弯举正确姿势' },
      { name: '站姿提踵', sets: 5, reps: '15-20', videoQuery: '站姿提踵训练' },
      { name: '坐姿腿屈伸', sets: 3, reps: '12-15', videoQuery: '坐姿腿屈伸训练' },
    ],
  },
];