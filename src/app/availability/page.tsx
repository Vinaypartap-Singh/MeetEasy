"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "@clerk/nextjs";
import DayList from "@/utils/DayList";
import Header from "@/_components/Header";
import { useToast } from "@/components/ui/use-toast";

function Availability() {
  const { userId } = useAuth();
  const { toast } = useToast();

  const [daysAvailable, setDaysAvailable] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    userId && getBusinessInfo();
  }, [userId]);

  const getBusinessInfo = async () => {
    const docRef = doc(db, "users", `${userId}`);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setDaysAvailable(result?.daysAvailable);
    setStartTime(result?.startTime);
    setEndTime(result?.endTime);
  };

  const onHandleChange = (day: any, value: any) => {
    setDaysAvailable({
      ...daysAvailable,
      [day]: value,
    });

    console.log(daysAvailable);
  };

  const handleSave = async () => {
    console.log(daysAvailable, startTime, endTime);
    const docRef = doc(db, "users", `${userId}`);
    await setDoc(
      docRef,
      {
        daysAvailable: daysAvailable,
        startTime: startTime,
        endTime: endTime,
      },
      { merge: true }
    )
      .then((resp) => {
        toast({ description: "Change Updated !" + resp });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="p-10 max-w-5xl m-auto">
        <h2 className="font-bold text-2xl">Availability</h2>
        <hr className="my-7"></hr>
        <div>
          <h2 className="font-bold">Availability Days</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
            {DayList &&
              DayList.map((item, index) => (
                <div key={index}>
                  <h2>
                    <Checkbox
                      checked={
                        daysAvailable && daysAvailable[item?.day]
                          ? daysAvailable[item?.day]
                          : false
                      }
                      onCheckedChange={(e: any) => onHandleChange(item.day, e)}
                    />{" "}
                    {item.day}
                  </h2>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2 className="font-bold mt-10">Availability Time</h2>
          <div className="flex gap-10">
            <div className="mt-3">
              <h2>Start Time</h2>
              <Input
                type="time"
                defaultValue={startTime}
                onChange={(e: any) => setStartTime(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <h2>End Time</h2>
              <Input
                type="time"
                defaultValue={endTime}
                onChange={(e: any) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button className="mt-10" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
}

export default Availability;
