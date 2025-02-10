import { Link } from '@inertiajs/react'

export default function ProductCard({ product }) {
    const addToFavorites = async (productId) => {
        try {
            await window.axios.post('/favourite', { product_id: productId });
            alert("Producto agregado a favoritos");
        } catch (error) {
            console.error("Error al agregar el favorito", error);
        }
    };

    return (
        <div className="flex flex-col group cursor-pointer">
            <div className="overflow-hidden">
                <Link href={`/products/${product.id}`}>
                <img
                    src={product.images[0]}
                    width="600"
                    className="transform duration-300 ease-in-out group-hover:scale-105"
                />
                </Link>
            </div>

            <Link href={`/products/${product.id}`} className="text-center group-hover:underline">
                <h2>{product.name}</h2>
            </Link>

            <div className="text-center">
                <span className="text-[13px]">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}</span>
            </div>

            {/* BOTÓN PARA AÑADIR A FAVORITOS */}
            <button
                onClick={() => addToFavorites(product.id)}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
            >
                Añadir a favoritos
            </button>
        </div>
    );
}

