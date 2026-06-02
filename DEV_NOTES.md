# DEV NOTES



## App.jsx

### GESTIÓN GLOBAL DEL SCROLL.

`scroll.offset` solo está disponible dentro de los componentes que se encuentran dentro del `Canvas`.

Sin embargo, también necesitaba conocer la posición actual del scroll en componentes React normales (las diferentes secciones de la página).

Por esta razón creé un estado en `App.jsx`:

```jsx
const [scrollOffset, setScrollOffset] = useState(0)
```

y envié `setScrollOffset` a `Experience.jsx`.

Dentro de `Experience.jsx`, el valor de `scroll.offset` se lee en cada frame mediante `useFrame()` y se utiliza para actualizar este estado.

De esta forma:

1. `Experience.jsx` obtiene `scroll.offset`.
2. Actualiza `scrollOffset` mediante `setScrollOffset`.
3. `App.jsx` almacena el valor actual.
4. El estado puede compartirse con cualquier sección o componente que lo necesite.

#### ¿Por qué hacerlo así?

Necesitaba que las secciones HTML reaccionaran al mismo scroll que controla las animaciones 3D.

Al centralizar el valor en `App.jsx`, cualquier componente puede acceder a él mediante props.

#### Secciones fuera del Canvas

Inicialmente las secciones podían estar dentro del `Canvas`, pero decidí moverlas fuera.

Esto permite separar completamente:

- La escena 3D (`Canvas`)
- La interfaz HTML (Sections)

#### Ventajas

- Las secciones no dependen de Three.js.
- El contenido HTML mantiene su comportamiento normal.
- La lógica de UI y la lógica 3D permanecen desacopladas.
- El valor del scroll puede compartirse fácilmente entre la escena y las secciones.


### ScrollControls

`ScrollControls` es un componente de `@react-three/drei` que crea un sistema de scroll para escenas de React Three Fiber.

```jsx
<ScrollControls pages={3}>
  <Experience />
</ScrollControls>
```

#### ¿Qué hace?

- Genera un área de scroll virtual.
- Controla la posición del scroll dentro del Canvas.
- Permite sincronizar animaciones 3D con el desplazamiento del usuario.
- Proporciona acceso al hook `useScroll()`.

#### pages

```jsx
<ScrollControls pages={3}>
```

Define la longitud total del recorrido.

- `pages={1}` → una pantalla de scroll.
- `pages={2}` → dos pantallas de scroll.
- `pages={3}` → tres pantallas de scroll.

El valor de `scroll.offset` siempre se normaliza entre:

```txt
0 → inicio
1 → final
```

sin importar el número de páginas.

#### useScroll()

Dentro de un componente hijo de `ScrollControls`:

```jsx
const scroll = useScroll()
```

Se obtiene acceso a:

```jsx
scroll.offset
```

Valor actual del scroll entre `0` y `1`.

```jsx
scroll.range(start, length)
```

Crea una ventana de animación que devuelve valores entre `0` y `1` dentro de un tramo específico del scroll.

#### Relación con las animaciones

Los valores obtenidos mediante `scroll.offset` o `scroll.range()` suelen utilizarse dentro de `useFrame()` para actualizar posiciones, rotaciones, escalas o disparar animaciones a medida que el usuario hace scroll.

#### Importante

`useScroll()` solo funciona dentro de componentes que sean hijos de `ScrollControls`.

Fuera de `ScrollControls` no existe contexto de scroll y el hook no funcionará.




### TEXTURE SYSTEM

#### Estado global de la textura

En `App.jsx` creé un estado para almacenar la textura actualmente seleccionada.

```jsx
const [activeTexture, setActiveTexture] = useState(...)
```

Este estado se convierte en la fuente de verdad para todo el sistema de texturas.

#### Selección de textura

`setActiveTexture` se envía al componente `ProductHero`.

Dentro de este componente se utiliza un `.map()` para generar dinámicamente un botón por cada textura disponible.

Cuando el usuario hace click en un botón:

```jsx
setActiveTexture(textureName)
```

se actualiza la textura activa.

#### Experience.jsx

`Experience.jsx` recibe `activeTexture`.

A partir de este valor busca la configuración correspondiente dentro de un objeto de datos donde se encuentran agrupadas todas las texturas.

Ejemplo conceptual:

```js
texturesData = {
  black: {...},
  brown: {...},
  navy: {...}
}
```

Luego obtiene el objeto correspondiente:

