import React, { useState, useEffect } from "react";
import { LuShoppingCart, LuSearch, LuHeart, LuUserRound, LuTrash2 } from "react-icons/lu";
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react'
import axios from 'axios';

export default function Navbar({ products, selectedProduct }) {
    const page = usePage();
    const loggedUser = page.props.user;
    const [activeModal, setActiveModal] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([])

    const modalContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    };

    const topButtonsContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    };

    const bottomButtonsContainerStyle = {
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };

    const profileButtonStyle = {
        width: "100%",
        padding: "12px",
        color: "black",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        backgroundColor: "#f0f0f0", // Color base
      };

    const logoutButtonStyle = {
        ...profileButtonStyle,
        width: "100%",
        backgroundColor: "red",
        color: "white",
        transition: "background-color 0.3s ease",
        ':hover': {
            backgroundColor: "#cc0000", // Un rojo más oscuro
        }
    };

    const closeButtonStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#333",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        ':hover': {
            backgroundColor: "#222", // Un gris más oscuro
        }
    };



    useEffect(() => {
            // Se usa localStorage para usuarios no autenticados
            setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
            setCart(JSON.parse(localStorage.getItem('cart')) || []);

            const updateCart = () => setCart(JSON.parse(localStorage.getItem('cart')) || []);
            const updateFavorites = () => setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);

            window.addEventListener('cartUpdated', updateCart);
            window.addEventListener('favoritesUpdated', updateFavorites);

            return () => {
                window.removeEventListener('cartUpdated', updateCart);
                window.removeEventListener('favoritesUpdated', updateFavorites);
            };
    }, []);

    const handleIconClick = (modalName) => {
        setActiveModal(modalName === activeModal ? null : modalName);
    };

    const removeFromFavorites = (productId) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const iconStyle = (isActive) => ({
        color: isActive ? "gray" : "black",
        cursor: "pointer",
        transition: "color 0.3s ease",
    });

    const handleSearch = async () => {
        const trimmedTerm = searchTerm.trim();
        console.log("Search term:", trimmedTerm);
        if (!trimmedTerm) {
            setSearchResults([]);
            setActiveModal("search");
            return;
        }
        try {
            const response = await axios.get(`/api/productos/search?query=${encodeURIComponent(trimmedTerm)}`);
            console.log("Search results:", response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching products:", error);
            setSearchResults([]);
        }
        setActiveModal("search");
    };

    // Nueva función para agregar a favoritos, actualizada para usuarios logueados.
    const addToFavorites = (product) => {
        if (!product) return;
            // Lógica existente para usuarios no autenticados.
        const exists = favorites.some(fav => fav.id === product.id);
        if (!exists) {
            const updatedFavorites = [...favorites, product];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            window.dispatchEvent(new Event('favoritesUpdated'));
        }
    };

    // Actualizamos la función para el icono del corazón
    const handleFavoriteClick = () => {
        // Si no hay producto seleccionado, simplemente muestra el panel de favoritos sin agregar nada.
        if (selectedProduct) {
            addToFavorites(selectedProduct);
        }
        handleIconClick("favorites");
    };

    // Agregar la función de logout
    const handleLogout = () => {
        axios.post('/users/logout')
            .then(() => {
                localStorage.clear();
                window.location.href = "/users";
            })
            .catch(err => {
                console.error("Error closing session", err);
                localStorage.clear();
                window.location.href = "/users";
            });
    };

    return (
        <>
            <nav className="navbar px-4" style={{ position: "relative", zIndex: 1001 }}>
                <div className="left-menu"></div>
                <div className="logo" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer', transition: 'transform 0.3s ease '}}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.10)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <img src="/images/logo-1 (1).png" alt="Logo" />
                </div>

                <div className="right-menu" style={{ display: "flex", gap: "15px" }}>
                    <LuSearch size={20} style={iconStyle(activeModal === "search")} onClick={() => handleIconClick("search")} />
                    <LuHeart size={20} style={iconStyle(activeModal === "favorites")} onClick={handleFavoriteClick} />
                    <div style={{ position: "relative" }}>
                        <LuShoppingCart size={20} style={iconStyle(activeModal === "cart")} onClick={() => handleIconClick("cart")} />
                        {cartTotalItems > 0 && (
                            <span style={{
                                position: "absolute",
                                top: "-15px",
                                right: "-12px",
                                color: "black",
                                borderRadius: "50%",
                                padding: "2px 6px",
                                fontSize: "16px",
                                fontWeight: "bold" ,
                            }}>
                                {cartTotalItems}
                            </span>
                        )}
                    </div>
                    {loggedUser && (
                        <LuUserRound
                            size={20}
                            style={iconStyle(activeModal === "user")}
                            onClick={() => handleIconClick("user")}
                        />
                    )}
                </div>
            </nav>

            {activeModal && (
                <div className="modal-panel" style={{
                    position: "fixed",
                    top: "0",
                    right: "0",
                    width: "30%",
                    height: "100%",
                    backgroundColor: "white",
                    boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.2)",
                    zIndex: 1000,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <h2 style={{
                        fontSize: "1.5rem",
                        marginBottom: "1.5rem",
                        marginTop: "70px",
                        textAlign: "center",
                    }}>
                        {activeModal === "search" && "Buscar"}
                        {activeModal === "favorites" && "Favoritos"}
                        {activeModal === "cart" && "Carrito"}
                        {activeModal === "user" && "Mi perfil"}
                    </h2>

                    {activeModal === "search" && (
                        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", height: "100%" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        fontSize: "1rem",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        marginRight: "10px"
                                    }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button
                                    style={{
                                        padding: "10px 15px",
                                        backgroundColor: "#333",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease",
                                        ':hover': {
                                        backgroundColor: "#222", // Un gris más oscuro
                                        }

                                    }}onClick={handleSearch}onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222"}  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#333"}>Buscar
                                </button>
                            </div>
                            {/* Mostrar resultados de búsqueda sin redirigir */}
                            <div style={{ flex: 1, overflowY: "auto" }}>
                                {searchResults.length > 0 ? (
                                    searchResults.map(product => (
                                        <div key={product.id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                                            <p style={{ margin: 0, fontWeight: "bold" }}>{product.name}</p>
                                            <p style={{ margin: 0 }}>
                                                {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(product.price)}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No se encontraron productos.</p>
                                )}
                            </div>
                            <button
                                onClick={() => setActiveModal(null)}
                                style={{
                                    width: "100%",
                                    padding: "10px 15px",
                                    backgroundColor: "#333",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    marginTop: "auto",
                                    transition: "background-color 0.3s ease",
                                    ':hover': {
                                     backgroundColor: "#222", // Un gris más oscuro
                                     }

                                }}onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222"}  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#333"}>Cerrar
                            </button>
                        </div>
                    )}

                    {activeModal === "cart" && (
                        <div style={{
                            padding: "0 20px",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            overflowY: "auto" // Allow the entire modal to scroll
                        }}>
                            {cart.length === 0 ? (
                                <>
                                    <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>Tu carrito está vacío.</p>
                                    <button onClick={() => setActiveModal(null)} style={{
                                        width: "100%",
                                        padding: "10px 15px",
                                        backgroundColor: "#333",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        marginTop: "auto",
                                        transition: "background-color 0.3s ease",
                                        ':hover': {
                                            backgroundColor: "#222", // Un gris más oscuro
                                        }
                                    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#333"}>Cerrar</button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        {cart.map(item => (
                                            <div key={`${item.id}-${item.size}`} style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                padding: "15px 0",
                                                borderBottom: "1px solid #eee",
                                            }}>
                                                <p
                                                    style={{ fontWeight: "bold", flex: 1, cursor: "pointer", transition: "all 0.3s ease" }}
                                                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                                    onClick={() => window.location.href = `/products/${item.id}`}
                                                >
                                                    {item.name} (x{item.quantity}) - Talla: {item.size}
                                                </p>
                                                <p style={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                                                    {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(item.price * item.quantity)}
                                                </p>
                                                <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "20px" }}>
                                                    <LuTrash2 size={18} color="black" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ borderTop: "2px solid #ddd", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "15px" }}>
                                        <p style={{
                                            textAlign: "right",
                                            fontSize: "1.2rem",
                                            fontWeight: "bold",
                                            marginBottom: "15px"
                                        }}>
                                            Total: {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cartTotalPrice)}
                                        </p>
                                        <button
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                backgroundColor: "#4CAF50",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                transition: "background-color 0.3s ease"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
                                            onClick={() => {
                                                if (!loggedUser) {
                                                    window.location.href = "/users"; // Redirige a /users para invitados
                                                } else {
                                                    window.location.href = "/payment"; // Redirige a la vista de pago
                                                }
                                            }}
                                        >
                                            Proceder al pago
                                        </button>
                                        <button onClick={() => setActiveModal(null)} style={{
                                            width: "100%",
                                            padding: "10px 15px",
                                            backgroundColor: "#333",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "1rem",
                                            transition: "background-color 0.3s ease",
                                            ':hover': {
                                                backgroundColor: "#222", // Un gris más oscuro
                                            }
                                        }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#333"}>Cerrar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeModal === "favorites" && (
                        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", height: "100%" }}>
                            {favorites.length === 0 ? (
                                <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>No tienes favoritos aún.</p>
                            ) : (
                                <div style={{ flex: 1, overflowY: "auto" }}>
                                    {favorites.map(fav => (
                                        <div key={fav.id} style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "15px 0",
                                            borderBottom: "1px solid #eee",
                                        }}>
                                            <p
                                                style={{ fontWeight: "bold", flex: 1, cursor: "pointer", transition: "all 0.3s ease" }}
                                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                                onClick={() => window.location.href = `/products/${fav.id}`}
                                            >
                                                {fav.name}
                                            </p>
                                            <p style={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                                                {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(fav.price)}
                                            </p>
                                            <button onClick={() => removeFromFavorites(fav.id)} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "20px" }}>
                                                <LuTrash2 size={18} color="black" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button onClick={() => setActiveModal(null)} style={{
                                width: "100%",
                                padding: "10px 15px",
                                backgroundColor: "#333",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                marginTop: "auto",
                                transition: "background-color 0.3s ease",
                                ':hover': {
                                backgroundColor: "#222",
                                }
                            }}onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#333"}>Cerrar</button>
                        </div>
                    )}
                    {activeModal === "user" && (
                        <div style={modalContainerStyle}>
                            {/* Se muestra el nombre del usuario logueado */}
                            <p style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "80px" }}>
                                Bienvenid@{ loggedUser && (loggedUser.nombre || loggedUser.name) ? `, ${loggedUser.nombre || loggedUser.name}` : ", Invitado" }
                            </p>
                            <div style={topButtonsContainerStyle}>
                                <a
                                    href="/cart"
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        marginBottom: "10px",
                                        textDecoration: "none",
                                        color: "black",
                                        transition: "color 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "gray"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "black"}
                                >
                                    Ver mis pedidos
                                </a>
                                <a
                                    href="/favourite"
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        marginBottom: "10px",
                                        textDecoration: "none",
                                        color: "black",
                                        transition: "color 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "gray"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "black"}
                                >
                                    Ver mis favoritos
                                </a>
                                <a
                                    href="/users/name/edit"
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        marginBottom: "10px",
                                        textDecoration: "none",
                                        color: "black",
                                        transition: "color 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "gray"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "black"}
                                >
                                    Cambiar nombre
                                </a>
                                <a
                                    href="/users/email/edit"
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        marginBottom: "10px",
                                        textDecoration: "none",
                                        color: "black",
                                        transition: "color 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "gray"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "black"}
                                >
                                    Cambiar correo
                                </a>
                                <a
                                    href="/users/password/edit"
                                    style={{
                                        textAlign: "center",
                                        fontSize: "1rem",
                                        marginBottom: "10px",
                                        textDecoration: "none",
                                        color: "black",
                                        transition: "color 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "gray"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "black"}
                                >
                                    Cambiar contraseña
                                </a>
                            </div>
                            <div style={bottomButtonsContainerStyle}>
                                <button
                                    style={logoutButtonStyle}
                                    onClick={handleLogout}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#cc0000"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "red"}
                                >
                                    Cerrar sesion
                                </button>
                                <button onClick={() => setActiveModal(null)} style={closeButtonStyle} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#333"}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

