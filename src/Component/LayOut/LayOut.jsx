import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function LayOut({ userData, LogOut }) {
	return (
		<div>
			<Navbar userData={userData} LogOut={LogOut} />
			<div className="container">
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}
