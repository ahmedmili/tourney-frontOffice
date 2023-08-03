import React from 'react';
import AsideMenu from '../components/AsideMenu';
import EvaluatePlatform from '../components/evaluateApp';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';
import PartnersSearchGridList from '../components/PartnersSearchGridList';

export default class SearchPage extends React.Component {


  constructor(props){
    super(props);
    this.state={
      regions:[],
      region:'1',
      keywords:'',
      searchResult:[]
    }
  }

  checkUserAuth(){
    if (localStorage.getItem('token') == null) {
      this.props.history.push('/auth');
    }
  }
  componentDidMount(){
    this.checkUserAuth();
    this.getRegionList();
  }


  getRegionList(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token') );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders, 
    redirect: 'follow'
    };

    fetch("http://localhost:8080/api/regions/list", requestOptions)
    .then(response => response.json())
    .then(result =>{

        console.log(result);

         this.setState({
             regions: result
         })
    })
    .catch(error => {
       /*localStorage.clear();
       this.props.history.push('/auth');*/
    });
  }



  searchFor(){ 
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token') );
    myHeaders.append("Content-Type", "application/json");
     
    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/partners/list/search?region="+this.state.region+"&keywords="+this.state.keywords, requestOptions)
        .then(response => response.json())
        .then(result => {
           console.log(result);

           this.setState({searchResult:result})
        })
        .catch(error => console.log('error', error));

  }

  render(){
    return(
      <div >

        <HedaerBloc />



        <section class="intro-single">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8">
            <div class="title-single-box">
              <h1 class="title-single">Rechercher une service</h1>
              <span class="color-text-a">recherche</span>
            </div>
          </div>
          <div class="col-md-12 col-lg-4">
            <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="">Acceuil</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Nos services
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>


    
    <div className='container'>

        <div class="title-box-d">
      <h3 class="title-d">Filter des recherche</h3>
    </div>
    
    
    <div class="box-collapse- form">
      <form class="form-a" onSubmit={(e)=>{e.preventDefault(); this.searchFor()}}>
        <div class="row">
          <div class="col-md-6 mb-2">
            <div class="form-group">
              <label class="pb-2" for="Type">Mot clé</label>
              <input  onChange={(e)=>{ this.setState({keywords:e.target.value}) }} type="text" class="form-control form-control-lg form-control-a" placeholder="mot clé" />
            </div>
          </div>
          <div class="col-md-6 mb-2">
            <div class="form-group ">
              <label class="pb-2" for="Type">Région</label>
              <select onChange={(e)=>{ this.setState({region:e.target.value}) }} class="form-control form-control-lg form-control-a" id="Type">
                
                
                {
                  this.state.regions.map((r)=>{
                    return  <option value={r.id_region}>{r.label}</option>
                  })
                }
              </select>
            </div>
          </div>
           
          
           
           
          
          <div class="col-md-12 mt-5">
            <button type="submit" class="btn btn-b">Rechercher</button>
          </div>
        </div>
      </form>
    </div>




              <hr/>



              <div className="row mt-5 mb-5">
                {
                  this.state.searchResult.map((res)=>{
                    return( <PartnersSearchGridList data={ res }  />);
                  })
                }
             




             <EvaluatePlatform />

             </div>
        </div>



        


     
  
  



   
        

 



        { /* ======= Footer ======= */}
        <Footer />

        { /* End Footer */}
 
      </div>
  
    );
  }
 

}

 
