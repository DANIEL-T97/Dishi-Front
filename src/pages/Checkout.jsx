import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Mpesa from "../assets/mpesa.png"

const Checkout = () => {
  const form = useRef()
  const { id } = useParams();
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/meal_plan/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMealPlan(data);
          
        } else {
          console.error('Error fetching meal plan:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching meal plan:', error.message);
      }
    };

    fetchMealPlan();
  }, [id]);


  const handlePaymentOptionSelect = (option) => {
    setSelectedPaymentOption(option);
    setShowAddressInput(true);
    if (option === 'Mpesa') {
      setAmount(mealPlan.price);
    }
  };

  const handlePayButton = () => {
    // Implement payment logic or redirect to a payment page
    console.log('Payment processing for', selectedPaymentOption);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Amount:', amount);
fetch("https://dishi-tamu-webapp-backend.onrender.com/lipa_na_mpesa", {
  method : "POST",
  headers:{
    "Content-Type":"application/json",
    "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
  },
  body:JSON.stringify({
    phone_number: phoneNumber, 
    amount:amount
  
  })
})
.then(res =>res.json())
.then(data => {
  console.log(data)
})
};




  return (
    <div className="w-5/6 mx-auto text-black font-display p-8">
        <Link to={`/mealplans`}>
          <div className='border border-black w-12 p-2'>
        <FaArrowLeft/>
        </div>
        </Link>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Checkout</h1>

        {mealPlan && (
          <>
            {/* Meal Plan Details */}
            <div className="bg-white p-6 rounded shadowy shadow shadow-pink-200 mb-6">
              <h2 className="text-2xl font-semibold mb-4">{mealPlan.title}</h2>
              <p className="text-gray-700 mb-2">{mealPlan.description}</p>
              <p className="text-lg font-bold mb-2"> Ksh {(mealPlan.price)*100}</p>
              {/* Add more details as needed */}
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded shadow-md shadow-orange-500">
              <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>

              {/* Payment Option 1 (Mpesa) */}
              <div
                className="flex items-center mb-4 cursor-pointer "
                onClick={() => handlePaymentOptionSelect('Mpesa')}
              >
                <input type="radio" id="option1" name="payment" className="mr-2" />
                <label htmlFor="option1" className='flex items-center gap-p'>
                  <img src={Mpesa} alt="" className='w-40' /></label>
              </div>

              {/* Payment Option 2 (PayPal) */}
              {/* <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => handlePaymentOptionSelect('PayPal')}
              >
                <input type="radio" id="option2" name="payment" className="mr-2" />
                <label htmlFor="option2">PayPal</label>
              </div> */}

              {/* Add more payment options as needed */}
            </div>

            {/* Address Input */}
            {showAddressInput && (
              <div className="bg-white p-6 rounded mt-6 shadow-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                
                {selectedPaymentOption === 'Mpesa' && (
                  <div>
                  
                    <label htmlFor="phoneNumber" className="block mb-2">Phone Number:</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      className="w-full border p-2 mb-4"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                   
                  </div>
                )}

                {/* {selectedPaymentOption === 'PayPal' && (
                  <>
                  <h2 
                  className='text-center p-4 bg-red-300 text-pink-600 border text-xl font-mono border-pink-600 rounded-lg'>Sorry for Your Inconvenience</h2>
                   <p>Curently we are not receiving paypal Payments, 
                    Subscribe to our Newsletter to get the uppdates </p>
                  </>
                )} */}
              </div>
            )}

            {/* Pay Button */}
            {showAddressInput && (
              <button
                onClick={handlePayButton}
                className="bg-pink-500 font-medium text-white px-4 py-2 rounded"
              >
                Pay Now
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
