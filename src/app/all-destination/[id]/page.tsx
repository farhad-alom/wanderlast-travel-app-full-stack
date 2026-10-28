import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Check, MapPin, Star, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import EditDestinationDialog from "@/components/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";

// এই দুটো লিস্ট ডাটাবেসে নেই, তাই এখন ফিক্সড রাখলাম
const highlights = [
    "Luxury beachfront accommodation",
    "Visit Uluwatu Temple at sunset",
    "Traditional Balinese spa treatment",
    "Private beach dinner experience",
    "Sunrise trek to Mount Batur",
];
const perks = ["Free cancellation up to 7 days", "Travel insurance included", "24/7 customer support"];

const DestinationDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    // URL থেকে id নিলাম, তারপর সার্ভার থেকে ওই id এর ডাটা আনলাম
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/all-destination/${id}`);

    // ডাটা না পেলে 404 পেজ দেখাবে
    if (!res.ok) notFound();
    const destination = await res.json();

    return (
        <main className="px-4 py-10 sm:px-8 lg:px-2">
            {/* উপরের বার: Back লিংক + Edit/Cancel বাটন */}
            <div className="flex items-center justify-between gap-3">
                <Link
                    href="/all-destination"
                    className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
                >
                    <ArrowLeft className="size-4" />
                    Back to Destinations
                </Link>

                <div className="flex gap-2">





                    <EditDestinationDialog destination={destination} />
                    <DeleteDestinationDialog id={destination._id} name={destination.name} />
                </div>
            </div>

            {/* বড় ছবি */}
            <div className="relative mt-6 h-60 w-full sm:h-80 lg:h-96">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    unoptimized
                    className="object-cover"
                />
            </div>

            <Separator className="mt-8" />

            {/* নিচের অংশ: বামে বিবরণ, ডানে বুকিং কার্ড */}
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
                {/* বাম পাশ */}
                <div className="lg:col-span-2">
                    <p className="flex items-center gap-2 text-sm text-neutral-500">
                        <MapPin className="size-4" />
                        {destination.country}
                    </p>

                    <h1 className="mt-2 text-3xl font-light sm:text-5xl">{destination.name}</h1>

                    {/* রেটিং + সময় */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                            <Star className="size-4 fill-green-500 text-green-500" />
                            <b>4.9</b>
                            <span className="text-neutral-500">(234 reviews)</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <CalendarDays className="size-4" />
                            {destination.duration}
                        </span>
                    </div>

                    {/* Overview */}
                    <h2 className="mt-8 text-2xl font-light">Overview</h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {destination.description}
                    </p>

                    {/* Highlights */}
                    <h2 className="mt-8 text-2xl font-light">Highlights</h2>
                    <ul className="mt-3 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
                        {highlights.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <Check className="size-4 text-green-600" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ডান পাশ: বুকিং কার্ড */}
                <Card className="h-fit">
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-xs text-neutral-500">Starting from</p>
                            <p className="text-3xl font-medium text-primary">${destination.price}</p>
                            <p className="text-xs text-neutral-500">per person</p>
                        </div>

                        <Input type="date" defaultValue={destination.date} />

                        <Button size="lg" className="w-full">
                            Book Now <ArrowRight />
                        </Button>

                        <ul className="space-y-2 text-xs text-neutral-600">
                            {perks.map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <Check className="size-4 text-green-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default DestinationDetailsPage;