import { useState, useEffect } from 'react';
import { BDLocations } from 'react-bd-location';

const AddressSelector = () => {
  const [location, setLocation] = useState({ division: '', district: '', upazila: '' });

  // Handle location change
  const handleLocationChange = (e) => {
    console.log(e)
    // Update state with the new location data
    setLocation({
      division: e.division,
      district: e.district,
      upazila: e.upazila,
    });
  };

  // Use useEffect to log the latest location when it updates
  useEffect(() => {
    // This effect will run whenever `location` changes
    console.log("Selected Location:", location);
  }, [location]); // This hook depends on `location` state

  return (
    <div>
      <h1>Select Your Address</h1>
      <BDLocations
        onChange={handleLocationChange} // Handle the location change
        bn={false} // Use Bengali language for the labels
        showLable={true} // Show labels for the location fields
        className="location-selector" // Apply custom styles if necessary
        label={{
          division: "Division", // Custom label for Division
          district: "District", // Custom label for District
          upazila: "Upazila",   // Custom label for Upazila
        }}
        placeholder={{
          division: "Select Division", // Custom placeholder for Division
          district: "Select District", // Custom placeholder for District
          upazila: "Select Upazila",   // Custom placeholder for Upazila
        }}
      />

      <div>
        <h2>Selected Location</h2>
        <p>Division: {location.division}</p>
        <p>District: {location.district}</p>
        <p>Upazila: {location.upazila}</p>
      </div>
    </div>
  );
};

export default AddressSelector;
