import React, { useEffect } from 'react'
import Logo from '../assets/stuverse.png'
import { Button, Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { loginWithEmailPassword } from '../redux/slices/authSlice'
import { toast } from 'sonner'

const schema = yup
    .object({
        email: yup.string().email("Email is not valid").required("Email field is required"),
        password: yup.string().min(4, "Password must be at least 4 characters").required("Password field is required"),
    })
    .required()

const AuthPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)

    const onSubmit = async (data) => {
        console.log("data", data)
        try {
            await dispatch(loginWithEmailPassword(data)).unwrap()
            toast.success("Login successful")
            navigate("/home")
        } catch (error) {
            toast.error(error.toString())
        }


    }
    useEffect(() => {
        console.log("errors", errors)
    },
        [errors])
    return (
        <>
            <div className='ml-5 mr-5'>
                <div className='flex flex-col items-center '><img src={Logo} alt="icon" className='h-[20vh] mt-12'></img></div>
                <div className='flex flex-col place-items-start '>

                    <div className='text-[7vw] text-white font-sans font-weight-500 mb-4'>Welcome to Stuverse!</div>
                    <form className=' w-full' id='login-form'>

                        <label className="text-blue-400 font-light text-xs">Email <span className="text-red-500">*</span></label>


                        <Input
                            color='primary'
                            type="email"

                            className=" mb-1 mt-1 text-white" variant='bordered' isRequiredsize="md" placeholder="Enter your email" {...register("email")} isInvalid={errors.email ? true : false} errorMessage={errors.email?.message}>
                        </Input>

                        <label className="text-blue-400 font-light text-xs">Password <span className="text-red-500">*</span></label>

                        <Input
                            color='primary'
                            type="password"

                            className=" mb-1 mt-1 text-white" variant='bordered' isRequiredsize="md" placeholder="Enter your password" {...register("password")} isInvalid={errors.password ? true : false} errorMessage={errors.password?.message}>
                        </Input>

                    </form>
                </div>
                <div className='flex flex-col place-items-end text-blue-400  text-xs mt-4'>
                    Signin with Otp?
                </div>
                <div className='flex flex-col items-center mt-6'> <Button
                    isLoading={authState.status === "loading"}
                    size="md" className='bg-blue-400 text-white text-xs font-light' fullWidth
                    onClick={handleSubmit(onSubmit)}
                    form='login-form'
                >
                    Login
                </Button></div>
                <div className='flex flex-col items-center mt-6'> <div className='text-white text-xs place-items-end'>Don't have an account?  <span className='text-blue-400'> Sign Up</span></div></div>


            </div>



        </>
    )
}

export default AuthPage
