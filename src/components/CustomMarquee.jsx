import { scrollNoteApi } from "../redux/apis/scrollNoteApi";
import "./Marquee.css";

const CustomMarquee = () => {
    const id = "67763be0465f01ffc6f2caf3";
    const { data: noteData } = scrollNoteApi.useGetLatestNoteByIdQuery(id);
    const note = noteData?.data?.note;

  return (
    <div className="marquee-container">
      <div className="marquee">
        <p>{note?.length > 0 && note}</p>
      </div>
    </div>
  );
};

export default CustomMarquee;
