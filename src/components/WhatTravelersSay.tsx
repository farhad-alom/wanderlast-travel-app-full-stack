import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

const testimonials = [
    {
        id: 1,
        quote:
            "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
        name: "Michael Chen",
        location: "Singapore",
        image: "/images/person1.png",
    },
    {
        id: 2,
        quote:
            "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
        name: "Sarah Johnson",
        location: "New York, USA",
        image: "/images/person2.png",
    },
    {
        id: 3,
        quote:
            "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
        name: "Michael Chen",
        location: "Singapore",
        image: "/images/person1.png",
    },
    {
        id: 4,
        quote:
            "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
        name: "Sarah Johnson",
        location: "New York, USA",
        image: "/images/person2.png",
    },
];

// অ্যারো বাটনের স্টাইল (দুটোতেই একই)
const arrowStyle = "static! size-12! border-neutral-300 text-neutral-400";

export default function WhatTravelersSay() {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-12 lg:py-20">
            <Carousel opts={{ align: "start", loop: true }}>
                {/* উপরের অংশ: হেডিং (বামে) + অ্যারো (ডানে) */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
                            What Travelers Say
                        </h2>
                        <p className="mt-2 text-sm text-neutral-500">
                            Real experiences from our happy travelers
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <CarouselPrevious className={arrowStyle} />
                        <CarouselNext className={arrowStyle} />
                    </div>
                </div>

                {/* কার্ড স্লাইডার: ট্যাবলেট/ডেস্কটপে ২টা, মোবাইলে ১টা */}
                <CarouselContent className="mt-8">
                    {testimonials.map((t) => (
                        <CarouselItem key={t.id} className="md:basis-1/2">
                            <article className="flex h-full flex-col-reverse gap-4 border border-neutral-200 p-4 sm:flex-row">
                                {/* লেখা */}
                                <div className="flex flex-1 flex-col justify-between gap-6">
                                    <p className="text-sm leading-snug sm:text-base">
                                        “{t.quote}”
                                    </p>

                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#1596b3]">—</span>
                                        <div>
                                            <p className="text-[#1596b3]">{t.name}</p>
                                            <p className="text-xs text-neutral-500">{t.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ছবি */}
                                <div className="relative aspect-square w-full shrink-0 sm:aspect-auto sm:w-36 lg:w-48">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        fill
                                        sizes="(min-width: 1024px) 192px, (min-width: 640px) 144px, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                            </article>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}