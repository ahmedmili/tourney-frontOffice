import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from "../../services/API/user";
import { localStorageService } from "../../services/localStorageService"
import { toast } from 'react-toastify'
import {
  useNavigate
} from "react-router-dom"
import * as Yup from 'yup';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMSG, setErrorMSG] = useState('');
  const [errors, setErrors] = useState({});

  const Navigate = useNavigate();

  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  function authUser() {

    var raw = JSON.stringify({ "email": username, "password": password });
    userService.loginUser(raw).then((res) => {
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
  }
  const handleBlur = async (e) => {
    const { name, value } = e.target;
    try {
      await Yup.reach(validationSchema, name).validate(value);
      setErrors({

      });
      setErrorMSG('')
    } catch (error) {
      console.log(error.message)
      toast.error(error)
      setErrorMSG(error.message)
      setErrors({
        ...errors,
        [name]: error.message,
      });
    }
  };
  const hasErrors = Object.values(errors).some((error) => error !== null);

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
                      <label for="username" className="form-label">Nom d'utilisateur</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input onBlur={handleBlur} type="text" name="username" className="form-control" id="username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
                        <div className="invalid-feedback">Entrez votre nom d'utilisateur.</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label for="password" className="form-label">Mot de passe</label>
                      <input onBlur={handleBlur} type="password" name="password" className="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
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
                        <div className='alert alert-danger mt-3'>{errorMSG}</div>
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