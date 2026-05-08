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














# [ANIM-02] CSS ANIMATIONS

```scss
.navbar__discount-text {
    animation: fadeText 0.5s ease;
}
```

---

# Estructura de `animation`

```scss
animation: nombre duración velocidad;
```

| Valor | Qué hace |
|---|---|
| `fadeText` | Nombre de la animación |
| `0.5s` | Duración |
| `ease` | Tipo de velocidad |

---

# `fadeText`

```scss
animation: fadeText 0.5s ease;
```

`fadeText` NO es una palabra reservada.

Es un nombre personalizado creado por el desarrollador.

Debe coincidir con el nombre definido en `@keyframes`.

---

# ¿Qué es `@keyframes`?

```scss
@keyframes fadeText {

    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}
```

`@keyframes` define los pasos de una animación.

Es la regla que le dice al navegador:

> "Empieza así y termina así."

---

# `from`

```scss
from {
    opacity: 0;
    transform: translateY(10px);
}
```

Estado inicial del elemento.

| Propiedad | Resultado |
|---|---|
| `opacity: 0` | Invisible |
| `translateY(10px)` | 10px más abajo |

---

# `to`

```scss
to {
    opacity: 1;
    transform: translateY(0);
}
```

Estado final del elemento.

| Propiedad | Resultado |
|---|---|
| `opacity: 1` | Visible |
| `translateY(0)` | Posición original |

---

# Resultado visual

La animación hace que el texto:

- aparezca lentamente
- mientras sube ligeramente

---

# `ease`

```scss
animation: fadeText 0.5s ease;
```

`ease` controla la aceleración de la animación.

Hace que:

- empiece suave
- acelere en el medio
- termine suave

---

# Tipos comunes

| Valor | Comportamiento |
|---|---|
| `linear` | Velocidad constante |
| `ease` | Suave al inicio y final |
| `ease-in` | Empieza lento |
| `ease-out` | Termina lento |
| `ease-in-out` | Lento al inicio y final |

---

# Coordenadas en CSS

```text
(0,0) → X
  ↓
  Y
```

| Dirección | Valor |
|---|---|
| Derecha | X positivo |
| Izquierda | X negativo |
| Abajo | Y positivo |
| Arriba | Y negativo |

---

# `translateY(10px)`

```scss
transform: translateY(10px);
```

Mueve el elemento:

```text
10px hacia abajo
```

---

# `translateY(-10px)`

```scss
transform: translateY(-10px);
```

Mueve el elemento:

```text
10px hacia arriba
```

---

# Equivalente completo de `animation`

```scss
animation: fadeText 0.5s ease;
```

equivale a:

```scss
animation-name: fadeText;

animation-duration: 0.5s;

animation-timing-function: ease;
```

---

# Flujo completo de la animación

## 1. El elemento aparece

El navegador detecta:

```scss
animation: fadeText 0.5s ease;
```

---

## 2. Busca el nombre de la animación

```scss
@keyframes fadeText
```

---

## 3. Lee el estado inicial

```scss
from
```

---

## 4. Lee el estado final

```scss
to
```

---

## 5. Interpola los valores

CSS calcula automáticamente:

```text
opacity: 0 → 1
translateY(10px) → 0
```

---

## 6. Ejecuta la transición

Durante:

```scss
0.5s
```

usando:

```scss
ease
```















# [STATE-01] Toggle item by key (object state)

## 🔹 Descripción

Patrón para abrir/cerrar elementos dinámicamente dentro de un objeto usando una key.

---

## 🔹 Implementación

```js
const toggleItem = (key) => {
    setOpenItems(prev => ({
        ...prev,
        [key]: !prev[key]
    }))
}
```

---

## 🔹 Conceptos clave

### 1. `prev`

* Es el **estado anterior**
* React lo pasa automáticamente
* El nombre es arbitrario (`prev`, `old`, etc.)

---

### 2. `...prev`

* Copia todas las propiedades del estado anterior
* Evita perder datos existentes

```js
{
  hombre: true
}
```

---

### 3. `[key]` (propiedad dinámica)

* Usa el valor de la variable como nombre de propiedad
* Crea la propiedad si no existe

```js
const key = "hombre"

{
  [key]: true
}

// Resultado:
{
  hombre: true
}
```

---

### 4. `prev[key]`

* Accede a una propiedad del objeto usando una variable

```js
prev["hombre"]
```

---

### 5. `!prev[key]` (negación lógica)

* Invierte el valor actual

| Valor previo | Resultado |
| ------------ | --------- |
| true         | false     |
| false        | true      |
| undefined    | true      |

---

## 🔹 Caso importante: propiedad inexistente

```js
prev = {}
key = "hombre"
```

```js
prev[key] → undefined
!undefined → true
```

Resultado:

```js
{
  hombre: true
}
```

---

## 🔹 Flujo completo

1. Se copia el estado anterior (`...prev`)
2. Se evalúa `prev[key]`
3. Se invierte el valor (`!`)
4. Se actualiza o crea la propiedad

---

## 🔹 Resultado final

```js
{
  ...prev,
  [key]: !prev[key]
}
```

👉 Traducción:

> "Mantén lo anterior y cambia (o crea) solo este item, invirtiendo su valor"

---

## 🔹 Uso típico

* Dropdowns (navbar)
* Acordeones
* Menús multinivel
* Toggles dinámicos

---

## 🔹 Nota mental

> "Abre si está cerrado, cierra si está abierto.
> Si no existe, lo crea en `true`."









# [EFFECT-01] Auto change text interval

## 1. Create interval

```js
const interval = setInterval(() => {
```

### What is `setInterval()`?

`setInterval()` executes a function repeatedly after a specific amount of time.

It is a built-in JavaScript function.

---

## 2. Update state index

```js
setCurrentIndex((prevIndex) =>
```

### What is `prevIndex`?

`prevIndex` represents the previous state value.

React automatically passes the current state value as the first parameter.

---

## 3. Modulo operator `%`

```js
(prevIndex + 1) % discountMessages.length
```

The `%` operator returns the remainder of a division.

Example:

```js
1 % 2
```

- How many times does 2 fit into 1?
  → 0 times

- How much is left to reach 1?
  → 1

Result:

```js
1 % 2 = 1
```

---

## 4. Cleanup interval

```js
return () => clearInterval(interval)
```

### What does `clearInterval()` do?

`clearInterval()` stops or removes the interval created with `setInterval()`.

This prevents memory leaks and unnecessary executions when the component unmounts.