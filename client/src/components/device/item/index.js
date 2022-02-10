import React from "react";
import {ShareIcon, TrashIcon} from "@heroicons/react/solid";

const DeviceItem = ({model, removeDevice}) => {
  return (
    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
      <div className="w-0 flex-1 flex items-center">
        <ShareIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
        <div className="flex flex-wrap w-full">
          <span className="ml-2 truncate"><strong>UID:</strong> {model?.uid}</span>
          <span className="ml-2 truncate"><strong>Vendor:</strong> {model?.vendor}</span>
          <span className="ml-2 truncate"><strong>Created at:</strong> {new Date(model?.created_at).toDateString()}</span>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        {model?.status === 'online' && (<div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>)}
        {model?.status === 'offline' && (<div className="bg-gray-600 w-3 h-3 rounded-full"></div>)}
      </div>
      <button className="ml-4 bg-red-500 hover:bg-red-600 p-2" onClick={() => removeDevice(model)}>
        <TrashIcon className="w-5 h-5 text-white" />
      </button>
    </li>
  )
}

export default DeviceItem;