import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface GifModalProps {
  query: string;
  onClose: () => void;
}

// 按动作部位匹配真实图片
const IMAGE_MAP: Record<string, string> = {
  "卧推": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  "飞鸟": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  "推举": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  "侧平举": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  "前平举": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  "面拉": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  "引体向上": "https://images.unsplash.com/photo-1541534741688-6078c8bfb5c5?w=600&q=80",
  "划船": "https://images.unsplash.com/photo-1541534741688-6078c8bfb5c5?w=600&q=80",
  "高位下拉": "https://images.unsplash.com/photo-1541534741688-6078c8bfb5c5?w=600&q=80",
  "硬拉": "https://images.unsplash.com/photo-1541534741688-6078c8bfb5c5?w=600&q=80",
  "弯举": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  "深蹲": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  "腿举": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  "分腿蹲": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  "提踵": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  "卷腹": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  "举腿": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  "平板支撑": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  "臂屈伸": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  "绳索下压": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  "俄罗斯转体": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
};

function getImage(query: string): string {
  for (const [keyword, url] of Object.entries(IMAGE_MAP)) {
    if (query.includes(keyword)) return url;
  }
  return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80";
}

export default function GifModal({ query, onClose }: GifModalProps) {
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

  const imageUrl = getImage(query);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg mx-4 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="glass-card overflow-hidden">
          {/* 标题 */}
          <div className="p-4 text-center">
            <h3 className="font-display text-lg text-white tracking-wider">{query}</h3>
            <p className="text-gym-text/40 text-xs mt-1">参考动作</p>
          </div>

          {/* 图片 */}
          <div className="px-4 pb-4">
            <div className="bg-gym-dark rounded-sm overflow-hidden">
              <img
                src={imageUrl}
                alt={query}
                className="w-full h-auto"
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="px-4 pb-4 text-center">
            <p className="text-gym-text/30 text-xs">图片来源：Unsplash</p>
          </div>
        </div>
      </div>
    </div>
  );
}