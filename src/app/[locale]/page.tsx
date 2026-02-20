import { T, Var } from "gt-next";
import { getGT } from "gt-next/server";
import { Currency, DateTime } from "gt-next";
import Link from "next/link";
import Header from "@/components/Header";
import { artworks, type Medium } from "@/data/artworks";

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

  const artworkTitles: Record<string, string> = {
    "chromatic-reverie": gt("Chromatic Reverie"),
    "floating-gardens": gt("Floating Gardens"),
    "urban-fragments": gt("Urban Fragments"),
    "threshold-states": gt("Threshold States"),
    "monument-to-silence": gt("Monument to Silence"),
    "light-and-dust": gt("Light and Dust"),
  };

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
      <Header />

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
                <Link
                  key={artwork.id}
                  href={`/artwork/${artwork.slug}`}
                  className="border border-neutral-800 rounded-lg p-5 bg-neutral-900/50 hover:border-neutral-700 transition-colors block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-neutral-100">
                        {artworkTitles[artwork.slug]}
                      </h3>
                      <T>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          by <Var>{artwork.artist}</Var> · <Var>{artwork.dimensions}</Var> · <Var>{String(artwork.year)}</Var>
                        </p>
                      </T>
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
                </Link>
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
