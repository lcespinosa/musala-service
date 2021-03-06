import React, {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Form, Formik} from "formik";

const DeviceForm = ({isOpen, closeModal, gateway, onSubmitDevice, ...props}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  New Device
                </Dialog.Title>
                <Formik
                  initialValues={{
                    uid: '',
                    vendor: '',
                    created_at: '',
                    status: 'offline',
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    onSubmitDevice(gateway, values);
                    closeModal();
                  }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <Form>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col">
                            <label htmlFor={`uid`}
                                   className="block text-sm font-medium text-gray-700">
                              UID
                            </label>
                            <input
                              type="number"
                              name={`uid`}
                              id={`uid`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.uid}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor={`vendor`}
                                   className="block text-sm font-medium text-gray-700">
                              Vendor
                            </label>
                            <input
                              type="text"
                              name={`vendor`}
                              id={`vendor`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.vendor}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor={`created_at`}
                                   className="block text-sm font-medium text-gray-700">
                              Created at
                            </label>
                            <input
                              type="date"
                              name={`created_at`}
                              id={`created_at`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.created_at}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor={`status`}
                                   className="block text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <select
                              name={`status`}
                              id={`status`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.status}
                            >
                              <option value="online">Online</option>
                              <option value="offline">Offline</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </Form>)
                  }
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DeviceForm;