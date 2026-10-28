import Image from "next/image";

// The three reasons shown in the "Why Choose" cards.
const reasons = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    text: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    text: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    text: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

// "Why Choose Wanderlast" section: heading, subtitle and three cards.
export default function WhyChoose() {
  return (
    <section className="bg-sky-100 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-semibold text-gray-900 md:text-5xl">
          Why Choose Wanderlast
        </h2>
        <p className="mt-3 text-sm text-gray-500 md:text-base">
          Your trusted partner for exceptional travel experiences
        </p>

        {/* Three cards: one per row on phones, two on tablets, three on desktop */}
        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-md bg-white p-6 shadow-sm md:p-8"
            >
              <Image src={reason.icon} alt="" width={48} height={48} />
              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
