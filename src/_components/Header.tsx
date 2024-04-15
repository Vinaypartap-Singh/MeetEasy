import { Button } from "@/components/ui/button";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";
import MenuToggle from "./MenuToggle";

export const navItems = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Pricing",
    url: "/pricing",
  },
  {
    id: 3,
    title: "Contact us",
    url: "/contact-us",
  },
];

export default function Header() {
  return (
    <header className="flex justify-between items-center px-10 py-5">
      <div>
        <h4 className="font-bold text-2xl">MeetEasy</h4>
      </div>
      <div className="md:flex items-center gap-x-10 hidden">
        <ul className="flex gap-x-6">
          {navItems.map(({ title, url }, index) => {
            return (
              <li key={index}>
                <Link href={`${url}`}>{title}</Link>
              </li>
            );
          })}
        </ul>
        <div className="space-x-5 flex items-center">
          <Button>Login</Button>
          <Button variant={"outline"}>Create an account</Button>
          <MenuToggle />
        </div>
      </div>
      <div className="md:hidden flex gap-x-4">
        <MenuToggle />
        <MenuDrawer />
      </div>
    </header>
  );
}
