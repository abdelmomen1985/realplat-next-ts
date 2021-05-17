import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import CustomSlide from './CustomSlide';
import SearchForm from './SearchForm';

const sliderImages = [
  [
    {
      title: 'New Alamein',
      image: 'new-alamein.png'
    },
    {
      title: 'Algona',
      image: 'algone.png'
    },
    {
      title: 'Alain Sokhna',
      image: 'sokhna.png'
    },
    {
      title: 'New Capital',
      image: 'new-capital.png'
    },
    {
      title: 'Sheikh Zayed',
      image: 'zayed.png'
    },
    {
      title: 'Marasi',
      image: 'marasi.png'
    },
  ],
  [
    {
      title: 'New Alamein',
      image: 'new-alamein.png'
    },
    {
      title: 'Algona',
      image: 'algone.png'
    },
    {
      title: 'Alain Sokhna',
      image: 'sokhna.png'
    },
    {
      title: 'New Capital',
      image: 'new-capital.png'
    },
    {
      title: 'Sheikh Zayed',
      image: 'zayed.png'
    },
    {
      title: 'Marasi',
      image: 'marasi.png'
    },
  ],
  [
    {
      title: 'New Alamein',
      image: 'new-alamein.png'
    },
    {
      title: 'Algona',
      image: 'algone.png'
    },
    {
      title: 'Alain Sokhna',
      image: 'sokhna.png'
    },
    {
      title: 'New Capital',
      image: 'new-capital.png'
    },
    {
      title: 'Sheikh Zayed',
      image: 'zayed.png'
    },
    {
      title: 'Marasi',
      image: 'marasi.png'
    },
  ],
  [
    {
      title: 'New Alamein',
      image: 'new-alamein.png'
    },
    {
      title: 'Algona',
      image: 'algone.png'
    },
    {
      title: 'Alain Sokhna',
      image: 'sokhna.png'
    },
    {
      title: 'New Capital',
      image: 'new-capital.png'
    },
    {
      title: 'Sheikh Zayed',
      image: 'zayed.png'
    },
    {
      title: 'Marasi',
      image: 'marasi.png'
    },
  ],
  [
    {
      title: 'New Alamein',
      image: 'new-alamein.png'
    },
    {
      title: 'Algona',
      image: 'algone.png'
    },
    {
      title: 'Alain Sokhna',
      image: 'sokhna.png'
    },
    {
      title: 'New Capital',
      image: 'new-capital.png'
    },
    {
      title: 'Sheikh Zayed',
      image: 'zayed.png'
    },
    {
      title: 'Marasi',
      image: 'marasi.png'
    },
  ],
]
const ExplorerSection = () => {
  return (
    <section>
      <main className="text-center">
        <h3 className="text-center py-3"><span className="font-comfortaa text-5xl font-semibold">mellw </span><span className="text-main text-2xl font-semibold">Explorer</span></h3>
        <p className="text-sm font-normal px-10">Take a deep dive and browse original neighborhood photos, drone footage,<br /> resident reviews and local insights to see if the homes for sale are right for you.</p>
      </main>
      <Slide easing="ease-in" transitionDuration={500} autoplay={false} >
        {sliderImages.map((imgs, i) => (
          <CustomSlide key={i} imgs={imgs} />
        ))}
      </Slide>
      <div className="my-4">
        <h4 className="text-main text-2xl font-medium text-center py-3">Searching for a particular destination ...</h4>
        <SearchForm placeHolder="Search our listed units" title="explore" />
      </div>


    </section>
  )
}

export default ExplorerSection
