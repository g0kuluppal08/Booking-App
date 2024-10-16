import React, { useEffect,useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteSelect = ({options,field,setFormData,formData}) => {
  // Sample list of cities
//   const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

  // State to hold the selected city
  const [selectedoption, setSelectedoption] = useState("");
  useEffect(() => {
    if (typeof setFormData === "function") {
      if (field == "time Slot") {
        console.log("time slot");
        const [startTime, endTime] = selectedoption.split("-");
        setFormData({
          ...formData,
          startTime: startTime,
          endTime: endTime,
        });
        return;
      }
      setFormData({
        ...formData,
        [field]: selectedoption,
      });
    } else {
      console.log("It is not a function");
    }
  }, [selectedoption]);
  return (
    <Autocomplete
      options={options}
      value={selectedoption}
      onChange={(event, newValue) => setSelectedoption(newValue)}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={`Select a ${field}`}
          variant="outlined" 
        />
      )}
      filterSelectedOptions
      clearOnEscape
      isOptionEqualToValue={(option, value) => option === value}
    />
  );
};

export default AutocompleteSelect;
