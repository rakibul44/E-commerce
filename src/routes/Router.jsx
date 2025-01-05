import { createBrowserRouter } from "react-router-dom";

// main pages
import Main from "../layout/Main";
import Home from '../Home';
import Contact from '../pages/Contact'; 
import Product from '../pages/Product';
import Payment from '../pages/Payment';
import Confirmation from "../pages/Confirmation";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wishlist from "../pages/Wishlist";
import Mycart from "../pages/Mycart";
import Blog from "../pages/Blog";

// dashboard pages 
import DashboardLayout from "../layout/DashboardLayout";
import AdminDashboardHome from "../dashboard/pages/AdminDashboardHome";
import ProfileUpdate from "../dashboard/pages/ProfileUpdate";
import PaymentMethod from "../dashboard/pages/PaymentMethod";
import OrderList from "../dashboard/pages/Orderlist";
import Wishcart from "../dashboard/pages/WishCart";
import Address from "../dashboard/pages/Address";
import Support from "../dashboard/pages/Support";
import Customer from "../dashboard/pages/Customer";
import Campaign from "../dashboard/pages/Campaign";
import Message from "../dashboard/pages/Message";
import ScrollNotice from "../dashboard/pages/ScrollNotice";
import ProductList from "../dashboard/pages/Prducts/ProductList";
import AddProduct from "../dashboard/pages/Prducts/AddProduct";
import UpdateProduct from "../dashboard/pages/Prducts/UpdateProduct";
import Categories from "../dashboard/pages/categoryAndBrand/Categories";
import AddCategory from "../dashboard/pages/categoryAndBrand/AddCategory";
import EditCategory from "../dashboard/pages/categoryAndBrand/EditCategory";
import AllBrands from "../dashboard/pages/categoryAndBrand/AllBrands";
import AddBrand from "../dashboard/pages/categoryAndBrand/AddBrand";
import EditBrand from "../dashboard/pages/categoryAndBrand/EditBrand";
import PendingOrders from "../dashboard/pages/PendingOrders";
import ShippedOrders from "../dashboard/pages/ShippedOrders";
import DeliveredOrders from "../dashboard/pages/Delivered";
import CancelledOrders from "../dashboard/pages/CancelledOrders";
import ReturnedOrders from "../dashboard/pages/ReturnedOrders";

// import SendNewsletter from "../dashboard/pages/SendNewsletter";


// main routes
const mainRoutes = [
    { path: '/',    element: <Home /> },
    { path: '/contact',     element: <Contact /> },
    { path: '/product',     element: <Product /> },
    { path: '/payment',     element: <Payment /> },
    { path: '/confirmation',     element: <Confirmation /> },
    { path: '/ProductDetails',     element: <ProductDetails /> },
    { path: '/login',     element: <Login /> },
    { path: '/register',     element: <Register /> },
    { path: '/wishlist',     element: <Wishlist /> },
    { path: '/mycart',     element: <Mycart /> },
    { path: '/blog',     element: <Blog /> },

];

// dashboard routes
const dashboardRoute = [
    {  path:'',    element:<AdminDashboardHome /> },
    {  path:'profileupdate',    element: <ProfileUpdate /> },
    {  path:'payment',    element: <PaymentMethod /> },
    {  path:'order',    element: <OrderList /> },
    {  path:'orders/pending',    element: <PendingOrders/> },
    {  path:'orders/shipped',    element: <ShippedOrders/> },
    {  path:'orders/delivered',    element: <DeliveredOrders/> },
    {  path:'orders/cancelled',    element: <CancelledOrders/> },
    {  path:'orders/returned',    element: <ReturnedOrders/> },
    {  path:'wishcart',    element: <Wishcart /> },
    {  path:'address',    element: <Address /> },
    {  path:'support',    element: <Support /> },
    {  path:'customer',    element: <Customer /> },
    // {  path:'newsletter',  element: <SendNewsletter /> },
    {  path:'camp',    element: <Campaign /> },
    {  path:'message',    element: <Message /> },
    {  path:'notice',    element: <ScrollNotice /> },
    {  path:'productlist',    element: <ProductList /> },
    {  path:'add-product',    element: <AddProduct /> },
    {  path:'update-product/:id',    element: <UpdateProduct /> },
    {  path:'categories',    element: <Categories /> },
    {  path:'add-category',    element: <AddCategory /> },
    {  path:'edit-category/:id',    element: <EditCategory /> },
    {  path:'brands',    element: <AllBrands /> },
    {  path:'add-brand',    element: <AddBrand /> },
    {  path:'edit-brand/:id',    element: <EditBrand /> },
]

// all routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: mainRoutes, // Pass the mainRoutes as children
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: dashboardRoute, // Pass the dashboardRoutes as children
    },
    
]);

export default router;
