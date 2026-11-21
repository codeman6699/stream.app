// scripts/fetch-posters.js
const fs = require("fs");
const path = require("path");
const https = require("https");

// 1. Load API key from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
let API_KEY = "";
try {
  const env = fs.readFileSync(envPath, "utf8");
  const match = env.match(/140d1a07d8829e2e5db269b235017253=(.+)/);
  if (match) API_KEY = match[1].trim();
} catch {
  console.error("❌ Could not read .env.local. Make sure it exists in the project root.");
  process.exit(1);
}

if (!API_KEY) {
  console.error("140d1a07d8829e2e5db269b235017253 in .env.local");
  process.exit(1);
}

// 2. Your movies list
const titles = [
  { id: 1,  title: "The Last Warrior",     type: "movie" },
  { id: 2,  title: "Shadow of the Dragon", type: "movie" },
  { id: 3,  title: "Midnight Revenge",     type: "movie" },
  { id: 4,  title: "Rise of the Warrior",  type: "movie" },
  { id: 5,  title: "Iron Fist Legacy",     type: "movie" },
  { id: 6,  title: "Raudse Rusikaga",      type: "movie" },
  { id: 7,  title: "Bloodline Hunter",     type: "movie" },
  { id: 8,  title: "Crimson Horizon",      type: "movie" },
  { id: 9,  title: "Wrath of the King",    type: "movie" },
  { id: 10, title: "VisionQuest",          type: "movie" },
  
  // For series, use the show name without episode info
  { id: 11, title: "Dark Horizon",         type: "tv" },
  { id: 12, title: "The Silent Order",     type: "tv" },
  { id: 13, title: "Echoes of War",        type: "tv" },
  { id: 14, title: "Neon Streets",         type: "tv" },
  { id: 15, title: "Kingdom Come",         type: "tv" },
];

// 3. Helper to fetch from TMDB
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

// 4. Run the search
(async () => {
  const results = {};
  console.log("🚀 Fetching real posters from TMDB...\n");

  for (const item of titles) {
    const url = `https://api.themoviedb.org/3/search/${item.type}?api_key=${API_KEY}&query=${encodeURIComponent(item.title)}`;
    
    try {
      const data = await fetchJson(url);
      if (data.results && data.results.length > 0) {
        const match = data.results[0];
        const displayTitle = match.title || match.name;
        
        results[item.id] = {
          tmdbId: match.id,
          posterPath: match.poster_path,
          title: displayTitle
        };
        
        console.log(`✅ ID ${item.id}: "${item.title}" → Found "${displayTitle}"`);
        console.log(`   Poster Path: ${match.poster_path}\n`);
      } else {
        console.log(`❌ ID ${item.id}: "${item.title}" — NO RESULTS FOUND\n`);
      }
    } catch (err) {
      console.log(`❌ ID ${item.id}: "${item.title}" — ERROR: ${err.message}\n`);
    }

    // Wait 0.3s to avoid hitting rate limits
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  // 5. Save results
  const outPath = path.join(__dirname, "..", "poster-results.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\n🎉 Done! Full results saved to: poster-results.json`);
})();