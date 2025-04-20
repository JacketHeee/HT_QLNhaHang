import React, { useState } from 'react';
import axios from 'axios';

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
    const [isTakeAway, setIsTakeAway] = useState(false);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = totalPrice * 0.1;
    const totalWithTax = totalPrice + tax;

    const handleCheckout = async () => {
        try {
            const orderData = {
                customerId: 1,
                totalPrice: totalWithTax,
                isTakeAway,
            };
            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            }));
            await axios.post('http://localhost:3001/orders', { order: orderData, items });
            alert('Order placed successfully!');
            removeFromCart(-1);
        } catch (err) {
            alert('Failed to place order');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>Kr {item.price.toFixed(2)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, +e.target.value)}
                                            className="form-control w-25 d-inline-block"
                                        />
                                    </td>
                                    <td>Kr {(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-3">
                        <label className="form-check-label">
                            <input
                                type="checkbox"
                                checked={isTakeAway}
                                onChange={(e) => setIsTakeAway(e.target.checked)}
                                className="form-check-input"
                            />
                            Take Away
                        </label>
                    </div>
                    <h3>Total (Incl. tax 10%): Kr {totalWithTax.toFixed(2)}</h3>
                    <button className="btn btn-success w-100" onClick={handleCheckout}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPage;