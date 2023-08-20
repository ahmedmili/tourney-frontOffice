
// import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/home/Home';
import AuthPage from './pages/Auth/Auth';

import CreateAccountPage from './pages/create-account/create-account';
import SearchPage from './pages/search-page/search-page';
import PartnersDetailsPage from './pages/searvice-details-page/searvice-details-page';
import ProfilePage from './pages/Profile/Profile';
import AddPartnairePage from './pages/add-partner/add-partner';


export default function App() {
  return (
    <div >
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={'/search'} element={<SearchPage />} />
          <Route path={'/addPartenaire'} element={<AddPartnairePage />} />
          <Route path={'/partners/:id'} element={<PartnersDetailsPage />} />
          <Route path={'/profile'} element={<ProfilePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}


