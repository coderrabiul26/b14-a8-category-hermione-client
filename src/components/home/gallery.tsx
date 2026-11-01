import { Shirt, Trash2, Sprout, Stethoscope, HandHeart, Megaphone } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";

interface GalleryPhoto {
  caption: string;
  label: string;
  image?: string;
}

const PHOTOS: GalleryPhoto[] = [
  { caption: "Winter cloth distribution", label: "Mirpur, Dhaka", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsc00868TenUnyCLFOyR4QcnBehJGz2WTDwM8E5Uq6UQ&s=10' },
  { caption: "Neighborhood cleanup drive", label: "Turag Riverside", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtcNeagac442-vbMLQHA--yEx83PDgceBvExf4CFStlA&s=10'},
  { caption: "Free eye & health camp", label: "Savar Community Center", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMz41jWSORNjiVxduohJuUKiuWwWklxOWPMKMEVJyQQw&s=10' },
  { caption: "Harvest support for farmers", label: "Gazipur Village", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShM_VtGxQXJGvgbtSrCveR2xfthHBkGulf8uIGd1Pf7Q&s=10' },
  { caption: "Food donation run", label: "Keraniganj", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW4sJ8wlaBmDNe4uIj0MkcqpguvPetveuJXFCF2mR3Gg&s=10' },
  { caption: "Climate awareness rally", label: "University of Dhaka", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlB1hfmlZLmOM2-9RvRK0ve-_9b7mS-duBNoaBgVlsrg&s=10' },
];

export function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <header className="mb-10 flex flex-col items-start gap-3">
        <span className="text-sm font-bold tracking-widest text-primary uppercase">
          Moments of kindness
        </span>
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          From Our Past Events
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Glimpses of the communities we have served together — one event, one
          smile at a time.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {PHOTOS.map((photo, index) => (
          <figure
            key={photo.caption}
            className={
              "group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/40 via-muted/30 to-secondary/50 " +
              (index % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]")
            }
          >
            {photo.image ? (
              // Real photograph once added — plain img keeps static export simple.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.image}
                alt={photo.caption}
                className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 grid place-items-center">
                <photo.imageUrl
                  aria-hidden
                  className="size-8 text-primary/30 transition-transform duration-300 group-hover:scale-110"
                />
              </span>
            )}

            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-foreground/0 p-3 pt-8 text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
              <p className="text-sm font-semibold">{photo.caption}</p>
              <p className="text-xs opacity-80">{photo.label}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
