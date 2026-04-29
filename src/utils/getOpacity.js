

export const getOpacity = (offset, item) => {

  // 🔴 antes de aparecer
  if (offset <= item.fadeInStart) return 0


  // 🟢 fade in
  if (offset > item.fadeInStart && offset <= item.fadeInEnd) {
    return (offset - item.fadeInStart) / (item.fadeInEnd - item.fadeInStart)
  }


  // 🟡 visible
  if (offset > item.fadeInEnd && offset < item.fadeOutStart) {
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