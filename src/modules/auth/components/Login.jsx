import { useState } from "react";
import { EyeCheckIcon, EyeIcon } from "../../../../helper";
import useSignupForm from "../hooks/useSignupForm";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "../../../../firebase";
import { toast } from "react-toastify";
import { setToken } from "../../../../helper/util";
import { v4 as uuid } from "uuid";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { email, password } = values;

    const idToken = uuid();

    await signInWithEmailAndPassword(database, email, password)
      .then(() => {
        setToken(idToken);
        navigate("/");
        toast.success("User login successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(errorCode);
        toast.error(errorMessage);
      });
  };

  const { values, handleChange, handleSubmit, errors } =
    useSignupForm(handleLogin);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-gray-700 font-bold mb-4 text-2xl">Login</h2>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-left"
                htmlFor="email"
              >
                email
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight bg-transparent"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="******************"
                value={values?.password}
                onChange={handleChange}
              />
              {values.password.length > 0 && (
                <button
                  type="submit"
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
                type="button"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </div>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-3"
              href="/signup"
            >
              Sign up
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

export default Login;
