import  { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {  EditorState } from "draft-js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { stateToHTML } from "draft-js-export-html";
import { newsletterApi } from "../../redux/apis/newsletterApi";
import { usersApi } from "../../redux/apis/usersApi";

const SendNewsletter = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSubscriberDropdownOpen, setIsSubscriberDropdownOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const [ sendEmailToSubscriberOrUsers ] = newsletterApi.useSendEmailToSubscriberOrUsersMutation();
  const { data: usersData, isLoading: userLoading } = usersApi.useGetAllUsersQuery();
  const { data: subscriberData, isLoading: subscriberLoading } = newsletterApi.useGetAllSubscribersQuery();

  if (subscriberLoading || userLoading) {
    return <>Loading data...</>;
  }

  const subscribers = subscriberData?.data?.subscribers || [];
  const users = usersData?.data?.users || [];

  const handleCheckboxChange = (email, checked) => {
    setSelectedEmails((prev) =>
      checked ? [...prev, email] : prev.filter((item) => item !== email)
    );
  };

  const handleSelectAll = (emails) => {
    const uniqueEmails = [...new Set([...selectedEmails, ...emails])];
    setSelectedEmails(uniqueEmails);
  };

  const handleDeselectAll = (emails) => {
    setSelectedEmails((prev) => prev.filter((email) => !emails.includes(email)));
  };

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };



  // handle send email function
  const handleSendEmail = async(data) => {
    const content = stateToHTML(editorState.getCurrentContent());

    const formData = {
      emails: selectedEmails,
      subject: data?.subject,
      content
    };

    console.log("formData: ", formData)
    const res = await sendEmailToSubscriberOrUsers(formData);
    console.log("response : ", res)
    if(res?.data){
      reset();
      setEditorState("");
      setSelectedEmails([]);
      toast.success(res?.data?.message)
    }
  }

  return (
    <div className="container w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Send Newsletter</h2>

       <form onSubmit={handleSubmit(handleSendEmail)}>
              {/* User Emails */}
      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Emails (Users)
        </label>
        <button
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white focus:outline-none"
        >
          {`${selectedEmails.length} items selected`}
        </button>
        {isUserDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md">
            <div className="flex justify-between p-2 bg-gray-100 border-b border-gray-300">
              <button
                onClick={() => handleSelectAll(users.map((user) => user.email))}
                className="px-3 py-1 text-sm text-blue-500 hover:underline"
              >
                Select All
              </button>
              <button
                onClick={() => handleDeselectAll(users.map((user) => user.email))}
                className="px-3 py-1 text-sm text-red-500 hover:underline"
              >
                Deselect All
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {users.map((user) => (
                <div key={user._id} className="flex items-center p-2 border-b last:border-none">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(user.email)}
                    onChange={(e) => handleCheckboxChange(user.email, e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subscriber Emails */}
      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Emails (Subscribers)
        </label>
        <button
          onClick={() => setIsSubscriberDropdownOpen(!isSubscriberDropdownOpen)}
          className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white focus:outline-none"
        >
          {`${selectedEmails.length} items selected`}
        </button>
        {isSubscriberDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md">
            <div className="flex justify-between p-2 bg-gray-100 border-b border-gray-300">
              <button
                onClick={() => handleSelectAll(subscribers.map((sub) => sub.email))}
                className="px-3 py-1 text-sm text-blue-500 hover:underline"
              >
                Select All
              </button>
              <button
                onClick={() => handleDeselectAll(subscribers.map((sub) => sub.email))}
                className="px-3 py-1 text-sm text-red-500 hover:underline"
              >
                Deselect All
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {subscribers.map((sub) => (
                <div key={sub._id} className="flex items-center p-2 border-b last:border-none">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(sub.email)}
                    onChange={(e) => handleCheckboxChange(sub.email, e.target.checked)}
                    className="mr-3 h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{sub.email}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Subject */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Newsletter Subject
        </label>
        <input
          type="text"
          {...register("subject")}
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Newsletter Content */}
      {/* <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Newsletter Content
        </label>
        <Editor
          editorState={editorState}
          toolbarClassName="border border-gray-300 rounded-t-md p-2"
          wrapperClassName="border border-gray-300 rounded-md"
          editorClassName="p-3 min-h-[150px] rounded-b-md focus:outline-none"
          onEditorStateChange={onEditorStateChange}
        />
      </div> */}

      {/* Submit Button */}
       <div className=" flex justify-end">
       <button type="submit" className=" w-[200px]  py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
              Send Newsletter
            </button>
       </div>
       </form>
    </div>
  );
};

export default SendNewsletter;
