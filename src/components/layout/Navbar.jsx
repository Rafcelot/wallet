
import { useState } from "react"

import "./nav-bar.scss"

export default function NavBar () {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <header className="navbar">

            <div className="navbar__discount-bar">
                <p>Envío gratis</p>
            </div>

            <div className="navbar__main">

                {/* BOTÓN HAMBURGUESA */}
                <button
                    className="navbar__toggle"
                    onClick={toggleMenu}
                >
                    ☰
                </button>

                {/* 👇 LINKS DESKTOP */}
                <ul className="navbar__links-desktop">
                    <li>Inicio</li>
                    <li>Servicios</li>
                    <li>Contacto</li>
                </ul>

                {/* LOGO */}
                <div className="navbar__logo">
                    Arturo Calle
                </div>

          

                {/* ACCIONES */}
                <div className="navbar__actions">
                    <ul className="navbar__links-secondary">
                        <li>Tiendas</li>
                        <li>Search</li>
                    </ul>

                    <div className="navbar__cart">
                        Carrito
                    </div>
                </div>

            </div>

            {/* MENÚ DESPLEGABLE */}
            <nav className={`navbar__menu ${isOpen ? "active" : ""}`}>

                <button
                    className="navbar__close"
                    onClick={toggleMenu}
                >
                    ‹
                </button>

                <ul className="navbar__links">
                    <li>Inicio</li>
                    <li>Servicios</li>
                    <li>Contacto</li>
                </ul>

            </nav>

        </header>
    )
}









// import { useState } from "react"

// import "./nav-bar.scss"

// export default function NavBar () {

//     // estado que controla el menú abierto o cerrado
//     const [isOpen, setIsOpen] = useState(false)

//     // función para alterar el estado
//     const toggleMenu = () => {
//         setIsOpen(!isOpen)
//     }

//     console.log("menu", isOpen)

//     return (
//         <div className="navbar">        

//             <div className="navbar__discount-bar">
//                 <p>Envío gratis</p>
//             </div>


//             <div className="navbar__main">

//                 {/* BOTÓN HAMBURGUESA */}
//                 <button
//                     className="menu-toggle"
//                     onClick={toggleMenu}
//                 >
//                     ☰
//                 </button>


//                 {/* LOGO */}
//                 <div className="navbar__logo">
//                     Arturo Calle
//                 </div>    


//                 <ul className={`nav-links ${isOpen ? "active" : ""}`}>
//                     <button 
//                         onClick={toggleMenu}
//                         className="menu-toggle"
//                     >
//                         ‹
//                     </button>
//                         <li>Inicio</li>
//                         <li>Servicios</li>
//                         <li>Inicio</li>
//                 </ul>
                    
           

              

//                 <div className="navbar__actions">
//                     <ul className="p">
//                         <li>tiendas</li>
//                         <li>searh</li>
//                     </ul>
//                     <div className="navbar__cart">carrito</div>
//                 </div>


//             </div>
                   

  

        


      


    


//         </div>
//     )    
// }