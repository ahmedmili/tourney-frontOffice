import React from 'react';
import Footer from '../../components/footer/footer';
import HedaerBloc from '../../components/Header/Header';
import './add-partner.css'

export default class AddNewPartnerPage extends React.Component {


  constructor(){
    super();
    this.state = {
        name:'',
        logo_url:'',
        phone:'',
        email:'',
        website:'',
        about:'', 
        region_id:'',


        errMSG:'',
        succMSG:'',
        

        regions: []
        
    }
  }

  checkUserAuth(){
    if (localStorage.getItem('token') == null) {
      this.props.history.push('/auth');
    }
  }



  iniData(){
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




  componentDidMount(){
    this.checkUserAuth();
    this.iniData();
  }


  addData(){
      // CALL API 
    
      this.setState({
        errMSG:'',
        succMSG:'',
          
      })
      var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token') );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(
            
            {   
                
                name:this.state.name,
                logo_url:this.state.logo_url,
                phone:this.state.phone,
                email:this.state.email,
                website:this.state.website,
                about:this.state.about, 
                region_id:this.state.region_id,
            
            }
            
            
            );

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/partners/add", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if (result.success === true) {
                 this.setState({
                     succMSG: result.message
                 })

                 setTimeout(() => {
                     this.props.history.push('/');
                 }, 2000);
            } else {
                this.setState({
                    errMSG: result.message
                })
            }
        })
        .catch(error => {
            this.setState({
                errMSG: 'Network error.'
            })
        });
        }




  render(){
    return(
      <div className="App">

        <HedaerBloc />

        { /* End Sidebar*/}

        <main id="main" className="main"> 

            <div className="card">
                <div className="card-body">
                    <h3>Add partenair demande </h3>


                    <form onSubmit={ (e)=> { e.preventDefault(); this.addData();  } } >

 
 


                            <div className="form-group mb-3">
                                <label htmlFor="">Nom</label>
                                <input type="text" className='form-control' value={ this.state.name } onChange = { (e)=>{ this.setState({ name: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Photo URL</label>
                                <input type="text" className='form-control' value={ this.state.logo_url } onChange = { (e)=>{ this.setState({ logo_url: e.target.value }) } } />
                            </div>
                 
                            <div className="form-group mb-3">
                                <label htmlFor="">email</label>
                                <input type="text" className='form-control' value={ this.state.email } onChange = { (e)=>{ this.setState({ email: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Télephone</label>
                                <input type="text" className='form-control' value={ this.state.phone } onChange = { (e)=>{ this.setState({ phone: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Site web</label>
                                <input type="text" className='form-control' value={ this.state.website } onChange = { (e)=>{ this.setState({ website: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Région</label>
                                <select   className='form-control' value={ this.state.region_id } onChange = { (e)=>{ this.setState({ region_id: e.target.value }) } } >

                                    {
                                        this.state.regions.map((r)=>{
                                            return <option value={ r.id_region } >{r.label}</option>
                                        })
                                    }

                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">A propos</label>
                                <textarea type="text" className='form-control' value={ this.state.about } onChange = { (e)=>{ this.setState({ about: e.target.value }) } } ></textarea>
                            </div>
                            
                            
                           
                           

                            <div className="form-group mb-3">
                               <button type='submit' className='btn btn-success' disabled={ this.state.name ==='' || this.state.logo_url ==='' || this.state.email === ''|| this.state.phone === ''|| this.state.website === ''|| this.state.about === '' }>Ajouter</button>
                            </div>
        
  


                            {
                                this.state.errMSG !== '' ?
                                <div className='alert alert-danger'>{ this.state.errMSG }</div>
                                :
                                <div></div>
                            }
                             {
                                this.state.succMSG !== '' ?
                                <div className='alert alert-success'>{ this.state.succMSG }</div>
                                :
                                <div></div>
                            }
                

                    </form>


                </div>
            </div>
 
        </main>{ /* End #main */}

        { /* ======= Footer ======= */}
        <Footer />

        { /* End Footer */}

        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
      </div>
  
    );
  }
 

}

 
