import React, {useState, useEffect} from 'react'
import { Typography, Backdrop } from '@mui/material'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = () => {
    const [user] = useAuthState(auth)
    const [navOpen, setNavOpen] = useState(false);
    return (
        <nav>
			<Typography variant="h3" className="main">Speak Up!</Typography>

			<div className="links" id="links">
				<Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/profile">Sign Up/Log In</Link>
			</div>
			<div className="hamburger" id="hamburger" onClick={() => setNavOpen(cur => cur ? false : true)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="feather feather-menu"
				>
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
			</div>
            <Backdrop sx={{ color: '#fff' }} open={navOpen} onClick={() => setNavOpen(false)} style={{display: 'flex', flexDirection: 'column' }}>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/profile">Sign Up / Log In</Link>
            </Backdrop>
		</nav>
    )
}

export default Nav