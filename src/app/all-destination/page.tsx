"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Destination = {
    _id: string;
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    image: string;
};

const categories = ["All Categories", "Beach", "Mountain", "City", "Adventure", "Cultural"];
const priceRanges = ["All Prices", "Under $500", "$500 - $1000", "Over $1000"];
const sortOptions = ["Default", "Price: Low to High", "Price: High to Low", "Name: A to Z"];

// তিনটা ড্রপডাউনের জন্য একটাই ছোট কম্পোনেন্ট
function FilterSelect({
    value,
    options,
    onChange,
}: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
}) {
    return (
        <Select value={value} onValueChange={(v) => onChange(v ?? options[0])}>
            <SelectTrigger className="h-11 w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((item) => (
                    <SelectItem key={item} value={item}>
                        {item}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

// দাম রেঞ্জের মধ্যে পড়ে কিনা চেক করে
function matchPrice(price: number, range: string) {
    if (range === "Under $500") return price < 500;
    if (range === "$500 - $1000") return price >= 500 && price <= 1000;
    if (range === "Over $1000") return price > 1000;
    return true;
}

export default function AllDestinationPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]); // শুরুতে খালি অ্যারে
    const [category, setCategory] = useState(categories[0]);
    const [priceRange, setPriceRange] = useState(priceRanges[0]);
    const [sortBy, setSortBy] = useState(sortOptions[0]);

    // পেজ খুললে একবার সার্ভার থেকে ডাটা আনবে
    useEffect(() => {
        fetch("http://localhost:5000/all-destination")
            .then((res) => res.json())
            .then((data) => setDestinations(Array.isArray(data) ? data : data.data ?? []))
            .catch((error) => console.log("fetch failed:", error));
    }, []);

    // ১. ফিল্টার
    const filtered = destinations.filter(
        (d) =>
            (category === "All Categories" || d.category === category) &&
            matchPrice(Number(d.price), priceRange)
    );

    // ২. সর্ট
    const sorted = [...filtered];
    if (sortBy === "Price: Low to High") sorted.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === "Price: High to Low") sorted.sort((a, b) => Number(b.price) - Number(a.price));
    if (sortBy === "Name: A to Z") sorted.sort((a, b) => a.name.localeCompare(b.name));

    return (
        // lg:px-24 = ডেস্কটপে দুই পাশে ১ ইঞ্চি (96px) গ্যাপ
        <main className="px-4 py-10 sm:px-8 lg:px-2">
            <h1 className="text-3xl font-light sm:text-5xl">Explore All Destinations</h1>
            <p className="mt-2 text-neutral-500">
                Find your perfect travel experience from our curated collection
            </p>

            {/* ফিল্টার */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <FilterSelect value={category} options={categories} onChange={setCategory} />
                <FilterSelect value={priceRange} options={priceRanges} onChange={setPriceRange} />
                <FilterSelect value={sortBy} options={sortOptions} onChange={setSortBy} />
            </div>

            <p className="mt-6 text-sm text-neutral-500">
                Showing {sorted.length} destinations
            </p>

            {/* কার্ড গ্রিড: মোবাইলে ১, ট্যাবলেটে ২, ডেস্কটপে ৩ */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((d) => (
                    <div key={d._id}>
                        {/* ছবি + রেটিং */}
                        <div className="relative aspect-video">
                            <Image src={d.image} alt={d.name} fill unoptimized className="object-cover" />
                            <Badge variant="secondary" className="absolute top-3 right-3">
                                4.5 <Star className="fill-current" />
                            </Badge>
                        </div>

                        {/* দেশ */}
                        <p className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
                            <MapPin className="size-4" />
                            {d.country}
                        </p>

                        {/* নাম + দাম */}
                        <div className="mt-1 flex items-center justify-between gap-2">
                            <h3 className="text-lg">{d.name}</h3>
                            <p className="font-medium">
                                ${d.price}
                                <span className="text-xs text-neutral-500">/Person</span>
                            </p>
                        </div>

                        {/* সময় */}
                        <p className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
                            <CalendarDays className="size-4" />
                            {d.duration}
                        </p>

                        {/* বাটন */}
                        <Link href={`/all-destination/${d._id}`} className={buttonVariants({ variant: "link" })}>
                            BOOK NOW <ArrowUpRight />
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}