import React from 'react';
import Header from '../components/Header/Header';

const Aux = (props) => {
    return(
        <div className="row" >
            <Header />

            <div className="col-12 col-sm-10 col-md-10 col-lg-10">
                {props.children}
            </div>
        </div>
    )
}

export default Aux;