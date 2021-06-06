import React, { useContext, useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import clsx from 'clsx';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import {
  EmailShareButton, FacebookShareButton, FacebookMessengerShareButton,
  WhatsappShareButton, TwitterShareButton, PinterestShareButton,
  EmailIcon, WhatsappIcon, TwitterIcon, PinterestIcon, FacebookIcon, FacebookMessengerIcon
} from 'react-share'
import { Unit } from '../../../interfaces'

import { AppContext } from './../../../Context/AppContextProvider';
import useTranslation from './../../../hooks/useTranslation';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './../../../query/user';

import CustomModal from './../../common/CustomModal/CustomModal';
import styles from './unit.module.scss'



const SingleUnitHeroSection = ({ unit }: { unit: Unit }) => {
  const { isMobile, user, setLoginModal, setComparing } = useContext(AppContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isWishListed, setIsWishListed] = useState<Boolean>(unit.wishListed)
  const { t, locale } = useTranslation()
  const [addWishList] = useMutation(ADD_TO_WISHLIST);
  const [removeWishList] = useMutation(REMOVE_FROM_WISHLIST);

  const wishListHandler = async () => {
    // handle add to the server
    if (user) {
      unit.wishListed = !unit.wishListed;
      let wishListedUnit: Unit = { ...unit };
      if (wishListedUnit.wishListed) {
        await addWishList({
          variables: {
            user_id: user.id,
            unit_id: unit.id,
          },
        });
      } else {
        await removeWishList({
          variables: {
            user_id: user.id,
            unit_id: unit.id,
          },
        });
      }
    } else {
      console.log('u should see a modal man');
      setLoginModal(true);
    }
  };
  const compareHandler = () => {
    unit.comparing = !unit.comparing;
    let comparedUnit: Unit = { ...unit };
    setComparing(comparedUnit);
  };
  return (
    <section className="relative">

      <div className={clsx(locale === 'en' ? 'flex-row' : 'flex-row-reverse', "block md:flex justify-center items-start relative")}>
        <div className="mr-1 h-full w-full md:w-2/3">
          <img style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', height: '100%', width: '100%' }} src={unit.media.photos[0]} />
        </div>
        {!isMobile &&
          <div className="ml-1 w-1/3 relative">
            <img style={{ borderTopRightRadius: '10px', width: '99%' }} className="mb-1 w-full" src={unit.media.photos[1]} />
            <img style={{ borderBottomRightRadius: '10px', width: '99%' }} className="mt-1 w-full" src={unit.media.photos[2]} />

          </div>}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex justify-between items-center rounded-md px-2 md:px-3 py-1 md:py-2 text-white text-lg font-medium"
          style={{
            backgroundColor: 'rgba(74, 54, 54, 0.8)',
            position: 'absolute',
            right: '15px',
            bottom: '10%'
          }} >
          <span className="mr-2">+{unit.media.photos.length}</span>
          <img className="ml-2" src="/images/icons/img.svg" />
        </button>

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

      <div className={styles.shareContainer}>
        {/* create tool tips for these buttons */}
        <button onClick={wishListHandler}>
          {unit.wishListed ? <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "red", fontSize: "25px" }}
            aria-hidden="true"
            className=" text-custom-red hover:text-white hover:text-opacity-50 text-opacity-50 text-2xl"
          />
            :
            <FontAwesomeIcon icon={faHeart} className="text-white hover:text-red-600 text-opacity-50 text-2xl"
              aria-hidden="true" />}
        </button>
        <button>
          <FontAwesomeIcon icon={faShare} />
        </button>

        <button onClick={compareHandler}>compare</button>
        <div className="relative">
          <div className={clsx(styles.shareContainer, styles.shareBtns)}>
            <EmailShareButton
              url={`https://realplat-next-ts2-git-dev-abdelmomen1985.vercel.app/en/units/${unit.id}`} >
              <EmailIcon round={true} size={32} />
            </EmailShareButton>
            <FacebookShareButton
              url={`https://realplat-next-ts2-git-dev-abdelmomen1985.vercel.app/en/units/${unit.id}`} >
              <FacebookIcon round={true} size={32} />
            </FacebookShareButton>
            <FacebookMessengerShareButton
              url={`https://realplat-next-ts2-git-dev-abdelmomen1985.vercel.app/en/units/${unit.id}`} >
              <FacebookMessengerIcon round={true} size={32} />
            </FacebookMessengerShareButton>

            <WhatsappShareButton
              url={`https://realplat-next-ts2-git-dev-abdelmomen1985.vercel.app/en/units/${unit.id}`} >
              <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>
            <TwitterShareButton
              url={`https://realplat-next-ts2-git-dev-abdelmomen1985.vercel.app/en/units/${unit.id}`} >
              <TwitterIcon round={true} size={32} />
            </TwitterShareButton>
            <PinterestShareButton
              url={`https://realplat-next-ts2-git-dev-abdelmomen1985.vercel.app/en/units/${unit.id}`} >
              <PinterestIcon round={true} size={32} />
            </PinterestShareButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleUnitHeroSection
