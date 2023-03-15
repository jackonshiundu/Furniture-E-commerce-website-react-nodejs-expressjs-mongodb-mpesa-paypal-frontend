import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import React, { useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Paypalcomponents = ({ totalprice }) => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [orderID, setOrderID] = useState(false);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalprice,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };
  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      try {
        //place the order in the back end
        setSuccess(true);
        console.log(details);
        toast.success('Order Placed Successfully');
      } catch (error) {
        toast.error(error);
      }
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    toast.error('An Error occured with your payment ');
  };
  return (
    <div>
      {isPending && (
        <div className="flex gap-3">
          <Circles height={20} width={20} color="#d1b112" />
          Loading...
        </div>
      )}
      <PayPalButtons
        style={{ layout: 'vertical' }}
        onApprove={onApprove}
        onError={onError}
        createOrder={createOrder}
      />
    </div>
  );
};

export default Paypalcomponents;
