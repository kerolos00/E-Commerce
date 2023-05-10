import axios from 'axios';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/Product';
import Category from '../Categoryslider/Categoryslider';
import MainSlider from '../MainSlider/MainSlider';
export default function Home() {
  let baseUrl = "https://route-ecommerce.onrender.com";
  let [ProductList, setProductList] = useState<Product[]>([])

  useEffect(() => {
    getAllProducts()
  }, [])

  async function getAllProducts() {
    let { data } = await axios.get(`${baseUrl}/api/v1/products`)
    $(".loading").fadeOut(2000)
    setProductList(data.data)
  }

  return (
    <>
      <MainSlider />
      <Category />
      <div className='bg-body position-fixed top-0 bottom-0 start-0 end-0 loading '>
        <i className='fa-solid  fa-spin  fa-spinner fa-5x'></i>
      </div>
      <div className='row g-4 my-4'>
        {ProductList.map((el) => {
          return <div key={el._id} className='col-lg-2 col-md-4 col-sm-12 text-decoration-none '>
            <Link className='text-decoration-none' to={'/ProductDetails/' + el?._id}>
              <div className=' text-center py-0 px-1 h-100  bg-light  border border-light'>
                <img className='w-100 py-1' src={el?.imageCover} alt="" srcSet={el?.imageCover} />
                <span className='text-success  h6 text-center'>{el?.category.name}</span>
                <h2 className='h6 fw-bolder py-1 text-black'>{el?.title.split(" ").slice(0, 2).join(" ")}</h2>
                <div className='d-flex bottom-0 text-success justify-content-around '>
                  <p>{el?.price} EGP</p>
                  <div>
                    <i className='fa-solid fa-star text-warning'></i>{el?.ratingsAverage}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    </>
  )
}
