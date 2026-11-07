import lastWarriorImg from "@/assets/5eDgJqnnmYVvE8T72rDST4u0VCq.webp";
import shadowDragonImg from "@/assets/9cWoy2uxaUYtlFLiC11YRC0bPex.webp";
import midnightRevengeImg from "@/assets/ccY2f1o9M8OjFpQb0SVZTuokkYQ.webp";
import scorpionKingImg from "@/assets/oFEHcmPuI95aoeNrWXCVnA4oI5Y.webp";
import ironFistImg from "@/assets/osZ6HJJBPwptZLTXFYbGQ0Jc7WB.webp";
import raudseRusikagaImg from "@/assets/p9x1aME4mFJTeqhKEAYcUCVuzqC.webp";
import extraImg from "@/assets/nGU2cNmKfNk5MNgp7SmlCELvJMo.webp";

const DEMO_MP4   = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const DEMO_MP4_2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const DEMO_MP4_3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const movies = [
  { id:1,  title:"The Last Warrior",     info:"Fantasy • 2021 • Disney Adventure",    image:lastWarriorImg,     rating:7.8, quality:"HD", year:2021, type:"Movie", genre:"Fantasy",  released:"2021-03-12", videoUrl:DEMO_MP4,   parts:null, downloadBase:"https://example.com/downloads/the-last-warrior" },
  { id:2,  title:"Shadow of the Dragon", info:"Action • 1992 • Crime Thriller",      image:shadowDragonImg,    rating:7.2, quality:"HD", year:1992, type:"Movie", genre:"Action",   released:"1992-08-21", videoUrl:DEMO_MP4_2, parts:null, downloadBase:"https://example.com/downloads/shadow-of-the-dragon" },
  { id:3,  title:"Midnight Revenge",     info:"Action • 1986 • Hong Kong Crime",     image:midnightRevengeImg, rating:6.9, quality:"HD", year:1986, type:"Movie", genre:"Action",   released:"1986-05-10", videoUrl:DEMO_MP4_3, parts:null, downloadBase:"https://example.com/downloads/midnight-revenge" },
  { id:4,  title:"Rise of the Warrior",  info:"Action • 2008 • The Scorpion King 2", image:scorpionKingImg,    rating:5.8, quality:"HD", year:2008, type:"Movie", genre:"Action",   released:"2008-08-19", videoUrl:DEMO_MP4,   parts:null, downloadBase:"https://example.com/downloads/rise-of-the-warrior" },
  { id:5,  title:"Iron Fist Legacy",     info:"Martial Arts • 2026 • Perfect",       image:ironFistImg,        rating:8.4, quality:"4K", year:2026, type:"Movie", genre:"Action",   released:"2026-01-15", videoUrl:DEMO_MP4,
    parts:[
      { part:1, title:"The Beginning",   duration:"1h 22m", quality:"4K", videoUrl:DEMO_MP4   },
      { part:2, title:"The Return",      duration:"1h 15m", quality:"4K", videoUrl:DEMO_MP4_2 },
      { part:3, title:"The Final Fight", duration:"1h 30m", quality:"4K", videoUrl:DEMO_MP4_3 },
    ],
    downloadBase:"https://example.com/downloads/iron-fist-legacy" },
  { id:6,  title:"Raudse Rusikaga",      info:"Drama • 2026 • Estonian Horror",      image:raudseRusikagaImg,  rating:7.5, quality:"HD", year:2026, type:"Movie", genre:"Horror",   released:"2026-02-01", videoUrl:DEMO_MP4_2, parts:null, downloadBase:"https://example.com/downloads/raudse-rusikaga" },
  { id:7,  title:"Bloodline Hunter",     info:"Action • 2026 • Perfect",             image:lastWarriorImg,     rating:8.1, quality:"4K", year:2026, type:"Movie", genre:"Action",   released:"2026-03-20", videoUrl:DEMO_MP4_3, parts:null, downloadBase:"https://example.com/downloads/bloodline-hunter" },
  { id:8,  title:"Crimson Horizon",      info:"Sci-Fi • 2025 • Kevin",               image:shadowDragonImg,    rating:7.9, quality:"HD", year:2025, type:"Movie", genre:"Sci-Fi",   released:"2025-11-05", videoUrl:DEMO_MP4,   parts:null, downloadBase:"https://example.com/downloads/crimson-horizon" },
  { id:9,  title:"Wrath of the King",    info:"Historical • 2024 • Chris",           image:extraImg,           rating:7.3, quality:"HD", year:2024, type:"Movie", genre:"Drama",    released:"2024-09-18", videoUrl:DEMO_MP4_2, parts:null, downloadBase:"https://example.com/downloads/wrath-of-the-king" },
  { id:10, title:"VisionQuest",          info:"Sci-Fi • 2026 • Marvel Television",    image:midnightRevengeImg, rating:8.6, quality:"4K", year:2026, type:"Movie", genre:"Sci-Fi",   released:"2026-04-02", videoUrl:DEMO_MP4_3, parts:null, downloadBase:"https://example.com/downloads/visionquest" },
];

