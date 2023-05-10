import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import slide5 from '../../assets/images/grocery-banner-2.jpeg';
import slide4 from '../../assets/images/slider-2.jpeg';
import slide1 from '../../assets/images/slider-image-1.jpeg';
import slide2 from '../../assets/images/slider-image-2.jpeg';
import slide3 from '../../assets/images/slider-image-3.jpeg';
export default function MainSlider() {
	return (
		<div className='row g-0 '>
			<div className="col-md-9">
				<OwlCarousel className='owl-theme' items={1} dots={false} autoplaySpeed={800} autoplay loop margin={0} >
					<div class='item'>
						<img src={slide1} height={350} className='w-100 ' alt="" srcSet={slide1} />
					</div>
					<div class='item'>
						<img src={slide2} height={350} className='w-100 ' alt="" srcSet={slide2} />
					</div>
					<div class='item'>
						<img src={slide3} height={350} className='w-100 ' alt="" srcSet={slide3} />
					</div>
					<div class='item'>
						<img src={slide4} height={350} className='w-100 ' alt="" srcSet={slide4} />
					</div>
					<div class='item'>
						<img src={slide5} height={350} className='w-100 ' alt="" srcSet={slide5} />
					</div>
				</OwlCarousel>
			</div >
			<div className="col-md-3">
				<img src={slide2} height={175} className='w-100 ' alt="" srcSet={slide2} />
				<img src={slide1} height={175} className='w-100' alt="" srcSet={slide1} />
			</div>
		</div >
	)
}
