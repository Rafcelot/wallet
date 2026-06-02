// idea hacer un getopacity solo para productHero que es el primero 
// preguntar porque tengo que usar visibility yno display hidden

export const getOpacity = (offset, item) => {

  // 🔴 antes de aparecer
  if (offset <= item.fadeInStart) return 0


  // 🟢 fade in
  if (offset > item.fadeInStart && offset <= item.fadeInEnd) {
    return (offset - item.fadeInStart) / (item.fadeInEnd - item.fadeInStart)
  }


  // 🟡 visible
  if (offset > item.visibleStart && offset < item.visibleEnd) {
    return 1
  }


  // 🔵 fade out
  if (offset >= item.fadeOutStart && offset < item.fadeOutEnd) {
    return 1 - (
      (offset - item.fadeOutStart) /
      (item.fadeOutEnd - item.fadeOutStart)
    )
  }


  // ⚫ después
  return 0
}

export const getOpacityPopUp = (offset) => {
  if (offset <= 0.82) return 0

  // fade in
  if ( offset >= 0.82 && offset <= 0.85) {
    return (offset - 0.82) / (0.85 - 0.82)
  }
}


export const getOpacityProductHero = (offset) => {
  
  //visible
  if (offset < 0.2 ) {
    return 1
  }

  //fade out
  if (offset >= 0.2 && offset < 0.4) {
    return 1 - (
      (offset - 0.2) /
      (0.4 - 0.2)
    )
  }

  // hidden
  return 0 
}