export const series = [
  { id:11, title:"Dark Horizon",     info:"Thriller • 2026 • Season 1",  image:scorpionKingImg,   rating:8.0, quality:"HD", year:2026, type:"Series", genre:"Thriller", released:"2026-01-10", downloadBase:"https://example.com/downloads/dark-horizon",
    seasons:[{ season:1, episodes:[
      { ep:1, title:"Pilot",         duration:"45m", videoUrl:DEMO_MP4   },
      { ep:2, title:"First Contact", duration:"42m", videoUrl:DEMO_MP4_2 },
      { ep:3, title:"The Signal",    duration:"44m", videoUrl:DEMO_MP4_3 },
      { ep:4, title:"Into the Dark", duration:"48m", videoUrl:DEMO_MP4   },
      { ep:5, title:"Revelations",   duration:"46m", videoUrl:DEMO_MP4_2 },
      { ep:6, title:"Turning Point", duration:"43m", videoUrl:DEMO_MP4_3 },
      { ep:7, title:"The Hunt",      duration:"47m", videoUrl:DEMO_MP4   },
      { ep:8, title:"Season Finale", duration:"52m", videoUrl:DEMO_MP4_2 },
    ]}]},
  { id:12, title:"The Silent Order", info:"Mystery • 2025 • Season 2",   image:ironFistImg,       rating:7.7, quality:"HD", year:2025, type:"Series", genre:"Mystery",  released:"2025-06-14", downloadBase:"https://example.com/downloads/the-silent-order",
    seasons:[
      { season:1, episodes:[
        { ep:1, title:"The Oath",   duration:"44m", videoUrl:DEMO_MP4   },
        { ep:2, title:"Whispers",   duration:"41m", videoUrl:DEMO_MP4_2 },
        { ep:3, title:"The Ledger", duration:"45m", videoUrl:DEMO_MP4_3 },
        { ep:4, title:"Silence",    duration:"43m", videoUrl:DEMO_MP4   },
        { ep:5, title:"The Ritual", duration:"48m", videoUrl:DEMO_MP4_2 },
        { ep:6, title:"Reckoning",  duration:"50m", videoUrl:DEMO_MP4_3 },
      ]},
      { season:2, episodes:[
        { ep:1, title:"Rebirth",    duration:"46m", videoUrl:DEMO_MP4   },
        { ep:2, title:"The Return", duration:"44m", videoUrl:DEMO_MP4_2 },
        { ep:3, title:"Trust Fall", duration:"42m", videoUrl:DEMO_MP4_3 },
        { ep:4, title:"The Break",  duration:"47m", videoUrl:DEMO_MP4   },
        { ep:5, title:"Crossroads", duration:"45m", videoUrl:DEMO_MP4_2 },
        { ep:6, title:"Final Oath", duration:"53m", videoUrl:DEMO_MP4_3 },
      ]},
    ]},
  { id:13, title:"Echoes of War",    info:"Drama • 2026 • Season 1",     image:raudseRusikagaImg, rating:8.2, quality:"4K", year:2026, type:"Series", genre:"Drama",    released:"2026-02-20", downloadBase:"https://example.com/downloads/echoes-of-war",
    seasons:[{ season:1, episodes:[
      { ep:1, title:"Enlistment", duration:"50m", videoUrl:DEMO_MP4   },
      { ep:2, title:"The Front",  duration:"48m", videoUrl:DEMO_MP4_2 },
      { ep:3, title:"Brothers",   duration:"52m", videoUrl:DEMO_MP4_3 },
      { ep:4, title:"Loss",       duration:"49m", videoUrl:DEMO_MP4   },
      { ep:5, title:"The Return", duration:"51m", videoUrl:DEMO_MP4_2 },
      { ep:6, title:"Homecoming", duration:"58m", videoUrl:DEMO_MP4_3 },
    ]}]},
  { id:14, title:"Neon Streets",     info:"Cyberpunk • 2025 • Season 3", image:shadowDragonImg,   rating:7.4, quality:"HD", year:2025, type:"Series", genre:"Cyberpunk",released:"2025-09-03", downloadBase:"https://example.com/downloads/neon-streets",
    seasons:[
      { season:1, episodes:[
        { ep:1, title:"Jack In",   duration:"40m", videoUrl:DEMO_MP4   },
        { ep:2, title:"Neon Rain", duration:"42m", videoUrl:DEMO_MP4_2 },
        { ep:3, title:"Blackout",  duration:"41m", videoUrl:DEMO_MP4_3 },
      ]},
      { season:2, episodes:[
        { ep:1, title:"Reconnect",  duration:"43m", videoUrl:DEMO_MP4   },
        { ep:2, title:"Ghost Code", duration:"44m", videoUrl:DEMO_MP4_2 },
        { ep:3, title:"Overdrive",  duration:"45m", videoUrl:DEMO_MP4_3 },
      ]},
      { season:3, episodes:[
        { ep:1, title:"New Dawn",     duration:"46m", videoUrl:DEMO_MP4   },
        { ep:2, title:"The Grid",     duration:"44m", videoUrl:DEMO_MP4_2 },
        { ep:3, title:"Singularity",  duration:"48m", videoUrl:DEMO_MP4_3 },
        { ep:4, title:"Final Upload", duration:"55m", videoUrl:DEMO_MP4   },
      ]},
    ]},
  { id:15, title:"Kingdom Come",     info:"Fantasy • 2026 • Season 1",   image:lastWarriorImg,    rating:8.5, quality:"4K", year:2026, type:"Series", genre:"Fantasy",  released:"2026-05-01", downloadBase:"https://example.com/downloads/kingdom-come",
    seasons:[{ season:1, episodes:[
      { ep:1, title:"The Crown",     duration:"52m", videoUrl:DEMO_MP4   },
      { ep:2, title:"Rise of Kings", duration:"48m", videoUrl:DEMO_MP4_2 },
      { ep:3, title:"The Siege",     duration:"50m", videoUrl:DEMO_MP4_3 },
      { ep:4, title:"Betrayal",      duration:"47m", videoUrl:DEMO_MP4   },
      { ep:5, title:"The Alliance",  duration:"49m", videoUrl:DEMO_MP4_2 },
      { ep:6, title:"War Council",   duration:"51m", videoUrl:DEMO_MP4_3 },
      { ep:7, title:"The Battle",    duration:"56m", videoUrl:DEMO_MP4   },
      { ep:8, title:"Coronation",    duration:"60m", videoUrl:DEMO_MP4_2 },
      { ep:9, title:"Kingdom Come",  duration:"65m", videoUrl:DEMO_MP4_3 },
    ]}]},
];

export const allContent = [...movies, ...series];
export const findById = (id) => allContent.find((c) => c.id === Number(id)) || null;
export const findEpisode = (seriesItem, seasonNum, epNum) => {
  if (!seriesItem?.seasons) return null;
  const s = seriesItem.seasons.find((x) => x.season === seasonNum);
  return s?.episodes.find((e) => e.ep === epNum) || null;
};