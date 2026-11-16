const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const POSTER_PLACEHOLDER =
  'data:image/svg+xml;base64,' +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
    <rect fill="#151b32" width="500" height="750"/>
    <text x="250" y="375" fill="#4a5568" font-family="sans-serif" font-size="24"
      text-anchor="middle" dominant-baseline="middle">No Poster</text>
  </svg>`)

export function tmdbImage(path, size = 'w500') {
  if (!path) return POSTER_PLACEHOLDER
  return `${IMAGE_BASE}/${size}${path}`
}