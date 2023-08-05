import { Link } from "react-router-dom";

export default function PartnersSearchGridList(props){
        return(
            <div class="col-md-4 mb-3">
            <div class="card-box-b card-shadow news-box">
              <div class="img-box-b">
                <img src={ props.data.logo_url } alt="" class="img-b img-fluid"/>
              </div>
              <div class="card-overlay">
                <div class="card-header-b">
                  <div class="card-category-b">
                    <a href="#" class="category-b">{props.data.label}</a>
                  </div>
                  <div class="card-title-b">
                    <h2 class="title-2">
                        
                      <Link to={ '/partners/'+props.data.id }>{props.data.name}</Link>
                    </h2>
                  </div>
                  <div class="card-date">
                    <span class="date-b">voir plus de details...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
              

        );
}