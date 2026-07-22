import ArticleContent from "@/components/Article/ArticleContent";
import RelatedArticles from "@/components/Article/RelatedArticles";
import { useParams } from "react-router-dom";
import { articles } from "@/data/articles";

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  return (
    <main>
      <div className="h-16" /> {/* Spacer for fixed header */}
      <ArticleContent />
      {article && (
        <RelatedArticles currentId={article.id} category={article.category} />
      )}
    </main>
  );
}