import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../api"
import { toast } from "sonner"

export default function ProductDetailPage () {

    const {id}  = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        getProduct(id)
        .then((prod) => {
            setProduct(prod)
        })
        .catch(error => {
            toast.error(`Error al obtener producto ${id}`)
            console.error("[getProdcut error]", error)
        })
    }, [id])
    
    if(!product) {
        return ( <div>Cargando...</div> )
    }

    const {dimensions} = product;

    return (
        <main className="flex justify-center items-center min-h-screen bg-black p-4 text-black ">
            <article className="bg-white/70 rounded-lg shadow-lg p-6 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-2 "> {product.title}</h1>
                <img className="w-full h-auto rounded-lg mb-4" src={product.thumbnail}/>
                <p className="text-gray-700 mb-2 p-6"> {product.description}</p>
                <p className="text-gray-700 mb-2 text-start p-2">Categoría: {product.category}</p>
                <p className="text-gray-700 mb-2 text-start p-2">Precio: ${product.price}</p>
                <p className="text-gray-700 mb-2 text-start p-2">Tags: {product.tags}</p>
                <p className="text-gray-700 mb-2 text-start p-2">Marca: {product.brand}</p>
                {dimensions && (
                    <ul className="text-left">
                        <li className="text-gray-700 mb-1 p-2">Ancho: {dimensions.width} cm</li>
                        <li className="text-gray-700 mb-1 p-2">Altura: {dimensions.height} cm</li>
                        <li className="text-gray-700 mb-1 p-2">Profundidad: {dimensions.depth} cm</li>
                    </ul>
                )}
            </article>
        </main>
    );
}