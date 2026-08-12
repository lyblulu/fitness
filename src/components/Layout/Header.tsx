import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Dumbbell, User, ClipboardList } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gym-card/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 text-white group">
            <div className="relative">
              <Dumbbell className="w-6 h-6 text-gym-accent transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-gym-accent/20 blur-md rounded-full group-hover:scale-150 transition-transform duration-300" />
            </div>
            <span className="font-display text-2xl tracking-wider">IRON BLOG</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${
                  location.pathname === link.path
                    ? "text-gym-accent active"
                    : "text-gym-text/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/workout"
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                location.pathname === "/workout"
                  ? "text-gym-accent"
                  : "text-gym-text/50 hover:text-gym-accent"
              }`}
              title="训练记录"
            >
              <ClipboardList className="w-4 h-4" />
            </Link>
            {isAuthenticated ? (
              <Link
                to="/profile"
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  location.pathname === "/profile"
                    ? "text-gym-accent"
                    : "text-gym-text/50 hover:text-gym-accent"
                }`}
                title={user?.username}
              >
                <User className="w-4 h-4" />
                <span className="text-xs">{user?.username}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xs text-gym-text/50 hover:text-gym-accent transition-colors px-3 py-1.5 border border-white/10 rounded-sm"
              >
                登录
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-sm transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gym-card/95 backdrop-blur-md border-t border-white/5 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`nav-link text-sm uppercase tracking-wider py-3 px-3 transition-colors rounded-sm ${
                  location.pathname === link.path
                    ? "text-gym-accent bg-gym-accent/5 active"
                    : "text-gym-text/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/5 my-2" />
            <Link
              to="/workout"
              onClick={() => setMobileOpen(false)}
              className="nav-link text-sm uppercase tracking-wider py-3 px-3 transition-colors rounded-sm text-gym-text/70 hover:text-white hover:bg-white/5 flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4" />
              训练记录
            </Link>
            {isAuthenticated ? (
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="nav-link text-sm uppercase tracking-wider py-3 px-3 transition-colors rounded-sm text-gym-text/70 hover:text-white hover:bg-white/5 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                个人中心
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="nav-link text-sm uppercase tracking-wider py-3 px-3 transition-colors rounded-sm text-gym-accent hover:bg-gym-accent/5 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                登录
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}