import './product-pop-up.scss'

import CheckIcon from "../../ui/icons/check-icon/CheckIcon.jsx"

// import { popUpOpacityData } from '../../../data/textData.js'

import { getOpacityPopUp } from '../../../utils/getOpacity.js'

export default function ProductPopUp ({scrollOffset}) {
  
    const opacity = getOpacityPopUp(scrollOffset)
    // console.log("opacity", opacity)
    // console.log(scrollOffset)

    return (
        <>  
       

            <section 
                className='product-pop-up'
                style={{
                    opacity: opacity
                }}
                >   

                <div className='product-pop-up__container'>

                    <div className='product-pop-up__layout'>
                        <div className='product-pop-up__intro'>
                            <p className='product-pop-up__title'>Acceso a tarjetas sin esfuerzo </p>
                            <p className='product-pop-up__text-title'>Una simple pulsación de un botón revela sus tarjetas 
                                más utilizadas, poniendo un acceso rápido al alcance 
                                de su mano
                            </p>
                        </div>

                        <div className='product-pop-up__details'>
                            <div className='product-pop-up__detail'>
                                <CheckIcon />
                                <p>Estuche metálico pop-up para acceso rápido.</p>
                            </div>
                            <div className='product-pop-up__detail'>
                                <CheckIcon />
                                <p>Protección antiescaneo para tus tarjetas.</p>
                            </div>
                            <div className='product-pop-up__detail'>
                                <CheckIcon />
                                <p>Cuerpo metálico en aluminio de alta resistencia.</p>
                            </div>
                        </div>
                    </div>


                </div>



            </section>

       

        </>
    )
}