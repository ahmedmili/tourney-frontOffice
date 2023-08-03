import { Link } from "react-router-dom";
import NavBar from "./Navbar";

export default function HedaerBloc(){
  // const location = 
  function LogOut(){
    localStorage.removeItem('token')
    // useLocation = 'http://localhost:3000/auth'
    window.location.reload(false)
    // Window.location.href = 'http://localhost:3000/auth'
    
  } 
    return (
      <nav class="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
      <div class="container">
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a class="navbar-brand text-brand" href="index.html">Tourney<span class="color-b">platform</span></a>
  
        <div class="navbar-collapse collapse justify-content-center" id="navbarDefault">
          <ul class="navbar-nav">
  
            <li class="nav-item">
              <Link class="nav-link"  to={ '/' }>Bienvenue</Link>
            </li>
  
                
          
            <li class="nav-item" onClick={LogOut}>
               <Link class="nav-link"  to={ '/' }>logout</Link>
            </li>
            <li class="nav-item">
              {/* <a class="nav-link " href="contact.html">Devenir partnenaire </a> */}
              <Link class="nav-link"  to={ '/addPartenaire' }>Devenir partnenaire </Link>
            </li>

            <li class="nav-item">
              <Link to={ '/auth' } class="nav-link ">Profile </Link>
            </li>

            


          </ul>
        </div>
  
        <button type="button" class="btn btn-b-n navbar-toggle-box navbar-toggle-box-collapse" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
          <i class="bi bi-search"></i>
        </button>
  
      </div>
    </nav>
    );
}