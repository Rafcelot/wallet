import { useState } from "react"

import "./nav-bar.scss"

import CartIcon from "@/components/ui/icons/CartIcon/CartIcon.jsx"
import ArrowDownIcon from "../../ui/icons/ArrowDownIcon/ArrowDownIcon"
import DiscountBar from "./discount-bar/DiscountBar"

import LogoIcon from "../../ui/icons/logo-icon/LogoIcon"
import SearchIcon from "../../ui/icons/search-icon/SearchIcon"
import LoginIcon from "../../ui/icons/login-icon/LoginIcon"
import HamburguerIcon from "../../ui/icons/hamburguer-icon/HamburguerIcon"






export default function NavBar() {

    // ---------------------------
    // [STATE]
    // ---------------------------

    const [isOpen, setIsOpen] = useState(false)

    const [openItem, setOpenItem] = useState({})





    // ---------------------------
    // [FUNCTIONS]
    // ---------------------------

    const toggleMenu = () => {
        setIsOpen(prev => !prev)
    }


    // ---------------------------
    // [STATE-01] TOGGLE BY KEY (OBJECT STATE)
    // ---------------------------
    const toggleItem = (key) => {

        setOpenItem(prev => ({

            ...prev,

            [key]: !prev[key]

        }))
    }





    // ---------------------------
    // [JSX]
    // ---------------------------

    return (

        <header className="navbar">

            {/* DISCOUNT BAR */}
            <DiscountBar />





            {/* MAIN NAVBAR */}
            <div className="navbar__main">

                {/* HAMBURGER BUTTON */}
                <button
                    className="navbar__toggle"
                    onClick={toggleMenu}
                >
                    <HamburguerIcon className="icon__hamburguer" />
                </button>





                {/* DESKTOP LINKS */}
                <ul className="navbar__links-desktop">

                    {/* HOMBRE */}
                    <li className="navbar__item">

                        <a className="navbar__link">

                            <span>HOMBRE</span>

                            <ArrowDownIcon />

                        </a>

                        <div className="navbar__dropdown">
                            <ul>
                                <li>Ropa</li>
                                <li>Accesorios</li>
                            </ul>
                        </div>

                    </li>





                    {/* MUJER */}
                    <li className="navbar__item">

                        <a className="navbar__link">

                            <span>MUJER</span>

                            <ArrowDownIcon />

                        </a>

                        <div className="navbar__dropdown">
                            <ul>
                                <li>Ropa</li>
                                <li>Accesorios</li>
                            </ul>
                        </div>

                    </li>





                    {/* OFERTAS */}
                    <li className="navbar__item">

                        <a href="" className="navbar__link navbar__oferta">
                            OFERTAS
                        </a>

                    </li>

                </ul>





                {/* LOGO */}                
                <LogoIcon className="icon__logo" />
              





                {/* ACTIONS */}
                <div className="navbar__actions">

                    <a href="#" className="navbar__links-secondary">
                        TIENDAS
                    </a>

                    <a href="#" className="navbar__icons navbar__links-secondary">
                        <SearchIcon className="icon__search" />
                    </a>

                    <a href="#" className="navbar__icons navbar__links-secondary">
                        <LoginIcon className="icon__login" />
                    </a>

                    <a href="#" className="navbar__icons">
                        <CartIcon className="icon__cart" />
                    </a>

                </div>

            </div>





            {/* MOBILE MENU */}
            <nav className={`navbar__menu ${isOpen ? "active" : ""}`}>

                {/* CLOSE BUTTON */}
                <button
                    className="navbar__close"
                    onClick={toggleMenu}
                >
                    ‹
                </button>





                {/* MOBILE LINKS */}
                <ul className="navbar__links-movil">

                    {/* HOMBRE */}
                    <li className="navbar__item">

                        {/* LEVEL 1 */}
                        <button
                            className="navbar__link"
                            onClick={() => toggleItem("hombre")}
                        >

                            <span>HOMBRE</span>

                            <ArrowDownIcon />

                        </button>





                        {/* DROPDOWN */}
                        <div className={`navbar__dropdown ${openItem["hombre"] ? "active" : ""}`}>

                            <ul>

                                <li>

                                    {/* LEVEL 2 */}
                                    <button
                                        className="navbar__link"
                                        onClick={() => toggleItem("hombre-botas")}
                                    >

                                        <span>Botas</span>

                                        <ArrowDownIcon />

                                    </button>





                                    {/* LEVEL 2 DROPDOWN */}
                                    <div className={`navbar__dropdown ${openItem["hombre-botas"] ? "active" : ""}`}>

                                        <span></span>

                                    </div>

                                </li>

                            </ul>

                        </div>

                    </li>





                    {/* MUJER */}
                    <li className="navbar__item">

                        {/* LEVEL 1 */}
                        <button
                            className="navbar__link"
                            onClick={() => toggleItem("mujer")}
                        >

                            <span>MUJER</span>

                            <ArrowDownIcon />

                        </button>





                        {/* DROPDOWN */}
                        <div className={`navbar__dropdown ${openItem["mujer"] ? "active" : ""}`}>

                            <ul>

                                <li>

                                    {/* LEVEL 2 */}
                                    <button
                                        className="navbar__link"
                                        onClick={() => toggleItem("mujer-botas")}
                                    >

                                        <span>Botas</span>

                                        <ArrowDownIcon />

                                    </button>





                                    {/* LEVEL 2 DROPDOWN */}
                                    <div className={`navbar__dropdown ${openItem["mujer-botas"] ? "active" : ""}`}>

                                        <span></span>

                                    </div>

                                </li>

                            </ul>

                        </div>

                    </li>

                </ul>

            </nav>

        </header>
    )
}









