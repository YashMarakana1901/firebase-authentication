import { toast } from "react-toastify";
import useSignupForm from "../hooks/useSignupForm";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { EyeCheckIcon, EyeIcon } from "../../../../helper";
import { database } from "../../../../firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (values) => {
    const { email, password } = values;

    await createUserWithEmailAndPassword(database, email, password)
      .then(() => {
        navigate("/login");
        toast.success("Email verification link sent");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        toast.error("Error" || error.message);
      });
  };

  const { values, handleChange, handleSubmit, errors } =
    useSignupForm(handleSignup);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-gray-700 font-bold mb-4 text-2xl">Signup</h2>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-transparent"
                id="email"
                type="text"
                placeholder="Email"
                value={values?.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-8 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight !bg-transparent"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="******************"
                value={values?.password}
                onChange={handleChange}
              />
              {values.password.length > 0 && (
                <button
                  type="button"
                  className="absolute right-0 border-0 focus:outline-0"
                  onClick={onShowPassword}
                >
                  {!showPassword && <EyeIcon />}
                  {showPassword && <EyeCheckIcon />}
                </button>
              )}
              {errors.password && (
                <span className="text-red-500 text-xs italic">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2"
              href="/login"
            >
              {" "}
              Login
            </a>
          </div>
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 AMC Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
