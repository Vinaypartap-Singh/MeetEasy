import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { navItems } from "./Header";
import { auth } from "@clerk/nextjs";

export default function MenuDrawer() {
  const { userId } = auth();
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-2xl text-start">
                MeetEasy
              </DrawerTitle>
              <DrawerDescription>
                Simplify Your{" "}
                <span className="text-violet-400 font-bold">Schedule</span>,
                Amplify Your Results.
              </DrawerDescription>
            </div>
            <div>
              <DrawerClose>
                <Button variant="outline" size={"icon"}>
                  <Cross2Icon className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>

          {/* NavItems */}
          <nav className="mt-24">
            <ul className="space-y-24 text-end px-20">
              {navItems.map(({ title, url }, index) => {
                return (
                  <li key={index}>
                    <Link href={`${url}`} className="text-3xl">
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </DrawerHeader>
        <DrawerFooter>
          <Button asChild>
            <Link href={"/login"}>Get Started</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
