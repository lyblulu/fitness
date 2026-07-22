import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, MessageCircle, Eye } from "lucide-react";
import { defaultPosts, forumCategories } from "@/data/forum";

export default function ForumOverview() {
  const hotPosts = [...defaultPosts].sort((a, b) => b.replies.length - a.replies.length).slice(0, 4);

  return (
    <section className="py-20 md:py-32 bg-gym-darker/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-7 h-7 text-gym-accent" />
            <h2 className="section-title">健身论坛</h2>
          </div>
          <p className="section-subtitle mx-auto">
            和铁友们一起交流，有问题随时发帖讨论
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {forumCategories.map((cat) => (
            <Link
              key={cat}
              to="/forum"
              className="px-5 py-2.5 bg-gym-card border border-white/5 text-gym-text/60 hover:text-gym-accent hover:border-gym-accent/30 text-xs font-display uppercase tracking-wider rounded-sm transition-all duration-300"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Hot posts */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-lg text-white tracking-wider mb-6 text-center">热门讨论</h3>
          <div className="space-y-3">
            {hotPosts.map((post, index) => (
              <Link
                key={post.id}
                to="/forum"
                className="glass-card p-4 flex items-center gap-4 group card-hover opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <span className="text-gym-muted text-sm font-mono w-6 shrink-0 text-center">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate group-hover:text-gym-accent transition-colors">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-3 text-gym-muted text-xs mt-1">
                    <span className="text-xs bg-gym-accent/10 text-gym-accent px-1.5 py-0.5 rounded-sm">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.viewCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.replies.length}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gym-muted/30 shrink-0 group-hover:text-gym-accent/50 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/forum" className="btn-ghost text-sm inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            进入论坛
          </Link>
        </div>
      </div>
    </section>
  );
}