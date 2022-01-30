import React,{useState, useEffect} from 'react'
import { Typography, Backdrop, Button } from '@mui/material'
import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserPosts } from '../firebaseFunctions'

const ProfileScreen = () => {
    const [render, setRender] = useState(0)

    return (
        <div className="profile">
            {
                !auth.currentUser &&
                <SignUp />
            }
            {
                auth.currentUser &&
                <Profile reRender={setRender}/>
            }
            {
                false &&
                <p>{render}</p>
            }
        </div>
    )
}

const Profile = (reRender) => {
    const [user] = useAuthState(auth)
    const [userPosts, setUserPosts] = useState([])

    useEffect(async () => {
        setUserPosts(await getUserPosts(auth.currentUser.email))
        console.log(userPosts)
    })

    const handleSignOut = async () => {
        await signOut()
        reRender(num => num + 1)
    }

    return (
        <div className="profile">
            <div className="container">

            <Typography variant="h1">{auth.currentUser.displayName}</Typography>
            <Typography variant="h3">{auth.currentUser.email}</Typography>
            <Button onClick={handleSignOut} variant="outlined">Sign Out</Button>
            </div>
        </div>
    )
}

const SignUp = () => {
    const provider = new GoogleAuthProvider()
    const [user] = useAuthState(auth)

    const handleSignUp = async () => {
        await signInWithRedirect(auth, provider)
    }

    return (
        <div>
            {/* <Backdrop sx={{ color: '#fff' }} open={true}> */}
                <Typography variant="h2">Please Log In with Google</Typography>
                <Button onClick={handleSignUp} variant="outlined">Log in with google</Button>
            {/* </Backdrop> */}
        </div>
    )
}

export default ProfileScreen