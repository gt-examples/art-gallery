import { T, Var } from "gt-next";
import { getGT } from "gt-next/server";
import { Currency, DateTime } from "gt-next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { artworks, getArtworkBySlug, getArtistBySlug, type Medium } from "@/data/artworks";

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
  return artworks.map((a) => ({ slug: a.slug }));
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  const artist = getArtistBySlug(artwork.artistSlug);
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

  const artworkDescriptions: Record<string, string> = {
    "chromatic-reverie": gt("A luminous exploration of color and memory, this large-scale oil painting layers translucent glazes to create a shimmering, dreamlike atmosphere. Vasquez draws on the tradition of Mexican muralism while pushing into pure abstraction, letting hue and saturation carry the emotional narrative."),
    "floating-gardens": gt("Inspired by the gardens of Kyoto, this watercolor captures the transient beauty of reflected light on water. Tanaka uses the wet-on-wet technique to let pigments bloom and merge, evoking the gentle impermanence at the heart of Japanese aesthetics."),
    "urban-fragments": gt("A bold, large-format painting that deconstructs the visual language of the modern city. Dubois collages photographic transfers with thick acrylic impasto, creating tension between the flat documentary image and the gestural, physical paint surface."),
    "threshold-states": gt("An immersive mixed-media work exploring the liminal spaces between waking and sleeping. Lindqvist combines hand-dyed textiles, encaustic wax, and graphite drawing into a richly layered surface that invites prolonged contemplation."),
    "monument-to-silence": gt("A commanding marble sculpture that evokes the weight of unspoken words. Rinaldi carves negative space as deliberately as solid form, creating openings through which light passes and transforms the piece depending on the time of day."),
    "light-and-dust": gt("A series of large-format photographs documenting the interplay of natural light and airborne particles in abandoned architectural spaces across West Africa. Asante's patient, contemplative approach reveals unexpected beauty in decay and impermanence."),
  };

  const artworkTechniques: Record<string, string> = {
    "chromatic-reverie": gt("Built up over months with dozens of thin oil glazes on linen canvas, each layer modifying the color beneath. The surface has a jewel-like depth that shifts under different lighting conditions."),
    "floating-gardens": gt("Wet-on-wet watercolor on handmade washi paper. Pigments are allowed to flow freely, with selective dry-brush details added in final passes to anchor the composition."),
    "urban-fragments": gt("Acrylic paint combined with photo-transfer and collage elements on stretched canvas. Heavy impasto passages contrast with smooth, photographic areas."),
    "threshold-states": gt("Encaustic wax, hand-dyed linen, graphite, and found textile fragments assembled on a wooden panel. Each material responds differently to light, creating a surface that changes throughout the day."),
    "monument-to-silence": gt("Hand-carved Carrara marble, finished with a combination of polished and rough-hewn surfaces. The interplay between smooth and textured areas guides the viewer's eye through the form."),
    "light-and-dust": gt("Shot on medium-format film using long exposures to capture the movement of dust through shafts of natural light. Printed as archival pigment prints on cotton rag paper."),
  };

  const artistBios: Record<string, string> = {
    "elena-vasquez": gt("Elena Vasquez is a painter working at the intersection of abstraction and the Mexican muralist tradition. After studying at the National Autonomous University of Mexico, she spent five years in Berlin before returning to Mexico City, where she maintains a large studio practice."),
    "hiroshi-tanaka": gt("Hiroshi Tanaka is a watercolorist and paper artist based in Kyoto. Trained in both traditional nihonga techniques and Western watercolor, he creates works that bridge Eastern and Western painting traditions."),
    "marie-dubois": gt("Marie Dubois is a French painter and mixed-media artist whose work examines urban life and architectural transformation. A graduate of the Beaux-Arts de Paris, she has exhibited widely across Europe."),
    "anders-lindqvist": gt("Anders Lindqvist is a Swedish artist whose practice spans painting, textile work, and installation. His work investigates states of consciousness and the boundaries between interior and exterior experience."),
    "sofia-rinaldi": gt("Sofia Rinaldi is an Italian sculptor known for her monumental marble works. Working from a studio near the quarries of Carrara, she draws on the deep tradition of Italian stone carving while pursuing a resolutely contemporary formal language."),
    "kwame-asante": gt("Kwame Asante is a Ghanaian photographer and visual artist whose work documents architecture, light, and space across West Africa. Self-taught, he developed his distinctive style through years of exploring abandoned and transitional structures."),
  };

  const exhibitionHistory: Record<string, string[]> = {
    "chromatic-reverie": [gt("Museo de Arte Moderno, Mexico City, 2023"), gt("Galerie Nord, Berlin, 2024"), gt("Art Gallery, Current Exhibition, 2026")],
    "floating-gardens": [gt("Kyoto Municipal Museum of Art, 2024"), gt("Watercolor Biennale, Fabriano, 2025"), gt("Art Gallery, Current Exhibition, 2026")],
    "urban-fragments": [gt("Centre Pompidou (project room), Paris, 2022"), gt("MACBA, Barcelona, 2023"), gt("Art Gallery, Current Exhibition, 2026")],
    "threshold-states": [gt("Moderna Museet, Stockholm, 2025"), gt("Nordic Pavilion, Venice Architecture Biennale, 2025"), gt("Art Gallery, Current Exhibition, 2026")],
    "monument-to-silence": [gt("Galleria degli Uffizi (contemporary wing), Florence, 2024"), gt("Sculpture Garden, Yorkshire, 2025"), gt("Art Gallery, Current Exhibition, 2026")],
    "light-and-dust": [gt("National Museum of Ghana, Accra, 2025"), gt("Lagos Photo Festival, 2025"), gt("Art Gallery, Current Exhibition, 2026")],
  };

  const title = artworkTitles[slug] || slug;
  const description = artworkDescriptions[slug];
  const technique = artworkTechniques[slug];
  const bio = artistBios[artwork.artistSlug];
  const history = exhibitionHistory[slug] || [];

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {gt("Back to Gallery")}
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-neutral-100">{title}</h1>
            <MediumBadge medium={artwork.medium} label={mediumLabels[artwork.medium]} />
          </div>
          <T>
            <p className="text-base text-neutral-400">
              by{" "}
              <Link href={`/artist/${artwork.artistSlug}`} className="text-neutral-300 hover:text-white underline underline-offset-2 transition-colors">
                <Var>{artwork.artist}</Var>
              </Link>
              , <Var>{String(artwork.year)}</Var>
            </p>
          </T>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="md:col-span-2 space-y-6">
            {description && (
              <div>
                <T>
                  <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">About This Work</h2>
                </T>
                <p className="text-base text-neutral-300 leading-relaxed">{description}</p>
              </div>
            )}
            {technique && (
              <div>
                <T>
                  <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">Technique</h2>
                </T>
                <p className="text-sm text-neutral-400 leading-relaxed">{technique}</p>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <T>
              <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900/50">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">Details</h3>
                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Medium</dt>
                    <dd className="text-neutral-200"><Var>{mediumLabels[artwork.medium]}</Var></dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Dimensions</dt>
                    <dd className="text-neutral-200"><Var>{artwork.dimensions}</Var></dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Year</dt>
                    <dd className="text-neutral-200"><Var>{String(artwork.year)}</Var></dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Price</dt>
                    <dd className="text-neutral-200 font-semibold"><Currency currency="USD">{artwork.price}</Currency></dd>
                  </div>
                </dl>
              </div>
            </T>

            <T>
              <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900/50">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">On Display</h3>
                <p className="text-sm text-neutral-300">
                  <DateTime>{new Date(artwork.exhibitionStart)}</DateTime>
                  {" - "}
                  <DateTime>{new Date(artwork.exhibitionEnd)}</DateTime>
                </p>
              </div>
            </T>
          </div>
        </div>

        {artist && bio && (
          <section className="border-t border-neutral-800 pt-8 mb-12">
            <T>
              <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">About the Artist</h2>
            </T>
            <p className="text-sm text-neutral-400 leading-relaxed mb-3">{bio}</p>
            <T>
              <Link href={`/artist/${artist.slug}`} className="text-sm text-neutral-300 hover:text-white underline underline-offset-2 transition-colors">
                View all works by <Var>{artist.name}</Var>
              </Link>
            </T>
          </section>
        )}

        {history.length > 0 && (
          <section className="border-t border-neutral-800 pt-8">
            <T>
              <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Exhibition History</h2>
            </T>
            <ul className="space-y-2">
              {history.map((entry, i) => (
                <li key={i} className="text-sm text-neutral-400 flex items-start gap-2">
                  <span className="mt-1.5 block w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
                  {entry}
                </li>
              ))}
            </ul>
          </section>
        )}
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
