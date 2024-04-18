"use client";

import { useAuth } from "@clerk/nextjs";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import { toast, useToast } from "@/components/ui/use-toast";

export default function GetAllMeetings() {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [meetingsList, setMeetingsList] = useState([]);

  const getAllMeetingsList = async () => {
    const docRef = doc(db, "users", `${userId}`);

    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          console.log("data");
          const meetings = doc.data().meetings;
          setMeetingsList(meetings);
        } else {
          console.log("No Document Found");
        }
      },
      (error) => {
        console.log("Error fetching data", error);
      }
    );

    return unsubscribe;
  };

  const handleDeleteMeeting = async (userId: any, meetingIndex: any) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const existingMeetings = docSnap.data()?.meetings || [];

        // Remove the meeting at the specified index
        existingMeetings.splice(meetingIndex, 1);

        // Update the document with the modified meetings array
        await setDoc(
          docRef,
          {
            meetings: existingMeetings,
          },
          { merge: true }
        );

        // Optional: You can update the local state as well
        setMeetingsList(existingMeetings);

        toast({ description: "Meeting Deleted Successfully" });
      }
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  useEffect(() => {
    const unsub = getAllMeetingsList();

    return () => {
      unsub;
    };
  }, []);

  return (
    <div className="px-10 py-3 space-y-8 mt-10">
      {meetingsList.length > 0 ? (
        <div className="flex flex-wrap gap-10 justify-center">
          {meetingsList.map((data, index) => {
            console.log(index);
            const meetingDate = data?.meetingDate?.toDate(); // Convert Firestore timestamp to Date object
            const formattedDate = meetingDate
              ? meetingDate.toLocaleDateString()
              : "";
            return (
              <Card key={index} className="w-[350px]">
                <CardHeader>
                  <CardTitle>{data?.eventName}</CardTitle>
                  <CardDescription>
                    Scheduled At {formattedDate}, {data?.timeSlot}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4>Duration: {data?.duration} Min</h4>
                  <h4>Platform: {data?.locationName} Min</h4>
                </CardContent>
                <CardFooter className="flex justify-between gap-x-2">
                  <Button
                    className="w-full"
                    variant={"outline"}
                    onClick={() => {
                      navigator.clipboard.writeText(data?.meetUrl);
                      toast({
                        title: "Meeting URL Copied",
                      });
                    }}
                  >
                    Copy URL
                  </Button>
                  <Button
                    onClick={() => handleDeleteMeeting(userId, index)}
                    className="bg-red-600 text-white hover:bg-red-800"
                  >
                    <MdDelete />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="px-10 py-3 space-y-8">
          <Button
            asChild
            variant={"link"}
            className="text-xl w-full text-center mt-10"
          >
            <Link href={"/create"}>
              Currently, You have not scheduled any meeting.Click here to create
              meetings.
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
