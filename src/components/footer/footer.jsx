import { useTranslation } from "react-i18next";

export default function Footer(){
   const {t} = useTranslation()
   return(

    <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <nav className="nav-footer">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#">{t('Home')}</a>
              </li>
              <li className="list-inline-item">
                <a href="#">{t('About')}</a>
              </li>
              <li className="list-inline-item">
                <a href="#">{t('Property')}</a>
              </li>
              <li className="list-inline-item">
                <a href="#">{t('Blog')}</a>
              </li>
              <li className="list-inline-item">
                <a href="#">{t('Contact')}</a>
              </li>
            </ul>
          </nav>
          <div className="socials-a">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#">
                  <i className="bi bi-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="bi bi-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="bi bi-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="bi bi-linkedin" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="copyright-footer">
            <p className="copyright color-text-a">
              &copy; {t('Copyright')}
              <span className="color-a">tourney</span> {t('AllRightsReserved')}.
            </p>
          
          
          </div>
        </div>
      </div>
    </div>
  </footer>
   );
}