

import { getOpacity } from '../../utils/getOpacity'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { layoutConfig } from '../../data/textData'

export default function TextOverlay({ scrollOffset, textData }) {

    const { isDesktop } = useBreakpoint()
    
  
    const currentLayout = isDesktop
      ? layoutConfig.desktop
      : layoutConfig.mobile

    
  

  return (

    <div className='text-overlay'>
      
      {textData.map((item) => {

        const opacity = getOpacity(scrollOffset, item)

        const position = currentLayout.text[item.id];
 


        return (
          <div
            key={item.id}
            className={item.className}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              opacity: opacity,
              pointerEvents: 'none'
            }}
          >
            <p>{item.text}</p>
          </div>
        )
      })}

    </div>

  )
}