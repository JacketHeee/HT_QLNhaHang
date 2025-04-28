import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (error) return <div className="container mt-5">{error}</div>;
    if (!product) return <div className="container mt-5">Product not found</div>;

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    return (
        <div className="container mt-5">
            <h1>{product.name}</h1>
            <div className="row">
                <div className="col-12 col-md-6">
                    <img src={product.imageUrl} alt={product.name} className="img-fluid" style={{ maxWidth: '100%' }} />
                </div>
                <div className="col-12 col-md-6">
                    <p>{product.description}</p>
                    <p>Price: Kr {product.price.toFixed(2)}</p>
                    <div className="mb-3">
                        <label className="form-label">Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(+e.target.value)}
                            className="form-control w-25 d-inline-block"
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;