import './details.scss'

import { getOpacity } from '../../../utils/getOpacity'

import { detailsOpacityData } from '../../../data/textData'





export default function Details ({
    scrollOffset
}) {

    const opacityData = detailsOpacityData
    const opacity = getOpacity(scrollOffset, opacityData)
   

    return (
        <>
            <section 
                className="details"
                style={{
                    opacity: opacity,
                }}
            >
                <p className='details__title'>The details</p>
                
                <div className='details__grid'>
                    
                    <div className='details__text-left'>
                        <p className='details__principal-text'>Tarjetero Pop-Up</p>
                        <p className='details__secondary-text'>Para 7 tarjetas</p>
                    </div>

                    <div className='details__text-right  '>
                        <p className='details__principal-text'>100% cuero</p>
                        <p className='details__secondary-text'>Suave al tacto.</p>
                    </div>

                    <div className='details__text-left details__text-left--down' >
                        <p className='details__principal-text'>Bolsillo para billetes</p>
                        <p className='details__secondary-text'>Para 10+ billetes</p>
                    </div>
             

                    <div className='details__text-right details__text-right--down'>
                        <p className='details__principal-text'>2 Ranuras para Tarjetas</p>
                        <p className='details__secondary-text'>Para 1-3 tarjetas</p>
                    </div>


                    
                    {/* <div className='prueba__11 a'></div>
                    <div className='prueba__22 a'></div>
                    <div className='prueba__33 a'></div>
                    <div className='prueba__44 a'></div>
                    <div className='prueba__55 a'></div>
                    <div className='prueba__66 a'></div>
                    <div className='prueba__66 a'></div> */}
                    

                    
                </div>
            </section>
        </>

    )
}