import React from 'react'; 
import { Link } from 'react-router-dom';

export default class AuthPage extends React.Component {


  constructor(props){
    super(props);
    this.state = {
        username: '',
        password:'',
        errorMSG:''
    }
  }


  componentDidMount(){
    if (localStorage.getItem('token')) {
      this.props.history.push('/profile');
    }
  }

  authUser(){
    // call backend

    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"email":this.state.username,"password":this.state.password});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/auth/signin", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success === true) {
                console.log(result);
                
                localStorage.setItem('token',result.token)

                // redirect to home page
                this.props.history.push('/');

            } else {
                this.setState({
                    errorMSG: result.message
                })
            }
        })
        .catch(error => console.log('error', error));


  }

  render(){
    return(
        <div class="container">

        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
  
                <div class="d-flex justify-content-center py-4">
                  <a href="index.html" class="logo d-flex align-items-center w-auto">
                     
                    <span class=" d-lg-block">Touney</span>
                  </a>
                </div> 
  
                <div class="card mb-3">
  
                  <div class="card-body">
  
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Acceder a votre espace client</h5>
                      <p class="text-center small">Entrez votre nom d'utilisateur et votre mot de passe</p>
                    </div>
  
                    <form class="row g-3 needs-validation" novalidate onSubmit={ (e)=>{
                        e.preventDefault();
                        this.authUser();
                    } }>
  
                      <div class="col-12">
                        <label for="yourUsername" class="form-label">Nom d'utilisateur</label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" name="username" class="form-control" id="yourUsername" onChange={ (e)=>{ this.setState({ username: e.target.value }) } } value={ this.state.username } />
                          <div class="invalid-feedback">Entrez votre nom d'utilisateur.</div>
                        </div>
                      </div>
  
                      <div class="col-12">
                        <label for="yourPassword" class="form-label">Mot de passe</label>
                        <input type="password" name="password" class="form-control" id="yourPassword" onChange={ (e)=>{ this.setState({ password: e.target.value }) } } value={ this.state.password }  />
                        <div class="invalid-feedback">Entrez votre mot de passe</div>
                      </div>
  
                       
                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit" disabled={ this.state.username ==='' || this.state.password === '' } >Login</button>
                      </div>


                      <div class="col-12">
                      vous n'avez pas de compte ? <Link to={ '/create-account' }>créer un compte gratuitement</Link>
                      </div>
                      


                      




                        {
                            this.state.errorMSG !== '' ?
                            <div className='alert alert-danger mt-3'>{ this.state.errorMSG }</div>
                            :
                            <div></div>
                        }

                      
                    </form>
  
                  </div>
                </div>
  
                
  
              </div>
            </div>
          </div>
  
        </section>
  
      </div>
  
    );
  }
 

}

 