```js
const selectedTexture = texturesData[activeTexture]
```

y lo envía a `Wallet.jsx`.

### Wallet.jsx

`Wallet.jsx` recibe el objeto de textura seleccionado.

Las imágenes son cargadas mediante:

```jsx
useTexture(...)
```

Una vez cargadas, las texturas se asignan a los materiales del modelo.

Ejemplo:

```jsx
<meshStandardMaterial
  map={colorMap}
  normalMap={normalMap}
  roughnessMap={roughnessMap}
/>
```

### Flujo completo

1. El usuario selecciona una textura.
2. El botón actualiza `activeTexture`.
3. `App.jsx` guarda el nuevo valor.
4. `Experience.jsx` recibe `activeTexture`.
5. Busca la configuración correspondiente en `texturesData`.
6. Envía esa configuración a `Wallet.jsx`.
7. `Wallet.jsx` carga las imágenes mediante `useTexture()`.
8. Las texturas se aplican a los materiales del modelo.
9. El modelo se actualiza automáticamente con la nueva apariencia.

### Ventaja de esta arquitectura

La lógica de selección está separada de la lógica de renderizado.

- `ProductHero` → selecciona la textura.
- `App.jsx` → almacena el estado.
- `Experience.jsx` → obtiene la configuración correcta.
- `Wallet.jsx` → carga y aplica las texturas.

Esto permite agregar nuevas texturas simplemente añadiendo una nueva entrada en `texturesData`, sin modificar la lógica principal.












## useBreakpoint.js

Este hook detecta si la pantalla corresponde a desktop o móvil.

### useEffect

El `useEffect()` se ejecuta una vez cuando el componente se monta.

Dentro del efecto se registra un listener:

```js
window.addEventListener("resize", handleResize)
```

A partir de ese momento, el navegador queda escuchando los eventos `resize` y ejecuta `handleResize()` cada vez que cambia el tamaño de la ventana.

Cuando el componente se desmonta, se elimina el listener:

```js
return () => {
  window.removeEventListener("resize", handleResize)
}
```

Esto evita fugas de memoria y listeners duplicados.

## ¿Por qué retorna { isDesktop }?

El hook retorna un objeto:

```js
return { isDesktop }
```

Es una abreviación de:

```js
return {
  isDesktop: isDesktop
}
```

JavaScript permite omitir el valor cuando la propiedad y la variable tienen el mismo nombre.

Por ejemplo:

```js
const isDesktop = true

return { isDesktop }
```

equivale a:

```js
return {
  isDesktop: true
}
```

## ¿Por qué retornar un objeto?

Porque permite utilizar destructuring al consumir el hook:

```js
const { isDesktop } = useBreakpoint()
```

Además, si en el futuro el hook necesita retornar más información:

```js
return {
  isDesktop,
  width,
  height
}
```

el código que lo consume seguirá siendo fácil de leer:

```js
const {
  isDesktop,
  width,
  height
} = useBreakpoint()
```









## Wallet.jsx

Para convertir el archivo `.glb` en un componente React usé:

https://gltf.pmnd.rs/

Esto generó automáticamente el componente base del modelo 3D.

### Uso de forwardRef

Reemplacé:

```jsx
export function Model() {}
```

por:

```jsx
const Wallet = forwardRef((props, ref) => {})
```

porque necesitaba acceder desde el componente padre a las animaciones y referencias internas del modelo.

### Uso de useImperativeHandle

La referencia (`ref`) se crea en el componente padre y se envía al hijo mediante `forwardRef`.

Dentro del hijo uso:

```jsx
useImperativeHandle(ref, () => ({
  actions,
  group
}))
```

para controlar qué información recibe el padre.

De esta forma, el padre puede acceder a:

```jsx
walletRef.current.actions
walletRef.current.group
```

sin necesidad de conocer la estructura interna del componente.

### Flujo

1. El padre crea el ref.
2. El padre envía el ref al componente `Wallet`.
3. `Wallet` recibe el ref mediante `forwardRef`.
4. `useImperativeHandle` rellena el ref con los datos que quiero exponer.
5. El padre utiliza `walletRef.current` para controlar animaciones y acceder al grupo del modelo.











## Experience.jsx

### Hook useBreakpoint()
Creé un hook llamado `useBreakpoint()` para detectar si el usuario está en móvil o desktop.

A partir del valor retornado por este hook, se selecciona una configuración diferente almacenada en un archivo de datos (`textData`).

