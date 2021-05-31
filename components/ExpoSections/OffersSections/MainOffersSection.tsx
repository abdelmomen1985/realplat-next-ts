import React, { useState } from 'react'
import CustomModal from '../../common/CustomModal/CustomModal'

const MainOffersSection = () => {
  const [showModal, setShowModal] = useState<number>(0)

  const services = [
    {
      img: '/images/booking.png',
      title: 'booking'
    },
    {
      img: '/images/refund.png',
      title: 'refund'
    },
    {
      img: '/images/faq.png',
      title: 'FAQ'
    },
  ]
  return (
    <section className="bg-secondary grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-8 justify-center items-center py-10 px-5 mb-0 mt-0">
      <div className="md:ml-24 md:mr-5">
        <h4 className="text-3xl font-normal text-black text-opacity-50">Welcome to ..</h4>
        <h2 className="text-5xl font-bold text-custom-blue-dark">mellw’s Expo</h2>
        <p className="text-lg text-black text-opacity-50">With over 1 million+ homes for sale available on<br /> the website, Trulia can match you with a house you will<br /> want to call home.</p>
        <button
          className="bg-primary text-white text-md mt-5 mb-2 font-medium rounded-3xl px-12 py-3 shadow-md mx-auto ">
          Contact Us</button>
      </div>
      <div className="md:mr-10 md:ml-24 w-full">
        <div className="flex justify-center items-center py-3 w-full md:w-2/4 px-2 bg-gray-400 ">
          <img src="/images/timer.png" className="mr-1" />
          <div>
            <h4 className="text-xl text-black text-opacity-50">Offers will end in ..</h4>
            <h3 className="text-2xl font-semibold text-custom-blue-light">02:32</h3>
          </div>
        </div>
        <div className="my-2">
          {
            services.map((service, i) => (
              <div key={i} className="flex justify-start  items-center my-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowModal(i + 1) }}>
                <img src={service.img} className="mr-2" />
                <h5 className="text-xl font-semibold capitalize text-custom-blue-light ">{service.title}</h5>
              </div>
            ))
          }
        </div>

      </div>
      <CustomModal show={showModal === 1} onClose={() => setShowModal(0)}>
        <h3>Let's Talk about Budget management</h3>
      </CustomModal>
      <CustomModal show={showModal === 2} onClose={() => setShowModal(0)}>
        <h3>Let's Talk about Finding the Best Deals</h3>
      </CustomModal>
      <CustomModal show={showModal === 3} onClose={() => setShowModal(0)}>
        <h3>Let's Talk about How to book your unit online</h3>
      </CustomModal>
    </section>
  )
}

export default MainOffersSection
