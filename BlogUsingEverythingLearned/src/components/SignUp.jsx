import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { Button, Input, Logo } from '../components/index.js'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice.js'
import { useDispatch } from 'react-redux'

function SignUp() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(login(currentUser))
                }
                navigate("/");
            }

        }
        catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {      // important to understand how this works
                                required: true,         // important syntax to understand
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp

// 1. Clears any previous error messages by calling setError("").
// 2. Calls authService.createAccount(data) to create a new account.
// 3. If successful:
//      - Fetches the current user using authService.getCurrentUser().
//      - Dispatches the login action to update the Redux store with the current user's data.
//      - Navigates to the home page ("/") using navigate.
// 4. If an error occurs, it catches the error and updates the error state with the error message.


// Flow of Data
// 1. User Input:
//      - The user enters their full name, email, and password into the form fields.
//      - The register function binds these inputs to the form state.
// 2. Form Submission:
//      - When the user clicks the "Create Account" button, the handleSubmit function validates the inputs and calls the create function with the form data.
// 3. Account Creation:
//      - The create function sends the form data to authService.createAccount.
//      - If successful, it fetches the current user and updates the Redux store using the login action.
// 4. Error Handling:
//      - If an error occurs during account creation, the error message is stored in the error state and displayed to the user.
// 5. Navigation:
//      - Upon successful account creation, the user is redirected to the home page.