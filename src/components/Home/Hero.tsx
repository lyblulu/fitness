import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gym-dark via-gym-darker to-gym-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,77,0,0.15)_0%,_transparent_70%)]" />
      
      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gym-accent/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gym-accent/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-gym-accent font-display text-sm md:text-base tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          Iron Blog 健身知识平台
        </p>
        <h1 className="section-title text-6xl md:text-8xl lg:text-9xl leading-none mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          BUILD YOUR<br />
          <span className="text-gradient">BEST BODY</span>
        </h1>
        <p className="text-gym-text/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          科学训练方案 &middot; 精准营养搭配 &middot; 系统化健身知识
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <Link to="/training" className="btn-primary text-sm">
            查看训练计划
          </Link>
          <Link to="/nutrition" className="btn-ghost text-sm">
            饮食方案
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gym-text/40" />
      </div>
    </section>
  );
}