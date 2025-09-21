import React, { useState } from "react";
import Button from '../../components/ui/Button';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-primary-light flex flex-col">

            <div className="flex mt-16 items-center justify-center px-4">
                <div className="w-full max-w-4xl bg-white/0 rounded-lg flex flex-col md:flex-row items-center justify-between shadow-none">
                    
                    {/* Left side - Form */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6 px-6 py-8">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Welcome back!
                        </h2>
                        <p className="text-sm text-gray-500">
                            Enter your Credentials to access your account
                        </p>

                        {/* Username */}
                        <div>
                            <label className="text-sm text-gray-600">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            />
                        </div>

                        {/* Password with Show/Hide */}
                        <div className="relative">
                            <label className="text-sm text-gray-600">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none pr-10"
                            />
                            {/* Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <div className="text-right mt-1">
                                <button className="text-sm text-sky-600 hover:underline">
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <Button
                            text="Login"
                            text_font_size="18px"
                            text_line_height="18px"
                            text_color="#000000bf"
                            text_font_family="Roboto"
                            text_font_weight="400"
                            fill_background_color="#f3fbff"
                            border_border_radius="34px"
                            effect_box_shadow="3px 3px 4px #469cd2a8"
                            className="w-full"
                            layout_width="100%"
                            margin="0"
                            position="static"
                            variant="primary"
                            size="medium"
                            onClick={() => { }}
                        />

                    </div>

                    {/* Divider */}
                    <div className="hidden md:flex flex-col items-center px-4">
                        <div className="h-40 border-l border-gray-300" />
                    </div>

                    {/* Right side - Social login */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4 px-6 py-8 items-center">
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                            <FaGoogle className="text-[#DB4437] w-5 h-5" />
                            Sign in with Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                            <FaFacebook className="text-[#1877F2] w-5 h-5" />
                            Sign in with Facebook
                        </button>

                        <p className="text-sm text-gray-600 mt-4">
                            Don’t have an account?{" "}
                            <a href="/signup" className="text-sky-600 font-medium hover:underline">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
