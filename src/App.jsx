import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// المكونات الأساسية اللي لازم تحمل فوراً
import Layout from "./Component/Layout/Layout";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import GardRoute from "./Component/GardRoute/GardRoute";
import TokenProvider from "./Component/Context/Token.context";
import CartProvider from "./Component/Context/Cart.context";

// استخدام الـ Lazy Loading للمكونات التقيلة لفك الـ Circular Dependency
const Home = lazy(() => import("./Component/Home/Home"));
const Login = lazy(() => import("./Component/Login/Login"));
const Register = lazy(() => import("./Component/Register/Register"));
const Cart = lazy(() => import("./Component/Cart/Cart"));
const ProductDetails = lazy(() => import("./Component/productDetails/ProductDetails"));
const CheckOut = lazy(() => import("./Component/CheckOut/CheckOut"));
const Order = lazy(() => import("./Component/Order/Order"));
const Products = lazy(() => import("./Component/Products/Products"));
const WhishList = lazy(() => import("./Component/whishList/WhishList"));
const Brands = lazy(() => import("./Component/brands/Brands"));
const BrandsDetails = lazy(() => import("./Component/brandsDetails/BrandsDetails"));
const Categories = lazy(() => import("./Component/Categories/Categories"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "allOrder", element: <Order /> },
      { path: "whishlist", element: <WhishList /> },
      { path: "brands", element: <Brands /> },
      { path: "brandsDetails/:id", element: <BrandsDetails /> },
      { path: "productDetails/:id", element: <ProductDetails /> },
    ],
  },
  {
    path: "/", 
    element: (
      <GardRoute>
        <Layout /> 
      </GardRoute>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const queryClient = new QueryClient();

// مكون بسيط يظهر أثناء التحميل بدل الصفحة البيضا
const LoadingFallback = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h2 style={{ color: '#4fa74f' }}>Loading FreshCart...</h2>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <CartProvider>
          <Suspense fallback={<LoadingFallback />}>
            <RouterProvider router={router} />
          </Suspense>
          <ToastContainer position="top-center" autoClose={2000} />
        </CartProvider>
      </TokenProvider>
    </QueryClientProvider>
  );
}