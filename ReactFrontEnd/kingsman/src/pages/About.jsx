import React from 'react';


export default function About() {
  return (
    <div className='bg-gray-100 p-10 '>
      <h1 className='text-4xl font-bold mb-6 text-green-700 text-center'>About us</h1>
      <div className='flex-row flex'>

        {/* flex1 */}
        <div className=' mx-auto basis-1/3'>
          <div className='text-center'>

          </div>
          <div className='flex justify-center mb-6'>
            <img src="../src/image/about.png" alt='Kingsman Cafe and Event' className='rounded-lg shadow-lg' style={{ height: '550px' }} />
          </div>
          <div className='text-center'>
            
          </div>
        </div>
        {/* flex2 */}
        <div className='mx-auto basis-1/3'>
        <div className=''>
          <p className='text-lg mb-6'>
            Welcome to <strong>KINGSMAN CAFE AND EVENT</strong>, where we offer a unique blend of fine dining, excellent coffee, and a perfect venue for your events. Our cafe is designed to provide a cozy and elegant atmosphere for you to relax, enjoy, and create memorable moments.
          </p>
          
        </div>
          <div className='text-lg'>
              <p className='mb-2'><strong>Address:</strong> Kingsman Cafe, Polathumodara, Mirissa.</p>
              <p className='mb-2'><strong>Phone:</strong> +94 77 799 8768</p>
              <p className='mb-2'><strong>Email:</strong> kingsmanmirissa@gmail.com</p>
            </div>
            <div className='mt-6'>
              <h3 className='text-xl font-semibold mb-2'>Opening Hours</h3>
              <p className='text-lg'>Monday - Friday: 8:00 AM - 10:00 PM</p>
              <p className='text-lg'>Saturday - Sunday: 9:00 AM - 11:00 PM</p>
            </div>
        </div>
        {/* flex3 */}
        <div className='ml-5 mx-auto basis-1/3'>
        <div className=''><p className='text-lg mb-3'>
            Planning a special event? Look no further! Our venue is ideal for corporate events, and private parties. With a spacious setting and a dedicated team, we ensure your event is a memorable one. Our event planning services cover everything from catering to decor, allowing you to enjoy your event without any worries.
          </p>
        <h2 className='text-2xl font-semibold mb-4'>Our Location</h2>
            <h3 className='text-xl font-semibold mb-4'>Find Us on the Map</h3>
            <div className='w-full h-64'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.346865136483!2d80.40624433219282!3d5.97684257970826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae174d70ac75f71%3A0xa2a58847304807b4!2sPolathumodara%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1675663303300!5m2!1sen!2sus"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Google Map"
              ></iframe>
            </div>
            
            <p className='mt-6'>
              </p>
          </div>
          </div>
      </div>



    </div>
  );
}
