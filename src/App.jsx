import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import CartDetails from "./Component/CartDetails/CartDetails";
import Category from "./Component/Category/Category";
import CheckOut from "./Component/CheckOut/CheckOut";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import Home from "./Component/Home/Home.tsx";
import LayOut from './Component/LayOut/LayOut';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFound/NotFound';
import Product from './Component/Product/Product';
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import Profile from './Component/Profile/Profile';
import Register from './Component/Register/Register';
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import { CartContextProvider } from "./ShareData/CartContext";
import { Store } from "./ShareData/Store";
export default function App() {
  let [userData, setUserData] = useState(null)


  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token")
      let data = jwt_decode(token)
      saveUserData(data)

    }
  }, [])


  function saveUserData(data) {
    setUserData(data)
  }

  function ProtectedRouting(props) {
    if (localStorage.getItem("token")) {
      return props.children
    } else {
      return <Navigate to='/login' />
    }
  }

  function LogOut() {
    localStorage.removeItem("token")
    setUserData(null)
    return <Navigate to="/login" />
  }

  function ProtectedRouting2(props) {
    if (localStorage.getItem('token') != null) {
      return <Navigate to="/home" />
    }
    else {
      return props.children
    }
  }

  const routes = createBrowserRouter([
    {
      path: "", element: <LayOut LogOut={LogOut} userData={userData} />, children: [
        { path: "home", element: <ProtectedRouting><Home /></ProtectedRouting> },
        { path: "Category", element: <ProtectedRouting><Category /></ProtectedRouting> },
        { path: "CartDetails", element: <ProtectedRouting><CartDetails /></ProtectedRouting> },
        { path: "checkout/:cartId", element: <ProtectedRouting><CheckOut /></ProtectedRouting> },
        { path: "profile", element: <ProtectedRouting><Profile userData={userData} /></ProtectedRouting> },
        { path: "product", element: <ProtectedRouting><Product /></ProtectedRouting> },
        { path: "ProductDetails/:id", element: <ProtectedRouting><ProductDetails /></ProtectedRouting> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { index: true, element: <ProtectedRouting2> <Register /></ProtectedRouting2> },
        { path: "*", element: <NotFound /> },
      ]
    },
  ])
  return (
    // <CategoryContextProvider>
    <Provider store={Store}>
      <CartContextProvider>
        <RouterProvider router={routes} />
      </CartContextProvider>
    </Provider>
    // { </CategoryContextProvider>  }
  )
}
