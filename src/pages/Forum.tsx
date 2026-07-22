import { useState, useEffect } from "react";
import { MessageSquare, Plus, Send, ArrowLeft, Eye, ChevronRight, MessageCircle, User } from "lucide-react";
import { Post, Reply, forumCategories, defaultPosts } from "@/data/forum";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function loadPosts(): Post[] {
  try {
    const saved = localStorage.getItem("ironblog_forum_posts");
    if (saved) return JSON.parse(saved);
  } catch {}
  return defaultPosts;
}

function savePosts(posts: Post[]) {
  localStorage.setItem("ironblog_forum_posts", JSON.stringify(posts));
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("全部");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // New post form
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState<string>("训练讨论");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  const filteredPosts = posts.filter((p) => {
    const matchCategory = activeCategory === "全部" || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      title: newTitle.trim(),
      author: newAuthor.trim() || "匿名铁友",
      content: newContent.trim(),
      category: newCategory as Post["category"],
      date: getToday(),
      replies: [],
      viewCount: 0,
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    savePosts(updated);
    setNewTitle("");
    setNewAuthor("");
    setNewContent("");
    setShowNewPost(false);
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedPost) return;
    const reply: Reply = {
      id: generateId(),
      author: "我",
      content: replyText.trim(),
      date: getToday(),
    };
    const updated = posts.map((p) =>
      p.id === selectedPost.id ? { ...p, replies: [...p.replies, reply] } : p
    );
    setPosts(updated);
    savePosts(updated);
    setSelectedPost({ ...selectedPost, replies: [...selectedPost.replies, reply] });
    setReplyText("");
  };

  const handleViewPost = (post: Post) => {
    const updated = posts.map((p) =>
      p.id === post.id ? { ...p, viewCount: p.viewCount + 1 } : p
    );
    setPosts(updated);
    savePosts(updated);
    setSelectedPost({ ...post, viewCount: post.viewCount + 1 });
  };

  const handleDeletePost = (postId: number) => {
    const updated = posts.filter((p) => p.id !== postId);
    setPosts(updated);
    savePosts(updated);
    setSelectedPost(null);
  };

  const handleDeleteReply = (postId: number, replyId: string) => {
    const updated = posts.map((p) =>
      p.id === postId ? { ...p, replies: p.replies.filter((r) => r.id !== replyId) } : p
    );
    setPosts(updated);
    savePosts(updated);
    if (selectedPost?.id === postId) {
      setSelectedPost({ ...selectedPost, replies: selectedPost.replies.filter((r) => r.id !== replyId) });
    }
  };

  // Post detail view
  if (selectedPost) {
    return (
      <main>
        <div className="h-20" />
        <section className="py-10 md:py-16 bg-gym-darker/50 min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-gym-text/60 hover:text-gym-accent transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              返回帖子列表
            </button>

            {/* Post */}
            <div className="glass-card p-6 md:p-8 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-gym-accent/20 text-gym-accent px-2 py-1 rounded-sm">{selectedPost.category}</span>
                <span className="text-gym-muted text-xs">{selectedPost.date}</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl text-white tracking-wider mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-4 mb-6 text-gym-muted text-xs">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {selectedPost.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {selectedPost.viewCount}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {selectedPost.replies.length}
                </span>
              </div>
              <p className="text-gym-text/80 leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
              <button
                onClick={() => handleDeletePost(selectedPost.id)}
                className="mt-6 text-xs text-red-500/50 hover:text-red-400 transition-colors"
              >
                删除帖子
              </button>
            </div>

            {/* Replies */}
            <h2 className="font-display text-lg text-white tracking-wider mb-6">
              全部回复（{selectedPost.replies.length}）
            </h2>
            <div className="space-y-4 mb-8">
              {selectedPost.replies.length === 0 && (
                <p className="text-gym-muted text-sm text-center py-8">暂无回复，来抢沙发吧</p>
              )}
              {selectedPost.replies.map((reply) => (
                <div key={reply.id} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gym-accent text-sm font-semibold">{reply.author}</span>
                      <span className="text-gym-muted text-xs">{reply.date}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteReply(selectedPost.id, reply.id)}
                      className="text-xs text-red-500/40 hover:text-red-400 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                  <p className="text-gym-text/70 text-sm leading-relaxed">{reply.content}</p>
                </div>
              ))}
            </div>

            {/* Reply form */}
            <div className="glass-card p-6">
              <h3 className="text-white text-sm font-semibold mb-4">发表回复</h3>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="写下你的想法..."
                className="w-full bg-gym-dark border border-white/10 rounded-sm p-4 text-sm text-gym-text placeholder:text-gym-muted/50 focus:outline-none focus:border-gym-accent/50 transition-colors resize-none mb-4"
                rows={3}
              />
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="btn-primary text-xs inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                发布回复
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <div className="h-20" />

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-dark via-gym-darker to-gym-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,77,0,0.08)_0%,_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-gym-accent" />
            <h1 className="section-title">健身论坛</h1>
          </div>
          <p className="section-subtitle mx-auto">
            和铁友们一起交流训练心得、分享健身经验、解答疑惑
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-10 md:py-16 bg-gym-darker/50 -mt-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {["全部", ...forumCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-display uppercase tracking-wider transition-all duration-300 rounded-sm ${
                    activeCategory === cat
                      ? "bg-gym-accent text-white"
                      : "bg-gym-card text-gym-text/60 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索帖子..."
                className="flex-1 md:w-48 bg-gym-card border border-white/10 rounded-sm px-4 py-2 text-xs text-gym-text placeholder:text-gym-muted/50 focus:outline-none focus:border-gym-accent/50 transition-colors"
              />
              <button
                onClick={() => setShowNewPost(true)}
                className="btn-primary text-xs inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                发帖
              </button>
            </div>
          </div>

          {/* New post form */}
          {showNewPost && (
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-display text-lg tracking-wider">发布新帖</h3>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="text-gym-muted text-xs hover:text-white transition-colors"
                >
                  取消
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="帖子标题 *"
                    className="md:col-span-2 bg-gym-dark border border-white/10 rounded-sm px-4 py-2.5 text-sm text-gym-text placeholder:text-gym-muted/50 focus:outline-none focus:border-gym-accent/50 transition-colors"
                  />
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="bg-gym-dark border border-white/10 rounded-sm px-4 py-2.5 text-sm text-gym-text focus:outline-none focus:border-gym-accent/50 transition-colors"
                  >
                    {forumCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="你的昵称（留空默认为'匿名铁友'）"
                  className="w-full bg-gym-dark border border-white/10 rounded-sm px-4 py-2.5 text-sm text-gym-text placeholder:text-gym-muted/50 focus:outline-none focus:border-gym-accent/50 transition-colors"
                />
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="写下你的内容 *"
                  className="w-full bg-gym-dark border border-white/10 rounded-sm p-4 text-sm text-gym-text placeholder:text-gym-muted/50 focus:outline-none focus:border-gym-accent/50 transition-colors resize-none"
                  rows={5}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleCreatePost}
                    disabled={!newTitle.trim() || !newContent.trim()}
                    className="btn-primary text-xs inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                    发布帖子
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Post list */}
          <div className="space-y-3">
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <MessageSquare className="w-12 h-12 text-gym-muted/30 mx-auto mb-4" />
                <p className="text-gym-muted text-sm">暂无帖子，来发第一帖吧</p>
              </div>
            )}
            {filteredPosts.map((post, index) => (
              <button
                key={post.id}
                onClick={() => handleViewPost(post)}
                className="glass-card p-5 w-full text-left group card-hover opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.1 + index * 0.06}s`, animationFillMode: "forwards" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-gym-accent/15 text-gym-accent px-2 py-0.5 rounded-sm shrink-0">
                        {post.category}
                      </span>
                      <span className="text-gym-muted text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-white text-sm font-semibold mb-1.5 group-hover:text-gym-accent transition-colors truncate">
                      {post.title}
                    </h3>
                    <p className="text-gym-text/50 text-xs line-clamp-1 mb-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-gym-muted text-xs">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
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
                  <ChevronRight className="w-5 h-5 text-gym-muted/30 shrink-0 group-hover:text-gym-accent/50 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}