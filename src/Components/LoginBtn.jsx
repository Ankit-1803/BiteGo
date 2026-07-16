import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth"
import React from "react"
import { auth, provider } from "../config/firebaseAuth"
import { useDispatch, useSelector } from "react-redux"
import { addUserData, removeUserData } from "../utils/authSlice"
import { useNavigate } from "react-router-dom"
import { toggleLogin } from "../utils/toggleSlice"

function LoginBtn(){
    
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userData=useSelector((state)=>state.authSlice.userData)

    async function handleAuth() {
        const data=await signInWithPopup(auth,provider)
        const userData={
            name:data.user.displayName,
            photo:data.user.photoURL,
        }
        dispatch(addUserData(userData))
        dispatch(toggleLogin())
        navigate("/")
    }
    async function handleLogout() {
        await signOut(auth)
        dispatch(removeUserData())
        dispatch(toggleLogin())
    }

    return (
        <>

            {
                userData ?  
                <button onClick={handleLogout} className="w-full p-4 bg-[#FF5200] mt-5 text-white rounded-sm">
                    Logout
                </button>
                :
                <button onClick={handleAuth} className="w-full p-4 bg-[#FF5200] mt-5 text-white flex items-center justify-between rounded-sm">
                    <span className="flex-1 text-center text-xl">
                        Login With Google
                    </span>
                    <img className="w-8 h-8" src="https://img.icons8.com/color/1200/google-logo.jpg" alt="Google" />
            </button>
            }
        </>
    )
}
export default LoginBtn