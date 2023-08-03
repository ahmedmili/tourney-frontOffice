import React from 'react';
import { Link } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class ClientsPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            filter:'',
            clients : []
        }
       
    }


    initDAta(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token') );
        myHeaders.append("Content-Type", "application/json");
 
        var requestOptions = {
        method: 'GET',
        headers: myHeaders, 
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/clients/list", requestOptions)
        .then(response => response.json())
        .then(result =>{

            console.log(result);

             this.setState({
                 clients: result
             })
        })
        .catch(error => {
          localStorage.clear();
           this.props.history.push('/auth');
        });
    }

    checkUserAuth() {
        if (localStorage.getItem('token') == null) {
            this.props.history.push('/auth');
        }
    }


    deleteClient(id){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token') );
        myHeaders.append("Content-Type", "application/json");
 
        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders, 
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/clients/delete?id="+id, requestOptions)
        .then(response => response.json())
        .then(result =>{
            this.initDAta();
        }) 

    }


    componentDidMount() {
        this.checkUserAuth();
        this.initDAta();

    }

    render() {
        return (
            <div className="App">

                <HedaerBloc />


                <AsideMenu />

                { /* End Sidebar*/}

                <main id="main" className="main">
                    <div class="pagetitle">
                        <h1>Clients</h1>

                    </div>


                    <div class="pagetitle">
                        <div className='form-group'>
                            <input type="search" className='form-control' onChange={ (e)=>{ this.setState({ filter: e.target.value}) } } />
                        </div>
                    </div>
                    



                    <section class="section">
                        <div class="row">
                            <div class="col-lg-12">

                                <div class="card">
                                    <div class="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 class="card-title">Clients list</h5>

                                            <Link to={ '/clients/add' } className="btn btn-success add-btn" ><i className='bx bxs-plus-circle'></i> Ajouter un client</Link>
                                        </div>
                                        <p>this is list of our clients.</p>


                                        <div className="datatable table-responsive">
                                        <table className='table'>
                                            <tr>
                                                <th>#</th>
                                                <th>Nom prénom</th>
                                                <th>Email</th> 
                                                <th>Actions</th>
                                                
                                                
                                            </tr>

                                            <tbody>
                                                {
                                                    this.state.clients.filter( (c)=> 
                                                    (c.fullname.indexOf( this.state.filter ) != -1)
                                                    ||
                                                    (c.email.indexOf( this.state.filter ) != -1)
                                                    ).map( (c)=>{
                                                        return ( 
                                                        <tr>
                                                            <td>{ c.id }</td>
                                                            <td>{ c.fullname }</td>
                                                            <td>{ c.email }</td>
                                                            
                                                            <td>
                                                                <button className='btn btn-danger btn-sm' onClick={
                                                                      ()=>{
                                                                        this.deleteClient(c.id);
                                                                    }
                                                                }
                                                                
                                                                
                                                                >Supprimer</button>
                                                            </td>
                                                            
                                                        </tr> );
                                                    } )
                                                }
                                            </tbody>
                                        </table>
                                        </div>

 

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>


                </main>{ /* End #main */}

                { /* ======= Footer ======= */}
                <Footer />

                { /* End Footer */}

                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            </div>

        );
    }


}


