import { faRegistered } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as yup from "yup";
import { API_BASE_URL } from "../../config/env";

export default function Register() {
  const nameRegex = /^[A-Z][a-zA-Z]*$/;
  const passRegex = /^.{6,}$/;
  const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;

  const schema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "must be start with capital letter")
      .max(20, "name must be max 20 char")
      .matches(nameRegex, "name must be start with capital leeter"),
    email: yup
      .string()
      .required("email is required")
      .email("email must be valid"),
    password: yup
      .string()
      .required("password is required")
      .matches(passRegex, "pass must be valid"),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")], "password must be match"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(phoneRegex, "phone must be Egyptain number"),
  });
  const [error, setError] = useState(null);

  const navigate= useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDataToApi,
    validationSchema: schema,
  });

  async function sendDataToApi(values) {

   const loadingTest= toast.loading('loading..')
    try {
      setError(null);
      const options = {
        url: `${API_BASE_URL}/auth/signup`,
        method: "POST",
        data: values,
        
      };
   

      await axios.request(options);
         toast.success('Regist Successfully')
         setTimeout(() => {
          navigate('/login')
         }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message)
    }
    finally{
      toast.dismiss(loadingTest)

    }
  }

  return (
    <div className="    py-8 ">
      <h2 className="text-3xl font-semibold ">
        Register Now{" "}
        <FontAwesomeIcon className="text-main" icon={faRegistered} />{" "}
      </h2>

     {error&& <p className="text-3xl my-3 text-red-500">{error}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-5 mt-5">
        <div className="">
          <label className=" font-semibold mb-4" htmlFor="">
            name:
          </label>
          <input
            className="form-control w-full bg-slate-100"
            type="text"
            placeholder="enter your first name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.name && formik.touched.name && (
            <p className="text-xl font-semibold text-red-500 mt-3">
              {formik.errors.name}
            </p>
          )}
        </div>

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

          <input
            className="form-control bg-slate-100 w-full"
            type="password"
            placeholder="enter your password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-xl font-semibold text-red-500 mt-3">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div>
          <label className=" font-semibold mb-4" htmlFor="">
            confirm password:
          </label>

          <input
            className="form-control bg-slate-100 w-full"
            type="password"
            placeholder="confirm your password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-xl font-semibold text-red-500 mt-3">
              {formik.errors.rePassword}
            </p>
          )}
        </div>
        <div>
          <label className=" font-semibold mb-4" htmlFor="">
            phone:
          </label>

          <input
            className="form-control bg-slate-100 w-full"
            type="text"
            placeholder="confirm your phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-xl font-semibold text-red-500 mt-3">
              {formik.errors.phone}
            </p>
          )}
        </div>

        <div>
          <button type="submit" className="btn cursor-pointer text-white">
            Regist
          </button>
        </div>
      </form>
    </div>
  );
}
