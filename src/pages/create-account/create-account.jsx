import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import * as Yup from 'yup';
import { userService } from '../../services/API/user';

export default function CreateAccountPage() {



  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMSG, setErrorMSG] = useState('')
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()


  const validationSchema = Yup.object().shape({
    name: Yup.string().required(`${t('yup.nom.required')}`),
    lastName: Yup.string().required(`${t('yup.lastName.required')}`),
    email: Yup.string()
      .email(`${t('Email non valide')}`)
      .required(`${t('yup.email.required')}`),
    password: Yup.string()
      .min(8, `${t('yup.password.min')}`)
      .required(`${t('Password is required')}`),
    phone: Yup.string()
      .matches(
        /^[0-9]{8}$/,
        `${t('yup.phone.invalideFormat')}`
      )
      .required(`${t('yup.phone.required')}`),
  });

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


  const createAccount = async () => {

    setErrorMSG('')

    var raw = {
      "fullname": name,
      "lastName": lastName,
      "password": password,
      "email": email,
      "phone": phone,
    };

    const { success, message } = await userService.registerUser(raw)
    if (success === true) {
      navigate('/auth')
    } else {
      setErrorMSG(message)
    }

  }

  const hasErrors = Object.values(errors).some((error) => error !== null);

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
                    <h5 className="card-title text-center pb-0 fs-4">{t('CreateYourAccount')}</h5>
                  </div>

                  <form className="row g-3 needs-validation" novalidate onSubmit={(e) => {
                    e.preventDefault();
                    createAccount();
                  }}>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">{t('email')}</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input onBlur={handleBlur} type="text" name="email" className="form-control" id="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />

                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="name" className="form-label">{t('Nom')}</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input onBlur={handleBlur} type="text" name="name" className="form-control" id="name" onChange={(e) => { setName(e.target.value) }} value={name} />

                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="lastName" className="form-label">{t('lastName')}</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input onBlur={handleBlur} type="text" name="lastName" className="form-control" id="lastName" onChange={(e) => { setLastName(e.target.value) }} value={lastName} />

                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label">{t('password')}</label>
                      <input onBlur={handleBlur} type="password" name="password" className="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                      <div className="invalid-feedback">{t('tapezPasswordPls')}!</div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="confirmPassword" className="form-label">{t('confirmPassword')}</label>
                      <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />
                      <div className="invalid-feedback">{t('tapezConfirmPasswordPls')}</div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="phone" className="form-label">{t('phone')}</label>
                      <input onBlur={handleBlur} type="text" name="phone" className="form-control" id="phone" onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                      <div className="invalid-feedback">{t('tapezPhonePls')}</div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit" disabled={hasErrors} >{t('createAccount')}</button>
                    </div>

                    {
                      errorMSG !== '' ?
                        <div className='alert alert-danger mt-3'>{errorMSG}</div>
                        :
                        <div></div>
                    }

                    <div className="col-12">
                      <p className="small mb-0">{t('backTo')} <Link to="/auth">{t('Login')}</Link></p>
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


