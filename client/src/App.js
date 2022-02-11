import './App.css';
import {useCallback, useEffect, useState} from "react";
import {GatewayEmpty, GatewayForm, GatewayItem, GatewayView} from "./components/gateway";
import http from './helpers/http';

function App() {
  const [isGatewayFormOpen, setIsGatewayFormOpen] = useState(false)
  const [gatewayDetailDialog, setGatewayDetailDialog] = useState({
    open: false,
    data: null
  });

  const [gateways, setGateways] = useState([]);

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    try {
      const response = await http.get('/api/gateways');
      const {data: {ok, gateways}} = response;

      if (ok) {
        setGateways(gateways);
      }
      throw Error(response.data.message);
    }
    catch (e) {
      console.log(e);
    }
  }

  const openGatewayForm = () => setIsGatewayFormOpen(true);

  const handleGatewaySubmit = useCallback(async (values) => {
    try {
      const response = await http.post('/api/gateways', values);
      const {data: {ok}} = response;
      if (ok) {
        fetchGateways();
      }
      else {
        throw Error(response.data.message);
      }
    }
    catch (e) {
      console.log(e);
    }
  }, []);

  const closeGatewayDetailDialog = () => {
    setGatewayDetailDialog({
      open: false,
      data: null
    });
  }
  const handleShowGatewayDetails = async (model) => {
    console.log(model);
    try {
      const response = await http.get(`/api/gateways/${model._id}`);
      const {data: {gateway}} = response;
      setGatewayDetailDialog({
        open: true,
        data: gateway
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleSubmitDevices = async (gateway, values) => {
    console.log(values);
    try {
      const response = await http.patch(`/api/gateways/${gateway._id}/devices`, values);
      const {data: {ok}} = response;
      if (ok) {
        alert('Device added!');
      } else {
        throw Error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="p-6 flex flex-col">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Gateway Management</h2>
        </div>
        {
          gateways.length > 0 && (
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={openGatewayForm}
              >
                Add
              </button>
            </div>
        )}
      </div>
      <div className="flex flex-row justify-around">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          <GatewayForm isOpen={isGatewayFormOpen} closeModal={() => setIsGatewayFormOpen(false)} onSubmitGateway={handleGatewaySubmit} />
          <GatewayView
            isOpen={gatewayDetailDialog.open}
            closeModal={closeGatewayDetailDialog}
            model={gatewayDetailDialog.data}
            handleSubmitDevices={handleSubmitDevices}
          />

          { gateways.length === 0 && (<GatewayEmpty onAddGateway={openGatewayForm} />) }

          {
            gateways.map((gateway) => {
              return (
                <GatewayItem key={gateway._id} model={gateway} onClick={handleShowGatewayDetails} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
