export interface SleepStage {
  time: string;
  label: string;
  duration: string;
  note: string;
}

export interface SleepPrinciple {
  title: string;
  content: string;
}

export interface SleepPlan {
  recommendedHours: string;
  description: string;
  schedule: SleepStage[];
  principles: SleepPrinciple[];
}

export const sleepPlan: SleepPlan = {
  recommendedHours: '7-9',
  description: '睡眠是健身的第三大支柱，比训练本身更重要。肌肉在睡眠中修复和生长，激素在深度睡眠时分泌达到高峰。以下作息按训练日安排，休息日可适当延后30分钟。',
  schedule: [
    { time: '21:00', label: '停止高强度训练', duration: '—', note: '训练最晚在这个时间结束，给身体留出冷静时间' },
    { time: '21:30', label: '洗热水澡', duration: '15min', note: '水温40°C左右，帮助身体放松和体温下降' },
    { time: '22:00', label: '远离电子屏幕', duration: '30min', note: '蓝光抑制褪黑素分泌，改看纸质书或听轻音乐' },
    { time: '22:15', label: '拉伸放松', duration: '15min', note: '轻柔拉伸 + 深呼吸，降低交感神经兴奋度' },
    { time: '22:30', label: '准备入睡', duration: '—', note: '调暗灯光，保持卧室温度18-22°C' },
    { time: '23:00', label: '深度睡眠', duration: '7-8h', note: '生长激素分泌高峰，肌肉修复和再生的关键时段' },
    { time: '06:30', label: '起床', duration: '—', note: '自然醒最佳，避免闹钟反复响起的睡眠惯性' },
    { time: '06:45', label: '晨起拉伸', duration: '10min', note: '唤醒身体，促进血液循环，为训练做准备' },
  ],
  principles: [
    {
      title: '肌肉在睡眠中生长',
      content: '深度睡眠阶段，人体分泌的生长激素占全天的70%以上。没有足够的深度睡眠，训练再刻苦也白费。',
    },
    {
      title: '皮质醇需要睡眠来降低',
      content: '高强度训练会升高皮质醇，睡眠是降低皮质醇的唯一自然方式。长期睡眠不足会导致皮质醇居高不下，加速肌肉分解和脂肪堆积。',
    },
    {
      title: '神经系统需要睡眠恢复',
      content: '大重量训练消耗大量神经系统能量。睡眠不足时，神经募集能力下降，你会感觉"有力使不出"。',
    },
    {
      title: '固定作息比时长更重要',
      content: '每天固定时间入睡和起床，比周末补觉有效得多。生物钟稳定后，入睡速度和睡眠质量都会显著提升。',
    },
    {
      title: '睡前避免这些',
      content: '训练后咖啡因（6小时内）、大量饮水（睡前1小时）、剧烈情绪波动、过饱或过饿。',
    },
    {
      title: '睡眠质量提升技巧',
      content: '保持卧室完全黑暗、使用白噪音遮蔽杂音、睡前1小时调暗灯光、床只用来睡觉不玩手机。',
    },
  ],
};