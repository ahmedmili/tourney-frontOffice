import React from 'react';
import Slider from '../../components/slider/Slider';
import Footer from '../../components/footer/footer';
import HedaerBloc from '../../components/Header/Header';
import './home.css'

export default function HomePage() {
  return (
    <div >
      <HedaerBloc />
      <Slider className='slider' />
      <Footer />
    </div>

  );
}

