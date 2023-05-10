/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../../ShareData/CartContext';
import Logo from "../../assets/freshcart-logo.svg";
export default function Navbar({ userData, LogOut }) {
  let { cartData, removeItem, updateQuantity } = useContext(CartContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <img className='w-75 p-1 border border-1 border-success' src={Logo} />
          </Link>
          <button className="navbar-toggler " type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? <ul className="navbar-nav text-center me-auto ps-5 mb-2 mb-lg-0">
              <li className="nav-item ">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link "} to="home">Home</NavLink>
              </li>
              <li className="nav-item ps-2">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="product">Product</NavLink>
              </li>
              <li className="nav-item ps-2">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="Category">Category</NavLink>
              </li>
            </ul> : ""}

            <ul className="navbar-nav ms-auto text-center mb-2 mb-lg-0">
              {userData ? <>
                <li className="nav-item p-1 me-5 px-2 ms-5">
                  <i className="m-2 fa-brands active-li fa-facebook-f" aria-hidden="true"></i>
                  <i className="m-2 fa-brands active-li fa-twitter" aria-hidden="true"></i>
                  <i className="m-2 fa-brands active-li fa-linkedin-in" aria-hidden="true"></i>
                  <i className="m-2 fa-brands active-li fa-spotify" aria-hidden="true"></i>
                  <i className="m-2 fa-brands active-li fa-youtube" aria-hidden="true"></i>
                </li>

                <li className="nav-item pe-1 ">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="profile">Profile</NavLink>
                </li>

                <li className="nav-item pe-1 pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight">
                  <span className='nav-link'>
                    <div className=" position-relative">
                      <i className='fa-solid   fa-shopping-cart'></i>

                      <span className="position-absolute top-0 start-100 translate-middle   badge rounded-pill  bg-danger">
                        {cartData?.numOfCartItems}
                      </span>
                    </div>
                  </span>
                </li>

                <li className="nav-item ps-1">
                  <NavLink className={({ isActive }) => isActive ? "nav-link " : "nav-link"} onClick={LogOut}>LogOut</NavLink>
                </li>
              </>
                :
                <>
                  <li className="nav-item pe-2 ">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="Login">Login</NavLink>
                  </li>
                  <li className="nav-item pe-2">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">Register</NavLink>
                  </li>
                </>}
            </ul>

          </div>
        </div>
      </nav>


      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">cart Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          {cartData ?
            cartData.data.products.map((el) => {
              return <div className=' shadow-sm  p-4  border-bottom text-center border-3'>
                <div className='d-flex justify-content-between p-2 align-items-center '>
                  <img src={el.product.imageCover} className='w-25' height={100} alt="cartData" />
                  <div>
                    <button className='btn btn-sm btn-danger rounded pointer' onClick={() => {
                      updateQuantity(el.product._id, el.count -= 1)
                    }} >-</button>
                    <span className='mx-2 '>{el.count}</span>
                    <button className='btn btn-sm btn-success rounded pointer' onClick={() => {
                      updateQuantity(el.product._id, el.count += 1)
                    }} >+</button>
                  </div>
                  <div>
                    <i onClick={() => removeItem(el.product._id)} className='pointer fa-solid fa-trash-alt text-danger '></i>
                  </div>
                </div>
                <h5>{el.product.title}</h5>
              </div>
            })
            : ""}
        </div>
        <div className='offcanvas-bottom text-center  my-2'>
          <Link to="/home" className='btn btn-success w-50 m-1 '>Add More Items</Link>
          <br />
          <Link to={"/checkout/" + cartData?.data?._id} className='btn btn-danger w-50 '>CheckOut Payment</Link>
        </div>
      </div>
    </>
  )
}
