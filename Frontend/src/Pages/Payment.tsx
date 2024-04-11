import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"

import {toast } from 'react-toastify';

type Inputs = {
  collegeId: string
  amount: string
}

function Payment() {

  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) =>{
    console.log(data);
    try {
      // Make a POST request to your login endpoint with form data
     const response = await axios.put("http://localhost:5000/api/admin/user/increment-balance", data);

      // Assuming your login API returns a success message or token
     console.log(response.data);
     toast.success('Amount Credited Successfully', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    } catch (error) {
      // Handle login error
      console.error("Payment failed:", error);
      toast.error('Payment failed', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    //handle add payment request here//
  } 


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-24 w-auto"
            src="https://www.clipartmax.com/png/middle/88-881051_loan-money-to-your-business-and-earn-%C2%A36-000-of-interest-give.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Amount
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="collegeId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User ID
              </label>
              <div className="mt-2">
                <input
                  id="collegeId"
                  type="text"
                  {...register("collegeId", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:leading-6 outline-none px-2"
                />
                {errors.collegeId && <span className="text-red-500">User ID is required</span>}
              </div>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount (INR)
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  type="text"
                  {...register("amount", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg sm:leading-6 outline-none px-2"
                />
                {errors.amount && <span className="text-red-500">Amount is required</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#4290f5] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#0255c2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Credit Amount
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
