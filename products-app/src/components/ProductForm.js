import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAddProductMutation, useUpdateProductMutation, useFetchProductsQuery } from '../features/products/productAPI.js';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = ({ isEdit }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: products = [] } = useFetchProductsQuery();
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        offerPrice: '',
        photo: '',
        qty: '',
        descriptions: '',
        addedDate: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit && id) {
            const product = products.find(p => p.id === parseInt(id));
            if (product) setFormData(product);
        }
    }, [isEdit, id, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result }); // Base64 for simulation
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.productName) newErrors.productName = 'Product Name is required';
        if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid Price is required';
        if (!formData.qty || isNaN(formData.qty)) newErrors.qty = 'Valid Qty is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            if (isEdit) {
                await updateProduct({ id: parseInt(id), updatedProduct: formData });
            } else {
                await addProduct(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Product Name"
                required
                style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            />
            {errors.productName && <p style={{ color: 'red' }}>{errors.productName}</p>}

            <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
                style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            />
            {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}

            <input
                name="offerPrice"
                type="number"
                value={formData.offerPrice}
                onChange={handleChange}
                placeholder="Offer Price"
                style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'block', marginBottom: '10px' }}
            />

            <input
                name="qty"
                type="number"
                value={formData.qty}
                onChange={handleChange}
                placeholder="Qty"
                required
                style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            />
            {errors.qty && <p style={{ color: 'red' }}>{errors.qty}</p>}

            <textarea
                name="descriptions"
                value={formData.descriptions}
                onChange={handleChange}
                placeholder="Descriptions"
                style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            />

            <input
                name="addedDate"
                type="date"
                value={formData.addedDate}
                onChange={handleChange}
                style={{ display: 'block', marginBottom: '10px', width: '100%' }}
            />

            <button type="submit" style={{ padding: '10px 20px' }}>{isEdit ? 'Update' : 'Add'} Product</button>
        </form>
    );
};

export default ProductForm;