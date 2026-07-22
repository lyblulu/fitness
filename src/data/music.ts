export interface Song {
  name: string;
  artist: string;
}

export interface Playlist {
  category: string;
  description: string;
  vibe: string;
  songs: Song[];
  image: string;
}

export const playlists: Playlist[] = [
  {
    category: "燃脂有氧",
    description: "BPM 140+ 的高节奏神曲，跑步机、椭圆机、跳绳的最佳伴侣，步伐跟着鼓点走",
    vibe: "高节奏 · 有氧训练",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80",
    songs: [
      { name: "Titanium", artist: "David Guetta ft. Sia" },
      { name: "Levels", artist: "Avicii" },
      { name: "Wake Me Up", artist: "Avicii" },
      { name: "Animals", artist: "Martin Garrix" },
      { name: "Don't You Worry Child", artist: "Swedish House Mafia" },
      { name: "The Nights", artist: "Avicii" },
      { name: "In the Name of Love", artist: "Martin Garrix & Bebe Rexha" },
      { name: "Scared to Be Lonely", artist: "Martin Garrix & Dua Lipa" },
    ],
  },
  {
    category: "硬核力量",
    description: "爆发力拉满的重型节奏，深蹲、硬拉、卧推大重量组之前来一首，肾上腺素直接飙升",
    vibe: "爆发力 · 大重量日",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80",
    songs: [
      { name: "Till I Collapse", artist: "Eminem" },
      { name: "Lose Yourself", artist: "Eminem" },
      { name: "Stronger", artist: "Kanye West" },
      { name: "Power", artist: "Kanye West" },
      { name: "HUMBLE.", artist: "Kendrick Lamar" },
      { name: "Sicko Mode", artist: "Travis Scott" },
      { name: "Can't Hold Us", artist: "Macklemore & Ryan Lewis" },
      { name: "God's Plan", artist: "Drake" },
    ],
  },
  
];