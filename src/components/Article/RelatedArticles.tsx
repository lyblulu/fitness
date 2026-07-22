import { Link } from "react-router-dom";
import { articles } from "@/data/articles";

interface Props {
  currentId: number;
  category: string;
}

export default function RelatedArticles({ currentId, category }: Props) {
  const related = articles
    .filter((a) => a.category === category && a.id !== currentId)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl text-white tracking-wider mb-8 text-center">相关文章</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {related.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="glass-card p-6 card-hover group"
            >
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm inline-block mb-3 ${
                article.category === 'training' ? 'bg-gym-accent text-white' : 'bg-gym-gold text-gym-dark'
              }`}>
                {article.category === 'training' ? '训练' : '营养'}
              </span>
              <h3 className="font-display text-lg text-white tracking-wider group-hover:text-gym-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-gym-text/60 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}