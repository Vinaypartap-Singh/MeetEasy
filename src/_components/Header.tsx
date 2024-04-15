import { Button } from "@/components/ui/button";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";
import MenuToggle from "./MenuToggle";
import { UserButton, auth, currentUser } from "@clerk/nextjs";

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

export default async function Header() {
  const { userId } = auth();
  console.log("userId", userId);
  const user = await currentUser();

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
          {userId ? (
            <div>
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <Button asChild>
                <Link href={"/sign-in"}>Login</Link>
              </Button>
              <Button variant={"outline"} asChild>
                <Link href={"/sign-up"}>Create an account</Link>
              </Button>
            </div>
          )}

          <MenuToggle />
        </div>
      </div>
      <div className="md:hidden flex items-center gap-x-4">
        {userId && <UserButton />}
        <MenuToggle />
        <MenuDrawer />
      </div>
    </header>
  );
}
