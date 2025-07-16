import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png'
const Logo = () => {
  return (
    <Link to={'/'}>
      <div className='flex items-end'>
      <img className='w-12 md:w-7 md:mb-2' src={logo} alt="" />
      <h2 className='md:text-2xl hidden md:block font-extrabold text-primary -ml-2'>ScholarLink</h2>
    </div>
    </Link>
  );
};

export default Logo;