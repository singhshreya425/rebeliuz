import React, { useState } from 'react';
import "./UserForm.css"
import { useDispatch } from 'react-redux';
import { AddUserData } from '../Redux/UserSlice';

const UserForm = ()=> {
  let dispatch = useDispatch()
  const [form, setForm] = useState({
    name: '',
    email: '',
    dob: '',
    addresses: ['']
  });
 const [showSecondAddress, setShowSecondAddress] = useState(false)//for next address field
 
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = form.name ? "" : "This field is required.";
    tempErrors.email = (form.email ? "" : "This field is required.") || 
                       (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email) ? "" : "Email is not valid.");
    tempErrors.dob = form.dob ? "" : "This field is required."; 
    tempErrors.addresses = form.addresses[0]  ? "" : "At least one address is required." ;

    setErrors({
      ...tempErrors
    });

    return Object.values(tempErrors).every(x => x === "");
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    //setting to lowercase
    const lowercaseValue = value.toLowerCase();


    if (name.includes('address')) {
      const addresses = [...form.addresses];
      addresses[index] = lowercaseValue;
      setForm({
        ...form,
        addresses
      });
      setShowSecondAddress(addresses[0] !== '');//for next address field
      
    } else {
      setForm({
        ...form,
        [name]: lowercaseValue
      });
    }
    // dispatch(AddUserData(form))
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // console.log(form);
      dispatch(AddUserData(form));
      setForm({
        name: '',
        email: '',
        dob: '',
        addresses: ['']
      });
      setShowSecondAddress(false); //for next address field
    }
  };

  const handleAddAddress = () => {
    setForm({
      ...form,
      addresses: [...form.addresses, '']
    });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleInputChange} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleInputChange} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        {/* {form.addresses.map((address, index) => (
          // <div key={index}>
          //   <label>Address {index + 1}:</label>
          //   <input type="text" name={`address${index}`} value={address} onChange={e => handleInputChange(e, index)} />
          //   {errors.addresses && <div className="error">{errors.addresses}</div>}
          // </div>
        ))} */}
         <div>
          <label>Address 1:</label>
          <input type="text" name="address0" value={form.addresses[0]} onChange={e => handleInputChange(e, 0)} />
          {errors.addresses && <div className="error">{errors.addresses}</div>}
        </div>
             {/* Show the second address field only when the first address is filled */}

             {showSecondAddress && (
          <div>
            <label>Address 2:</label>
            <input type="text" name="address1" value={form.addresses[1]} onChange={e => handleInputChange(e, 1)} />
          </div>
        )}
        <button type="button" onClick={handleAddAddress}>Add Address</button>
        <div>
          <label>DOB:</label>
          <input type="date" name="dob" value={form.dob} onChange={handleInputChange} />
          {errors.dob && <div className="error">{errors.dob}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm