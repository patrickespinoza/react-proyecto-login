import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/productsPage'
import ProductDetailPage from './pages/productDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  }, 
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/productos',
    element: <ProductsPage/>
  },
  {
    path: '/producto/:id',
    element: <ProductDetailPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
<>
  <Toaster/>
  <RouterProvider router = {router} />
</>
)
