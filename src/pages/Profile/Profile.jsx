import React, { useEffect, useState } from 'react';
import EvaluatePlatform from '../../components/evaluateApp/evaluateApp';
import Footer from '../../components/footer/footer';
import HedaerBloc from '../../components/Header/Header';

export default function Profile() {

  const [ programs, setParams] = useState([]);

 function checkUserAuth(){
    if (localStorage.getItem('token') == null) {
      this.props.history.push('/auth');
    }
  };

  useEffect(()=>{
    getMyAgenda()
  },[])

  function getMyAgenda(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/calendar/get-my-agenda", requestOptions)
      .then(response => response.json())
      .then(result => {

        console.log(result);

        this.setState({
          programs: result
        })
      })
      .catch(error => {

      });
  }

  function deleteProgram(id){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/calendar/delete-program?id=" + id, requestOptions)
      .then(response => response.json())
      .then(result => {

        this.getMyAgenda();
      })
      .catch(error => {

      });
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
              this.state.programs.map((p) => {
                return (
                  <li className="list-group-item">
                    <div className="d-flex">
                      <div>
                        <img src={p.logo_url} width={80} style={{ marginRight: 25 }} alt="" />
                      </div>
                      <div className='w-100'>
                        <div className='d-flex justify-content-between'>
                          <div>
                            <p><strong>{p.name}</strong></p>
                            <p className='text-muted'>{p.more}</p>

                            <p><small>{p.date}</small> <small>{p.heure}</small></p>
                          </div>
                          <div className="delete">
                            <i class="bi bi-trash text-danger" style={{ fontSize: 30 }} onClick={() => {
                              const id = p.id_prog;
                              this.deleteProgram(id);
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
     


