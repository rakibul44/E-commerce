import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from '../Home';
import Contact from '../pages/Contact'; // Import the ContactUs component
import Product from '../pages/Product';
import Payment from '../pages/Payment';
import Confirmation from "../pages/Confirmation";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wishlist from "../pages/Wishlist";
import Mycart from "../pages/Mycart";
import DashboardLayout from "../layout/DashboardLayout";
// import Dashboard from "../dashboard/pages/Dashboard";
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
import ProductList from "../dashboard/pages/ProductList";
import AddProduct from "../dashboard/pages/AddProduct";
import Dashboard1 from "../dashboard/pages/Dashboard1";



const mainRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/contact', // Define the contact page route
        element: <Contact />,
    },
    {
        path: '/product', // Define the contact page route
        element: <Product />,
    },
    {
        path: '/payment', // Define the contact page route
        element: <Payment />,
    },
    {
        path: '/confirmation', // Define the contact page route
        element: <Confirmation />,
    },
    {
        path: '/ProductDetails', // Define the contact page route
        element: <ProductDetails />,
    },
    {
        path: '/login', // Define the contact page route
        element: <Login />,
    },
    {
        path: '/register', // Define the contact page route
        element: <Register />,
    },
    {
        path: '/wishlist', // Define the contact page route
        element: <Wishlist />,
    },
    {
        path: '/mycart', // Define the contact page route
        element: <Mycart />,
    },
];

const dashboardRoute = [
    {
        path:'',
        element:<Dashboard1 />,
    },
    {
        path:'profileupdate',
        element: <ProfileUpdate />
    },
    {
        path:'payment',
        element: <PaymentMethod />
    },
    {
        path:'order',
        element: <OrderList />
    },
    {
        path:'wishcart',
        element: <Wishcart />
    },
    {
        path:'address',
        element: <Address />
    },
    {
        path:'support',
        element: <Support />
    },
    {
        path:'customer',
        element: <Customer />
    },
    {
        path:'camp',
        element: <Campaign />
    },
    {
        path:'message',
        element: <Message />
    },
    {
        path:'notice',
        element: <ScrollNotice />
    },
    {
        path:'productlist',
        element: <ProductList />
    },
    {
        path:'update',
        element: <AddProduct />
    },
    // {
    //     path:'admin',
    //     element: <Dashboard1 />
    // },
    
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: mainRoutes, // Pass the mainRoutes as children
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: dashboardRoute, // Pass the mainRoutes as children
    },
    
]);

export default router;
