

// [HOOK-01] Responsive Breakpoint Hook
import { useEffect, useState } from "react"

export function useBreakpoint() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 905)


  useEffect(() => {

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 905)

    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [])

  return { isDesktop }
}





