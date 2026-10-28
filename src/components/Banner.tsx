import { ArrowRightIcon } from "lucide-react";

// The fields shown in the search bar at the bottom of the banner.
const searchFields = [
  { label: "Location", hint: "Address, City Or Zip" },
  { label: "Date/Duration", hint: "Anytime/ 3 Days" },
  { label: "Budget", hint: "$0-$3000" },
  { label: "People", hint: "5-10" },
];

// Hero section: background photo, headline, two buttons and a search bar.
export default function Banner() {
  return (
    <section
      className="relative flex min-h-[700px] flex-col bg-cover bg-center"
      style={{ backgroundImage: "url(/images/Banner.png)" }}
    >
      {/* Dark layer so the white text stays readable over the photo */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Middle: headline, subtitle and buttons */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-medium leading-tight text-white sm:text-6xl md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 rounded bg-cyan-600 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-cyan-700">
            Explore Now
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <button className="rounded bg-white/20 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/30">
            View Destination
          </button>
        </div>
      </div>

      {/* Bottom: search bar - one row on desktop, stacked form on smaller screens */}
      <div className="relative flex flex-col bg-black/50 backdrop-blur-sm lg:flex-row">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex-1 border-b border-white/20 px-6 py-3.5 lg:border-b-0 lg:border-r lg:py-4"
          >
            <p className="text-sm font-semibold text-white">{field.label}</p>
            <p className="text-xs text-white/70">{field.hint}</p>
          </div>
        ))}
        <button className="flex items-center justify-center bg-cyan-600 px-16 py-3.5 text-sm font-semibold text-white hover:bg-cyan-700">
          Search
        </button>
      </div>
    </section>
  );
}
