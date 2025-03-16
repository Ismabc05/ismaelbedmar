import React, { useState, useEffect } from 'react';
import ProductCard from "../../components/domain/ProductCard";
import MainLayout from "../../layouts/MainLayout";

export default function Index({ products, categories }) { // Añadir 'categories' como prop
    const [sortedProducts, setSortedProducts] = useState(products);

    useEffect(() => {
        setSortedProducts(products);
    }, [products]);

    const headingStyle = {
        fontSize: "16px",
        marginBottom: "10px",
        color: "#212121",
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        if(value === "alfabeticamente"){
            const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
            setSortedProducts(sorted);
        } else if(value === "precio-ascendente"){
            const sorted = [...products].sort((a, b) => a.price - b.price);
            setSortedProducts(sorted);
        } else if(value === "precio-descendente"){
            const sorted = [...products].sort((a, b) => b.price - a.price);
            setSortedProducts(sorted);
        }
    };

    return (
        <MainLayout>
           <div className="flex justify-between items-center text-[13px] w-full mb-6">
            <div className="flex space-x-8">
                <select className="pl-8" style={headingStyle}>
                    <option value="" hidden>Categorías</option>
                    {categories && categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <select className="pl-8" style={headingStyle}>
                    <option value="" hidden>Color</option>
                </select>
                <select className="pl-8" style={headingStyle}>
                    <option value="" hidden>Talla</option>
                </select>
            </div>
            <div className="pr-8" style={{ ...headingStyle, display: "flex", alignItems: "center" }}>
                <label htmlFor="ordenado-por" style={{ marginRight: "8px" }}>Ordenado por:</label>
                <select id="ordenado-por" style={{ padding: "6px", fontSize: "1rem" }} onChange={handleSortChange}>
                    <option value="" hidden></option>
                    <option value="alfabeticamente">Filtrar alfabeticamente</option>
                    <option value="precio-ascendente">Filtrar precio ascendente</option>
                    <option value="precio-descendente">Filtrar precio descendente</option>
                </select>
            </div>
           </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 text-[13px]">
                { sortedProducts.map(product => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </MainLayout>
    )
}
