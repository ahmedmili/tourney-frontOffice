import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from "../../services/API/user";
import { localStorageService } from "../../services/localStorageService"
import { toast } from 'react-toastify'
import {
  useNavigate
} from "react-router-dom"

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMSG, setErrorMSG] = useState('');
  const Navigate = useNavigate();

  function authUser() {

    var raw = JSON.stringify({ "email": username, "password": password });
    userService.loginUser(raw).then((res) => {
      console.log(res)
      if (res.success === true) {
        localStorageService.setUserCredentials(res.user, res.token);
        Navigate("/");
        toast.success(res.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      }
    })

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");


    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("http://localhost:8080/api/auth/signin", requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     if (result.success === true) {

    //       localStorage.setItem('token', result.token)

    //       // redirect to home page
    //       this.props.history.push('/');

    //     } else {
    //       setErrorMSG(result.message)
    //     }
    //   })
    //   .catch(error => console.log('error', error));
  }


  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <a href="index.html" className="logo d-flex align-items-center w-auto">
                  <span className=" d-lg-block">Touney</span>
                </a>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Acceder a votre espace client</h5>
                    <p className="text-center small">Entrez votre nom d'utilisateur et votre mot de passe</p>
                  </div>
                  <form className="row g-3 needs-validation" novalidate onSubmit={(e) => {
                    e.preventDefault();
                    authUser();
                  }}>
                    <div className="col-12">
                      <label for="yourUsername" className="form-label">Nom d'utilisateur</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" name="username" className="form-control" id="yourUsername" onChange={(e) => { setUsername(e.target.value) }} value={username} />
                        <div className="invalid-feedback">Entrez votre nom d'utilisateur.</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label for="yourPassword" className="form-label">Mot de passe</label>
                      <input type="password" name="password" className="form-control" id="yourPassword" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                      <div className="invalid-feedback">Entrez votre mot de passe</div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit" disabled={username === '' || password === ''} >Login</button>
                    </div>
                    <div className="col-12">
                      vous n'avez pas de compte ? <Link to={'/create-account'}>créer un compte gratuitement</Link>
                    </div>
                    {
                      errorMSG !== '' ?
                        <div classNameName='alert alert-danger mt-3'>{errorMSG}</div>
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

export default Auth