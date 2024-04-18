import GetAllMeetings from "@/_components/GetAllMeetings";
import MeetingHeader from "@/_components/meetingHeader";

export default function Page() {
  return (
    <div>
      <MeetingHeader headingTitle="Your Meetings" btnText="Go Back" />
      <GetAllMeetings />
    </div>
  );
}
