import React from 'react'

import { IoIosPersonAdd } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";

export default function TakeOrder() {


  return (
    <div className="w-full bg-slate-200 dark:bg-slate-500 py-5">
        
        <div className="w-full">
            <div className=" max-w-full  px-6 lg:px-8">
                <div className="mx-auto mt-16 max-w-2xl  ring-1 shadow-lg bg-slate-50 ring-black dark:bg-slate-700 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="px-8 py-4 lg:flex-auto">
                        <h3 className="text-xl font-bold tracking-tight text-black dark:text-white">
                            Customer Membership Details
                        </h3>
                        <div>
                            <div className="rounded  pt-3 flex flex-col">
                                <div className="-mx-3 md:flex mb-2">
                                    <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label
                                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                            htmlFor="grid-first-name"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            className=" appearance-none block w-full bg-transparent text-grey-darker border rounded py-3 px-4 mb-3 selection:border-none focus:outline-none  focus:border-black focus:ring-0 dark:border-grey-darker dark:focus:border-gray-500"
                                            id="grid-first-name"
                                            type="text"
                                            value={"Mahinda"}
                                            readOnly
                                        />
                                    </div>
                                    <div className="md:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                            htmlFor="grid-last-name"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-transparent text-grey-darker border rounded py-3 px-4 mb-3 selection:border-none focus:outline-none  focus:border-black focus:ring-0 dark:border-grey-darker dark:focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            value={"Rajapaksha"}
                                            readOnly
                                        />
                                    </div>
                                    <div className="md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label
                                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                            htmlFor="grid-email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className=" appearance-none block w-full bg-transparent text-grey-darker border rounded py-3 px-4 mb-3 selection:border-none focus:outline-none  focus:border-black focus:ring-0 dark:border-grey-darker dark:focus:border-gray-500"
                                            id="grid-email"
                                            type="email"
                                            value={"exsamplemail@exsample.com"}
                                            readOnly
                                        />
                                    </div>
                                    <div className="md:w-1/4 px-3">
                                        <label
                                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                            htmlFor="grid-mobile"
                                        >
                                            Mobile
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-transparent text-grey-darker border rounded py-3 px-4 mb-3 selection:border-none focus:outline-none  focus:border-black focus:ring-0 dark:border-grey-darker dark:focus:border-gray-500"
                                            id="grid-mobile"
                                            type="text"
                                            value={"0767801029"}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        <div className="flex items-center justify-center min-h-full">
                                <div className='flex items-center justify-end w-full xs:justify-evenly'>
                                    <button className="flex items-center justify-center  px-3 py-2 bg-green-500 mr-1 text-white font-semibold rounded">
                                        <IoIosPersonAdd/>
                                        <span className="ml-1">Add New Customer</span>
                                    </button>
                                    <button className="ml-2 mr-0 flex items-center justify-center  px-3 py-2 bg-orange-500 mr-1 text-white font-semibold rounded">
                                        <FaAddressCard/>
                                        <span className="ml-1">Add Regular Customer</span>
                                    </button>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
