import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComplaints, setEditingComplaint } from './features/complaints/complaintsSlice';
import ComplaintsForm from './features/complaints/ComplaintsForm';
import ComplaintsTable from './features/complaints/ComplaintsTable';
import ComplaintsSearch from './features/complaints/ComplaintsSearch';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { status, editingComplaint } = useSelector(state => state.complaints);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComplaints());
    }
  }, [status, dispatch]);

  const handleEdit = (complaint) => {
    dispatch(setEditingComplaint(complaint));
  };

  return (
    <div className="App">
      <h1>Customer Complaints Management</h1>
      <ComplaintsForm editingComplaint={editingComplaint} />
      <ComplaintsSearch />
      <ComplaintsTable onEdit={handleEdit} />
    </div>
  );
}

export default App;
