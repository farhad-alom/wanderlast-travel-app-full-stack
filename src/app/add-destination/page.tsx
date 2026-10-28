"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const emptyForm = {
    name: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
    image: "",
    description: "",
};

// Label + Input এর জন্য ছোট helper (বারবার না লিখতে)
function Field({
    label,
    id,
    children,
}: {
    label: string;
    id: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            {children}
        </div>
    );
}

export default function AddDestinationPage() {
    const [form, setForm] = useState(emptyForm);
    const [message, setMessage] = useState("");

    // Input আর Textarea বদলালে
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Add বাটনে ক্লিক করলে
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/add-destination", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                throw new Error("Failed to add travel package");
            }

            const data = await res.json();
            console.log("Server response", data);
            setMessage("Travel package added successfully!");
            setForm(emptyForm);
        }
        catch (error) {
            console.log("Error:", error);
            setMessage("Failed to add travel package. please try again");
        }
    }

    // Cancel বাটনে ক্লিক করলে
    function handleCancel() {
        setForm(emptyForm);
        setMessage("");
    }

    return (
        <main className="px-4 py-10 sm:px-8 lg:px-14">
            <h1 className="text-3xl font-light sm:text-5xl">Add New Travel Package</h1>

            <Card className="mx-auto mt-10 max-w-2xl">
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Field label="Destination Name" id="name">
                            <Input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Bali Paradise"
                                required
                            />
                        </Field>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Country" id="country">
                                <Input
                                    id="country"
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    placeholder="Indonesia"
                                    required
                                />
                            </Field>

                            <Field label="Category" id="category">
                                <Select
                                    value={form.category}
                                    onValueChange={(value) =>
                                        setForm({ ...form, category: value ?? "Beach" })
                                    }
                                >
                                    <SelectTrigger id="category" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Price (USD)" id="price">
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="e.g., 1299"
                                    required
                                />
                            </Field>

                            <Field label="Duration" id="duration">
                                <Input
                                    id="duration"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    placeholder="e.g., 7 Days/6 Nights"
                                    required
                                />
                            </Field>
                        </div>

                        <Field label="Departure Date" id="date">
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field label="Image URL" id="image">
                            <Input
                                id="image"
                                name="image"
                                type="url"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </Field>

                        <Field label="Description" id="description">
                            <Textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe the travel experience..."
                                rows={5}
                                required
                            />
                        </Field>

                        {message && <p className="text-sm text-green-600">{message}</p>}

                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="destructive"
                                size="lg"
                                onClick={handleCancel}
                            >
                                <Trash2 />
                                Cancel
                            </Button>

                            <Button type="submit" size="lg">
                                <Save />
                                Add Travel Package
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}