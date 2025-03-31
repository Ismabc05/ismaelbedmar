import React, { useState, useEffect } from 'react';
import ProductCard from "../../components/domain/ProductCard";
import MainLayout from "../../layouts/MainLayout";

export default function Index({ products, categories }) {
    const [sortedProducts, setSortedProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState("Categorías");
    const [selectedColor, setSelectedColor] = useState("Color");
    const [selectedTalla, setSelectedTalla] = useState("Talla");

    const categoriesList = ['Camisa', 'Pantalón', 'Jersey', 'Vestido', 'Chaqueta', 'Abrigo', 'Falda', 'Blazer', 'Top', 'Sudadera'];
    const colorsList = ['negro', 'blanco', 'gris', 'azul marino', 'beige', 'verde oliva', 'burdeos', 'camel', 'rosa palo', 'lavanda'];
    const tallasList = ['S', 'M', 'L', 'XL'];

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
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
                    style={{ ...headingStyle, paddingLeft: `${selectedCategory.length * 8 + 16}px` }}>
                    <option value="Categorías" disabled>Categorías</option>
                    {categoriesList.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select
                    value={selectedColor}
                    onChange={e => setSelectedColor(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
                    style={{ ...headingStyle, paddingLeft: `${selectedColor.length * 8 + 16}px` }}>
                    <option value="Color" disabled>Color</option>
                    {colorsList.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
                <select
                    value={selectedTalla}
                    onChange={e => setSelectedTalla(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
                    style={{ ...headingStyle, paddingLeft: `${selectedTalla.length * 8 + 16}px` }}>
                    <option value="Talla" disabled>Talla</option>
                    {tallasList.map(talla => (
                        <option key={talla} value={talla}>{talla}</option>
                    ))}
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
