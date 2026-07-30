import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Dumbbell, UserPlus, AlertCircle } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password || !confirm) {
      setError("请填写所有字段");
      return;
    }
    if (password !== confirm) {
      setError("两次密码输入不一致");
      return;
    }
    if (password.length < 6) {
      setError("密码至少6位");
      return;
    }
    if (register(username, email, password)) {
      navigate("/profile");
    } else {
      setError("该邮箱已被注册");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gym-accent/10 mb-4">
            <Dumbbell className="w-8 h-8 text-gym-accent" />
          </div>
          <h1 className="text-2xl font-display text-white tracking-wider">注册</h1>
          <p className="text-gym-text/60 text-sm mt-2">创建你的 IRON BLOG 账号</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-sm mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gym-text/80 text-sm mb-2">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-accent/50 transition-colors"
              placeholder="你的昵称"
            />
          </div>
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
              placeholder="至少6位"
            />
          </div>
          <div>
            <label className="block text-gym-text/80 text-sm mb-2">确认密码</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-accent/50 transition-colors"
              placeholder="再次输入密码"
            />
          </div>
          <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm">
            <UserPlus className="w-4 h-4" />
            注册
          </button>
        </form>

        <p className="text-center text-gym-text/60 text-sm mt-6">
          已有账号？{" "}
          <Link to="/login" className="text-gym-accent hover:text-gym-accent/80 transition-colors">
            登录
          </Link>
        </p>
      </div>
    </div>
  );
}