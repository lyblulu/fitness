import { Link } from "react-router-dom";
import { ArrowRight, Headphones, Play } from "lucide-react";
import { playlists } from "@/data/music";

export default function MusicOverview() {
  return (
    <section className="py-20 md:py-32 bg-gym-darker/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Headphones className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">训练歌单推荐</h2>
          </div>
          <p className="section-subtitle mx-auto">
            选对BGM，状态翻倍。两大风格歌单陪你征服每一组
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {playlists.map((playlist, index) => (
            <Link
              key={playlist.category}
              to="/music"
              className="glass-card card-hover group overflow-hidden opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.12}s`, animationFillMode: "forwards" }}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={playlist.image}
                  alt={playlist.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-card via-gym-card/50 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs bg-gym-accent/90 text-white px-2 py-1 rounded-sm uppercase tracking-wider">
                    {playlist.vibe}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-white tracking-wider mb-2">
                  {playlist.category}
                </h3>
                <p className="text-gym-text/60 text-xs leading-relaxed mb-4 line-clamp-2">
                  {playlist.description}
                </p>
                <div className="flex items-center gap-2 text-gym-accent text-xs uppercase tracking-wider font-bold group-hover:gap-4 transition-all">
                  <span>查看歌单</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/music" className="btn-ghost text-sm inline-flex items-center gap-2">
            <Play className="w-4 h-4" />
            查看全部歌单
          </Link>
        </div>
      </div>
    </section>
  );
}