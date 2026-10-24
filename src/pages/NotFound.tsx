import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl md:text-9xl text-gradient">404</p>
        <h1 className="font-display text-2xl md:text-3xl text-white tracking-wider mt-6 mb-3 uppercase">
          这个页面被练没了
        </h1>
        <p className="text-gym-text/70 mb-8">
          你访问的页面不存在,可能已被移动或删除。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-primary text-sm inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            回到首页
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-ghost text-sm inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回上一页
          </button>
        </div>
      </div>
    </main>
  );
}
