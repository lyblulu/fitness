import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-gym-dark via-gym-darker to-gym-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,77,0,0.12)_0%,_transparent_70%)]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gym-accent/5 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gym-gold/5 blur-[100px] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gym-accent/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gym-accent/10 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gym-gold/5 to-transparent" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-gym-accent/10 rounded-tr-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-gym-accent/10 rounded-tl-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-gym-accent/10 rounded-br-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-gym-accent/10 rounded-bl-3xl" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <span className="glow-dot" />
          <p className="text-gym-accent font-display text-sm md:text-base tracking-[0.3em] uppercase">
            Iron Blog 健身知识平台
          </p>
          <span className="glow-dot" />
        </div>
        <h1 className="section-title text-6xl md:text-8xl lg:text-9xl leading-none mb-8 !inline-block opacity-0 animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
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