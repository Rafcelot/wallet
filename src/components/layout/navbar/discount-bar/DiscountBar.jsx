import { useEffect, useState } from "react"

import "./discount-bar.scss"

export default function DiscountBar() {

    // ---------------------------
    // [DATA] DISCOUNT MESSAGES
    // ---------------------------
    const discountMessages = [
        {
            text: "ENVÍO GRATIS POR COMPRAS MAYORES DE $300.000",
            linkText: "DETALLES",
            link: "/shipping-details"
        },

        {
            text: "PAGA A 6 CUOTAS CON ADDI"
        }
    ]



    // ---------------------------
    // [STATE] CURRENT MESSAGE INDEX
    // ---------------------------
    const [currentIndex, setCurrentIndex] = useState(0)



    // ---------------------------
    // [EFFECT-01] Automatic text rotation
    // ---------------------------
    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentIndex((prevIndex) =>

                // Cambia al siguiente texto
                // y vuelve al inicio al llegar al final
                (prevIndex + 1) % discountMessages.length
            )

        }, 3000) // Cambia cada 3 segundos



        // Limpia el intervalo al desmontar
        return () => clearInterval(interval)

    }, [])

     // ---------------------------
    // [CURRENT MESSAGE]
    // ---------------------------
    const currentMessage = discountMessages[currentIndex]



    return (

        <div className="navbar__discount-bar">

            <p 
                key={currentIndex} // Esto permite que la animacion funcione. 
                className="navbar__discount-text"
            >
                
                {currentMessage.text}


                {
                    currentMessage.linkText && (

                        <a
                            href={currentMessage.link}
                            className="navbar__discount-link"
                        >

                            {currentMessage.linkText}

                        </a>
                    )
                }


            </p>

        </div>

    )
}


