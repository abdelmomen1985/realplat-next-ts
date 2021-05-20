import React from 'react';
import { useState } from 'react';
import styles from './navigation.module.scss';
import Link from 'next/link';

const dummyLinks = ['Lorem ipsum dolor', 'Lorem dolor sit amet', 'Lorem ipsulor sit', 'Psum dolor sit amet', 'Lorem  dolor amet']
const footerLinks = [
  {
    title: 'Popular Searches',
    links: [...dummyLinks]
  },
  {
    title: 'Trending Cities',
    links: [...dummyLinks]
  },
  {
    title: 'Popular Compounds',
    links: [...dummyLinks]
  },
  {
    title: 'About mellw.com',
    links: [...dummyLinks]
  },
]
function Footer({ title }: { title?: string }) {
  const [searchLinks, setSearchLinks] = useState(dummyLinks)
  const [citiesLinks, setCitiesLinks] = useState(dummyLinks)
  const [compoundsLinks, setCompoundsLinks] = useState(dummyLinks)
  const [aboutLinks, setAboutLinks] = useState(dummyLinks)

  return (
    <footer className="mt-5">
      {title !== 'Expo Page' && <section className="flex flex-wrap justify-between items-center py-6 my-3 pr-16 pl-12 bg-secondary">
        <h5 className="text-black text-opacity-75 font-semibold text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do eiusmod tempor incididunt ut labore
        </h5>
        <div className="flex justify-center items-center">
          <button className="bg-primary mr-4 text-white text-md mt-5 mb-2 font-medium rounded-md px-3 py-2 shadow-md mx-auto"
          >Know More</button>
          <button className="bg-white text-md ml-4 mt-5 mb-2 font-medium rounded-md px-3 py-2 shadow-md mx-auto"
            style={{ border: '1px solid #007882', color: '#7B53C1' }} >Contact Us</button>
        </div>
      </section>}
      <section className="grid grid-cols-1 my-5 md:grid-cols-4 grid-rows-4 md:grid-rows-1 gap-4 pr-16 pl-12">
        {footerLinks.map((item, index) => (
          <div key={index} className="">
            <h5 className="text-black text-lg font-medium my-3">{item.title}</h5>
            <ul>
              {item.links.map(item => (
                <li className="py-1" key={item}>
                  <a className="text-primary cursor-pointer" >{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <hr className={styles.verticalLine} />
      <section className="my-4 py-4 flex flex-wrap justify-between items-center px-4 mx-3">
        <a className="text-main cursor-pointer capitalize text-lg text-medium text-center">Mobile App</a>
        <a className="text-main cursor-pointer capitalize text-lg text-medium text-center">Community</a>
        <a className="text-main cursor-pointer capitalize text-lg text-medium text-center">Company</a>
        <h3>
          <Link href="/">
            <a className="text-black text-5xl font-comfortaa text-medium text-center">mellw</a>
          </Link>
        </h3>
        <a className="text-main cursor-pointer capitalize text-lg text-medium text-center">Help Desk</a>
        <a className="text-main cursor-pointer capitalize text-lg text-medium text-center">Blog</a>
        <a className="text-main cursor-pointer capitalize text-lg text-medium text-center">Resources</a>
      </section>
      <img src="/images/Footer.png" className="w-full mt-3 mb-0" />
    </footer>
  );
}

export default Footer;
