




export const textData = [
    {
        id: 'alphine',  

        fadeInStart: 0,
        fadeInEnd: 0,

        visibleStart:0,
        visibleEnd: 0,

        fadeOutStart: 0.1,
        fadeOutEnd: 0.15,

        text: 'Alphine',
        className: 'alphine-text',
    },


]


export const layoutConfig = {
  mobile: {
    model: {
      position: [-0.7, -2.3, 0],
      // scale: [0.4, 0.4, 0.4],
      rotation: [0, Math.PI / 6, 0],
    },
    text: {
      alphine: {
        top: '30%',
        left: 'calc(50% + 50px)'
      }
    },
  },

  desktop: {
    model: {
      position: [-2, -2.2, 0],
      // scale: [0.45, 0.45, 0.45],
      rotation: [0, Math.PI / 5.5, 0],
    },
    text: {
      alphine: {
        top: '30%',
        left: 'calc(50% + 50px)'
      }
    },
  },
}