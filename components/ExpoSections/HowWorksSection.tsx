import React from 'react'
const guides = [
  {
    img: '/images/works1.png',
    title: 'Suits your needs',
    link: 'Define your budget and destination.',
  },
  {
    img: '/images/works2.png',
    title: 'Find Deals',
    link: 'Find a suitable deals based on your needs.',
  },
  {
    img: '/images/works3.png',
    title: 'Book Online',
    link: 'Book your unit online, it’s 100% refundable',
  },
]

const HowWorksSection = () => {
  return (
    <>
      <section className="my-3 w-full relative py-5 bg-secondary">
        <div
          className="w-full md:w-2/3 my-8 py-7  mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 px-10">
          <div className="mr-3 mt-2">
            <h3 className="text-main text-3xl font-bold my-4 text-custom-blue-dark"
            >How it works</h3>
            <p className="font-comfortaa text-black text-opacity-50">
              With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.
            </p>
            <button
              className="bg-primary text-white text-md mt-5 mb-2 font-medium rounded-3xl w-3/4  px-12 py-3 shadow-md mx-auto ">
              Contact Us</button>
          </div>
          <div className="my-4 ml-3">
            {guides.map((guide, i) =>
            (
              <div key={i} className="flex justify-start items-center mb-5">
                <img className="w-16 h-12" src={guide.img} />
                <div className="ml-3">
                  <h4 className="font-semibold text-2xl text-custom-blue-dark">{guide.title}</h4>
                  <p className="text-xl font-medium text-text-secondary">{guide.link} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default HowWorksSection
