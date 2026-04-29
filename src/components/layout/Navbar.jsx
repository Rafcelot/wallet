
import { useState } from "react"

import "./nav-bar.scss"

export default function NavBar () {

    // estado que controla el menú abierto o cerrado
    const [isOpen, setIsOpen] = useState(false)

    // función para alterar el estado
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    console.log("menu", isOpen)

    return (
        <div className="navbar"> 

            <div className="navbar__top">
                <div className="navbar__discount-bar"><p>Envío gratis</p></div>
                <div className="navbar__logo">Arturo calle</div>

           
            </div>

     
           

            <ul className={`nav-links ${isOpen ? "active" : ""}`}>
                <button 
                    onClick={toggleMenu}
                    className="menu-toggle"
                >
                    ‹
                </button>
                <li>Inicio</li>
                <li>Servicios</li>
                <li>Inicio</li>
            </ul>

            
            <button
                className="menu-toggle"
                onClick={toggleMenu}
            >
                 ☰
            </button>


            {/* <button
                className={`menu-toggle ${isOpen ? "active" : ""}`}
                onClick={toggleMenu}
            >
                 ☰
            </button> */}



    


        </div>
    )    
}