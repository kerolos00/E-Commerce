import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData } from '../../ShareData/CategorySlice';
export default function Categoryslider() {
  let data = useSelector((select: any) => select.category)
  let CategoriesList: any[] = data.CategoriesList
  let Dispatch: any = useDispatch()
  useEffect(() => {
    Dispatch(getCategoryData())
  }, [])
  // let data: any = useContext(categoryContext)

  return (
    <div>
      <OwlCarousel className='owl-theme mt-5' loop dots={false} autoplay={false} items={9} >
        {CategoriesList.map((el) => {
          return <div className='text-center imgItem1 text-dark'>
            <img src={el?.image} className='w-100' height={100} srcSet={el?.image} />
          </div>
        })}
      </OwlCarousel>

      <OwlCarousel className='owl-theme' loop dots={false} autoplay items={9} >
        {CategoriesList.map((el) => {
          return <div key={el._id} className='text-center text-dark imgItem2'>
            <img src={el?.image} className='w-100' height={100} srcSet={el?.image} />
            <h6 className='text-muted py-2 '>{el?.name}</h6>

          </div>
        })}

      </OwlCarousel>
    </div>
  )
}

