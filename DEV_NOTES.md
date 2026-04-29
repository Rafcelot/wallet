# DEV NOTES

## 📌 Project Context

Este proyecto utiliza **React Three Fiber** junto con **ScrollControls** para manejar animaciones 3D basadas en scroll y mostrar contenido dinámico en pantalla.

---

## 🧠 Fixed UI Text vs Scroll HTML

### Problema

Inicialmente los textos dinámicos (`currentText`) estaban dentro de `<Scroll html>`, lo que causaba que se desplazaran junto con el scroll.

```jsx
<Scroll html>
  <div>
    {currentText && <h1>{currentText.text}</h1>}
  </div>
</Scroll>
```

#### ❌ Comportamiento no deseado:

* El texto se mueve con el scroll
* No funciona como overlay
* Pierde estabilidad visual

---

### ✅ Solución

Se movió el renderizado del texto fuera de `<Scroll html>`:

```jsx
{currentText && (
  <div className={currentText.className}>
    <h1>{currentText.text}</h1>
  </div>
)}
```

---

### 🎯 Resultado

* El texto ahora es **estático en pantalla**
* Aparece y desaparece según el estado (`activeText`)
* No depende del scroll visual
* Se comporta como una capa de UI (overlay)

---

### 🧠 Concepto Clave

| Ubicación           | Comportamiento              |
| ------------------- | --------------------------- |
| `<Scroll html>`     | Se mueve con el scroll      |
| Fuera de `<Scroll>` | Permanece fijo (overlay UI) |

---

### 🧩 Decisión de Arquitectura

Los textos dinámicos NO forman parte del contenido del scroll.

Se manejan como:
→ **UI overlay controlado por estado**

---

## 🔄 Flujo de datos

```jsx
export default function App() {

  const [activeText, setActiveText] = useState(null)

  const currentText = activeText

  return (
    <>
      {currentText && (
        <div className={currentText.className}>
          <h1>{currentText.text}</h1>
        </div>
      )}

      <Canvas>
        <ScrollControls pages={5}>

          {/* 3D */}
          <Experience setActiveText={setActiveText} />

          {/* HTML que sí hace scroll */}
          <Scroll html>
            <div className="scroll-container">
              <Sections />
            </div>
          </Scroll>

        </ScrollControls>
      </Canvas>
    </>
  )
}
```

---

### 🔁 Explicación del flujo

1. `Experience` detecta el scroll (`useScroll`)
2. Según el rango, decide qué texto debe estar activo
3. Llama a `setActiveText(...)`
4. `App` recibe ese estado
5. Se renderiza el texto como overlay fijo

---

## 🧠 Patrón aplicado

### Separación de responsabilidades

| Componente   | Responsabilidad                  |
| ------------ | -------------------------------- |
| `Experience` | Lógica de scroll y animaciones   |
| `App`        | Render de UI (texto en pantalla) |
| `Scroll`     | Contenido que se desplaza        |

---

## ⚠️ Problema evitado

Si el texto permanecía dentro de `<Scroll html>`:

* Se generaban saltos de layout
* Aparecía scroll interno inesperado
* Mala experiencia visual

---

## 💡 Insight clave

Este cambio convierte el texto en un **HUD (Heads-Up Display)**, similar a interfaces en videojuegos:

* No pertenece al mundo 3D
* Está por encima de todo
* Se controla por estado, no por posición

---

## 🚀 Posibles mejoras futuras

* Animar la entrada/salida del texto (fade, translate, etc.)
* Usar `framer-motion` para transiciones más suaves
* Manejar múltiples capas de UI (ej: indicadores, botones, etc.)

---



# Text system

## Opacity System

Se utiliza `useState` para almacenar el valor del scroll y permitir que React actualice el DOM:

```jsx
export default function App() {
  const [scrollOffset, setScrollOffset] = useState(0)
}
```

# [SYS-01] OPTIMIZACIÓN RE-RENDER

Se usa un **throttle manual** para evitar actualizar el estado en cada frame y reducir la cantidad de re-renders.

```jsx
const lastOffset = useRef(0)

useFrame(() => {
  const offset = scroll.offset

  if (Math.abs(offset - lastOffset.current) > 0.01) {
    lastOffset.current = offset
    setScrollOffset(offset)
  }
})

```


---

# Active texts

Se utilizaba `useState` para mostrar **un solo texto activo** según el scroll.


```jsx
export default function App() {
const [activeText, setActiveText] = useState(null)
}
```

leemos la data de los textos los cuales tiene un min y max que sera el rango donde aparecen los textos. 

```jsx
export default function Experience({ setActiveText, setScrollOffset}) {

  useFrame(() => {
    
    const offset = scroll.offset
   
    const active = textData.find(
      (item) => offset > item.min && offset < item.max
    ) || null

    if (lastText.current !== active?.id) {
      lastText.current = active?.id
      setActiveText(active)
    }
  })
}
```


---


# [ANIM-01] Smooth Progress (lerp)

Suaviza cambios bruscos del scroll mediante interpolación.

No es un progreso directo, sino un **seguimiento progresivo** hacia un valor objetivo.


## 🧠 Idea clave

En lugar de saltar directamente al valor (`target`), el valor actual se **acerca poco a poco** en cada frame.



## 📐 Fórmula base

new = a + (b - a) * t


## 🧩 Implementación en Three.js

```jsx
smoothProgress.current = THREE.MathUtils.lerp(
  smoothProgress.current, // valor actual
  target,                 // valor objetivo
  0.08                    // velocidad de interpolación
)

Lerp convierte cambios bruscos en movimiento continuo



# Por ahora tengo los tres componentes que componen app el navbar los textos y el canvas con position fixed ubicados uno encima del otro y escondi el scroll. 