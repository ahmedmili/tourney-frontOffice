import React, { useEffect, useState } from 'react';
import AsideMenu from '../../components/AsideMenu/AsideMenu';
import Footer from '../../components/footer/footer';
import HedaerBloc from '../../components/Header/Header';
import { useNavigate, useParams } from "react-router-dom"
import { ServicesService } from "../../services/API/Services"
import { toast } from 'react-toastify';

import './service-details-page.css'
export default function PartnersDetailsPage() {

  const navigate = useNavigate()
  const params = useParams()
  const [partner, setPartner] = useState(null)
  const [date, setDate] = useState(null)
  const [heure, setHeure] = useState(null)
  const [more, setMore] = useState(null)

  useEffect(() => {
    checkUserAuth();
    searchFor();
  }, [])

  function checkUserAuth() {
    if (localStorage.getItem('token') == null) {
      navigate('/auth');
    }
  }
  async function searchFor() {
    const { data, success } = await ServicesService.searchFor(params.id);
    if (data) {
      // console.log(data.result[0])
      setPartner(data.result[0])
    } else toast.error("message")
  }
  async function addToMyCalendar() {
    const partnerID = params.id;

    var raw = JSON.stringify({ "date": date, "heure": heure, "more": more, 'partner_id': partnerID });
    const { code, message, success } = await ServicesService.addToMyCalendar(raw)
    if (code == 200) {
      toast.success(message)
      navigate("/search")
    } else toast.error(message)
  }

  return (
    <div >
      <HedaerBloc />
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">{partner != null ? partner.name : null}</h1>
                <span className="color-text-a">Plus de details</span>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="">Acceuil</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    partenaire
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <div className='container'>
        {
          partner != null ?
            (<div>
              <div className="col-sm-12">
                <div className="news-img-box">
                  <img src={process.env.REACT_APP_IMAGE_BASE_URL + partner.logo_url} alt="" className="img-fluid" />
                </div>
              </div>
              <p className='details-para'>
                {partner.about}
              </p>
              <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <div className="post-information">
                  <ul className="list-inline text-center color-a">
                    <li className="list-inline-item mr-2">
                      <strong>Email: </strong>
                      <span className="color-text-a">{partner.email}</span>
                    </li>
                    <li className="list-inline-item mr-2">
                      <strong>Télephone: </strong>
                      <span className="color-text-a">{partner.phone}</span>
                    </li>
                    <li className="list-inline-item">
                      <strong>Voir sur carte: </strong>
                      <a className="color-text-a" href={partner.maps}> Ouvrir maps </a>
                    </li>
                  </ul>
                </div>
                <div className="post-content color-text-a">
                  <p>
                    {partner.about}
                  </p>
                </div>
                <div className="row mt-5 mb-5">
                  <div className="col-sm-12">
                    <h3 className='text-muted'>Ajouter a mon agenda</h3>
                    <div className="form-group">
                      <div className="row mb-3">
                        <div className="col-sm-6">
                          <label htmlFor="">Date</label>
                          <input type="date" className='form-control' onChange={(e) => { setDate(e.target.value) }} />
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="">Heure</label>
                          <input type='time' className='form-control' onChange={(e) => { setHeure(e.target.value) }} />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-12">
                          <label htmlFor="">Ajoute une note(facultatif)</label>
                          <textarea type="date" className='form-control' onChange={(e) => { setMore(e.target.value) }} ></textarea>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-b" onClick={() => { addToMyCalendar() }} disabled={date === null || heure === null}  >Ajouter</button>

                  </div>
                </div>
              </div>
            </div>)
            :
            (<>

            </>)
        }
      </div>
      { /* ======= Footer ======= */}
      <Footer />

      { /* End Footer */}

    </div>

  );
}



