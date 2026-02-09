import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/complaints'; // Assume json-server or real API

// Async thunks
export const fetchComplaints = createAsyncThunk(
  'complaints/fetchComplaints',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addComplaint = createAsyncThunk(
  'complaints/addComplaint',
  async (complaint) => {
    const response = await axios.post(API_URL, complaint);
    return response.data;
  }
);

export const updateComplaint = createAsyncThunk(
  'complaints/updateComplaint',
  async ({ id, updatedComplaint }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedComplaint);
    return response.data;
  }
);

export const deleteComplaint = createAsyncThunk(
  'complaints/deleteComplaint',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState: {
    complaints: [],
    status: 'idle',
    error: null,
    searchTerm: '',
    editingComplaint: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setEditingComplaint: (state, action) => {
      state.editingComplaint = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.complaints = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComplaint.fulfilled, (state, action) => {
        state.complaints.push(action.payload);
      })
      .addCase(updateComplaint.fulfilled, (state, action) => {
        const index = state.complaints.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.complaints[index] = action.payload;
        }
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.complaints = state.complaints.filter(c => c.id !== action.payload);
      });
  },
});

export const { setSearchTerm, setEditingComplaint } = complaintsSlice.actions;
export default complaintsSlice.reducer;
