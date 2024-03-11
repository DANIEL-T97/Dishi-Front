import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Newsletter = () => {
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const userEmail = form.current.user_email.value;

    emailjs.send('service_m25fsoq', 'template_t00pf92' ,{ to_email: userEmail }, 'PQDUc7EogTr6KJCUl',)
      .then(
        (result) => {
          console.log(result.text);
          setIsSent(true);
          form.current.reset(); // Reset the form
        },
        (error) => {
          console.log(error.text);
          // Display an error message to the user
          alert('Error sending message, please try again!');
        }
      );
  };

  return (
    <div className='bg-[#ffd7c9]  md:h-[50vh] overflow-hidden mt-12'>
      <div className='md:w-1/3 p-4 mx-auto'>
        <h1 className='text-6xl font-display text-center font-semibold'>Deliciousness to your inbox</h1>
        <p className='mx-8 text-xl my-4 text-center'>Enjoy weekly handpicked recipes and recommendations</p>
        {isSent && (
          <p className='my-2 text-center bg-orange-500 text-white font-display p-2 rounded'>
            Welcome to Dishitamu, an email has been sent to you
          </p>
        )}

        {/* form /email registration */}
        <form ref={form} onSubmit={sendEmail} className={`bg-white w-full flex item-center justify-between`}>
          <input
            type='text'
            required
            name='user_email'
            className='w-4/5 m-2 p-2 focus:outline-none placeholder:text-gray-500 placeholder:italic placeholder:text-lg'
            placeholder='Email Address'
          />
          <button
            type='submit'
            className={`px-8 py-2 ${isSent ? 'bg-pink-500' : 'bg-orange-500'} m-1 text-white font-semibold text-lg`}
          >
            {isSent ? 'Sent' : 'Join'}
          </button>
        </form>

        <p className='my-2 text-center'>
          By joining our newsletter, you accept our{' '}
          <span className='capitalize underline underline-offset-4 decoration-orange-500 decoration-4'>terms & conditions</span>
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
