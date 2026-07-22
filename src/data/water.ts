export interface WaterTime {
  time: string;
  label: string;
  amount: number; // ml
  note: string;
}

export interface WaterPlan {
  totalAmount: number;
  cups: number; // 每杯约250ml
  description: string;
  schedule: WaterTime[];
}

export const waterPlan: WaterPlan = {
  totalAmount: 2800,
  cups: 11,
  description: '科学饮水遵循"少量多次"原则，训练日额外增加500ml。以下按75kg训练者、含训练时间安排，休息日可适当减少训练前后的补水。',
  schedule: [
    { time: '06:30', label: '起床后', amount: 300, note: '一杯温水唤醒身体，促进新陈代谢' },
    { time: '08:00', label: '早餐后', amount: 200, note: '搭配早餐小口慢饮' },
    { time: '10:00', label: '上午工作间隙', amount: 300, note: '工作间隙定时补水，不要等渴了再喝' },
    { time: '12:00', label: '午餐前', amount: 200, note: '餐前一杯增加饱腹感，避免吃多' },
    { time: '14:30', label: '下午茶', amount: 300, note: '下午容易犯困，喝水提神' },
    { time: '16:00', label: '训练前1小时', amount: 300, note: '提前补水，确保训练时体内水分充足' },
    { time: '17:00', label: '训练中', amount: 500, note: '少量多次，每15-20分钟喝100-150ml' },
    { time: '18:30', label: '训练后', amount: 300, note: '补充流失水分，配合蛋白质吸收' },
    { time: '20:00', label: '晚餐后', amount: 200, note: '适量饮水，帮助消化' },
    { time: '21:30', label: '睡前1小时', amount: 200, note: '睡前少量补水，避免夜间频繁起夜' },
  ],
};