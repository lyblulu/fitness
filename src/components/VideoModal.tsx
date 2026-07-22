import { useEffect, useCallback } from "react";
import { X, ExternalLink, Search } from "lucide-react";

interface VideoModalProps {
  query: string;
  onClose: () => void;
}

export default function VideoModal({ query, onClose }: VideoModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg mx-4 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="glass-card p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gym-accent/10 flex items-center justify-center">
            <Search className="w-10 h-10 text-gym-accent" />
          </div>

          <h3 className="font-display text-2xl text-white tracking-wider mb-3">
            动作演示
          </h3>

          <p className="text-gym-text/60 mb-2">
            正在搜索：
          </p>
          <p className="text-white font-semibold mb-6">
            {query}
          </p>

          <p className="text-gym-text/40 text-sm mb-8 leading-relaxed">
            YouTube 内嵌播放受限，点击下方按钮在 YouTube 中打开
            <br />观看完整教学视频
          </p>

          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm inline-flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            在 YouTube 中打开
          </a>

          <div className="mt-4">
            <button
              onClick={onClose}
              className="text-gym-text/40 text-xs hover:text-gym-text/60 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}