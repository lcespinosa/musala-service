import React from "react";
import {ServerIcon} from "@heroicons/react/solid";

const GatewayItem = ({model, onClick}) => {
  return (
    <div
      key={model.serial_number}
      onClick={() => onClick(model)}
      className="flex flex-row justify-between space-x-6 relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    >
      <div className="flex-shrink-0">
        <ServerIcon className="h-14 w-14 rounded-full text-gray-300 bg-gray-100 p-2" />
      </div>
      <div className="flex-1 min-w-0">
        <button className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{model.name}</p>
          <p className="text-sm text-gray-500 truncate">SN: {model.serial_number}</p>
          <p className="text-sm text-gray-500 truncate">IPv4: {model.ipv4}</p>
        </button>
      </div>
      <div className="flex-initial min-w-0">
        <span className="h-14 w-14 rounded-full text-gray-800 bg-gray-100 py-2 px-3">{model?.devices?.length}</span>
      </div>
    </div>
  )
}

export default GatewayItem;