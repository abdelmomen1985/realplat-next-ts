import React, { useState } from 'react'
import { Unit } from '../../../interfaces'
import { Slide } from 'react-slideshow-image';
import CustomModal from './../../common/CustomModal/CustomModal';
import 'react-slideshow-image/dist/styles.css'

const SingleUnitHeroSection = ({ unit }: { unit: Unit }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <section>

      <div className="flex justify-center items-start relative">
        <div className="mr-1 h-full w-2/3">
          <img style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', height: '100%', width: '100%' }} src={unit.media.photos[0]} />
        </div>
        <div className="ml-1 w-1/3 relative">
          <img style={{ borderTopRightRadius: '10px', width: '99%' }} className="mb-1 w-full" src={unit.media.photos[1]} />
          <img style={{ borderBottomRightRadius: '10px', width: '99%' }} className="mt-1 w-full" src={unit.media.photos[2]} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-between items-center rounded-md px-3 py-2 text-white text-lg font-medium"
            style={{
              backgroundColor: 'rgba(74, 54, 54, 0.8)',
              position: 'absolute',
              right: '15px',
              bottom: '10%'
            }} >
            <span className="mr-2">+{unit.media.photos.length}</span> <img className="ml-2" src="/images/icons/img.svg" />
          </button>
        </div>
      </div>
      <CustomModal show={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <Slide easing="ease-in" transitionDuration={500} autoplay={true} >
          {unit.media.photos.map((image: any, key: any) => {
            return (
              <img
                key={key}
                className="w-full"
                style={{ maxHeight: "250px" }}
                src={image}
                alt="unit image"
              />
            );
          })}
        </Slide>
      </CustomModal>
    </section>
  )
}

export default SingleUnitHeroSection
