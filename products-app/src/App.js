import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ProductsTable from './components/ProductsTable';
import ProductForm from './components/ProductForm';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<ProductsTable />} />
                    <Route path="/add" element={<ProductForm isEdit={false} />} />
                    <Route path="/edit/:id" element={<ProductForm isEdit={true} />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;