Cada configuración contiene valores específicos para cada dispositivo, por ejemplo:

- Posiciones
- Escalas
- Rotaciones
- Configuración de cámara
- Otros parámetros de la escena

Esto evita tener múltiples condicionales dentro de `Experience.jsx` y centraliza todos los ajustes responsive en un solo lugar.

#### Flujo

1. `useBreakpoint()` detecta el tamaño de pantalla.
2. Retorna el tipo de dispositivo (`mobile` o `desktop`).
3. `Experience.jsx` consulta la configuración correspondiente en `data`.
4. Los valores obtenidos se utilizan para configurar la escena.

#### Ventaja

Si necesito modificar una posición o escala para móvil o desktop, solo debo cambiar los valores en `data` sin tocar la lógica de `Experience.jsx`.



### OPTIMIZATION

`scroll.offset` se actualiza continuamente mientras el usuario hace scroll, generando una gran cantidad de valores por segundo.

Para evitar actualizaciones innecesarias de estado, solo se guarda el nuevo valor cuando la diferencia respecto al valor anterior es mayor a `0.01`.

```jsx
if (Math.abs(offset - lastOffset.current) > 0.01) {

  lastOffset.current = offset

  setScrollOffset(offset)
}
```

#### ¿Por qué?

Cada llamada a `setScrollOffset()` provoca un nuevo render de los componentes que dependen de este estado.

Sin este filtro se generan demasiadas actualizaciones por segundo, lo que provoca:

- Renderizados innecesarios.
- Menor rendimiento.
- Animaciones menos fluidas.
- Posibles saltos o bloqueos durante el scroll.

#### Funcionamiento

1. Se obtiene el valor actual de `scroll.offset`.
2. Se compara con el último valor guardado.
3. Si la diferencia es mayor a `0.01`, se actualiza el estado.
4. Si la diferencia es menor, se ignora el cambio.

Esto actúa como un filtro para reducir la frecuencia de actualizaciones del scroll.



### ANIMATION STATES

Los `trigger` utilizados en este componente evitan que una misma animación o bloque de código se ejecute repetidamente en cada frame mientras el valor del scroll permanece dentro del mismo rango.

#### ¿Por qué?

El callback asociado al scroll se ejecuta continuamente durante el render loop. Sin un control adicional, una condición como esta:

```jsx
if (offset > 0.2 && offset < 0.6) {
  playAnimation()
}
```

intentaría ejecutar `playAnimation()` en cada frame mientras el scroll permanezca entre `0.2` y `0.6`.

#### Solución

Se utiliza una referencia (`useRef`) como bandera (`trigger`) para saber si la acción ya fue ejecutada.

```jsx
if (
  offset > 0.2 &&
  offset < 0.6 &&
  !animationTriggered.current
) {
  animationTriggered.current = true

  playAnimation()
}
```

#### Funcionamiento

1. El usuario entra en el rango definido.
2. La animación se ejecuta una sola vez.
3. El `trigger` cambia a `true`.
4. Mientras el scroll siga dentro del rango, el código no vuelve a ejecutarse.
5. Cuando sea necesario, el `trigger` se restablece para permitir una nueva ejecución.





### TARGET TRANSFORMS

Aquí se definen varios rangos utilizando `scroll.range()`.

```jsx
const zoomOutRange = scroll.range(0, 0.4)
const rotationLeftRange = scroll.range(0, 0.3)
```

Cada rango devuelve un valor normalizado entre `0` y `1` dependiendo de la posición actual del scroll.

### Transformaciones objetivo (Targets)

Después se crean constantes para cada tipo de transformación (posición, rotación, escala, etc.).

Estas transformaciones se calculan sumando o combinando varios rangos para producir un valor objetivo.

Ejemplo:

```jsx
const targetPositionX =
  moveLeftRange * -2 +
  moveRightRange * 2
```

A medida que el usuario hace scroll, los valores de los rangos cambian y, por lo tanto, también cambia el valor objetivo.

Como estos cálculos se ejecutan dentro de `useFrame()`, los targets se actualizan continuamente en cada frame.

### Suavizado con Lerp

Los valores objetivo no se aplican directamente al modelo.

En lugar de eso, se utilizan como destino (`target`) dentro de un `lerp`.

```jsx
model.position.x = THREE.MathUtils.lerp(
  model.position.x,
  targetPositionX,
  0.1
)
```

### ¿Por qué usar Lerp?

