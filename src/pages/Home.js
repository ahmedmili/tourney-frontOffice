import React from 'react';
import Slider from '../components/slider/Slider';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';
import './home.css'
export default class HomePage extends React.Component {


  constructor(props){
    super(props);
   
  }
  

  render(){
    return(
      <div >

        <HedaerBloc />
<Slider className='slider'/>
        { /* ======= Footer ======= */}
        <Footer />

        { /* End Footer */}
 
      </div>
  
    );
  }
 

}

 
