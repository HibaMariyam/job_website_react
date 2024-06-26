import React from 'react'
import Logo from '../assets/stuverse.png'
import { IoIosAdd } from "react-icons/io";
import { GrFormPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/slices/authSlice';

const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logOut())
        navigate("/")
    }
    return (
        <div className="flex items-center py-2">
            <div>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className="mt-2"
                >
                    <GrFormPrevious className="text-white text-lg" />
                </button>
            </div>
            <div className="flex-grow flex justify-center">
                <img src={Logo} alt="icon" className="h-12" />
            </div>
            <div className="flex flex-row justify-end">
                {/* <IoIosAdd className="text-white text-lg mr-1">
                    <span> */}
                <IoIosAdd className="text-white text-lg mr-1"></IoIosAdd>
                <MdLogout className="text-white text-lg ml-3" onClick={handleLogout} />
                {/* </span>
                </IoIosAdd> */}
            </div>
        </div>


    )
}

export default NavBar
