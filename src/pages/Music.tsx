import { useState } from "react";
import { playlists } from "@/data/music";
import { Headphones, Disc3, Music2 } from "lucide-react";

export default function Music() {
  const [activeCategory, setActiveCategory] = useState(0);
  const playlist = playlists[activeCategory];

  return (
    <main>
      <div className="h-20" /> {/* Spacer for fixed header */}

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-dark via-gym-darker to-gym-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,77,0,0.1)_0%,_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Headphones className="w-8 h-8 text-gym-accent" />
            <h1 className="section-title">训练歌单推荐</h1>
          </div>
          <p className="section-subtitle mx-auto">
            选对音乐，训练状态翻倍。燃脂有氧和硬核力量两大风格，陪你征服每一组
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-10 md:py-16 bg-gym-darker/50 -mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {playlists.map((p, index) => (
              <button
                key={p.category}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-2.5 font-display text-sm uppercase tracking-wider transition-all duration-300 rounded-sm ${
                  activeCategory === index
                    ? "bg-gym-accent text-white"
                    : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
                }`}
              >
                {p.category}
              </button>
            ))}
          </div>

          {/* Current Playlist */}
          <div className="max-w-6xl mx-auto">
            {/* Playlist header */}
            <div className="glass-card p-8 md:p-12 mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
                <Disc3 className="w-full h-full text-gym-accent" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-gym-accent/20 text-gym-accent px-3 py-1 rounded-sm uppercase tracking-wider">
                    {playlist.vibe}
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-white tracking-wider mb-4">
                  {playlist.category}
                </h2>
                <p className="text-gym-text/70 max-w-2xl text-lg">
                  {playlist.description}
                </p>
              </div>
            </div>

            {/* Song list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playlist.songs.map((song, i) => (
                <div
                  key={song.name}
                  className="glass-card p-4 flex items-center gap-4 group opacity-0 animate-fade-up"
                  style={{ animationDelay: `${0.1 + i * 0.08}s`, animationFillMode: "forwards" }}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gym-accent/10 text-gym-accent shrink-0">
                    <Music2 className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{song.name}</p>
                    <p className="text-gym-muted text-xs truncate">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}