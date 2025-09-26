// HomePage.jsx
import React from 'react'
import Hero from './Hero'
import AboutHome from './AboutHome'
import Brands from './Brands'
import MarketPage from './MarketPage'
import Properties from './Properties'
import WhatMakeUs from './WhatMakeUs'
import Testimonial from './Testimonial'
import WorkWithUs from './WorkWithUs'
import InrextVIP from '../InrextVIP/InrextVIP'

const HomePage = () => {
  return (
    <div className=''>
      <Hero />
      <AboutHome/>
      <Brands/>
      {/* <MarketOverview/> */}
      <MarketPage/>
      <Properties/>
      <WhatMakeUs/>
      {/* <Teams/> */}
      <InrextVIP/>
      <Testimonial/>
      <WorkWithUs/>
    </div>
  )
}

export default HomePage
