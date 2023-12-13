import React, { useState } from 'react';

function EvaluatePlatform() {

  const [state, setState] = useState(
    {
      stars: [],
      none: [1, 2, 3, 4, 5, 6],
      thankYou: false
    }
  )

  return (
    <div className='container' >
      <h3>évaluer notre platform</h3>
      <p className='text-muted'>donnez-nous un avis rapide afin d'améliorer nos système</p>

      {
        this.state.thankYou === false ?
          <div>
            {
              state.stars.map(() => {
                return <i className="bi bi-star-fill"></i>
              })
            }

            {
              state.none.map((d) => {
                return <i className="bi bi-star" onClick={() => {

                  let tmp = [];
                  let tmpNone = this.state.none;


                  for (let i = 0; i < d; i++) {
                    tmp.push((i + 1));
                    tmpNone.pop();
                  }

                  setState({ ...state, stars: tmp, none: tmpNone, thankYou: true });

                }}></i>
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

export default EvaluatePlatform

