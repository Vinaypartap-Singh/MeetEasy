import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface propsInterface {
  headingTitle: string;
  btnText: string;
}

export default function MeetingHeader({
  headingTitle,
  btnText,
}: propsInterface) {
  return (
    <div>
      <div className="px-10 py-3 space-y-8">
        <Button>
          <Link href={"/"} className="flex items-center gap-2">
            <ArrowLeftIcon />
            <h5>{btnText}</h5>
          </Link>
        </Button>
        <h1 className="capitalize text-3xl border-b-2 pb-4 mt-10">
          {headingTitle}
        </h1>
      </div>
    </div>
  );
}
