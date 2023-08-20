import { Link } from "react-router-dom";
import { localStorageService } from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";
export default function HedaerBloc() {
  const navigate = useNavigate();
  const loggedIn = localStorageService.getUserToken() ? true : false;

  function LogOut() {
    localStorageService.unsetUserCredentials()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
      <div className="container">
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a className="navbar-brand text-brand" href="#">Tourney<span className="color-b">platform</span></a>

        <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link" to={'/'}>Bienvenue</Link>
            </li>
            {
              loggedIn && (
                <li className="nav-item" onClick={LogOut}>
                  <Link className="nav-link" to={'/'}>logout</Link>
                </li>
              )
            }

            <li className="nav-item">
              {/* <a className="nav-link " href="contact.html">Devenir partnenaire </a> */}
              <Link className="nav-link" to={'/addPartenaire'}>Contact </Link>
            </li>
            <li className="nav-item">
              <Link to={'/profile'} className="nav-link ">Profile </Link>
            </li>
          </ul>
        </div>
        <Link className="nav-link" to={"/search"}>

          <button type="button" className="btn btn-b-n navbar-toggle-box navbar-toggle-box-collapse" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            <i className="bi bi-search"></i>
          </button>
        </Link>
      </div>
    </nav>
  );
}