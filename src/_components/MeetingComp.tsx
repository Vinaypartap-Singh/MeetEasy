"use client";

import { Input } from "@/components/ui/input";

import MeetingHeader from "./meetingHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { title } from "process";
import Image from "next/image";
import { useState } from "react";

export default function MeetingPageComponenet() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const timeOptions = [
    {
      time: 15,
    },
    {
      time: 30,
    },
    {
      time: 45,
    },
    {
      time: 60,
    },
  ];

  const locations = [
    {
      title: "Google Meet",
      img: "/meet.png",
    },
    {
      title: "Zoom",
      img: "/zoom.png",
    },
    {
      title: "Phone",
      img: "/phoneCall.png",
    },
    {
      title: "Other",
      img: "/chat.png",
    },
  ];

  return (
    <div>
      <MeetingHeader />
      <div className="max-w-3xl px-10 space-y-6 m-auto mt-10">
        <div className="space-y-3">
          <h3 className="text-lg">Event Name *</h3>
          <Input />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg">Duration *</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-16">
                15 Min
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {timeOptions.map(({ time }, index) => {
                return (
                  <>
                    <Button
                      key={index}
                      variant={"ghost"}
                      className="w-full text-center"
                    >
                      {time} Min
                    </Button>
                    <DropdownMenuSeparator />
                  </>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg">Location *</h3>
          <div className="space-x-6">
            {locations.map(({ title, img }, index) => {
              return (
                <Button
                  key={index}
                  asChild
                  className={`cursor-pointer hover:text-black ${
                    selectedLocation === title
                      ? "bg-violet-200"
                      : "bg-transparent text-white border"
                  }`}
                  onClick={() => setSelectedLocation(title)}
                >
                  <div className="space-x-3">
                    <Image
                      width={50}
                      height={100}
                      src={`${img}`}
                      alt={title}
                      className="w-full h-full"
                    />
                    <p>{title}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg">Add {selectedLocation} Url *</h3>
          <Input />
        </div>
        <div>
          <Button className="bg-violet-600 text-white w-full">
            Create Meeting
          </Button>
        </div>
      </div>
    </div>
  );
}
