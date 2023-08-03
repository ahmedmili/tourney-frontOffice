import React from 'react';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header'; 

export default class PartnersDetailsPage extends React.Component {


  constructor(props){
    super(props);
    this.state={
      partner:null,
      date:null,
      heure:null,
      more:null,
      successMessageAdd:''
      
    }
  }

  checkUserAuth(){
    if (localStorage.getItem('token') == null) {
      this.props.history.push('/auth');
    }
  }
  componentDidMount(){
    this.checkUserAuth();
    this.searchFor();
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

        fetch("http://localhost:8080/api/partners/details?id="+this.props.match.params.id, requestOptions)
        .then(response => response.json())
        .then(result => {
           console.log(result);

           this.setState({partner:result})
        })
        .catch(error => console.log('error', error));

  }


  addToMyCalendar(){
      // POST

      const partnerID = this.props.match.params.id;

      
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token') );
    myHeaders.append("Content-Type", "application/json");
     
    var raw = JSON.stringify({"date":this.state.date,"heure":this.state.heure,"more":this.state.more,'partner_id':partnerID});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:8080/api/calendar/add", requestOptions)
    .then(response => response.json())
    .then(result => {
       console.log(result);

       if (result.success === true) {
           this.setState({
            successMessageAdd: result.message
           })
       }
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
              <h1 class="title-single">{ this.state.partner != null ? this.state.partner.name : null }</h1>
              <span class="color-text-a">Plus de details</span>
            </div>
          </div>
          <div class="col-md-12 col-lg-4">
            <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="">Acceuil</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  partenaire
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>


    
        <div className='container'>
 
        {

            this.state.partner != null ?

            <div>
                <div class="col-sm-12">
                    <div class="news-img-box">
                    <img src={ this.state.partner.logo_url } alt="" class="img-fluid"/>
                    </div>
                </div>



            <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            
            
            <div class="post-information">
              <ul class="list-inline text-center color-a">
                <li class="list-inline-item mr-2">
                  <strong>Email: </strong>
                  <span class="color-text-a">{this.state.partner.email}</span>
                </li>
                <li class="list-inline-item mr-2">
                  <strong>Télephone: </strong>
                  <span class="color-text-a">{ this.state.partner.phone }</span>
                </li>
                <li class="list-inline-item">
                  <strong>Voir sur carte: </strong>
                  <a class="color-text-a" href={ this.state.partner.maps }> Ouvrir maps </a>
                </li>
              </ul>
            </div>
            <div class="post-content color-text-a">
               
              <p>
               {this.state.partner.about}
              </p>
              
              
             


            </div>

            <div className="row mt-5 mb-5">
              <div className="col-sm-12">
                  <h3 className='text-muted'>Ajouter a mon agenda</h3>

                  <div className="form-group">
                  <div className="row mb-3">
                          <div className="col-sm-6">
                              <label htmlFor="">Date</label>
                              <input type="date" className='form-control' onChange={(e)=>{this.setState({date:e.target.value})}} />
                          </div>
                          <div className="col-sm-6">
                              <label htmlFor="">Heure</label>
                              <input type='time' className='form-control'  onChange={(e)=>{this.setState({heure:e.target.value})}} />
                          </div>
                          
                      </div>

                      <div className="row mb-3">
                          <div className="col-sm-12">
                              <label htmlFor="">Ajoute une note(facultatif)</label>
                              <textarea type="date" className='form-control' onChange={(e)=>{this.setState({more:e.target.value})}} ></textarea>
                          </div>
                          
                          
                      </div>

                      
                  </div>

                  <button type="submit" class="btn btn-b" onClick={()=>{ this.addToMyCalendar() }} disabled={ this.state.date === null || this.state.heure === null }  >Ajouter</button>

                   

                   {
                       this.state.successMessageAdd !== '' ? 
                       <div className="alert alert-success mt-5">
                       { this.state.successMessageAdd }
                   </div>:
                   null
                   }
              </div>
          </div>
            
            
          </div>






                
            </div>
            :

            null
        }

 
           

 
        </div>



        


     
  
  



   
        

 



        { /* ======= Footer ======= */}
        <Footer />

        { /* End Footer */}
 
      </div>
  
    );
  }
 

}

 
