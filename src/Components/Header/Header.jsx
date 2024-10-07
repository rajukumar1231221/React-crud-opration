import React from 'react'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>
                Navbar
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                    <li>
                    <Link className="nav-link active" aria-current="page" to={"User-data"}>
                             User-Data
                        </Link>
                    </li>
                     <li>
                    <Link className="nav-link active" aria-current="page" to={"create_user"}>
                            Add New users
                        </Link>
                    </li>
                </ul>
               <span style={{marginRight:"20px",fontSize:"30px",fontWeight:"600"}}>Assignment</span>
            </div>
        </div>
    </nav>

</div>
  )
}
