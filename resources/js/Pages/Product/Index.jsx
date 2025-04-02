import React, { useState, useEffect } from 'react';
import ProductCard from "../../components/domain/ProductCard";
import MainLayout from "../../layouts/MainLayout";

export default function Index({ products, categories }) {
    const [sortedProducts, setSortedProducts] = useState(products);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState("Categorías");
    const [selectedColor, setSelectedColor] = useState("Color");
    const [selectedTalla, setSelectedTalla] = useState("Talla");

    const categoriesList = ['Camisa', 'Pantalón', 'Jersey', 'Vestido', 'Chaqueta', 'Abrigo', 'Falda', 'Blazer', 'Top', 'Sudadera'];
    const colorsList = ['negro', 'blanco', 'gris', 'azul marino', 'beige', 'verde oliva', 'burdeos', 'camel', 'rosa palo', 'lavanda'];
    const tallasList = ['S', 'M', 'L', 'XL'];

    useEffect(() => {
        let filtered = products;
        if (selectedCategory !== "Categorías" || selectedColor !== "Color") {
            filtered = products.filter(p => {
                const matchCategory = selectedCategory !== "Categorías" && p.category && p.category.toLowerCase() === selectedCategory.toLowerCase();
                const matchColor = selectedColor !== "Color" && p.color && p.color.toLowerCase() === selectedColor.toLowerCase();
                return matchCategory || matchColor;
            });
        }
        setFilteredProducts(filtered);
        setSortedProducts(filtered);
    }, [products, selectedCategory, selectedColor]);

    const headingStyle = {
        fontSize: "16px",
        marginBottom: "10px",
        color: "#212121",
    };

    const customSelectStyle = {
        paddingRight: "2.5rem",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='black'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.5rem center",
        backgroundSize: "1rem"
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        let sorted = [...filteredProducts];
        if (value === "alfabeticamente") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === "precio-ascendente") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (value === "precio-descendente") {
            sorted.sort((a, b) => b.price - a.price);
        }
        setSortedProducts(sorted);
    };

    return (
        <MainLayout>
           <div className="flex justify-between items-center text-[13px] w-full mb-6">
            <div className="flex space-x-8">
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="bg-white rounded-md px-3 py-2 focus:outline-none focus:border-black focus:ring-2 focus:ring-black appearance-none"
                    style={{ ...headingStyle, paddingLeft: "14px", ...customSelectStyle }}>
                    <option value="Categorías" disabled>Categorías</option>
                    {categoriesList.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select
                    value={selectedColor}
                    onChange={e => setSelectedColor(e.target.value)}
                    className="bg-white rounded-md px-3 py-2 focus:outline-none focus:border-black focus:ring-2 focus:ring-black appearance-none"
                    style={{ ...headingStyle, paddingLeft: "4px", paddingRight: "2.5rem", width: "auto", ...customSelectStyle }}>
                    <option value="Color" disabled>Color</option>
                    {colorsList.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
                <select
                    value={selectedTalla}
                    onChange={e => setSelectedTalla(e.target.value)}
                    className="bg-white rounded-md px-3 py-2 focus:outline-none focus:border-black focus:ring-2 focus:ring-black appearance-none"
                    style={{ ...headingStyle, paddingLeft: "4px", paddingRight: "2.5rem", width: "auto", ...customSelectStyle }}>
                    <option value="Talla" disabled>Tallas</option>
                    {tallasList.map(talla => (
                        <option key={talla} value={talla}>{talla}</option>
                    ))}
                </select>
            </div>
            <div className="pr-8" style={{ ...headingStyle, display: "flex", alignItems: "center" }}>
                <label htmlFor="ordenado-por" style={{ marginRight: "8px" }}>Ordenado por:</label>
                <select id="ordenado-por"
                    className="appearance-none"
                    style={{ padding: "6px", fontSize: "1rem", paddingRight: "2.5rem", ...customSelectStyle }}
                    onChange={handleSortChange}>
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
