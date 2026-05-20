




export const sectionOpacityData = 
  {
    id: 'product-hero',

    fadeInStart: 0,
    fadeInEnd: 0,

    visibleStart:0.01,
    visibleEnd: 0.2,
    

    fadeOutStart: 0.21,
    fadeOutEnd: 0.4,
  }


  export const textData = [
    {
        id: 'alphine',  

        fadeInStart: 0.01,
        fadeInEnd: 0.02,

        visibleStart:0.1,
        visibleEnd: 0.5,

        fadeOutStart: 0.1,
        fadeOutEnd: 0.15,

        text: 'Alphine',
        className: ' pruebauno ',
    },


]




export const layoutConfig = {
  mobile: {
    model: {
      position: [-1.1, -2.3, 0],
      scale: [0.4, 0.4, 0.4],
      rotation: [0, Math.PI / 6, 0],
    },
    text: {
      alphine: {
        top: '85%',
        left: 'calc(50% + 50px)'
      }
    },

    animations: {
      zoomOut: -7,
      zoomIn: 4,
      moveLeft: -1.4,
      rotationLeft: Math.PI / 2,
      rotationRight: Math.PI / 1.5,

    }
  },

  desktop: {
    model: {
      position: [-2, -2.2, 0],
      scale: [0.4, 0.4, 0.4],
      rotation: [0, Math.PI / 5, 0],
    },
    text: {
      alphine: {
        top: '30%',
        left: 'calc(50% + 100px)'
      }
    },

    animations: {
      zoomOut: -6,
      zoomIn: 4,
      moveLeft: -0.5,
      rotationLeft: Math.PI / 2,
      rotationRight: Math.PI / 2,
    }
  },
}