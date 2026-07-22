import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { articles } from "@/data/articles";

export default function LatestArticles() {
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">最新文章</h2>
          <p className="section-subtitle mx-auto">
            最新的健身训练与营养知识，助你不断进步
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {latestArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="group opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.2 + index * 0.15}s`, animationFillMode: "forwards" }}
            >
              <div className="glass-card overflow-hidden card-hover">
                <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${article.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-gym-dark via-transparent to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm ${
                    article.category === 'training' 
                      ? 'bg-gym-accent text-white' 
                      : 'bg-gym-gold text-gym-dark'
                  }`}>
                    {article.category === 'training' ? '训练' : '营养'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gym-text/40 text-xs mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-display text-xl text-white tracking-wider mb-2 group-hover:text-gym-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gym-text/60 text-sm leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}