"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { PROATOPS } from "@/config/proatops";

const { partners, foundingBand } = PROATOPS;

/**
 * The credibility sequence that closes the above-the-fold film: a warm paper
 * strip carrying the partner marks, then a dark band that hands off to the
 * body of the site.
 *
 * On logos — each entry in `partners.items` renders its `logo` file when one
 * is set and a typographic wordmark otherwise. No third-party mark is ever
 * approximated in code: an invented logo is worse than an honest wordmark, so
 * the fallback is type, not a drawing. Drop real files in /public/partners and
 * point `logo` at them.
 */

function PartnerMark({
  item,
}: {
  item: (typeof partners.items)[number];
}) {
  /* A supplied mark replaces the name outright — showing both would read as a
     caption on a logo, which is not how a credibility row works. The name
     survives as alt text, so it is still announced and still indexed. */
  if (item.logo) {
    return (
      <Image
        src={item.logo.src}
        alt={item.name}
        width={item.logo.w}
        height={item.logo.h}
        className="w-auto object-contain"
        style={{ height: item.logo.display }}
        priority={false}
      />
    );
  }

  return (
    <span className="flex flex-col items-center leading-none">
      <span className="whitespace-nowrap font-sans text-[1.0625rem] font-bold leading-none tracking-[-0.01em] text-[#15181A] sm:text-[1.1875rem]">
        {item.name}
      </span>
      {item.sub && (
        /* Was 8px at 55% ink on phones — unreadable. Size and contrast up,
           tracking down, so the lockup stays about as wide as it was. */
        <span className="mt-1.5 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#15181A]/70 sm:text-[0.6875rem]">
          {item.sub}
        </span>
      )}
    </span>
  );
}

export default function Partners() {
  return (
    <>
      {/* ---- warm paper credibility strip ---- */}
      <section
        aria-label={partners.label}
        className="relative border-y border-black/[0.07] bg-pa-paper"
      >
        {/* A whisper of warmth so the paper isn't a flat swatch. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%, rgba(255,255,255,0.8) 0%, transparent 60%)",
          }}
        />

        <div className="shell-x relative z-[1] mx-auto max-w-shell">
          <div className="flex flex-col gap-6 py-9 lg:flex-row lg:items-center lg:gap-10 lg:py-8">
            <Reveal y={12} blur={false} className="shrink-0">
              <div className="flex items-center gap-4">
                <span className="whitespace-nowrap font-mono text-mono-xs uppercase tracking-micro text-[#15181A]/70">
                  {partners.label}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-px w-12 bg-black/20 lg:block"
                />
              </div>
            </Reveal>

            <ul className="rail -mx-5 flex items-center gap-0 overflow-x-auto px-5 lg:mx-0 lg:flex-1 lg:justify-between lg:overflow-visible lg:px-0">
              {partners.items.map((item, i) => (
                <li
                  key={item.name}
                  className={`flex shrink-0 items-center lg:flex-1 lg:justify-center ${
                    i > 0 ? "border-l border-black/[0.12]" : ""
                  }`}
                >
                  <Reveal
                    delay={0.06 * i}
                    y={12}
                    blur={false}
                    className="px-7 sm:px-9 lg:px-4"
                  >
                    <span className="block opacity-80 transition-opacity duration-300 ease-op-editorial hover:opacity-100">
                      <PartnerMark item={item} />
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- dark band: the handoff out of the hero sequence ---- */}
      <section
        aria-label={foundingBand.label}
        className="grain grain-dark relative overflow-hidden bg-pa-ink"
      >
        {/* Hairline of red at the seam, echoing the crown light in the hero. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,31,45,0.5) 18%, rgba(255,31,45,0.18) 52%, transparent 88%)",
          }}
        />

        <div className="shell-x relative z-[1] mx-auto max-w-shell">
          <div className="flex flex-col gap-6 py-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-8">
            <Reveal y={10} blur={false}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                <span
                  aria-hidden="true"
                  className="text-[15px] leading-none text-pa-red"
                >
                  +
                </span>
                <span className="font-mono text-mono-xs uppercase tracking-micro text-pa-chalk-2">
                  {foundingBand.label}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={10} blur={false}>
              <div className="flex items-center gap-6">
                <span
                  aria-hidden="true"
                  className="hidden h-px w-14 bg-pa-hair-2 lg:block"
                />
                <p className="font-mono text-mono-xs uppercase leading-[1.85] tracking-micro text-pa-chalk-3">
                  {foundingBand.statement.map((line) => (
                    <span key={line} className="block lg:text-right">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
