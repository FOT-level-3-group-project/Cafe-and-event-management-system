import  { useState } from "react";
import CustomerAddModal from "../customer/CustomerAddModal";
import SearchCustomerModal from "../customer/SearchCustomerModal";
import UpdateCustomerModal from "../customer/UpdateCustomerModal";

export default function TakeOrder() {
        const [customerAddModal, SetCustomerAddModal] = useState(false);
        const [customerSearchModal, SetCustomerSearchModal] = useState(false);
        const [customerUpdateModal, SetCustomerUpdateModal] = useState(false);

        const [customerData, setCustomerData] = useState({});

        function openCustomerAddModal() {
            SetCustomerAddModal(prevState => !prevState);
        }

        function OpenSearchCustomerModal() {
            SetCustomerSearchModal(prevState => !prevState);
        }

        function OpenCustomerUpdateModal() {
            SetCustomerUpdateModal(prevState => !prevState);
        }

        const handleCustomerModalResponse = (Data) => {
            setCustomerData(Data); 
        };

        const handleClearFields = () => {
            setCustomerData({
                cusName: '',
                cusMobile: '',
                cusEmail: ''
            });
        };

  return (
    <div className="w-full bg-slate-200 dark:bg-slate-500 py-5">    
        <div className="w-full">
            {/* Customer Details Section Start*/}
            <div className=" max-w-full  px-6 lg:px-8">
                <div className="mx-auto mt-16 max-w-2xl  ring-1 shadow-lg bg-slate-50 ring-black dark:bg-slate-700 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="px-8 py-4 lg:flex-auto">
                        <h3 className="text-xl font-bold tracking-tight text-black dark:text-white">
                            Customer Membership Details
                        </h3>
                        <div>
                            <div className="rounded  pt-3 flex flex-col">
                                <div className="-mx-3 md:flex mb-2">
                                    <div className="md:w-2/5 px-3 mb-6 md:mb-0">
                                        <label
                                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                            htmlFor="grid-name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            className=" appearance-none block w-full bg-transparent text-grey-darker border rounded py-3 px-4 mb-3 selection:border-none focus:outline-none  focus:border-black focus:ring-0 dark:border-grey-darker dark:focus:border-gray-500"
                                            id="grid-name"
                                            type="text"
                                            value={customerData.cusName}
                                            readOnly
                                        />
                                    </div>
                                    <div className="md:w-2/5 px-3 mb-6 md:mb-0">
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
                                            value={customerData.cusEmail}
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
                                            value={customerData.cusMobile}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        <div className="flex items-center justify-center min-h-full">
                                <div className='flex items-center justify-end w-full xs:justify-evenly'>
                                    <button onClick={openCustomerAddModal} className="flex items-center justify-center  px-3 py-2 bg-green-500 mr-1 text-white font-semibold rounded">
                                        <i className="ri-user-add-fill"></i>
                                        <span className="ml-1">Add New Customer</span>
                                    </button>
                                    <button onClick={OpenSearchCustomerModal} className="ml-2 mr-0 flex items-center justify-center  px-3 py-2 bg-orange-500 text-white font-semibold rounded">
                                        <i className="ri-user-search-fill"></i>
                                        <span className="ml-1">Search Customer</span>
                                    </button>
                                    {customerData.cusName && (
                                        <>
                                            <button onClick={OpenCustomerUpdateModal} className="ml-2 mr-0 flex items-center justify-center px-3 py-2 bg-amber-500 text-white font-semibold rounded">
                                                <i className="ri-edit-fill"></i>
                                                <span className="ml-1">Update Customer</span>
                                            </button>
                                            <button onClick={() => handleClearFields()} className="ml-2 mr-0 flex items-center justify-center px-3 py-2 bg-red-500 text-white font-semibold rounded">
                                                <i className="ri-close-circle-fill"></i>
                                                <span className="ml-1">Clear</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Customer Details Section End*/}
        </div>

        {/* Modals */}
        <CustomerAddModal 
            isOpen={customerAddModal}
            onToggle={openCustomerAddModal}
            customerAddModalResponse={handleCustomerModalResponse}
        />

        <SearchCustomerModal 
            isOpen={customerSearchModal}
            onToggle={OpenSearchCustomerModal}
            searchModalResponse={handleCustomerModalResponse}
        />

        <UpdateCustomerModal 
            isOpen={customerUpdateModal}
            onToggle={OpenCustomerUpdateModal}
            customerUpdateModalResponse={handleCustomerModalResponse}
            currentCustomerData={customerData}
        />
    </div>
  )
}
