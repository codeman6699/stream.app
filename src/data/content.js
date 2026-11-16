// src/data/content.js
// Each movie / episode points to its OWN file on isatafilez.my.
// These must match the URLs in stream.js CATALOG.

/* ---------------- MOVIES ---------------- */
export const movies = [
  {
    id: 1, tmdbId: 454626, posterPath: "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg",
    title: "The Last Warrior", info: "Fantasy • 2021 • Disney Adventure",
    rating: 7.8, quality: "HD", year: 2021, type: "Movie", genre: "Fantasy", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/2021/fantasy/LAST_WARRIOR_HD.mp4",
  },
  {
    id: 2, tmdbId: 934433, posterPath: "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
    title: "Shadow of the Dragon", info: "Action • 1992 • Crime Thriller",
    rating: 7.2, quality: "HD", year: 1992, type: "Movie", genre: "Action", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/1992/action/SHADOW_DRAGON_HD.mp4",
  },
  {
    id: 3, tmdbId: 899294, posterPath: "/q9q0Zq3tYqZ2s9qM8yHtV9oI3nX.jpg",
    title: "Midnight Revenge", info: "Action • 1986 • Hong Kong Crime",
    rating: 6.9, quality: "HD", year: 1986, type: "Movie", genre: "Action", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/1986/action/MIDNIGHT_REVENGE_HD.mp4",
  },
  {
    id: 4, tmdbId: 15659, posterPath: "/3lQqJhqltzBB0oEnHhFsqjO2a6R.jpg",
    title: "Rise of the Warrior", info: "Action • 2008 • Scorpion King 2",
    rating: 5.8, quality: "HD", year: 2008, type: "Movie", genre: "Action", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/2008/action/RISE_WARRIOR_HD.mp4",
  },
  {
    id: 5, tmdbId: 619930, posterPath: "/9Z8jJ4mz4oXlI4wnNeQ4x4Yq6h0.jpg",
    title: "Iron Fist Legacy", info: "Martial Arts • 2026 • Perfect",
    rating: 8.4, quality: "4K", year: 2026, type: "Movie", genre: "Action", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/2026/action/IRON_FIST_LEGACY_4K.mp4",
  },
  {
    id: 6, tmdbId: 758323, posterPath: "/aX7dQ9OaJkqr7whYO5HnWb6rT9h.jpg",
    title: "Raudse Rusikaga", info: "Drama • 2026 • Estonian Horror",
    rating: 7.5, quality: "HD", year: 2026, type: "Movie", genre: "Horror", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/2026/horror/RAUDSE_RUSIKAGA_HD.mp4",
  },
  {
    id: 7, tmdbId: 324544, posterPath: "/6ELTqZLaZUKVU5s8M4q4u5xZ5w8.jpg",
    title: "Bloodline Hunter", info: "Action • 2026 • Perfect",
    rating: 8.1, quality: "4K", year: 2026, type: "Movie", genre: "Action", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/2026/action/BLOODLINE_HUNTER_4K.mp4",
  },
  {
    id: 8, tmdbId: 823464, posterPath: "/5FjR8RJK3RrgvcxZ1Qvx5bLN2d3.jpg",
    title: "Crimson Horizon", info: "Sci-Fi • 2025 • Kevin",
    rating: 7.9, quality: "HD", year: 2025, type: "Movie", genre: "Sci-Fi", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/2025/scifi/CRIMSON_HORIZON_HD.mp4",
  },
  {
    id: 9, tmdbId: 1029575, posterPath: "/3Q6b9z6bK5Yq7XwFv9oZ7x0m2s5d.jpg",
    title: "Wrath of the King", info: "Historical • 2024 • Chris",
    rating: 7.3, quality: "HD", year: 2024, type: "Movie", genre: "Drama", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/2024/drama/WRATH_OF_THE_KING_HD.mp4",
  },
  {
    id: 10, tmdbId: 609681, posterPath: "/g8aO2a5xG7q5q9aMx8x4jZJ6rRj7.jpg",
    title: "VisionQuest", info: "Sci-Fi • 2026 • Marvel TV",
    rating: 8.6, quality: "4K", year: 2026, type: "Movie", genre: "Sci-Fi", episodes: null,
    sourceUrl: "http://isatafilez.my/files/movies/2026/scifi/VISIONQUEST_4K.mp4",
  },
];

/* ---------------- SERIES ---------------- */
// Each episode has its own sourceUrl. Must match stream.js.

