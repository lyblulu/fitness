import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Dumbbell, LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("请填写所有字段");
      return;
    }
    if (login(email, password)) {
      navigate("/profile");
    } else {
      setError("邮箱或密码错误");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gym-accent/10 mb-4">
            <Dumbbell className="w-8 h-8 text-gym-accent" />
          </div>
          <h1 className="text-2xl font-display text-white tracking-wider">登录</h1>
          <p className="text-gym-text/60 text-sm mt-2">登录你的 IRON BLOG 账号</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-sm mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gym-text/80 text-sm mb-2">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-accent/50 transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-gym-text/80 text-sm mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-accent/50 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm">
            <LogIn className="w-4 h-4" />
            登录
          </button>
        </form>

        <p className="text-center text-gym-text/60 text-sm mt-6">
          还没有账号？{" "}
          <Link to="/register" className="text-gym-accent hover:text-gym-accent/80 transition-colors">
            注册
          </Link>
        </p>
      </div>
    </div>
  );
}