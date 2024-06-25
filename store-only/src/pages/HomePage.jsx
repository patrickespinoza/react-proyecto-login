import { Link } from "react-router-dom"

export default function HomePage () {
    return (
        <div>
            <h1 className="flex  justify-center items-center">Home page</h1>
            <p>this is a home page</p>
            <div className="text-center">
                <Link to="/login">Login</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/producto/123">Producto</Link>
            </div>
        </div>
    )
}