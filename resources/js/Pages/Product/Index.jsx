import React from 'react';
import ProductCard from "../../components/domain/ProductCard";
import MainLayout from "../../layouts/MainLayout";

export default function Index({ products }){
    const headingStyle = {
        fontSize: "16px",
        marginBottom: "10px",
        color: "#212121",
      };

    return (
        <MainLayout>
           <div className="flex justify-between items-center text-[13px] w-full mb-6">
            <div className="flex space-x-8">
                <p className="pl-8" style={headingStyle}>Categorías</p>
                <p style={headingStyle}>Color</p>
                <p style={headingStyle}>Talla de la ropa</p>
                </div>
                <p className="pr-8" style={headingStyle}>Ordenado por</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 text-[13px]">
                {
                    products.map(product => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                }
            </div>
        </MainLayout>
    )
}
