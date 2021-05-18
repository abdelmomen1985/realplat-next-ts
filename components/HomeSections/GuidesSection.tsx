import React from 'react'
import styles from './homeStyles.module.scss'
const guides = [
  {
    img: 'search-guid.png',
    title: 'new projects guide',
    link: 'How to find units',
  },
  {
    img: 'new-projects-guide.png',
    title: 'New Projects Guide',
    link: 'How to find projects',
  },
  {
    img: 'reseller-guide.png',
    title: 'Resellers Guide',
    link: 'How to sell your unit',
  },
]
const achievements = [
  {
    number: 101,
    title: 'New Units'
  },
  {
    number: 11,
    title: 'Recently Sold'
  },
  {
    number: 80,
    title: 'Consultations'
  },
]
const GuidesSection = () => {
  return (
    <>
      <section className="my-3 w-full relative py-5" style={{ backgroundColor: '#F3F1F7' }}>
        <div
          className="w-full md:w-2/3 my-8 py-7  mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 px-10">
          <div className="mr-3">
            <h3 className="text-main text-3xl font-semibold my-4">Mellw’s  Guides</h3>
            <p className="font-comfortaa text-black text-opacity-50">
              With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.
            </p>
            <button
              className="bg-primary text-white text-md mt-5 mb-2 font-medium rounded-lg px-3 py-2 shadow-md mx-auto ">
              See more guides</button>
          </div>
          <div className="my-4 ml-3">
            {guides.map((guide, i) =>
            (
              <div key={i} className="flex justify-start items-center mb-5">
                <img className="w-16 h-12" src={`images/${guide.img}`} />
                <div className="ml-3">
                  <h4 className="font-semibold text-3xl" style={{ color: '#012B55' }}>{guide.title}</h4>
                  <a className="cursor-pointer text-xl font-medium text-text-secondary">{guide.link} <span className="text-black">&#8594;</span></a>
                </div>
              </div>
            ))}

          </div>
        </div>
        <img src="/images/house.png" className={styles.houseImg} />
      </section>
      <section className="w-full py-6 px-3 my-3">
        <h2 className="text-main my-3 text-3xl font-semibold text-center">What’s happening at mellw.com</h2>
        <div className="flex justify-center md:justify-around flex-wrap flex-col md:flex-row items-center">
          {achievements.map((achievement, i) => (
            <div key={i} className="flex justify-center items-center mx-5 my-3">
              <span className={styles.circularFire}></span>
              <div>
                <h4 className="text-3xl font-bold text-center" style={{ color: '#052386' }}>{achievement.number}</h4>
                <h5 className="text-xl font-medium text-center" style={{ color: '#052386' }}>{achievement.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default GuidesSection
