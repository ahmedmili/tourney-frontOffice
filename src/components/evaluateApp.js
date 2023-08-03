import React from 'react';

export default class EvaluatePlatform extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        stars : [],
        none : [1,2,3,4,5,6],
        thankYou: false
        
    }
  }

  render() {
    return (
      <div className='container' >
          <h3>évaluer notre platform</h3>
          <p className='text-muted'>donnez-nous un avis rapide afin d'améliorer nos système</p>

{
    this.state.thankYou === false ?
    <div>
          {
              this.state.stars.map(()=>{
                return <i class="bi bi-star-fill"></i>
              })

              
          }
        
            {
              this.state.none.map((d)=>{
                return <i class="bi bi-star" onClick={(   )=>{
                    
                    let tmp = [];
                    let tmpNone = this.state.none;


                    for (let i = 0; i < d; i++) {
                        tmp.push( (i+1) ); 
                        tmpNone.pop();
                    }

                    this.setState({stars:tmp});
                    this.setState({none:tmpNone});


                    setTimeout(() => {
                        this.setState({thankYou : true})
                    }, 2000);
                    

                } }></i>
              })

              
          }
    </div>
    :
    <div>
        <div className="alert alert-success">
            Merci d'avoir examiné notre système
        </div>
    </div>
}

        
      </div>

    );
  }


}


