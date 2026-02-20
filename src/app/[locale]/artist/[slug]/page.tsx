import { T, Var } from "gt-next";
import { getGT } from "gt-next/server";
import { Currency, DateTime } from "gt-next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { artists, getArtistBySlug, getArtworksByArtist, type Medium } from "@/data/artworks";

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
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded border ${colors[medium]}`}>
      {label}
    </span>
  );
}

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const works = getArtworksByArtist(slug);
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

  const artistBios: Record<string, string> = {
    "elena-vasquez": gt("Elena Vasquez is a painter working at the intersection of abstraction and the Mexican muralist tradition. After studying at the National Autonomous University of Mexico, she spent five years in Berlin before returning to Mexico City, where she maintains a large studio practice. Her work has been exhibited internationally and is held in collections across the Americas and Europe."),
    "hiroshi-tanaka": gt("Hiroshi Tanaka is a watercolorist and paper artist based in Kyoto. Trained in both traditional nihonga techniques and Western watercolor, he creates works that bridge Eastern and Western painting traditions. His meditative process is deeply influenced by Zen Buddhist practice and the seasonal rhythms of the Kyoto landscape."),
    "marie-dubois": gt("Marie Dubois is a French painter and mixed-media artist whose work examines urban life and architectural transformation. A graduate of the Beaux-Arts de Paris, she has exhibited widely across Europe. Her paintings combine photographic imagery with gestural abstraction, reflecting the layered histories embedded in city spaces."),
    "anders-lindqvist": gt("Anders Lindqvist is a Swedish artist whose practice spans painting, textile work, and installation. His work investigates states of consciousness and the boundaries between interior and exterior experience. Based in Stockholm, he has held residencies at institutions across Scandinavia and participated in numerous group exhibitions."),
    "sofia-rinaldi": gt("Sofia Rinaldi is an Italian sculptor known for her monumental marble works. Working from a studio near the quarries of Carrara, she draws on the deep tradition of Italian stone carving while pursuing a resolutely contemporary formal language. Her sculptures are installed in public and private collections throughout Europe."),
    "kwame-asante": gt("Kwame Asante is a Ghanaian photographer and visual artist whose work documents architecture, light, and space across West Africa. Self-taught, he developed his distinctive style through years of exploring abandoned and transitional structures. His photographs reveal the quiet poetry of neglected spaces."),
  };

  const artistStatements: Record<string, string> = {
    "elena-vasquez": gt("I think of color as a language unto itself, one that can speak across cultures without needing translation. Each layer of paint is a sentence, and the final surface is a conversation between all of them."),
    "hiroshi-tanaka": gt("Water teaches patience. Every session at the paper begins with listening to the material, understanding what it will and will not accept. The garden paintings are not depictions but collaborations with the medium."),
    "marie-dubois": gt("The city is never finished. I am drawn to the moments when one version of a place shows through another, the palimpsest of demolition and construction that defines urban experience."),
    "anders-lindqvist": gt("The space between sleep and waking is where my work lives. I want the viewer to feel that same uncertainty, that gentle dissolution of boundaries between self and surroundings."),
    "sofia-rinaldi": gt("Marble remembers everything. The pressure, the heat, the millions of years of transformation. When I carve, I am not imposing a form but releasing one that the stone has been holding."),
    "kwame-asante": gt("I photograph what most people walk past. The crack in the wall where light enters, the dust suspended in an empty room. These quiet moments contain entire histories."),
  };

  const nationalityLabels: Record<string, string> = {
    "Mexican": gt("Mexican"),
    "Japanese": gt("Japanese"),
    "French": gt("French"),
    "Swedish": gt("Swedish"),
    "Italian": gt("Italian"),
    "Ghanaian": gt("Ghanaian"),
  };

  const basedInLabels: Record<string, string> = {
    "Mexico City": gt("Mexico City"),
    "Kyoto": gt("Kyoto"),
    "Paris": gt("Paris"),
    "Stockholm": gt("Stockholm"),
    "Florence": gt("Florence"),
    "Accra": gt("Accra"),
  };

  const bio = artistBios[slug];
  const statement = artistStatements[slug];

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {gt("Back to Gallery")}
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-100 mb-2">{artist.name}</h1>
          <T>
            <p className="text-sm text-neutral-400">
              <Var>{nationalityLabels[artist.nationality]}</Var> · b. <Var>{String(artist.birthYear)}</Var> · Based in <Var>{basedInLabels[artist.basedIn]}</Var>
            </p>
          </T>
        </div>

        {bio && (
          <section className="mb-10">
            <T>
              <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">Biography</h2>
            </T>
            <p className="text-base text-neutral-300 leading-relaxed">{bio}</p>
          </section>
        )}

        {statement && (
          <section className="mb-10 border-l-2 border-neutral-800 pl-5">
            <T>
              <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">Artist Statement</h2>
            </T>
            <p className="text-sm text-neutral-400 italic leading-relaxed">{statement}</p>
          </section>
        )}

        <section className="border-t border-neutral-800 pt-8">
          <T>
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-6">Works in This Exhibition</h2>
          </T>
          <div className="grid gap-4 sm:grid-cols-2">
            {works.map((artwork) => (
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
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {artwork.dimensions} · {String(artwork.year)}
                    </p>
                  </div>
                  <MediumBadge medium={artwork.medium} label={mediumLabels[artwork.medium]} />
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
                      <p className="text-xs text-neutral-500 mb-1">On display</p>
                      <p className="text-sm text-neutral-300">
                        <DateTime>{new Date(artwork.exhibitionStart)}</DateTime>
                        {" - "}
                        <DateTime>{new Date(artwork.exhibitionEnd)}</DateTime>
                      </p>
                    </div>
                  </T>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <T>
            <p className="text-xs text-neutral-600">
              Built with General Translation and Next.js to demonstrate multilingual art gallery exhibitions.
            </p>
          </T>
        </div>
      </footer>
    </div>
  );
}
