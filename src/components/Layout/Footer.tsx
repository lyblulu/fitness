import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gym-darker border-t border-white/5 py-12 md:py-16 relative overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gym-accent/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white mb-4 group">
              <div className="relative">
                <Dumbbell className="w-5 h-5 text-gym-accent transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-gym-accent/20 blur-md rounded-full group-hover:scale-150 transition-transform duration-300" />
              </div>
              <span className="font-display text-xl tracking-wider">IRON BLOG</span>
            </div>
            <p className="text-gym-text/60 text-sm leading-relaxed mb-4">
              专注力量训练与健身营养的知识分享平台。科学训练，合理饮食，打造更好的自己。
            </p>
            <div className="flex items-center gap-2">
              <span className="glow-dot" />
              <span className="text-gym-muted text-xs">Est. 2026</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h3 className="text-white font-display text-lg tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gym-accent rounded-full inline-block" />
              快速导航
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/", label: "首页" },
                { to: "/training", label: "训练计划" },
                { to: "/nutrition", label: "营养饮食" },
                { to: "/music", label: "推荐歌单" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors duration-300 hover:translate-x-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-display text-lg tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gym-accent rounded-full inline-block" />
              更多服务
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/water", label: "喝水计划" },
                { to: "/sleep", label: "睡眠恢复" },
                { to: "/forum", label: "健身论坛" },
                { to: "/music", label: "推荐歌单" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors duration-300 hover:translate-x-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Body parts */}
          <div>
            <h3 className="text-white font-display text-lg tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gym-accent rounded-full inline-block" />
              训练部位
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {["胸", "肩", "背", "腹", "肱二头", "肱三头", "腿"].map((part) => (
                <Link
                  key={part}
                  to="/training"
                  className="text-gym-text/60 text-sm hover:text-gym-accent transition-colors duration-300 hover:translate-x-1"
                >
                  {part}部训练
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gym-muted text-xs">
            &copy; {new Date().getFullYear()} IRON BLOG. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gym-muted text-xs">
            <span className="flex items-center gap-1">
              <span className="glow-dot" />
              健身知识分享平台
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}