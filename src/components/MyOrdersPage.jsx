import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

const MyOrdersPage = () => {
  const { orders } = useSelector((state) => ({
    ...state.orders,
  }));
  console.log(orders);
  return (
    <div className=" pl-2 pt-8 md:pl-14  md:pt-14 w-full pr-4">
      <h1 className="font-bold text-2xl ">My Orders </h1>
      <p className="font-bold mt-5 mb-5 tracking-widest">Orders</p>
      <div className="w-full mb-6 ">
        {orders.orders.length > 0 ? (
          orders?.orders.map((item, index) => (
            <div
              key={index}
              className="shadow-md p-3 ring-1 ring-black ml-5 text-[12px] text-md mb-6 bg-gray-400"
            >
              <h1 className="font-bold">Items ({item.orderItems.length})</h1>
              <p>
                Order Id{' '}
                <span className="bg-green-600 rounded-lg text-white px-6">
                  {item._id}
                </span>
              </p>
              <h1>
                <span className="font-bold">Payment Method:</span>
                <span>{item.paymentMethod}</span>
              </h1>
              <p>Shipping Price: {item.shippingPrice}</p>
              <p>Tax Price: {item.taxPrice}</p>
              <p>Total Price: {item.totalPrice}</p>
              <br></br>
              <p className="font-bold w-full">
                Payment Status:
                {item.isPaid === false ? (
                  <span className="rounded-lg w-[20rem] px-6 ml-8 bg-red-600 text-white">
                    Not Payed
                  </span>
                ) : (
                  <span className="rounded-lg w-[20rem]  px-6 ml-8 bg-green-600 text-white">
                    Payed
                  </span>
                )}
              </p>
              <br />
              <p className="font-bold">
                Delivery Status:
                <span className="rounded-lg px-6 ml-8 w-[20rem] bg-red-600 text-white">
                  Not Delivered
                </span>
              </p>
              <br />
              <p className="font-bold">
                Date Placed <span>{item.updatedAt.toLocaleString()}</span>
              </p>
            </div>
          ))
        ) : (
          <h1 className="ml-5">
            You have no orders yet{' '}
            <Link to="/buyfurnitures">
              {' '}
              <a className="font-bold underline text-blue-600">
                Go shopping
              </a>{' '}
            </Link>
          </h1>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
