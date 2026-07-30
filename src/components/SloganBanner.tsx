import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Sparkles } from "lucide-react";

const slogans = [
  "请再次跳动那颗不服输的心脏",
  "汗水不会说谎，身材不会骗人",
  "每一次力竭，都是肌肉在说「我还要」",
  "疼痛是软弱离开身体的过程",
  "昨天的咬牙坚持，是今天举起更重的底气",
  "铁片不会自己抬起，身材不会自己变好",
  "在别人放弃的那组，你多做一个",
  "训练是这个世界上最诚实的投资",
  "不要低估你的潜力，不要高估你的毅力",
  "没有天生的强者，只有死磕到底的凡人",
  "你流的每一滴汗，都在雕刻未来的自己",
  "当你想放弃的时候，想想当初为什么开始",
  "世界上没有捷径，只有日复一日的坚持",
  "别让明天的你，讨厌今天没拼尽全力的自己",
  "训练不是惩罚，而是对自己最大的尊重",
  "你羡慕的身材，都藏着别人受不了的苦",
  "撑过最累的那组，后面都是下坡路",
  "健身是唯一一件付出就一定会有回报的事",
  "别把最好的年纪，活成最胖的样子",
  "别人在休息，你在训练——差距就是这样来的",
  "肌肉不会凭空长出来，它要你用汗水去换",
  "每一次想放弃的时候，都是离蜕变最近的时候",
  "你的身体配得上你受过的苦",
  "自律不是天赋，是一种选择",
  "训练场上没有捷径，只有硬扛",
];

function getRandomIndex(current: number): number {
  let next: number;
  do {
    next = Math.floor(Math.random() * slogans.length);
  } while (next === current && slogans.length > 1);
  return next;
}

export default function SloganBanner() {
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => getRandomIndex(prev));
    setFadeKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-gradient-to-r from-gym-accent/5 via-gym-accent/10 to-gym-accent/5 border-b border-gym-accent/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 py-2.5">
          <Sparkles className="w-3.5 h-3.5 text-gym-gold/60 shrink-0 hidden sm:block" />
          <button
            onClick={next}
            className="flex items-center gap-2 text-gym-accent/60 hover:text-gym-accent transition-colors shrink-0"
            title="换一条"
          >
            <RefreshCw className="w-3.5 h-3.5 transition-transform duration-500 hover:rotate-180" />
          </button>
          <p
            key={fadeKey}
            className="text-gym-accent/90 text-sm md:text-base tracking-wide cursor-pointer select-none animate-fade-in"
            onClick={next}
          >
            {slogans[index]}
          </p>
          <Sparkles className="w-3.5 h-3.5 text-gym-gold/60 shrink-0 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}