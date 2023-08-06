import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer';
import HedaerBloc from '../../components/Header/Header';
import './add-partner.css'
import { useNavigate } from 'react-router-dom';
import { localStorageService } from '../../services/localStorageService'
import { userService } from '../../services/API/user';
import { toast } from 'react-toastify';
function AddNewPartnerPage() {
    const [name, setName] = useState('');
    const [logo_url, setLogo_url] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [region_id, setRegion_id] = useState('');
    const [errMSG, setErrMSG] = useState('');
    const [succMSG, setSuccMSG] = useState('');
    const [regions, setRegions] = useState([]);
    const Navigate = useNavigate();


    function checkUserAuth() {
        localStorageService.getUserToken() == '' && Navigate('/auth')
    }

    function iniData() {
        userService.getRegions().then(res => {
            setRegions(res.data)
        });

    }

    useEffect(() => {
        checkUserAuth();
        iniData();
    }, [])


    function addData() {
        var raw = JSON.stringify(
            {
                name: name,
                logo_url: logo_url,
                phone: phone,
                email: email,
                website: website,
                about: about,
                region_id: region_id,
            }
        );
        userService.addPartner(raw).then(res => {
            if (res.success === true) {
                setSuccMSG(res.message)
                setTimeout(() => {
                    Navigate('/')
                }, 2000);
                toast.success(res.message)
            } else {
                setErrMSG(res.message)
                toast.success(res.message)
            }
        })
    }
    return (
        <div className="App">
            <HedaerBloc />
            { /* End Sidebar*/}
            <main id="main" className="main">
                <div className="card">
                    <div className="card-body">
                        <h3>Add partenair demande </h3>
                        <form onSubmit={(e) => { e.preventDefault(); addData(); }} >
                            <div className="form-group mb-3">
                                <label htmlFor="">Nom</label>
                                <input type="text" className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Photo URL</label>
                                <input type="text" className='form-control' value={logo_url} onChange={(e) => { setLogo_url(e.target.value) }} />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="">email</label>
                                <input type="text" className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Télephone</label>
                                <input type="text" className='form-control' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Site web</label>
                                <input type="text" className='form-control' value={website} onChange={(e) => { setWebsite(e.target.value) }} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Région</label>
                                <select className='form-control' value={region_id} onChange={(e) => { setRegion_id(e.target.value) }} >

                                    {
                                        regions.map((r, index) => {
                                            return <option value={r.id_region} key={index}>{r.label}</option>
                                        })
                                    }

                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">A propos</label>
                                <textarea type="text" className='form-control' value={about} onChange={(e) => { setAbout(e.target.value) }} ></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <button type='submit' className='btn btn-success' disabled={name === '' || logo_url === '' || email === '' || phone === '' || website === '' || about === ''}>Ajouter</button>
                            </div>
                            {
                                errMSG !== '' ?
                                    <div className='alert alert-danger'>{errMSG}</div>
                                    :
                                    <div></div>
                            }
                            {
                                succMSG !== '' ?
                                    <div className='alert alert-success'>{succMSG}</div>
                                    :
                                    <div></div>
                            }
                        </form>
                    </div>
                </div>

            </main>
            { /* End #main */}
            { /* ======= Footer ======= */}
            <Footer />
            { /* End Footer */}
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </div>

    )
}
export default AddNewPartnerPage



