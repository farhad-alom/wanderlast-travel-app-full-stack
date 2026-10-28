import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// লিংকগুলো এখানে বদলালেই footer এ বদলে যাবে
const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "My Profile", href: "/profile" },
];

const supportLinks = [
    { name: "Help Center", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
];

const socials = ["X", "in", "IG"];

export default function Footer() {
    return (
        <footer className="bg-black px-4 pt-16 text-white sm:px-6 lg:px-12">
            <div className="mx-auto max-w-7xl">
                {/* লোগো ও ট্যাগলাইন */}
                <Image
                    src="/images/Wanderlast-1.png"
                    alt="Wanderlust logo"
                    width={400}
                    height={90}
                    className="h-auto w-64 md:w-96"
                />
                <p className="mt-3 text-sm text-neutral-300 md:text-base">
                    Your gateway to extraordinary travel experiences around the world.
                </p>

                {/* ৪টা কলাম: মোবাইলে ১টা, ট্যাবলেটে ২টা, ডেস্কটপে ৪টা */}
                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-medium">NEWSLETTER</h3>
                        <p className="mt-2 text-xs text-neutral-400">
                            Subscribe for exclusive travel deals and inspiration.
                        </p>
                        <div className="mt-4 flex border border-neutral-700">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-neutral-500"
                            />
                            <button type="button" aria-label="Subscribe" className="px-3">
                                <ArrowUpRight className="size-4" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-medium">QUICK LINKS</h3>
                        <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-white">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-medium">SUPPORT</h3>
                        <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-white">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-medium">CONTACT US</h3>
                        <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                            <li>786 901 1622</li>
                            <li>info@wandarland.com</li>
                        </ul>
                    </div>
                </div>

                {/* নিচের অংশ: কপিরাইট ও সোশ্যাল */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 py-6 sm:flex-row">
                    <p className="text-xs text-neutral-400">
                        © 2026 Wanderlust. All rights reserved.
                    </p>
                    <div className="flex gap-3">
                        {socials.map((name) => (
                            <a
                                key={name}
                                href="#"
                                className="flex size-9 items-center justify-center border border-neutral-700 text-xs hover:bg-white hover:text-black"
                            >
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}