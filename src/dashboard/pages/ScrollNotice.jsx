import { toast } from "react-toastify";
import { scrollNoteApi } from "../../redux/apis/scrollNoteApi";
import { useForm } from "react-hook-form";

const ScrollNotice = () => {
  const id = "67763be0465f01ffc6f2caf3";
  const { data: noteData, refetch } = scrollNoteApi.useGetLatestNoteByIdQuery(id);
  const { register, handleSubmit } = useForm();
  const [ updateNoteById ] = scrollNoteApi.useUpdateNoteByIdMutation();

  const note = noteData?.data;

 const handleUpdateNotice = async(data) => {
   const res = await updateNoteById(id, data);
   console.log(res?.data)
   if(res?.data?.success){
    toast.success("Notice updated successfull!");
    refetch();
   }
 }



  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      {/* Header */}
      <label className="block text-gray-800 font-semibold mb-2">
        Enter your scrollable notice here
      </label>

    <form action="" onSubmit={handleSubmit(handleUpdateNotice)}>
                {/* Textarea */}
      <textarea
        {...register("note")}
        rows="4"
        className="w-full p-4 border rounded-lg text-gray-700 resize-none focus:outline-blue-400"
        placeholder="Enter your notice here..."
        defaultValue={note?.note}
      ></textarea>

      {/* Update Button */}
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-800"
      >
        Update 
      </button>
        </form>
    </div>
  );
};

export default ScrollNotice;
