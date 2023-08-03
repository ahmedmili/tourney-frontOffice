import React from 'react'; 
import { Link } from 'react-router-dom';

export default class CreateAccountPage extends React.Component {


  constructor(props){
    super(props);
    this.state = {
        name: '',
        lastName: '',
        password:'',
        confirmpassword:'',
        email:'',
        errorMSG:''
    }
  }

  createAccount(){
    // call backend
    this.setState({
        errorMSG:''
    })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"fullname":this.state.name,
                              "password":this.state.password,
                              "email":this.state.email,
                              "lastName":this.state.lastName
                            });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    if (!(this.state.password == this.state.confirmpassword)){
      this.setState({
        errorMSG: 'mot de passe n\'est pas identique '
    })
      // errorMSG = 
    }else{

    
    fetch("http://localhost:8080/api/auth/create-account", requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result.success === true) {
            this.props.history.push('/auth')
        } else {
            this.setState({
                errorMSG: result.message
            })
        }
    })
    .catch(error => this.setState({
        errorMSG: 'Something went wrong'
    }));
  }
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
                    <img src="/template/assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block">NiceAdmin</span>
                  </a>
                </div> 
  
                <div class="card mb-3">
  
                  <div class="card-body">
  
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Create Your Account</h5>
                      <p class="text-center small">Enter your email username & password to create your account</p>
                    </div>
  
                    <form class="row g-3 needs-validation" novalidate onSubmit={ (e)=>{
                        e.preventDefault();
                        this.createAccount();
                    } }>
  
                    <div class="col-12">
                        <label for="yourUsername" class="form-label">Email</label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" name="email" class="form-control" id="yourUsername" onChange={ (e)=>{ this.setState({ email: e.target.value }) } } value={ this.state.email } />
                           
                        </div>
                      </div>
  

                      <div class="col-12">
                        <label for="yourUsername" class="form-label">nom</label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" name="username" class="form-control" id="yourUsername" onChange={ (e)=>{ this.setState({ name: e.target.value }) } } value={ this.state.username } />
                          
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="yourLastename" class="form-label">prénom</label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" name="yourLastename" class="form-control" id="yourLastename" onChange={ (e)=>{ this.setState({ lastName: e.target.value }) } } value={ this.state.username } />
                          
                        </div>
                      </div>
  
                      <div class="col-12">
                        <label for="yourPassword" class="form-label">mot de passe</label>
                        <input type="password" name="password" class="form-control" id="yourPassword" onChange={ (e)=>{ this.setState({ password: e.target.value }) } } value={ this.state.password }  />
                        <div class="invalid-feedback">Please enter your password!</div>
                      </div>
  
                      <div class="col-12">
                        <label for="yourConfirmPassword" class="form-label">confirmé mot de passe</label>
                        <input type="password" name="yourConfirmPassword" class="form-control" id="yourConfirmPassword" onChange={ (e)=>{ this.setState({ confirmpassword: e.target.value }) } } value={ this.state.confirmpassword }  />
                        <div class="invalid-feedback">Please enter your password again!</div>
                      </div>
                       
                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit" disabled={ this.state.name ==='' || this.state.lastName ==='' || this.state.password === ''|| this.state.confirmpassword === ''|| this.state.email === '' } >Create account</button>
                      </div>

                        {
                            this.state.errorMSG !== '' ?
                            <div className='alert alert-danger mt-3'>{ this.state.errorMSG }</div>
                            :
                            <div></div>
                        }

                      <div class="col-12">
                        <p class="small mb-0">back to <Link to="/auth">sign in</Link></p>
                      </div>
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
/*
*/
 
