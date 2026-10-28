"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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

type Destination = {
    _id: string;
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    date: string;
    image: string;
    description: string;
};

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

// Label + Input জোড়ার ছোট helper
function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            {children}
        </div>
    );
}

export default function EditDestinationDialog({ destination }: { destination: Destination }) {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(destination); // শুরুতে বর্তমান ডাটা বসানো

    // Input/Textarea বদলালে
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Save চাপলে সার্ভারে PUT পাঠাবে
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const res = await fetch(`http://localhost:5000/all-destination/${destination._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setSaving(false);

        if (res.ok) {
            setOpen(false); // ডায়ালগ বন্ধ
            router.refresh(); // পেজের ডাটা নতুন করে আনবে
        } else {
            alert("Update failed!");
        }
    }

    return (
        <>
            {/* Edit বাটন */}
            <Button variant="outline" onClick={() => setOpen(true)}>
                <Pencil /> Edit
            </Button>


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-light">Update Travel Package</DialogTitle>
                        <DialogDescription>
                            Make changes to the travel package details below
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Field label="Destination Name" id="name">
                            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Country" id="country">
                                <Input id="country" name="country" value={form.country} onChange={handleChange} required />
                            </Field>

                            <Field label="Category" id="category">
                                <Select
                                    value={form.category}
                                    onValueChange={(v) => setForm({ ...form, category: v ?? form.category })}
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

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Price (USD)" id="price">
                                <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} required />
                            </Field>

                            <Field label="Duration" id="duration">
                                <Input id="duration" name="duration" value={form.duration} onChange={handleChange} required />
                            </Field>
                        </div>

                        <Field label="Departure Date" id="date">
                            <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
                        </Field>

                        <Field label="Image URL" id="image">
                            <Input id="image" name="image" type="url" value={form.image} onChange={handleChange} required />
                        </Field>

                        <Field label="Description" id="description">
                            <Textarea id="description" name="description" rows={4} value={form.description} onChange={handleChange} required />
                        </Field>

                        {/* বাটন */}
                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="destructive" size="lg" onClick={() => setOpen(false)}>
                                <Trash2 /> Cancel
                            </Button>
                            <Button type="submit" size="lg" disabled={saving}>
                                <Save /> {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}