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
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "./Header";

interface fromValueInterface {
  eventName?: string | undefined;
  duration?: number;
  locationName?: string;
  meetUrl?: string | undefined;
  meetingDate?: Date | undefined;
  timeSlot?: string | undefined;
}

export default function MeetingPageComponenet() {
  const router = useRouter();
  const { userId } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formValue, setFormvalue] = useState<fromValueInterface>({
    duration: 15,
  });

  // UseStates
  const [timeSlot, setTimeSlots] = useState<Array<string>>();
  const [eventName, setEventName] = useState<string>();
  const [duration, setDuration] = useState<number>(15);
  const [meetUrl, setMeetURL] = useState<string>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();

  useEffect(() => {
    duration && createTimeSlot(duration);

    const checkIfUserAlreadyExistInDB = async () => {
      const docRef = doc(db, "users", `${userId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("OK");
      } else {
        await setDoc(docRef, {
          meetings: [],
          userId: userId,
        });
      }
    };

    checkIfUserAlreadyExistInDB();
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

  const createMeeting = async () => {
    setFormvalue({
      eventName: eventName,
      duration: duration,
      locationName: selectedLocation,
      meetUrl: meetUrl,
      meetingDate: date,
      timeSlot: selectedTimeSlot,
    });

    console.log(formValue);

    const docRef = doc(db, "users", `${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingMeetings = docSnap.data().meetings || [];

      existingMeetings.push(formValue);

      if (formValue) {
        await setDoc(
          docRef,
          {
            meetings: existingMeetings,
          },
          { merge: true }
        );
        router.push("/meetings");
      } else {
        console.log(formValue);
      }
    }
  };

  return (
    <div>
      <MeetingHeader headingTitle="Create a Meeting" btnText="Go Back" />
      <div className="max-w-3xl px-10 space-y-6 m-auto mt-10">
        <div className="space-y-3">
          <h3 className="text-lg">Event Name *</h3>
          <Input
            onChange={(e) =>
              setFormvalue({ ...formValue, eventName: e.target.value })
            }
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg">Duration *</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-16">
                {formValue?.duration} Min
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {timeOptions.map(({ time }, index) => {
                return (
                  <div key={index}>
                    <Button
                      onClick={() =>
                        setFormvalue({ ...formValue, duration: time })
                      }
                      key={index}
                      variant={"ghost"}
                      className="w-full text-center"
                    >
                      {time} Min
                    </Button>
                    <DropdownMenuSeparator />
                  </div>
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
                    formValue?.locationName === title
                      ? "bg-gray-100 text-black dark:bg-violet-200 dark:text-white dark:hover:bg-violet-400 hover:bg-gray-200"
                      : "bg-transparent text-black dark:text-white border hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setFormvalue({ ...formValue, locationName: title })
                  }
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
        {formValue?.locationName && (
          <div className="space-y-3">
            <h3 className="text-lg">Add {formValue?.locationName} Url *</h3>
            <Input
              onChange={(e) =>
                setFormvalue({ ...formValue, meetUrl: e.target.value })
              }
            />
            <div className="space-x-2 flex">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date <= new Date()}
                className="rounded-md border shadow w-fit"
                onDayClick={() =>
                  setFormvalue({ ...formValue, meetingDate: date })
                }
              />
              <div
                className="flex flex-col w-full overflow-auto gap-4 p-4 border"
                style={{ maxHeight: "300px" }}
              >
                {timeSlot?.map((slot, index) => (
                  <Button
                    key={index}
                    onClick={() =>
                      setFormvalue({ ...formValue, timeSlot: slot })
                    }
                    variant={
                      formValue?.timeSlot === slot ? "default" : "outline"
                    }
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div>
          <Button
            className="bg-violet-600 hover:bg-violet-900 text-white w-full"
            onClick={createMeeting}
          >
            Create Meeting
          </Button>
        </div>
      </div>
    </div>
  );
}
