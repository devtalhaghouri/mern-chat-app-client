import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../../api/baseUrl";
import { Link } from "react-router-dom";
import MetaData from "../../Components/MetaData";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/validation";
import Heading from "../../Components/Controls/Heading/Heading";
import Input from "../../Components/Controls/Inputs/Input";
import Button from "../../Components/Controls/Button/Button";
import { useMessage, useNetwork } from "../../hook/hook";
const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [userData, setUserData] = useState({});
  const { error, message, loading } = userData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const network = useNetwork();
  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        console.log("Values Formik", values);
        if (values) {
          setIsSubmitting(true);
          loginUser(values.email, values.password);
          setIsSubmitting(false);
        }
      },
    });

  //Handle Login User
  const loginUser = async (email, password) => {
    try {
      setUserData({
        loading: true,
        isAuthenicated: false,
        user: [],
        message: null,
      });
      const { data } = await axios.post("/user/login", {
        email,
        password,
      });

      setUserData({
        loading: false,
        isAuthenicated: true,
        user: data?.user,
        message: data?.message,
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          isAuthenicated: true,
          user: data?.user,
          token: data.token,
        })
      );
    } catch (error) {
      setUserData({
        loading: false,
        isAuthenicated: false,
        error: error?.response?.data?.message,
        message: null,
      });
    }
  };

  useMessage(error, message, "/");

  return (
    <>
      <MetaData title={"Login -- Chat App"} />
      <section
        id="login"
        className="relative overflow-hidden w-[100%] h-[100%]  flex flex-col gap-[20px] items-center justify-center h-[100vh] p-[15px]"
      >
        <div className="container max-w-[500px] m-auto bg-[white] rounded-[5px]">
          <Heading label={"Sign Up"} className="pt-[20px] pb-0" />

          <form
            className="flex flex-col gap-[15px] px-[20px] sm:px-[24px] py-[25px] pt-0 rounded-br-[8px] rounded-bl-[8px]"
            onSubmit={handleSubmit}
          >
            {/* Email Input */}

            <Input
              label="Email Address"
              leftIcon={<AlternateEmailOutlinedIcon />}
              placeholder="Enter Your Email"
              type="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email ? errors.email : null}
            />

            {/* Password Input */}
            <Input
              label="Password"
              leftIcon={<LockOutlinedIcon />}
              placeholder="Enter Your Password"
              type="password"
              id="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              error={
                touched.password && errors.password ? errors.password : null
              }
            />

            <Button
              label={isSubmitting && loading ? "Submitting..." : "Login"}
              className="bg-[#3b5998]  px-[10px] py-[12px] text-[18px] mt-[10px]"
              type="submit"
            />

            <span className="w-[100%] text-center p-[10px] font-Work flex gap-[2px] justify-center">
              {"Don't have account? "}
              <Link to={"/signUp"} className="underline">
                Sign Up
              </Link>
            </span>

            <button className=" bg-[#f3f5f9] px-[10px] py-[12px] font-Work flex gap-[2px] items-center justify-center">
              Forgot your password?
              <Link to={"/"} className="underline">
                Reset It
              </Link>
            </button>

            {network ? "Online" : "Offline"}
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
