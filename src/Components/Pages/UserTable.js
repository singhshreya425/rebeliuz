import React from 'react';
import './UserTable.css';
import { useSelector } from 'react-redux';


const UserTable = () => {
  const UserList = useSelector((state) => state.User.UserArray);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>DOB</th>
        </tr>
      </thead>
      <tbody>
        {UserList && UserList.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
              {item.addresses.map((address, addressIndex) => (
                <p key={addressIndex}>{address}</p>
              ))}
            </td>
            <td>{item.dob}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;



