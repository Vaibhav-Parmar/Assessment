import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchProductsQuery, useDeleteProductMutation } from '../features/products/productAPI.js';
import { useNavigate } from 'react-router-dom';
import SearchFilter from './SearchFilter';

const ProductsTable = () => {
    const navigate = useNavigate();
    const { data: products = [], isLoading, isError, error } = useFetchProductsQuery(); // Added isError and error for better handling
    console.log('API Debug:', { data: products, isLoading, isError, error });
    const [deleteProduct] = useDeleteProductMutation();
    const { searchQuery } = useSelector(state => state.products);

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message || 'Failed to fetch products (check API setup)'}</p>; // Now shows 404 details

    return (
        <div style={{ padding: '20px' }}>
            <h1>Products</h1>
            <SearchFilter />
            <button onClick={() => navigate('/add')} style={{ marginBottom: '20px' }}>Add Product</button>
            {filteredProducts.length === 0 ? (
                <p>No records found</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Offer Price</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Qty</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Descriptions</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Added Date</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Photo</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.productName}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.price}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.offerPrice}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.qty}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.descriptions}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.addedDate}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {product.photo ? <img src={product.photo} alt="Product" style={{ width: '50px' }} /> : 'No Photo'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button onClick={() => navigate(`/edit/${product.id}`)}>Edit</button>
                                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductsTable;