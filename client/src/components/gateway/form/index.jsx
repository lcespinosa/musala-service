import React, {Fragment} from "react";
import { Dialog, Transition } from '@headlessui/react'
import {ErrorMessage, FieldArray, Form, Formik} from "formik";

const GatewayForm = ({isOpen, closeModal, onSubmitGateway, ...props}) => {
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
                  New Gateway
                </Dialog.Title>
                <Formik
                  initialValues={{
                    serial_number: '',
                    name: '',
                    ipv4: '',
                    devices: []
                }}
                  validate={values => {
                    const errors = {};
                    if (!values.serial_number) {
                      errors.serial_number = 'Required';
                    } else if (!values.name) {
                      errors.name = 'Required';
                    } else if (
                      !/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(values.ipv4)
                    ) {
                      errors.ipv4 = 'Invalid ipv4 address';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    onSubmitGateway(values);
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
                    <Form className="mt-8">
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Serial number
                          </label>
                          <input
                            type="text"
                            name="serial_number"
                            id="serial_number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.serial_number}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage name="serial_number" component="div" />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage name="name" component="div" />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            IpV4
                          </label>
                          <input
                            type="text"
                            name="ipv4"
                            id="ipv4"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ipv4}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage name="ipv4" component="div" />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                            Devices
                          </label>
                          <div className="mt-2 shadow-md p-6">
                            <FieldArray
                              name="devices"
                              render={arrayHelpers => (
                                <div>
                                  {values.devices && values.devices.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                      {
                                        values.devices.map((device, index) => (
                                          <div key={index} className="flex flex-col gap-6">
                                            <div className="flex flex-col">
                                              <label htmlFor={`devices[${index}].uid`} className="block text-sm font-medium text-gray-700">
                                                UID
                                              </label>
                                              <input
                                                type="number"
                                                name={`devices[${index}].uid`}
                                                id={`devices[${index}].uid`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.devices[index].uid}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                              />
                                            </div>
                                            <div className="flex flex-col">
                                              <label htmlFor={`devices[${index}].vendor`} className="block text-sm font-medium text-gray-700">
                                                Vendor
                                              </label>
                                              <input
                                                type="text"
                                                name={`devices[${index}].vendor`}
                                                id={`devices[${index}].vendor`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.devices[index].vendor}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                              />
                                            </div>
                                            <div className="flex flex-col">
                                              <label htmlFor={`devices[${index}].created_at`} className="block text-sm font-medium text-gray-700">
                                                Created at
                                              </label>
                                              <input
                                                type="date"
                                                name={`devices[${index}].created_at`}
                                                id={`devices[${index}].created_at`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.devices[index].created_at}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                              />
                                            </div>
                                            <div className="flex flex-col">
                                              <label htmlFor={`devices[${index}].status`} className="block text-sm font-medium text-gray-700">
                                                Status
                                              </label>
                                              <select
                                                name={`devices[${index}].status`}
                                                id={`devices[${index}].status`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.devices[index].status}
                                              >
                                                <option value="online">Online</option>
                                                <option value="offline">Offline</option>
                                              </select>
                                            </div>
                                          </div>
                                        ))
                                      }
                                      <div className="flex flex-row justify-end gap-6">
                                        <button
                                          type="button"
                                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                          onClick={() => arrayHelpers.remove()}
                                        >
                                          -
                                        </button>
                                        <button
                                          type="button"
                                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                          onClick={() => arrayHelpers.push({uid: '', vendor: '', created_at: '', status: 'offline' })}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <button type="button" onClick={() => arrayHelpers.push({uid: '', vendor: '', created_at: '', status: 'offline' })}>
                                      Add a device
                                    </button>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </div>

                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default GatewayForm;