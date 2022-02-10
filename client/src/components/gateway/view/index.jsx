import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {DeviceForm, DeviceItem} from "../../device";
import http from "../../../helpers/http";
import {DocumentAddIcon, TrashIcon} from "@heroicons/react/solid";

const GatewayView = ({isOpen, closeModal, model, handleSubmitDevices}) => {
  const [gateway, setGateway] = useState(null);
  const [deviceFormIsOpen, setDeviceFormIsOpen] = useState(false);

  useEffect(() => {
    if (model) {
      setGateway(model);
    }
  }, [model])

  const refreshModel = async () => {
    try {
      const response = await http.get(`/api/gateways/${model._id}`);
      const {data: {gateway}} = response;
      setGateway(gateway)
    } catch (e) {
      console.log(e);
    }
  }

  const handleRemoveDevice = async (device) => {
    try {
      const response = await http.delete(`/api/gateways/${model._id}/devices/${device._id}`);
      const {data: {ok}} = response;
      if (ok) {
        refreshModel()
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onAddDevice = () => {
    closeModal();
    setDeviceFormIsOpen(true);
  }

  return (
    <>
      <DeviceForm isOpen={deviceFormIsOpen} closeModal={() => setDeviceFormIsOpen(false)} onSubmitDevice={handleSubmitDevices} gateway={gateway} />
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Gateway Details
                </Dialog.Title>

                <div className="mt-8">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{gateway?.name}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Serial number</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{gateway?.serial_number}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">IPv4</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{gateway?.ipv4}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        <span>Devices ({gateway?.devices?.length})</span>
                        <button className="ml-4 bg-green-500 hover:bg-green-600 px-2" onClick={onAddDevice}>
                          <span className="text-white">+</span>
                        </button>
                      </dt>
                      { gateway?.devices?.length > 0 && (
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            { gateway?.devices?.map((device) => <DeviceItem key={device._id} model={device} removeDevice={handleRemoveDevice} />)}
                          </ul>
                        </dd>
                      )}
                    </div>
                  </dl>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default GatewayView;