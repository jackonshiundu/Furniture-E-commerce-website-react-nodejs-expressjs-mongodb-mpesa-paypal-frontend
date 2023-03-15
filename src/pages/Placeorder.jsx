import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Circles, Rings } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Paypalcomponents from '../components/paypalcomponents';
import {
  addToCart,
  clearCart,
  removeFromCart,
  removeQuantity,
} from '../Features/slices/cartSlice';
import { mpesaStkPush, payOndelivery } from '../Features/slices/placeOrder';
import { getSingleProduct } from '../Features/slices/productslice';

const Placeorder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, paymentMethod } = useSelector((state) => ({
    ...state.shipping,
  }));
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const { loading } = useSelector((state) => ({
    ...state.orders,
  }));

  const [phoneNumber, setPhoneNumber] = useState('');

  const { cartItems } = useSelector((state) => ({
    ...state.cart,
  }));
  const { address, city, country, county, phone, postalCode } = shippingInfo;

  const ItemsPrice = Math.ceil(
    cartItems.reduce((a, item) => a + item.quantity * item.price, 0)
  );

  const shippingfee = ItemsPrice > 1000 ? 300 : 0;
  const taxprice = Math.ceil(ItemsPrice * 0.05);
  const totalprice = taxprice + shippingfee + ItemsPrice;
  const formData = {
    user: user?.result?._id,
    orderItems: cartItems.map((item) => ({
      name: item.name,
      Quantity: item.quantity,
      Price: item.price,
    })),
    shippingAddress: {
      fullName: shippingInfo.fullName,
      address: shippingInfo.address,
      city: shippingInfo.city,
      postalCode: shippingInfo.postalCode,
      county: shippingInfo.county,
    },
    paymentMethod: paymentMethod === 'M-pesa' ? 'M-pesa' : 'Cash On Delivery',
    phone: shippingInfo.phone,
    itemsPrice: ItemsPrice,
    shippingPrice: shippingfee,
    taxPrice: taxprice,
    totalPrice: totalprice,
    isPaid: paymentMethod === 'M-pesa' ? true : false,
    paidAt: paymentMethod === 'M-pesa' ? new Date() : '',
  };
  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      if (paymentMethod === 'Cash On Delivery') {
        await dispatch(payOndelivery({ formData, navigate, toast }));
        dispatch(clearCart());
        return;
      }
      if (paymentMethod === 'M-pesa') {
        await dispatch(mpesaStkPush({ formData, navigate, toast }));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (cartItems.legth === 0) {
      navigate('/buyfurnitures');
    }
  }, []);
  return (
    <div className=" pb-24 bg-[#dadde3]  ">
      <CheckoutWizard activeStep="3" />
      <h1 className="font-bold uppercase tracking-wider mb-4 mt-6 ml-11 ">
        Make <span className="text-[#d1b112]">Payments </span>to place Your
        Order
      </h1>
      <div className="flex flex-col w-full px-4 md:px-0 gap-6 mx-auto lg:w-3/4    md:flex-row">
        <div className="flex-2 w-full md:w-[60%]">
          <div className="bg-white    mb-4 p-5 shadow-lg ring-1 ring-[#1e3639]">
            <h1 className="font-bold">Shipping Address</h1>
            <p>{`${country}, ${county}, ${address}, ${postalCode}`}</p>
            <Link to="/shippingscreen">
              <a className="text-blue-500 underline">Edit</a>
            </Link>
          </div>
          <div className="bg-white mb-4 p-5 shadow-lg ring-1 ring-[#1e3639]">
            <h1 className="font-bold">Payment Method</h1>
            <p>{paymentMethod}</p>
            <Link to="/payment">
              <a className="text-blue-500 underline">Edit</a>
            </Link>
          </div>
          <div className="bg-white mb-4 p-5 w-full shadow-lg ring-1 ring-[#1e3639]">
            <h1 className="font-bold">Order Items</h1>
            <table className="mim-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="px-3 lg:px-7 text-[12px] lg:text-md text-left ">
                    Item
                  </th>
                  <th className="px-1 lg:px-7 text-[12px] text-right">
                    Quantity
                  </th>
                  <th className="px-1 lg:px-7 text-[12px] text-right">Price</th>
                  <th className="px-1 lg:px-7 text-[12px] text-right">
                    Subtotal
                  </th>
                  <th className="px-1 lg:px-7 text-[12px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr className="border-b">
                    <td className=" border-r">
                      <Link
                        to={`/buyfurnitures/${item._id}`}
                        onClick={() => dispatch(getSingleProduct(item._id))}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 overflow-hidden lg:w-24 lg:h-24 rounded-full bg-gray-300 ">
                            <img
                              className="object-cover w-full h-full"
                              src={item?.images[0]}
                              alt="pic"
                            />
                          </div>
                          {item?.name}
                        </div>
                      </Link>
                    </td>
                    <td className=" border-r">{item?.quantity}</td>
                    <td className="ml-4 border-r">{item?.price}</td>
                    <td className=" border-r">
                      {(item?.quantity * item?.price).toFixed(2)}
                    </td>

                    <td className="flex flex-col justify-center mt-5 h-full w-full items-center gap-3 md:gap-4">
                      <AiOutlinePlus
                        className="bg-gray-600 text-base text-white md:text-2xl active:scale-105 duration-300 font-bold md:font-extrabold rounded-full cursor-pointer"
                        onClick={() => dispatch(addToCart(item))}
                      />
                      <AiOutlineMinus
                        className="bg-gray-600 text-white text-base md:text-2xl active:scale-105 duration-300 font-bold md:font-extrabold rounded-full cursor-pointer"
                        onClick={() => {
                          if (item.quantity === 0) {
                            dispatch(removeFromCart(item._id));
                          }
                          dispatch(removeQuantity(item));
                        }}
                      />
                    </td>
                  </tr>
                ))}
                <tr className="border-b">
                  <td colSpan={3} className="border-r font-bold">
                    {' '}
                    Total
                  </td>
                  <td className="border-r text-[12px] font-bold">
                    Ksh.
                    {Math.ceil(
                      cartItems.reduce(
                        (a, item) => a + item.quantity * item.price,
                        0
                      )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 bg-white p-6 md:w-[40%] h-fit  shadow-md ring-1 ring-[#1e3639]">
          <h1 className="mb-4 text-xl">Order Summary</h1>
          <div>
            {cartItems.legth === 0 ? (
              <div>
                Cart is Empty <Link to="/buyfurnitures"> Go Shopping</Link>
              </div>
            ) : (
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Item's Price</div>
                    <div>Ksh {ItemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax Price</div>
                    <div>Ksh {taxprice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping Fee</div>
                    <div>Ksh {shippingfee}</div>
                  </div>
                </li>
                <li>
                  <form
                    onSubmit={placeOrderHandler}
                    className="mb-2 w-full flex justify-between flex-col"
                  >
                    <div className="flex w-full text-xl font-bold  justify-between">
                      <div>Total Price</div>
                      <div>
                        Ksh.
                        <input
                          value={totalprice}
                          disabled="true"
                          className="text-center w-[5rem] p-2 cursor-disabled mb-6 bg-gray-400"
                        />
                      </div>
                    </div>
                    {paymentMethod === 'M-pesa' && (
                      <>
                        <div className="flex flex-col gap-4 my-5">
                          <label htmlFor="phoneNumber">
                            Enter Phone Number
                          </label>
                          <input
                            type="text"
                            name="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="0700xxxx00"
                            value={phoneNumber}
                            className="w-full  p-2 border-0 outline-0 text-lg focus:border-2 border-[#d1b112] bg-[#dadde3]"
                          />
                        </div>
                      </>
                    )}

                    <button className="bg-[#d1b112] px-3 cursor-pointer no-wrap font-bold text-[#dadde3] py-2 active:scale-105 w-40 transition-all duration-300">
                      {loading ? (
                        <div className='felx gap-3'>
                          {' '}
                          <Rings height={20} width={20} color="white" />
                          Loading...
                        </div>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </form>

                  {paymentMethod === 'Paypal' && (
                    <>
                      <Paypalcomponents totalprice={totalprice} />
                    </>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
