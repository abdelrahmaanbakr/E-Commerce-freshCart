import React, { useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { TokenContext } from "../Context/TokenContext";
import { API_BASE_URL } from "../../config/env";

export default function Login() {
  const passRegex = /^.{6,}$/;
  const { setToken } = useContext(TokenContext);

  const schema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("email must be valid"),
    password: yup
      .string()
      .required("password is required")
      .matches(passRegex, "pass must be valid"),
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [passType, setPassType] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendDataToApi,
    validationSchema: schema,
  });

  async function sendDataToApi(values) {
    const loadingTest = toast.loading("loading..");
    try {
      setError(null);
      
      const options = {
        url: `${API_BASE_URL}/auth/signin`,
        method: "POST",
        data: values,
      };

        const { data } = await axios.request(options);
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        localStorage.setItem("token", data.token);
        setToken(data.token);
      
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingTest);
    }
  }

  return (
    <div className="    py-40 ">
      <h2 className="text-3xl font-semibold ">Login Now</h2>

      {error && <p className="text-3xl my-3 text-red-500">{error}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-5 mt-5">
        <div>
          <label className="font-semibold mb-4" htmlFor="">
            email:
          </label>

          <input
            className="form-control bg-slate-100 w-full"
            type="email"
            placeholder="enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-xl font-semibold text-red-500 mt-3">
              {formik.errors.email}
            </p>
          )}
        </div>
        <div>
          <label className=" font-semibold mb-4" htmlFor="">
            password:
          </label>

          <div className="relative">
            <input
              className="form-control bg-slate-100 w-full"
              type={passType ? "password" : "text"}
              placeholder="enter your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Eye
              className="absolute top-[20%] right-4 cursor-pointer"
              onClick={() => {
                setPassType(!passType);
              }}
            />
          </div>

          {formik.errors.password && formik.touched.password && (
            <p className="text-xl font-semibold text-red-500 mt-3">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div>
          <button type="submit" className="btn cursor-pointer text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
