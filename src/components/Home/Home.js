import React from 'react';
import Header from '../../components/Header/Header';
import Aux from '../../hoc/Aux';

const Home = (props) => (
    <Aux>
        <div className="jumbotron">
            <h1 className="display-4">Bienvenido a ABM!</h1>
            <p className="lead">Esta es una aplicación desarrollada con React y Json-Server.</p>
            <hr className="my-4" />
            <p></p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="/clientes" role="button">Saber más</a>
            </p>
        </div>
    </Aux>
)


export default Home;