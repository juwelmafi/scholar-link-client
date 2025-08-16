import React, { useEffect } from 'react';
import TopScholarships from './TopScholarships/TopScholarships';
import OurImpact from './OurImpact/OurImpact';
import StudentReviews from './StudentReviews/StudentReviews';
import UniversityLogoSlider from './UniversityLogoSlider/UniversityLogoSlider';
import Banner from './Banner/Banner';
import Newsletter from './Newsletter/Newsletter';
import PromotionalSection from './Promote/PromotionalSection';
import HowItWorks from './HowItWorks/HowItWorks';

const Home = () => {
   useEffect(() => {
        document.title = ` Home | ScholarLink`;
        return () => {
          document.title = "ScholarLink";
        };
      }, []);
  return (
    <div className=''>
      <Banner></Banner>
      <TopScholarships></TopScholarships>
      <OurImpact></OurImpact>
      <UniversityLogoSlider></UniversityLogoSlider>
      <StudentReviews></StudentReviews>
      <HowItWorks/>
      <PromotionalSection/>
      <Newsletter/>
    </div>
  );
};

export default Home;