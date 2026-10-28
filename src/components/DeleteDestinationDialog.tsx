"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteDestinationDialog({ id, name }: { id: string; name: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Yes, Delete চাপলে সার্ভারে DELETE পাঠাবে
    async function handleDelete() {
        setDeleting(true);

        const res = await fetch(`http://localhost:5000/all-destination/${id}`, {
            method: "DELETE",
        });

        setDeleting(false);

        if (res.ok) {
            setOpen(false);
            router.push("/all-destination"); // ডিলিট শেষে লিস্ট পেজে ফিরবে
            router.refresh();
        } else {
            alert("Delete failed!");
        }
    }

    return (
        <>
            {/* Delete বাটন */}
            <Button variant="destructive" onClick={() => setOpen(true)}>
                <Trash2 /> Delete
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Destination</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete &quot;{name}&quot;? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                            {deleting ? "Deleting..." : "Yes, Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}