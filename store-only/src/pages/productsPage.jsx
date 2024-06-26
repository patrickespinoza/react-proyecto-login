import { useEffect, useState } from "react"
import { getProducts } from "../api"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export default function ProductsPage () {
const [products, setProducts] = useState ([])
const navigate = useNavigate()
   

useEffect (() => {
    const token  = localStorage.getItem("token")

    if(!token) {
        toast.error("Debes iniciar secion para ver los productos")
        navigate("/login")
        return
        
    }
    getProducts()
    .then((prods) => {
     setProducts(prods)
    })
    .catch(error => { 
        toast.error("Error al obtener los productos")
        console.error("[getProducts error]", error)
    })

}, [])
    

    return (
    

        <main className="p-4 ">
            <h1 className="text-4xl font-semibold text-center ">Productos</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {
                    products.map((product, idx) => {
                        return (
                            <article key={`prod-${idx}`} className="hover:bg-white/10 cursor-pointer rounded p-4 flex flex-col">
                                <img src={product.thumbnail} alt={product.title} />
                                <p>{product.title}</p>
                                <Link to= {`/producto/${product.id}`} className="bg-white/50 w-full p-2 rounded text-center">
                                Ver datalle
                                </Link>

                            </article>
                        )
                    })
                }
            </section>
        </main>
    )
}



 // useEffect(() => {console.log("termino de renderizar")}, [])

    // useEffect(() => {console.log("use effect count", count)} ,  [count])

    // useEffect(() => {console.log("sin dep")}, []) 