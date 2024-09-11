import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';

import { logo } from '../assets';

const links = [
  { name: 'Discover', to: '/', icon: FaHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];

const Links = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <Link
        key={item.name}
        to={item.to}
        className="group flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 focus:text-blue-500 transition-colors duration-200 ease-in-out pl-4"
        onClick={() => handleClick && handleClick()}
      >
        {/* Apply scale and color effect to the icon on hover and focus */}
        <item.icon className="text-gray-400 group-hover:scale-110 group-hover:text-cyan-400 group-focus:scale-110 group-focus:text-blue-500 transition-all duration-200 ease-in-out ml-4" />
        <span className="text-gray-400 group-hover:scale-110 group-hover:text-cyan-400 group-focus:scale-110 group-focus:text-blue-500 transition-all duration-200 ease-in-out ml-1">
          {item.name}
        </span>

        {/* <FaHome /> */}
      </Link>

    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[200px] py-10 px-4 bg-black">
        <img src={logo} alt="logo" className="w-full h-24 object-contain" />
        <Links />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-black/10 via-black/27 to-green-900/10 backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <Links handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
