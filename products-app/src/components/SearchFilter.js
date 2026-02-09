import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/products/productsSlice';

const SearchFilter = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(state => state.products);

    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search by Name (ProductName)..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
            />
        </div>
    );
};

export default SearchFilter;