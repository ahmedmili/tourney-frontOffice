import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup'; // Import Yup
import HedaerBloc from '../../components/Header/Header';
import Footer from '../../components/footer/footer';
import { userService } from '../../services/API/user';
import { localStorageService } from '../../services/localStorageService';
import './add-partner.css';
import { useTranslation } from 'react-i18next';

function AddNewPartnerPage() {
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [region_id, setRegion_id] = useState('');
    const [errMSG, setErrMSG] = useState('');
    const [succMSG, setSuccMSG] = useState('');
    const [errors, setErrors] = useState({});

    const [regions, setRegions] = useState([]);
    const Navigate = useNavigate();
    const { t } = useTranslation()
    const [previewImage, setPreviewImage] = useState(null);

    function checkUserAuth() {
        localStorageService.getUserToken() === '' && Navigate('/auth')
    }
    //upload file
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file)); // Create temporary URL for preview

    };


    function iniData() {
        userService.getRegions().then(res => {
            setRegions(res.data)
        });

    }

    useEffect(() => {
        checkUserAuth();
        iniData();
    }, [])

    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }
    }


    async function addData() {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('website', website);
        // formData.append('map', map);
        formData.append('about', about);
        formData.append('region_id', region_id);

        userService.addPartner(formData).then(res => {
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

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(`${'yup.nom.required'}`),
        email: Yup.string().email(`${t('yup.email.invalide')}`).required(`${t('yup.email.required')}`),
        phone: Yup.string().required(`${t('yup.phone.required')}`),
        website: Yup.string().required(`${t('yup.web.required')}`),
        about: Yup.string().required(`${t('yup.propos.required')}`),
        region_id: Yup.string().required(`${t('yup.region.required')}`),
        selectedFile: Yup.mixed().required(`${t('yup.photo.required')}`),
    });

    const handleBlur = async (e) => {
        const { name, value } = e.target;
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setErrors({

            });
            setErrMSG('')
        } catch (error) {
            console.log(error.message)
            toast.error(error)
            setErrMSG(error.message)
            setErrors({
                ...errors,
                [name]: error.message,
            });
        }
    };
    const hasErrors = Object.values(errors).some((error) => error !== null);

    return (
        <div className="App">
            <HedaerBloc />
            { /* End Sidebar*/}
            <main id="main" className="main">
                <div className="card">
                    <div className="card-body">
                        <h3>{t('partnair.add')} </h3>
                        <form onSubmit={(e) => { e.preventDefault(); addData(); }} >
                            <div className="form-group mb-3">
                                <label htmlFor="">{t('Nom')}</label>
                                <input onBlur={handleBlur} type="text" className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">{t('PhotoURL')}</label>
                                <input onBlur={handleBlur} type="file" className='form-control' onChange={handleFileChange} />
                            </div>
                            <div className="form-group mb-3">
                                <img src={previewImage} alt="upload image" />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="">{t('email')}</label>
                                <input onBlur={handleBlur} type="text" className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">{t('phone')}</label>
                                <input onBlur={handleBlur} type="text" className='form-control' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">{t('webSite')}</label>
                                <input onBlur={handleBlur} type="text" className='form-control' value={website} onChange={(e) => { setWebsite(e.target.value) }} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">{t('region')}</label>
                                <select className='form-control' value={region_id} onChange={(e) => { setRegion_id(e.target.value) }} >

                                    {
                                        regions.map((r, index) => {
                                            return <option value={r.id_region} key={index}>{r.label}</option>
                                        })
                                    }

                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">{t('aProps')}</label>
                                <textarea type="text" className='form-control' value={about} onChange={(e) => { setAbout(e.target.value) }} ></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <button type='submit' className='btn btn-success' disabled={name === '' || selectedFile === null || email === '' || phone === '' || website === '' || about === ''}>Ajouter</button>
                            </div>
                            {
                                errMSG !== '' && <div className='alert alert-danger'>{errMSG}</div>


                            }
                            {
                                succMSG !== '' && <div className='alert alert-success'>{succMSG}</div>
                            }
                        </form>
                    </div>
                </div>

            </main>
            { /* End #main */}
            <Footer />
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </div>

    )
}
export default AddNewPartnerPage



