import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gym-darker border-t border-white/5 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <Dumbbell className="w-5 h-5 text-gym-accent" />
              <span className="font-display text-xl tracking-wider">IRON BLOG</span>
            </div>
            <p className="text-gym-text/60 text-sm leading-relaxed">
              专注力量训练与健身营养的知识分享平台。科学训练，合理饮食，打造更好的自己。
            </p>
          </div>

          <div>
            <h3 className="text-white font-display text-lg tracking-wider mb-4">快速导航</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors">首页</Link>
              <Link to="/training" className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors">训练计划</Link>
              <Link to="/nutrition" className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors">营养饮食</Link>
              <Link to="/music" className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors">推荐歌单</Link>
              <Link to="/water" className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors">喝水计划</Link>
              <Link to="/forum" className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors">健身论坛</Link>
              <Link to="/sleep" className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors">睡眠恢复</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-display text-lg tracking-wider mb-4">训练部位</h3>
            <div className="grid grid-cols-2 gap-2">
              {["胸", "肩", "背", "腹", "肱二头", "肱三头", "腿"].map((part) => (
                <Link
                  key={part}
                  to="/training"
                  className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors"
                >
                  {part}部训练
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 text-center">
          <p className="text-gym-muted text-xs">
            &copy; {new Date().getFullYear()} IRON BLOG. All rights reserved. 健身知识分享平台
          </p>
        </div>
      </div>
    </footer>
  );
}