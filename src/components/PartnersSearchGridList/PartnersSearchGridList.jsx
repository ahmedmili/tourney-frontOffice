import { t } from "i18next";
import { Link } from "react-router-dom";

export default function PartnersSearchGridList(props) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card-box-b card-shadow news-box">
        <div className="img-box-b">
          <img src={process.env.REACT_APP_IMAGE_BASE_URL + props.data.logo_url} alt="partnair image" className="img-b img-fluid" />
        </div>
        <div className="card-overlay">
          <div className="card-header-b">
            <div className="card-category-b">
              <a href="#" className="category-b">{props.data.label}</a>
            </div>
            <div className="card-title-b">
              <h2 className="title-2">

                <Link to={'/partners/' + props.data.id}>{props.data.name}</Link>
              </h2>
            </div>
            <div className="card-date">
              <span className="date-b">{t('partnair.search.details')}...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}