export const series = [
  {
    id: 11, tmdbId: 1399, posterPath: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    title: "Dark Horizon", info: "Thriller • 2026 • Season 1",
    rating: 8.0, quality: "HD", year: 2026, type: "Series", genre: "Thriller",
    episodes: 8,
    seasons: [{
      season: 1,
      episodes: [
        { ep: 1, title: "Pilot",      duration: "45m", sourceUrl: "http://isatafilez.my/files/series/2026/darkhorizon/S01E01.mp4" },
        { ep: 2, title: "The Signal", duration: "44m", sourceUrl: "http://isatafilez.my/files/series/2026/darkhorizon/S01E02.mp4" },
        { ep: 3, title: "Crossfire",  duration: "46m", sourceUrl: "http://isatafilez.my/files/series/2026/darkhorizon/S01E03.mp4" },
        { ep: 4, title: "Blackout",   duration: "43m", sourceUrl: "http://isatafilez.my/files/series/2026/darkhorizon/S01E04.mp4" },
        { ep: 5, title: "The Deal",   duration: "45m", sourceUrl: "http://isatafilez.my/files/series/2026/darkhorizon/S01E05.mp4" },
        { ep: 6, title: "Red Code",   duration: "47m", sourceUrl: "http://isatafilez.my/files/series/2026/darkhorizon/S01E06.mp4" },
        { ep: 7, title: "Collateral", duration: "44m", sourceUrl: "http://isatafilez.my/files/series/2026/darkhorizon/S01E07.mp4" },
        { ep: 8, title: "Final Hour", duration: "50m", sourceUrl: "http://isatafilez.my/files/series/2026/darkhorizon/S01E08.mp4" },
      ],
    }],
  },
  {
    id: 12, tmdbId: 456, posterPath: "/g9lJY5vG4kU9p3W9JkGz9yC9uJk7.jpg",
    title: "The Silent Order", info: "Mystery • 2025 • Season 2",
    rating: 7.7, quality: "HD", year: 2025, type: "Series", genre: "Mystery",
    episodes: 12,
    seasons: [{
      season: 2,
      episodes: Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        return {
          ep: n,
          title: `Chapter ${n}`,
          duration: "42m",
          sourceUrl: `http://isatafilez.my/files/series/2025/silentorder/S02E${String(n).padStart(2, "0")}.mp4`,
        };
      }),
    }],
  },
  {
    id: 13, tmdbId: 84958, posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    title: "Echoes of War", info: "Drama • 2026 • Season 1",
    rating: 8.2, quality: "4K", year: 2026, type: "Series", genre: "Drama",
    episodes: 6,
    seasons: [{
      season: 1,
      episodes: Array.from({ length: 6 }, (_, i) => {
        const n = i + 1;
        return {
          ep: n,
          title: `Part ${n}`,
          duration: "55m",
          sourceUrl: `http://isatafilez.my/files/series/2026/echoesofwar/S01E${String(n).padStart(2, "0")}_4K.mp4`,
        };
      }),
    }],
  },
  {
    id: 14, tmdbId: 67744, posterPath: "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
    title: "Neon Streets", info: "Cyberpunk • 2025 • Season 3",
    rating: 7.4, quality: "HD", year: 2025, type: "Series", genre: "Sci-Fi",
    episodes: 10,
    seasons: [{
      season: 3,
      episodes: Array.from({ length: 10 }, (_, i) => {
        const n = i + 1;
        return {
          ep: n,
          title: `Night ${n}`,
          duration: "48m",
          sourceUrl: `http://isatafilez.my/files/series/2025/neonstreets/S03E${String(n).padStart(2, "0")}.mp4`,
        };
      }),
    }],
  },
  {
    id: 15, tmdbId: 94997, posterPath: "/1YV3kI2Rwpdi6z0Vj5KY5I2x0nR.jpg",
    title: "Kingdom Come", info: "Fantasy • 2026 • Season 1",
    rating: 8.5, quality: "4K", year: 2026, type: "Series", genre: "Fantasy",
    episodes: 9,
    seasons: [{
      season: 1,
      episodes: Array.from({ length: 9 }, (_, i) => {
        const n = i + 1;
        return {
          ep: n,
          title: `Reign ${n}`,
          duration: "52m",
          sourceUrl: `http://isatafilez.my/files/series/2026/kingdomcome/S01E${String(n).padStart(2, "0")}_4K.mp4`,
        };
      }),
    }],
  },
];

export const allContent = [...movies, ...series];

export function findById(id) {
  const n = Number(id);
  return allContent.find((c) => c.id === n) || null;
}