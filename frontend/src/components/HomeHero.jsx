import { ArrowRight, Armchair } from "lucide-react";
import { Link } from "react-router";

export function HomeHero() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/herobg.jpg"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          aria-hidden="true"
          className="h-full w-full scale-105 object-cover blur-[2px]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/75 via-neutral-950/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[500px] max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 md:min-h-[560px] md:px-16 lg:min-h-[620px] lg:px-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-amber-400" />
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
              <Armchair className="h-4 w-4 text-amber-400" strokeWidth={1.75} />
              Furnixa
            </span>
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            Furniture that's easy to
            <br className="hidden sm:block" />
            <span className="text-amber-300"> live with</span>, and easy to
            build
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-100 drop-shadow-sm sm:text-lg sm:leading-8">
            Thoughtfully crafted pieces for every room — and{" "}
            <span style={{ color: "rgba(255, 210, 48)" }}>
              {" "}
              a real person on video to walk you through assembly.
            </span>{" "}
            No risks, no guesswork.
          </p>

          <div className="mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
}
