import { Link } from '@inertiajs/react'

export default function ProductCard({ product }) {

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
        </div>
    );
}