Si se asignara el valor directamente:

```jsx
model.position.x = targetPositionX
```

el movimiento sería instantáneo y podría verse brusco.

Con `lerp`, el modelo se mueve progresivamente hacia el valor objetivo, generando una transición más suave y natural.

### Flujo

1. El scroll actualiza los rangos.
2. Los rangos generan valores entre `0` y `1`.
3. Los valores se combinan para calcular los targets.
4. Los targets se actualizan en cada frame dentro de `useFrame()`.
5. `lerp()` mueve gradualmente el modelo hacia esos targets.

















## ProductHero.jsx

Este componente contiene el HTML de la sección principal del producto.

### Sistema de opacidad

La aparición y desaparición visual se controla mediante `getOpacity.js`.

Esta utilidad utiliza el valor actual de `scrollOffset` para calcular una opacidad entre:

```txt
0 → invisible
1 → completamente visible
```

De esta forma el contenido aparece y desaparece progresivamente a medida que el usuario hace scroll.

### Problema

La opacidad por sí sola no era suficiente.

Cuando el usuario se devuelve con el scroll, la billetera necesita terminar primero su animación de cierre antes de que el contenido vuelva a aparecer.

Si el contenido aparecía inmediatamente, se producía una desincronización visual entre la interfaz y la animación 3D.

### Sistema de visibilidad

Para solucionar esto, añadí un estado:

```jsx
const [hideProductHero, setHideProductHero] = useState(false)
```

Este estado controla la propiedad:

```jsx
visibility
```

independientemente de la opacidad.

### Detectar la dirección del scroll

Primero es necesario saber si el usuario está avanzando o devolviéndose.

```jsx
const isScrollingDown =
  scrollOffset > previousScroll.current
```

Si:

```txt
scrollOffset > previousScroll.current
```

el usuario está bajando.

Si:

```txt
scrollOffset < previousScroll.current
```

el usuario está subiendo.

### Retraso para la reaparición

Un `useEffect()` observa los cambios del scroll y utiliza un `setTimeout()` para retrasar la reaparición del contenido cuando el usuario se devuelve.

Conceptualmente:

```jsx
useEffect(() => {

  if (!isScrollingDown) {

    const timeout = setTimeout(() => {
      setHideProductHero(false)
    }, delay)

    return () => clearTimeout(timeout)
  }

}, [scrollOffset])
```

### ¿Por qué usar setTimeout?

Sin el retraso:

1. El usuario se devuelve con el scroll.
2. El contenido aparece inmediatamente.
3. La billetera todavía está cerrándose.
4. La interfaz y la animación quedan desincronizadas.

Con el retraso:

1. El usuario se devuelve con el scroll.
2. El contenido permanece oculto.
3. La billetera ejecuta la animación de cierre.
4. Finaliza el tiempo de espera.
5. El contenido vuelve a ser visible.

### Diferencia entre opacity y visibility

#### Opacity

```css
opacity: 0;
```

El elemento sigue existiendo y ocupando espacio, simplemente es transparente.

#### Visibility

```css
visibility: hidden;
```

El elemento deja de ser visible.

### Flujo completo

1. El scroll actualiza `scrollOffset`.
2. Se detecta la dirección del scroll mediante `previousScroll.current`.
3. `getOpacity()` calcula la opacidad de la sección.
4. Si el usuario baja, el contenido puede mostrarse normalmente.
5. Si el usuario se devuelve, `hideProductHero` mantiene el contenido oculto.
6. Se inicia un `setTimeout()` para esperar a que la billetera termine su animación de cierre.
7. Finalizado el tiempo de espera, `hideProductHero` vuelve a `false`.
8. El contenido reaparece sincronizado con la animación 3D.

### Importante

Se utiliza:

```jsx
clearTimeout(timeout)
```

en la función de limpieza del `useEffect()`.

Esto evita que se acumulen múltiples temporizadores si el usuario cambia rápidamente la dirección del scroll.

### ¿Por qué hacerlo así?

La interfaz HTML debe mantenerse sincronizada con las animaciones 3D.

- `getOpacity()` controla cómo aparece el contenido.
- `hideProductHero` controla cuándo puede aparecer.
- `setTimeout()` sincroniza la reaparición con el tiempo que tarda la billetera en cerrarse.

Los tres sistemas trabajan juntos para producir una transición visual fluida y coordinada.












# [ANIM-02] CSS ANIMATIONS - Navbar descount bar

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











