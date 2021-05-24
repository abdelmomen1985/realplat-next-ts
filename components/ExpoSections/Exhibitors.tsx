import React from 'react'


const exhibitorsList = [
  '/images/sodic.png',
  '/images/alahly.png',
  '/images/memar.png',
  '/images/oud.png',
  '/images/palmhills.png',
  '/images/memar.png',
  '/images/oud.png',
  '/images/sodic.png',
  '/images/memar.png',
  '/images/palmhills.png',
  '/images/sodic.png',
]
const Exhibitors = () => {
  return (
    <section className="bg-white my-5 py-2 px-6 mx-auto flex flex-wrap justify-center md:justify-between items-center">
      {
        exhibitorsList.map((exhibitor, i) => (
          <img className="rounded-lg shadow-lg  my-3" key={i} src={exhibitor} />
        ))
      }
    </section>
  )
}

export default Exhibitors
