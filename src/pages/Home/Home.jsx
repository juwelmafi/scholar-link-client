import React from 'react';
import TopScholarships from './TopScholarships/TopScholarships';
import OurImpact from './OurImpact/OurImpact';
import StudentReviews from './StudentReviews/StudentReviews';
import UniversityLogoSlider from './UniversityLogoSlider/UniversityLogoSlider';
import Banner from './Banner/Banner';

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      <TopScholarships></TopScholarships>
      <OurImpact></OurImpact>
      <UniversityLogoSlider></UniversityLogoSlider>
      <StudentReviews></StudentReviews>
    </div>
  );
};

export default Home;