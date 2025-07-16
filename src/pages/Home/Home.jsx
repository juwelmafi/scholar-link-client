import React from 'react';
import Banner from './Banner/Banner';
import TopScholarships from './TopScholarships/TopScholarships';
import OurImpact from './OurImpact/OurImpact';
import StudentReviews from './StudentReviews/StudentReviews';
import UniversityLogoSlider from './UniversityLogoSlider/UniversityLogoSlider';

const Home = () => {
  return (
    <div className='bg-[#F3F4F6]'>
      <TopScholarships></TopScholarships>
      <OurImpact></OurImpact>
      <UniversityLogoSlider></UniversityLogoSlider>
      <StudentReviews></StudentReviews>
    </div>
  );
};

export default Home;