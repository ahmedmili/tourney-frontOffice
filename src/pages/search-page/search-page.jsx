import React, { useEffect, useState } from 'react';
import AsideMenu from '../../components/AsideMenu/AsideMenu';
import EvaluatePlatform from '../../components/evaluateApp/evaluateApp';
import Footer from '../../components/footer/footer';
import HedaerBloc from '../../components/Header/Header';
import PartnersSearchGridList from '../../components/PartnersSearchGridList/PartnersSearchGridList';
import { useNavigate } from "react-router-dom"
import { regionService } from "../../services/API/Region"
import { toast } from 'react-toastify';
const SearchPage = () => {

  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(1);
  const [keywords, setKeywords] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  function checkUserAuth() {
    if (localStorage.getItem('token') == null) {
      navigate('/auth');
    }
  }

  useEffect(() => {
    checkUserAuth();
    getRegionList();
    searchFor()
  }, [])


  async function getRegionList() {
    const { message, success, data } = await regionService.getRegionList()
    if (data) {
      setRegions(data)
    } else {
      toast.error(message)
    }
  }

  async function searchFor() {
    const { data, message, success } = await regionService.searchFor(region, keywords)
    if (data) {
      setSearchResult(data.result)
    } else {
      toast.error(message)
    }
  }
  return (
    <div >

      <HedaerBloc />
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">Rechercher une service</h1>
                <span className="color-text-a">recherche</span>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="">Acceuil</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Nos services
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <div className='container'>

        <div className="title-box-d">
          <h3 className="title-d">Filter des recherche</h3>
        </div>
        <div className="box-collapse- form">
          <form className="form-a" onSubmit={(e) => { e.preventDefault(); searchFor() }}>
            <div className="row">
              <div className="col-md-6 mb-2">
                <div className="form-group">
                  <label className="pb-2" htmlFor="Type">Mot clé</label>
                  <input onChange={(e) => { setKeywords(e.target.value) }} type="text" className="form-control form-control-lg form-control-a" placeholder="mot clé" />
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="form-group ">
                  <label className="pb-2" htmlFor="Type">Région</label>
                  <select onChange={(e) => {
                    const selectedOption = e.target.value
                    setRegion(selectedOption);

                  }} className="form-control form-control-lg form-control-a" id="Type">
                    {
                      regions.map((r, i) => {
                        return <option key={i} value={r.id}>{r.label}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-12 mt-5">
                <button type="submit" className="btn btn-b">Rechercher</button>
              </div>
            </div>
          </form>
        </div>
        <hr />
        <div className="row mt-5 mb-5">
          {
            searchResult.map((res, i) => {
              return (<PartnersSearchGridList key={i} data={res} />);
            })
          }

          <EvaluatePlatform />

        </div>
      </div>
      { /* ======= Footer ======= */}
      <Footer />

      { /* End Footer */}

    </div>

  );
}

export default SearchPage


