import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComplaint } from './complaintsSlice';

const ComplaintsTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { complaints, searchTerm, status } = useSelector(state => state.complaints);

  const filteredComplaints = complaints.filter(c =>
    c.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteComplaint(id));
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredComplaints.length === 0 ? (
          <tr>
            <td colSpan="5">No records found</td>
          </tr>
        ) : (
          filteredComplaints.map(c => (
            <tr key={c.id}>
              <td>{c.ProductName}</td>
              <td>{c.Price}</td>
              <td>{c.Offerprice}</td>
              <td>{c.Descriptions}</td>
              <td>
                <button onClick={() => onEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ComplaintsTable;
