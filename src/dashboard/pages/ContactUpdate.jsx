/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { contactApi } from '../../redux/apis/contactApi';
import GoogleMapReact from 'google-map-react';
import { toast } from 'react-toastify';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const ContactUpdate = () => {
  const id = "677b8349bffc6154a5094933"
  const {data: contactData, refetch } = contactApi.useGetContactByIdQuery(id);
  const { register, handleSubmit,  formState: { errors } } = useForm();
  // const [location, setLocation] = useState({ lat: 0, lng: 0 });
  // const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState(false);
  const [ updateContact ] = contactApi.useUpdateContactMutation();

  const contact = contactData?.data || { };


  console.log(contactData)

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };


  const hanleUpdateContact = async (data) => {
    // Handle form submission (update contact in DB)
    console.log(data);
    // Call API to update contact
    const response = await updateContact({ id , data})
    if(response?.data?.success){
      refetch();
      toast.success(response?.data?.message)
    }

    console.log(response);
  };

  // const handleLocationSelect = (place) => {
  //   const { lat, lng } = place.geometry.location;
  //   setLocation({ lat: lat(), lng: lng() });
  //   setValue("googleLocation", `${lat()}, ${lng()}`);
  // };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Update Contact</h2>
      <form onSubmit={handleSubmit(hanleUpdateContact)}> 
        <div className=' flex gap-4 '>
        <div className=' flex-1'>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register("address", )}
            defaultValue={contact?.address}
          />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register("phone",)}
            defaultValue={contact?.phone}

          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md"
            {...register("email",)}
            defaultValue={contact?.email}

          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        </div>

        <div className="mb-4 flex-1">
          <label className="block text-gray-700">Select Google Location</label>
          <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>

          {errors.googleLocation && <p className="text-red-500">{errors.googleLocation.message}</p>}
        </div>

        </div>
        <div className="text-center">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md">
            Update Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUpdate;
