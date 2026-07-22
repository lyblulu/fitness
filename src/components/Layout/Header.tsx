import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Dumbbell } from "lucide-react";

const navLinks = [
  { path: "/", label: "首页" },
  { path: "/training", label: "训练计划" },
  { path: "/nutrition", label: "营养饮食" },
  { path: "/music", label: "推荐歌单" },
  { path: "/water", label: "喝水计划" },
  { path: "/sleep", label: "睡眠恢复" },
  { path: "/forum", label: "健身论坛" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gym-card/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 text-white">
            <Dumbbell className="w-6 h-6 text-gym-accent" />
            <span className="font-display text-2xl tracking-wider">IRON BLOG</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-gym-accent"
                    : "text-gym-text/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gym-card border-t border-white/5 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm uppercase tracking-wider py-2 transition-colors ${
                  location.pathname === link.path
                    ? "text-gym-accent"
                    : "text-gym-text/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}