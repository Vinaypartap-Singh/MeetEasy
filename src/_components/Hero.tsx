import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

export const heroImages = [
  {
    imgURL:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "top-10 left-20",
  },
  {
    imgURL:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "top-10 right-20",
  },
  {
    imgURL:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "bottom-10 left-20",
  },
  {
    imgURL:
      "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    position: "bottom-10 right-20",
  },
];

export default function Hero() {
  const { userId } = auth();
  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center p-10 relative">
      <div>
        {heroImages.map((data, index) => {
          return (
            <Image
              key={index}
              src={data.imgURL}
              width={100}
              height={100}
              className={`object-cover h-[100px] w-[100px] rounded-full absolute ${data.position}`}
              alt="Meet Image"
            />
          );
        })}
      </div>
      <div className="space-y-4">
        <h1 className="text-6xl font-bold">
          <span className="text-violet-500">Master</span> Your{" "}
          <span className="text-violet-500">Calender</span> with{" "}
          <span className="text-violet-500">Ease.</span>
        </h1>
        <h4 className="text-2xl leading-10">
          <span className="text-violet-500 font-bold">MeetEasy</span> is your
          scheduling automation platform for eliminating the{" "}
          <span className="text-violet-500 font-bold">back-and-forth </span>
          emails
          <br /> to find the perfect time -- and so much more.
        </h4>
        {!userId ? (
          <div className="flex gap-x-6">
            <Button className="bg-violet-500 hover:bg-violet-600 dark:text-white flex items-center gap-x-2">
              Get Started
              <FaLongArrowAltRight />
            </Button>

            <Button className="flex items-center gap-x-2" asChild>
              <Link href={"/sign-up"}>
                <IoMail />
                Continue with Email
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-x-6">
            <Button
              className="bg-violet-500 hover:bg-violet-600 dark:text-white flex items-center gap-x-2"
              asChild
            >
              <Link href={"/create-meeting"}>
                Schedule a Meeting
                <SlCalender />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
