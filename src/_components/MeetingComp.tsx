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
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function MeetingPageComponenet() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formValue, setFormvalue] = useState();

  // UseStates
  const [timeSlot, setTimeSlots] = useState<Array<string>>();
  const [eventName, setEventName] = useState<string>();
  const [duration, setDuration] = useState<number>(15);
  const [meetUrl, setMeetURL] = useState<string>();

  useEffect(() => {
    duration && createTimeSlot(duration);
  }, [duration]);

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

  const createTimeSlot = (interval: number) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots);
  };

  const createMeeting = () => {
    console.log(eventName);
    setFormvalue({
      eventName: eventName,
      duration: duration,
      locationName: selectedLocation,
      meetUrl: meetUrl,
      date: date,
    });

    console.log(formValue);
  };

  return (
    <div>
      <MeetingHeader />
      <div className="max-w-3xl px-10 space-y-6 m-auto mt-10">
        <div className="space-y-3">
          <h3 className="text-lg">Event Name *</h3>
          <Input onChange={(e) => setEventName(e.target.value)} />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg">Duration *</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-16">
                {duration} Min
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {timeOptions.map(({ time }, index) => {
                return (
                  <>
                    <Button
                      onClick={() => setDuration(time)}
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
        {selectedLocation && (
          <div className="space-y-3">
            <h3 className="text-lg">Add {selectedLocation} Url *</h3>
            <Input onChange={(e) => setMeetURL(e.target.value)} />
            <div className="space-x-2 flex">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date <= new Date()}
                className="rounded-md border shadow w-fit"
              />
              <div
                className="flex flex-col w-full overflow-auto gap-4 p-4 border"
                style={{ maxHeight: "300px" }}
              >
                {timeSlot?.map((slot) => (
                  <Button variant={"outline"}>{slot}</Button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div>
          <Button
            className="bg-violet-600 text-white w-full"
            onClick={createMeeting}
          >
            Create Meeting
          </Button>
        </div>
      </div>
    </div>
  );
}
