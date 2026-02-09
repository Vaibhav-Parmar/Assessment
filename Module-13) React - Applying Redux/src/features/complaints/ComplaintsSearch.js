import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from './complaintsSlice';

const ComplaintsSearch = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.complaints.searchTerm);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default ComplaintsSearch;
