import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function YourJourney() {
    return (
        <section className="relative flex min-h-80 items-center justify-center overflow-hidden px-4 py-16 text-center text-white md:min-h-100">
            {/* ব্যাকগ্রাউন্ড ইমেজ */}
            <Image
                src="/images/CTA.png"
                alt="Airplane flying over islands"
                fill
                className="object-cover"
            />

            {/* কালো ওভারলে (লেখা পড়ার সুবিধার জন্য) */}
            <div className="absolute inset-0 bg-black/40" />

            {/* লেখা ও বাটন */}
            <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-light sm:text-4xl md:text-5xl">
                    Ready To Start Your Journey?
                </h2>

                <p className="mt-3 text-sm sm:text-base">
                    Join thousands of travelers who have discovered the world with us
                </p>

                <button className="mt-6 inline-flex items-center gap-3 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100">
                    BOOK YOUR TRIP TODAY
                    <ArrowRight className="size-4" />
                </button>
            </div>
        </section>
    );
}