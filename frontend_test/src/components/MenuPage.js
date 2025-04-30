import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Offcanvas } from 'react-bootstrap';

const MenuPage = ({ addToCart, cart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categories = ['Cupcake', 'Sea food', 'Juice', 'Coca', 'Orange juice']; // Xóa useState
    const [selectedCategory, setSelectedCategory] = useState('Sea food');
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [sideDishes, setSideDishes] = useState({ vegetables: false });
    const [showCategories, setShowCategories] = useState(false);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCartClick = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setSideDishes({ vegetables: false });
        setShowModal(true);
    };

    const handleAddToCartConfirm = () => {
        addToCart({ ...selectedProduct, quantity });
        setShowModal(false);
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = totalPrice * 0.1;
    const totalWithTax = totalPrice + tax;

    if (loading) return <div className="container mt-5">Loading...</div>;
    if (error) return <div className="container mt-5">{error}</div>;

    const filteredProducts = products.filter(product => product.category === selectedCategory);

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {/* Nút mở danh mục trên mobile */}
                <div className="d-md-none mb-3">
                    <Button variant="primary" onClick={() => setShowCategories(true)}>
                        Categories
                    </Button>
                </div>

                {/* Danh mục bên trái (ẩn trên mobile) */}
                <div className="col-md-2 d-none d-md-block">
                    <h5>Categories</h5>
                    <ul className="list-group">
                        {categories.map(category => (
                            <li
                                key={category}
                                className={`list-group-item ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                                style={{ cursor: 'pointer' }}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Danh sách sản phẩm ở giữa */}
                <div className="col-md-7 col-12">
                    <h1>Menu</h1>
                    <div className="row">
                        {filteredProducts.map(product => (
                            <div className="col-12 col-md-4 mb-4" key={product.id}>
                                <div className="card">
                                    <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Kr {product.price.toFixed(2)}</p>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleAddToCartClick(product)}
                                        >
                                            Add to Cart
                                        </button>
                                        <Link to={`/product/${product.id}`} className="btn btn-info ms-2">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nút mở giỏ hàng trên mobile */}
                <div className="d-md-none mb-3">
                    <Button variant="primary" onClick={() => setShowCart(true)}>
                        Cart ({cart.length})
                    </Button>
                </div>

                {/* Giỏ hàng bên phải (ẩn trên mobile) */}
                <div className="col-md-3 d-none d-md-block">
                    <h3>Your Cart ({cart.length})</h3>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="list-group mb-3">
                                {cart.map(item => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            {item.quantity} x {item.name}
                                        </div>
                                        <div>
                                            Kr {(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex justify-content-between">
                                <span>Total (Incl. tax 10%):</span>
                                <span>Kr {totalWithTax.toFixed(2)}</span>
                            </div>
                            <Link to="/cart" className="btn btn-danger w-100 mt-3">
                                Payment
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Offcanvas cho danh mục trên mobile */}
            <Offcanvas show={showCategories} onHide={() => setShowCategories(false)} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-group">
                        {categories.map(category => (
                            <li
                                key={category}
                                className={`list-group-item ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setShowCategories(false);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Offcanvas cho giỏ hàng trên mobile */}
            <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart ({cart.length})</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="list-group mb-3">
                                {cart.map(item => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            {item.quantity} x {item.name}
                                        </div>
                                        <div>
                                            Kr {(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex justify-content-between">
                                <span>Total (Incl. tax 10%):</span>
                                <span>Kr {totalWithTax.toFixed(2)}</span>
                            </div>
                            <Link to="/cart" className="btn btn-danger w-100 mt-3" onClick={() => setShowCart(false)}>
                                Payment
                            </Link>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>

            {/* Modal "Add to Cart" */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add to Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <div className="d-flex flex-column flex-md-row">
                            <img
                                src={selectedProduct.imageUrl}
                                alt={selectedProduct.name}
                                style={{ width: '100px', marginRight: '20px', marginBottom: '10px' }}
                            />
                            <div>
                                <h5>{selectedProduct.name}</h5>
                                <p>SKU: 401</p>
                                <p>Unit Price: Kr {selectedProduct.price.toFixed(2)}</p>
                                <div className="d-flex align-items-center mb-3">
                                    <label className="me-2">Quantity:</label>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{quantity}</span>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <h6>Protein: 0%</h6>
                                    <p>Nutritional value: 0%</p>
                                    <p>Baking material: 0%</p>
                                    <p>Food decoration: 0%</p>
                                </div>
                                <div>
                                    <h6>Side dishes (0%)</h6>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={sideDishes.vegetables}
                                            onChange={(e) => setSideDishes({ ...sideDishes, vegetables: e.target.checked })}
                                        />
                                        <label className="form-check-label">Vegetables</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleAddToCartConfirm}>
                        Kr {(selectedProduct?.price * quantity).toFixed(2)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MenuPage;