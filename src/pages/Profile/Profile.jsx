import React, { useEffect, useState } from 'react';
import EvaluatePlatform from '../../components/evaluateApp/evaluateApp';
import Footer from '../../components/footer/footer';
import HedaerBloc from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom'
import { userService } from '../../services/API/user';
import { toast } from 'react-toastify';
export default function Profile() {
  const navigate = useNavigate()
  const [programs, setPrograms] = useState([]);

  function checkUserAuth() {
    if (localStorage.getItem('token') == null) {
      navigate('/auth');

    }
  };

  useEffect(() => {
    getMyAgenda()
  }, [])

  async function getMyAgenda() {

    const { data } = await userService.getMyAgenda()
    setPrograms(data.data)
    console.log(data.data)
  }

  async function deleteProgram(id) {
    const { success } = await userService.deleteProgram(id)
    success == true ? toast.success("success") : toast.error("delation failed")
  }
  return (
    <div >
      <HedaerBloc />
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">Mon profile</h1>
                <span className="color-text-a">profile</span>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="">Acceuil</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Mon profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <div className='container'>
        <div className="row mt-5 mb-5">
          <EvaluatePlatform />
          <h3>Mon agenda</h3>
          <ul className="list-group">
            {
              programs.map((p) => {
                return (
                  <li key={p.id} className="list-group-item">
                    <div className="d-flex">
                      <div>
                        <img src={process.env.REACT_APP_IMAGE_BASE_URL+p.Partner.logo_url} width={80} style={{ marginRight: 25 }} alt="" />
                      </div>
                      <div className='w-100'>
                        <div className='d-flex justify-content-between'>
                          <div>
                            <p><strong>{p.name}</strong></p>
                            <p className='text-muted'>{p.more}</p>

                            <p><small>{p.date}</small> <small>{p.heure}</small></p>
                          </div>
                          <div className="delete">
                            <i className="bi bi-trash text-danger" style={{ fontSize: 30 }} onClick={() => {
                              const id = p.id_prog;
                              deleteProgram(id);
                            }}  ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}



