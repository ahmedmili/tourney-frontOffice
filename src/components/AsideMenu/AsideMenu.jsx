import { Link } from "react-router-dom";

export default function AsideMenu(){
    return   <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

    <li className="nav-item">
        <a className="nav-link collapsed" href="index.html">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li> 
      

      <li className="nav-item">
        <Link className="nav-link collapsed" to={ '/clients' }>
          <i className="bi bi-grid"></i>
          <span>Clients</span>
        </Link>
      </li> 
      
 

    </ul>

  </aside>;
  
}