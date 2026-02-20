export type Medium = "oil" | "watercolor" | "acrylic" | "mixed" | "sculpture" | "photography";

export interface Artwork {
  id: number;
  slug: string;
  artistSlug: string;
  artist: string;
  medium: Medium;
  price: number;
  currency: "USD";
  year: number;
  exhibitionStart: string;
  exhibitionEnd: string;
  dimensions: string;
}

export interface Artist {
  slug: string;
  name: string;
  birthYear: number;
  nationality: string;
  basedIn: string;
}

export const artists: Artist[] = [
  { slug: "elena-vasquez", name: "Elena Vasquez", birthYear: 1985, nationality: "Mexican", basedIn: "Mexico City" },
  { slug: "hiroshi-tanaka", name: "Hiroshi Tanaka", birthYear: 1978, nationality: "Japanese", basedIn: "Kyoto" },
  { slug: "marie-dubois", name: "Marie Dubois", birthYear: 1990, nationality: "French", basedIn: "Paris" },
  { slug: "anders-lindqvist", name: "Anders Lindqvist", birthYear: 1982, nationality: "Swedish", basedIn: "Stockholm" },
  { slug: "sofia-rinaldi", name: "Sofia Rinaldi", birthYear: 1975, nationality: "Italian", basedIn: "Florence" },
  { slug: "kwame-asante", name: "Kwame Asante", birthYear: 1992, nationality: "Ghanaian", basedIn: "Accra" },
];

export const artworks: Artwork[] = [
  {
    id: 1, slug: "chromatic-reverie", artistSlug: "elena-vasquez",
    artist: "Elena Vasquez", medium: "oil", price: 12500, currency: "USD",
    year: 2023, exhibitionStart: "2026-03-01", exhibitionEnd: "2026-05-15", dimensions: "120 x 90 cm",
  },
  {
    id: 2, slug: "floating-gardens", artistSlug: "hiroshi-tanaka",
    artist: "Hiroshi Tanaka", medium: "watercolor", price: 8200, currency: "USD",
    year: 2024, exhibitionStart: "2026-03-01", exhibitionEnd: "2026-05-15", dimensions: "80 x 60 cm",
  },
  {
    id: 3, slug: "urban-fragments", artistSlug: "marie-dubois",
    artist: "Marie Dubois", medium: "acrylic", price: 15750, currency: "USD",
    year: 2022, exhibitionStart: "2026-06-01", exhibitionEnd: "2026-08-30", dimensions: "150 x 100 cm",
  },
  {
    id: 4, slug: "threshold-states", artistSlug: "anders-lindqvist",
    artist: "Anders Lindqvist", medium: "mixed", price: 9800, currency: "USD",
    year: 2025, exhibitionStart: "2026-06-01", exhibitionEnd: "2026-08-30", dimensions: "100 x 100 cm",
  },
  {
    id: 5, slug: "monument-to-silence", artistSlug: "sofia-rinaldi",
    artist: "Sofia Rinaldi", medium: "sculpture", price: 22000, currency: "USD",
    year: 2024, exhibitionStart: "2026-09-01", exhibitionEnd: "2026-11-30", dimensions: "45 x 30 x 60 cm",
  },
  {
    id: 6, slug: "light-and-dust", artistSlug: "kwame-asante",
    artist: "Kwame Asante", medium: "photography", price: 5400, currency: "USD",
    year: 2025, exhibitionStart: "2026-09-01", exhibitionEnd: "2026-11-30", dimensions: "90 x 60 cm",
  },
];

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getArtworksByArtist(artistSlug: string): Artwork[] {
  return artworks.filter((a) => a.artistSlug === artistSlug);
}
