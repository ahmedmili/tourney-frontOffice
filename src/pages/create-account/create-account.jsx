import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { object, string, number, date, InferType } from 'yup';
import * as Yup from 'yup';

export default function CreateAccountPage() {



  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMSG, setErrorMSG] = useState('')
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    phone: Yup.string()
      .matches(
        /^[0-9]{8}$/,
        'Phone number must be a 8-digit number (e.g., 1234567890)'
      )
      .required('Phone number is required'),
  });

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    // console.log(name)

    try {
      await Yup.reach(validationSchema, name).validate(value);
// console.log(value)
// toast.error(error)
setErrors({
  ...errors,
  [name]: null,
});
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


  const createAccount = () => {
    setErrorMSG('')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "fullname": name,
      "password": password,
      "email": email,
      "lastName": lastName
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    if (!(password == confirmpassword)) {
      setErrorMSG('mot de passe n\'est pas identique ')

    } else {


      fetch("http://localhost:8080/api/auth/create-account", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success === true) {
            navigate('/auth')
          } else {
            setErrorMSG(result.message)
          }
        })
        .catch(error => setErrorMSG('Something went wrong'));
    }
  }


  return (
    <div className="container">

      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div className="d-flex justify-content-center py-4">
                <a href="index.html" className="logo d-flex align-items-center w-auto">
                  <img src="/template/assets/img/logo.png" alt="" />
                  <span className="d-none d-lg-block">NiceAdmin</span>
                </a>
              </div>

              <div className="card mb-3">

                <div className="card-body">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Create Your Account</h5>
                    <p className="text-center small">Enter your email username & password to create your account</p>
                  </div>

                  <form className="row g-3 needs-validation" novalidate onSubmit={(e) => {
                    e.preventDefault();
                    createAccount();
                  }}>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input onBlur={handleBlur} type="text" name="email" className="form-control" id="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />

                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="name" className="form-label">nom</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input onBlur={handleBlur} type="text" name="name" className="form-control" id="name" onChange={(e) => { setName(e.target.value) }} value={name} />

                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="lastName" className="form-label">prénom</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input onBlur={handleBlur} type="text" name="lastName" className="form-control" id="lastName" onChange={(e) => { setLastName(e.target.value) }} value={lastName} />

                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label">mot de passe</label>
                      <input onBlur={handleBlur} type="password" name="password" className="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                      <div className="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="confirmPassword" className="form-label">confirmé mot de passe</label>
                      <input onBlur={handleBlur} type="password" name="confirmPassword" className="form-control" id="confirmPassword" onChange={(e) => { setConfirmpassword(e.target.value) }} value={confirmpassword} />
                      <div className="invalid-feedback">Please enter your password again!</div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="phone" className="form-label">phone</label>
                      <input onBlur={handleBlur} type="text" name="phone" className="form-control" id="phone" onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                      <div className="invalid-feedback">Please enter your phone number</div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit" disabled={name === '' || lastName === '' || password === '' || confirmpassword === '' || email === '' || phone === ''} >Create account</button>
                    </div>

                    {
                      errorMSG !== '' ?
                        <div className='alert alert-danger mt-3'>{errorMSG}</div>
                        :
                        <div></div>
                    }

                    <div className="col-12">
                      <p className="small mb-0">back to <Link to="/auth">sign in</Link></p>
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


