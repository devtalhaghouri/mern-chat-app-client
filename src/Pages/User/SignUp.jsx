import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../../api/baseUrl";
import { Link } from "react-router-dom";
import MetaData from "../../Components/MetaData";
import { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../validation/validation";
import Heading from "../../Components/Controls/Heading/Heading";
import Input from "../../Components/Controls/Inputs/Input";
import Button from "../../Components/Controls/Button/Button";
import { useMessage } from "../../hook/hook";
const initialValues = {
  name: "",
  email: "",
  password: "",
};
const SignUp = () => {
  const [userData, setUserData] = useState({});
  const { error, message } = userData;
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Error Hnadling
  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        console.log("Values Formik", values);
        if (values) {
          setIsSubmitting(true);
          const userData = {
            name: values?.name,
            email: values?.email,
            password: values?.password,
            avatar: avatar,
          };
          registerUser(userData);
          setIsSubmitting(false);
        }
      },
    });

  //Handle Avatar

  const handleAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = (el) => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        console.log(el);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //Handle Register User

  const registerUser = async (formData) => {
    try {
      setUserData({
        loading: true,
        isAuthenicated: false,
        user: [],
        message: null,
      });
      const { data } = await axios.post("/user/register", formData);

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
      <MetaData title={"Sign Up -- Chat App"} />
      <section
        id="signUp"
        className="relative overflow-hidden w-[100%] h-[100%]  flex flex-col gap-[20px] items-center justify-center h-[100vh] p-[15px]"
      >
        <div className="container max-w-[500px] m-auto bg-[white] rounded-[5px]">
          <Heading label={"Sign Up"} className="pt-[20px] pb-0" />

          <form
            className="flex flex-col gap-[15px] px-[20px] sm:px-[24px] py-[25px] pt-0 "
            onSubmit={handleSubmit}
          >
            {/* Name Input */}
            <Input
              label="Name"
              leftIcon={<AlternateEmailOutlinedIcon />}
              type="text"
              id="name"
              placeholder="Enter Your Name"
              onChange={handleChange}
              value={values.name}
              onBlur={handleBlur}
              error={touched.name && errors.name ? errors.name : null}
            />

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

            {/* Upload Image Input  */}
            <div className={` flex gap-[20px] py-[15px] `}>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatar}
              />
            </div>

            <Button
              label={isSubmitting ? "Submitting..." : "Sign Up"}
              className="bg-[#3b5998] px-[10px] py-[12px] text-[18px] mt-[10px]"
              type="submit"
              disabled={values ? false : true}
            />

            <button className=" bg-[#f3f5f9] px-[10px] py-[12px] font-Work flex gap-[2px] items-center justify-center">
              Already have an account?
              <Link to={"/login"} className="underline">
                Login
              </Link>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
