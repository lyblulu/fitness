import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { articles } from "@/data/articles";
import { useState, useEffect } from "react";

export default function ArticleContent() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-4xl text-white mb-4">文章未找到</h2>
          <Link to="/" className="btn-primary text-sm">返回首页</Link>
        </div>
      </div>
    );
  }

  // Parse markdown-like content to HTML
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="font-display text-2xl md:text-3xl text-white mt-10 mb-4 tracking-wider">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="font-display text-xl text-white mt-8 mb-3 tracking-wider">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="text-gym-accent font-bold text-lg my-3">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-gym-text/80 ml-6 mb-1 list-disc">{line.replace('- ', '')}</li>;
      }
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
        return <li key={i} className="text-gym-text/80 ml-6 mb-1 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
      }
      if (line.trim() === '') {
        return <div key={i} className="h-2" />;
      }
      return <p key={i} className="text-gym-text/80 leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <article className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-gym-text/60 hover:text-gym-accent transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        {/* Hero Image */}
        <div className="h-64 md:h-96 bg-cover bg-center rounded-sm mb-12 relative" style={{ backgroundImage: `url(${article.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-gym-dark via-transparent to-transparent rounded-sm" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm ${
              article.category === 'training' ? 'bg-gym-accent text-white' : 'bg-gym-gold text-gym-dark'
            }`}>
              {article.category === 'training' ? '训练' : '营养'}
            </span>
            <h1 className="font-display text-3xl md:text-5xl text-white mt-4 tracking-wider">{article.title}</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 mb-10 text-sm text-gym-text/40">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <div className="flex gap-2">
              {article.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert max-w-none">
            {renderContent(article.content)}
          </div>
        </div>
      </div>
    </article>
  );
}