import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addComplaint, updateComplaint, setEditingComplaint } from './complaintsSlice';

const ComplaintsForm = ({ editingComplaint }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ProductName: '',
    Price: '',
    Offerprice: '',
    Photo: '',
    Qty: '',
    Descriptions: '',
    added_date: '',
  });

  useEffect(() => {
    if (editingComplaint) {
      setFormData(editingComplaint);
    } else {
      setFormData({
        ProductName: '',
        Price: '',
        Offerprice: '',
        Photo: '',
        Qty: '',
        Descriptions: '',
        added_date: '',
      });
    }
  }, [editingComplaint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, Photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.ProductName || !formData.Descriptions) {
      alert('Please fill required fields');
      return;
    }
    if (editingComplaint) {
      dispatch(updateComplaint({ id: editingComplaint.id, updatedComplaint: formData }));
    } else {
      dispatch(addComplaint(formData));
    }
    setFormData({
      ProductName: '',
      Price: '',
      Offerprice: '',
      Photo: '',
      Qty: '',
      Descriptions: '',
      added_date: '',
    });
    dispatch(setEditingComplaint(null));
  };

  const handleCancel = () => {
    setFormData({
      ProductName: '',
      Price: '',
      Offerprice: '',
      Photo: '',
      Qty: '',
      Descriptions: '',
      added_date: '',
    });
    dispatch(setEditingComplaint(null));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{editingComplaint ? 'Edit Complaint' : 'Add Complaint'}</h2>
      <input
        type="text"
        name="ProductName"
        placeholder="Product Name"
        value={formData.ProductName}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="Price"
        placeholder="Price"
        value={formData.Price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Offerprice"
        placeholder="Offer Price"
        value={formData.Offerprice}
        onChange={handleChange}
      />
      <input
        type="file"
        name="Photo"
        onChange={handleFileChange}
      />
      {formData.Photo && <img src={formData.Photo} alt="Preview" width="100" />}
      <input
        type="number"
        name="Qty"
        placeholder="Quantity"
        value={formData.Qty}
        onChange={handleChange}
      />
      <textarea
        name="Descriptions"
        placeholder="Descriptions"
        value={formData.Descriptions}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="added_date"
        value={formData.added_date}
        onChange={handleChange}
      />
      <button type="submit">{editingComplaint ? 'Update' : 'Add'}</button>
      {editingComplaint && <button type="button" onClick={handleCancel}>Cancel</button>}
    </form>
  );
};

export default ComplaintsForm;
