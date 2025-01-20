import { toast } from "react-toastify";
import { contactApi } from "../redux/apis/contactApi";
import { useForm } from "react-hook-form";

const ContactUs = () => {
    const { register, handleSubmit, reset } = useForm();
    const id = "677b8349bffc6154a5094933"
    const {data: contactData } = contactApi.useGetContactByIdQuery(id);
    const [ sendSupportEmail ] = contactApi.useSendSupportEmailMutation();

    const contact = contactData?.data;

    // handle send email 
    const handleSendSupportEmail = async(data) => {
      const res = await sendSupportEmail(data);
      if(res?.data?.success){
        toast.success(res?.data?.message);
         reset();
      }
    };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-800 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-gray-300">{`We'd love to hear from you!`}</p>
      </div>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Send Us a Message</h2>
          <p className="text-gray-600 mt-2 mb-6">
            {`Have any questions or concerns? Fill out the form below and we'll get back to you shortly.`}
          </p>

          <form onSubmit={handleSubmit(handleSendSupportEmail)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
               {...register("message")}
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Our Address</h2>
            <p className="text-gray-600 mt-2">{contact?.address}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Call Us</h2>
            <p className="text-gray-600 mt-2">{contact?.phone}</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Email Us</h2>
            <p className="text-gray-600 mt-2">{contact?.email}</p>
          </div>

          {/* Google Map Embed */}
          <div className="bg-white shadow-lg rounded-lg">
            <iframe
              title="Google Map"
              className="rounded-lg w-full h-64"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345084853!2d-122.41941518468283!3d37.77492977975965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085814a585a69df%3A0xa8bdf8b03f7e58f2!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1631719612345!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
