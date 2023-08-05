import React from 'react';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class AddNewClient extends React.Component {


  constructor(props){
    super(props);
    this.state = {
        fullname:'',
        email:'',
        password:'',

        errMSG:'',
        succMSG:'',
        
        
    }
  }

  checkUserAuth(){
    if (localStorage.getItem('token') == null) {
      this.props.history.push('/auth');
    }
  }
  componentDidMount(){
    this.checkUserAuth();
  }


  createUser(){
      // CALL API 
    
      this.setState({
        errMSG:'',
        succMSG:'',
          
      })
      var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token') );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"fullname":this.state.fullname,"email":this.state.email,"password":this.state.password });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/auth/create-account", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if (result.success === true) {
                 this.setState({
                     succMSG: result.message
                 })

                 setTimeout(() => {
                     this.props.history.push('/clients');
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


        <AsideMenu />

        { /* End Sidebar*/}

        <main id="main" className="main"> 
            <div class="pagetitle">
                <h1>Welcome back</h1> 
            </div> 


            <div className="card">
                <div className="card-body">
                    <h3>Add new client</h3>


                    <form onSubmit={ (e)=> { e.preventDefault(); this.createUser();  } } >
                            <div className="form-group mb-3">
                                <label htmlFor="">Nom prénom</label>
                                <input type="text" className='form-control' value={ this.state.fullname } onChange = { (e)=>{ this.setState({ fullname: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Email</label>
                                <input type="text" className='form-control' value={ this.state.email } onChange = { (e)=>{ this.setState({ email: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Mot de passe</label>
                                <input type="text" className='form-control' value={ this.state.password } onChange = { (e)=>{ this.setState({ password: e.target.value }) } } />
                            </div>
                           
                           

                            <div className="form-group mb-3">
                               <button type='submit' className='btn btn-success'>Ajouter</button>
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

 
