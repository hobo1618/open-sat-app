"use client"
import { Button } from "@ui/button";
import { ModeToggle } from "~/components/mode-toggle";
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@ui/sheet"
import Link from "next/link";
import { Constants } from "~/types";
import { useState, type ReactNode } from "react";

export default function Navigation({ children }: {
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false)
    return (
        <main className="">
            <header className="flex flex-row justify-between">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost"><HamburgerMenuIcon /></Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav>
                            <ul className="flex flex-col">
                                {Constants.pages.filter(el => !!el).map(p =>
                                    <Link href={`/${p}`}><Button onClick={() => setOpen(false)} variant="link">{p}</Button></Link>
                                )}
                            </ul>
                        </nav>
                    </SheetContent>
                </Sheet>
                <ModeToggle />
            </header>
            {children}
        </main>
    );
}


