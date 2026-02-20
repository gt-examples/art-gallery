import { T } from "gt-next";
import { getGT } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import { Currency, DateTime } from "gt-next";

const artworks = [
  {
    id: 1,
    artist: "Elena Vasquez",
    medium: "oil" as const,
    price: 12500,
    currency: "USD" as const,
    year: 2023,
    exhibitionStart: "2026-03-01",
    exhibitionEnd: "2026-05-15",
    dimensions: "120 x 90 cm",
  },
  {
    id: 2,
    artist: "Hiroshi Tanaka",
    medium: "watercolor" as const,
    price: 8200,
    currency: "USD" as const,
    year: 2024,
    exhibitionStart: "2026-03-01",
    exhibitionEnd: "2026-05-15",
    dimensions: "80 x 60 cm",
  },
  {
    id: 3,
    artist: "Marie Dubois",
    medium: "acrylic" as const,
    price: 15750,
    currency: "USD" as const,
    year: 2022,
    exhibitionStart: "2026-06-01",
    exhibitionEnd: "2026-08-30",
    dimensions: "150 x 100 cm",
  },
  {
    id: 4,
    artist: "Anders Lindqvist",
    medium: "mixed" as const,
    price: 9800,
    currency: "USD" as const,
    year: 2025,
    exhibitionStart: "2026-06-01",
    exhibitionEnd: "2026-08-30",
    dimensions: "100 x 100 cm",
  },
  {
    id: 5,
    artist: "Sofia Rinaldi",
    medium: "sculpture" as const,
    price: 22000,
    currency: "USD" as const,
    year: 2024,
    exhibitionStart: "2026-09-01",
    exhibitionEnd: "2026-11-30",
    dimensions: "45 x 30 x 60 cm",
  },
  {
    id: 6,
    artist: "Kwame Asante",
    medium: "photography" as const,
    price: 5400,
    currency: "USD" as const,
    year: 2025,
    exhibitionStart: "2026-09-01",
    exhibitionEnd: "2026-11-30",
    dimensions: "90 x 60 cm",
  },
];

type Medium = "oil" | "watercolor" | "acrylic" | "mixed" | "sculpture" | "photography";

function MediumBadge({ medium, label }: { medium: Medium; label: string }) {
  const colors: Record<Medium, string> = {
    oil: "bg-amber-900/40 text-amber-400 border-amber-800/50",
    watercolor: "bg-sky-900/40 text-sky-400 border-sky-800/50",
    acrylic: "bg-violet-900/40 text-violet-400 border-violet-800/50",
    mixed: "bg-emerald-900/40 text-emerald-400 border-emerald-800/50",
    sculpture: "bg-rose-900/40 text-rose-400 border-rose-800/50",
    photography: "bg-neutral-800/60 text-neutral-300 border-neutral-700/50",
  };
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded border ${colors[medium]}`}
    >
      {label}
    </span>
  );
}

export default async function Home() {
  const gt = await getGT();

  const mediumLabels: Record<Medium, string> = {
    oil: gt("Oil on Canvas"),
    watercolor: gt("Watercolor"),
    acrylic: gt("Acrylic"),
    mixed: gt("Mixed Media"),
    sculpture: gt("Sculpture"),
    photography: gt("Photography"),
  };

  // Group by exhibition period
  const exhibitions = [
    {
      artworks: artworks.filter((a) => a.exhibitionStart === "2026-03-01"),
      start: "2026-03-01",
      end: "2026-05-15",
    },
    {
      artworks: artworks.filter((a) => a.exhibitionStart === "2026-06-01"),
      start: "2026-06-01",
      end: "2026-08-30",
    },
    {
      artworks: artworks.filter((a) => a.exhibitionStart === "2026-09-01"),
      start: "2026-09-01",
      end: "2026-11-30",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://generaltranslation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              General Translation
            </a>
            <span className="text-neutral-700">/</span>
            <h1 className="text-sm font-semibold text-neutral-100">
              {gt("Art Gallery")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gt-examples/art-gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="View on GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <LocaleSelector />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="mb-12">
          <T>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
              Current Exhibitions
            </h2>
            <p className="text-base text-neutral-400 max-w-2xl leading-relaxed">
              Explore our curated collection featuring works across diverse
              media. Prices, dates, and artist details are presented in your
              preferred language.
            </p>
          </T>
          <T>
            <p className="mt-4 text-xs text-neutral-600 max-w-2xl">
              This is an example application built with General Translation to
              demonstrate internationalization of art gallery data including
              currency formatting, date localization, and translated medium
              types.
            </p>
          </T>
        </div>

        {/* Exhibitions */}
        {exhibitions.map((exhibition, i) => (
          <section key={i} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-neutral-800" />
              <T>
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider whitespace-nowrap">
                  Exhibition{" "}
                  <DateTime>{new Date(exhibition.start)}</DateTime>
                  {" -- "}
                  <DateTime>{new Date(exhibition.end)}</DateTime>
                </span>
              </T>
              <div className="h-px flex-1 bg-neutral-800" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {exhibition.artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="border border-neutral-800 rounded-lg p-5 bg-neutral-900/50 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-100">
                        {artwork.artist}
                      </h3>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {artwork.dimensions} · {String(artwork.year)}
                        </p>
                    </div>
                    <MediumBadge
                      medium={artwork.medium}
                      label={mediumLabels[artwork.medium]}
                    />
                  </div>

                  <div className="flex items-end justify-between mt-4 pt-3 border-t border-neutral-800/50">
                    <T>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Price</p>
                        <p className="text-lg font-semibold text-neutral-100">
                          <Currency currency="USD">{artwork.price}</Currency>
                        </p>
                      </div>
                    </T>
                    <T>
                      <div className="text-right">
                        <p className="text-xs text-neutral-500 mb-1">
                          On display
                        </p>
                        <p className="text-sm text-neutral-300">
                          <DateTime>
                            {new Date(artwork.exhibitionStart)}
                          </DateTime>
                          {" - "}
                          <DateTime>
                            {new Date(artwork.exhibitionEnd)}
                          </DateTime>
                        </p>
                      </div>
                    </T>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <T>
            <p className="text-xs text-neutral-600">
              Built with General Translation and Next.js to demonstrate
              multilingual art gallery exhibitions.
            </p>
          </T>
        </div>
      </footer>
    </div>
  );
}
