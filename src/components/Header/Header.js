import React from 'react';

const Header = (props) => {
    return (
        <div className="col-12 col-sm-2 col-md-2 col-lg-2">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="navbar-brand" href="/">React-App</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/clientes">Clientes</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>        
    )
}

export default Header;