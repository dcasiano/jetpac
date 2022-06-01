# _**Jetpac**_

*Documento de diseño de videojuego*

### **David Casiano Flores**

_Correo de contacto_ : dcasiano@ucm.es

_Página web del juego_ : https://dcasiano.github.io/jetpac/

<table>
  <tr>
    <td colspan = "2"> Resumen </td>
  </tr>
  <tr>
    <td> Generos: Shooter </td>
    <td> Modo: Un jugador</td>
  </tr>
  <tr>
    <td> Publico objetivo: <br>
         Edad: Todos los públicos <br>
         Idioma: Inglés    
    </td>
    <td> Plataformas: PC navegador web</td>
  </tr>
  <tr>
    <td> Cantidades: <br><br>
         Escenarios: 4 niveles <br>
         Enemigos: 4
   </td>
    <td> Hitos: <br>
           Fecha de lanzamiento: 12 junio 2022 <br>
   </td>
  </tr>
</table>

## Descripción

El juego es una adaptación a navegador del juego Jetpac para ZX Spectrum. En él, el jugador controla un astronauta que ha de llenar el depósito de combustible de un cohete para escapar del planeta. Para ello, el jugador tendrá que recoger varias unidades de Fuel mientras que esquiva o elimina a los diferentes enemigos que aparezcan.

## Tabla de contenidos
1. [Aspectos Generales](#aspectos-generales)  
    1.1 [Relato breve y parcial de una partida típica](#relato-breve)  
  
2. [Jugabilidad](#Jugabilidad)  
    2.1 [Mecánica](#Mecánica)   
         - [Mecánicas del personaje](#Mecánicas-personaje)  
         - [Mecánicas del escenario](#Mecánicas-escenario)  
         - [Controles](#Controles)  
         - [Cámara](#Cámara)  
    2.2 [Dinámica](#Dinámica)  
    2.3 [Estética](#Estética)  

3. [Menús y modos de juegos](#Menús)  
    3.1 [Interfaz y control](#Interfaz)  

4. [Contenido](#Contenido)  
    4.1 [Historia](#Historia)  
    4.2 [Niveles](#Niveles)  
    4.3 [Enemigos](#Enemigos)  
    4.4 [Objetos](#Objetos)
    4.5 [Puntuación](#Puntuación)

5. [Referencias](#Referencias)

## <a name = "aspectos-generales">1. Aspectos generales</a>

### <a name = "relato-breve"> 1.1 Relato breve y parcial de una partida típica</a>
El jugador comienza en un escenario 2D con diferentes plataformas y un cohete. Acto seguido aparecerá una unidad de Fuel, la cual debe recoger y llevar al cohete. Esto se repetirá hasta haber llenado el depósito de combustible. Durante toda la partida irán apareciendo diferentes enemigos, los cuales el jugador puede combatir (mediante disparos) o tratar de evitarlos. Cuando se haya llenado por completo el depósito de combustible, el astronauta entrará al cohete y despegará, dando por completado el nivel.

![Imagen partida tipica](https://user-images.githubusercontent.com/82372508/160405493-edb2ce98-1c8b-44b9-909c-b0e0b1d8fdf4.png)

## <a name = "Jugabilidad"> 2. Jugabilidad</a>
### <a name = "Mecánica"> 2.1 Mecánica</a>

####  <a name = "Mecánicas-personaje"> Mecánicas del personaje</a>

El movimiento del personaje hacia izquierda y derecha se realiza con las flechas correspondientes de los cursores. Con el cursor de flecha arriba, el jugador se propulsa verticalmente. Cuando se deja de pulsar, cae por efecto de la gravedad. Con la barra espaciadora se dispara un proyectil en la dirección que esté mirando el jugador. El proyectil elimina al primer enemigo con el que colisione y, tras esto, desaparece.

El jugador tendrá inicialmente 3 vidas. Cada vez que un enemigo impacta con el jugador le restará una vida. Tras esto, el jugador reaparecerá en la posición inicial. Cuando el contador de vidas llegue a 0, el siguiente impacto enemigo supondrá el final de la partida.

El jugador también podrá recuperar vidas cada vez que alcance una determinada cantidad de puntos (se explica más adelante).

####  <a name = "Mecánicas-escenario"> Mecánicas de escenario</a>

El escenario está compuesto por el suelo, un determinado número de plataformas, el cohete y las unidades de Fuel. En ciertos niveles será necesario reconstruir la nave antes de llenar el depósito de combustible, por lo que en estos niveles aparecerán las diferentes partes de la nave. La nave está formada por tres piezas de las cuales, en ciertos niveles, dos de ellas están repartidas por el escenario y han de ser llevadas de vuelta para reconstruir la nave. Hasta que la nave no esté reconstruida no aparecerán unidades de combustible. El jugador debe recoger las piezas en orden, de manera que primero debe recoger la pieza central de la nave y después la superior. Si colisiona con la pieza que no corresponde no pasará nada, pero si colisiona con la correcta la llevará consigo hasta la nave y se colocará.

El jugador colisiona con el suelo y las plataformas, mientras que atraviesa el cohete. Cuando pasa por encima del Fuel, lo agarra y lo lleva consigo, hasta que llega al cohete y desaparece, incrementando en uno las unidades de combustible recargadas. Si no se ha llenado todavía el depósito, aparecerá otra unidad de Fuel en un punto aleatorio del escenario. El Fuel también se ve afectado por la gravedad.

El escenario es horizontalmente toroidal, de manera que cuando el jugador o los enemigos llegan al extremo derecho vuelven a aparecer en el izquierdo, y viceversa. No hay límite superior vertical (el jugador puede salirse por la parte superior del escenario, pero no se le verá en pantalla).

####  <a name = "Controles"> Controles</a>

En el juego únicamente es controlable el jugador. Cuando se ha llenado el depósito de combustible, se pierde el control del jugador y la nave comienza a ascender automáticamente.

####  <a name = "Cámara"> Cámara</a>

La cámara es fija y muestra todo el escenario de juego.

###  <a name = "Dinámica"> 2.2 Dinámica
  
El objetivo es llenar el depósito de combustible del cohete y escapar del planeta. Si el jugador lleva al cohete el número necesario de unidades de Fuel, habrá ganado. Si la vida del jugador llega a 0 y es impactado nuevamente por un ataque enemigo, habrá perdido.
  
La estrategia típica esperada es tratar de recoger y transportar el combustible por el mapa esquivando a los diferentes enemigos, haciendo uso del disparo cuando sea necesario.

###  <a name = "Estética"> 2.3 Estética</a>
  
  El juego tiene una estética pixel art. Se utilizarán los sprites del juego original. Habrá animaciones para las acciones de andar y volar del jugador, para ciertos enemigos, para el vuelo del cohete y para las explosiones, las cuales tendrán lugar cuando el jugador elimine un enemigo.

##  <a name = "Menús"> 3. Menús y modos de juego</a>
  El juego consta de un menú principal en el que se muestran los 3 niveles disponibles. Clicando sobre ellos se puede acceder al nivel correspondiente. No obstante, se puede jugar uno después de otro.
  
  ###  <a name = "Interfaz"> 3.1 Interfaz y control</a>
  
- Cursores flecha izquierda y derecha: movimiento lateral del jugador.
- Cursor flecha arriba: propulsión vertical del jugador.
- Barra espaciadora: disparo de proyectil por parte del jugador.
- Ratón (solo menú principal): seleccionar entre los diferentes niveles.

  ##  <a name = "Contenido"> 4. Contenido</a>
  
  Se necesitará:
- Sprites para las animaciones del jugador, de los enemigos, del cohete y de las explosiones.
- Sprites para el Fuel y las plataformas.
- Sonidos para la victoria y la derrota, para las explosiones y para cuando el jugador agarra y suelta el Fuel.

  ###  <a name = "Historia"> 4.1 Historia</a>
  
  Nuestro protagonista astronauta, Jetman,  se ha quedado atrapado en un planeta desconocido. Tendrá que volver a poner su nave a punto para poder escapar, mientras se defiende de los ataques de unos alienígenas hostiles.
  
  ###  <a name = "Niveles"> 4.2 Niveles</a>
  
  El juego consta de un total de 4 niveles. Todos ellos tienen la misma disposición del cohete y de las plataformas (la mostrada en las imágenes anteriores)
- Nivel 1: aparece un Meteorito cada segundo. Se necesita reconstruir la nave y una unidad de combustible para superar el nivel.
- Nivel 2: aparece un Alienígena con púas cada segundo. Se necesitan 2 unidades de combustible.
- Nivel 3: aparece un Caza alienígena cada segundo. Se necesita reconstruir la nave y 4 unidades de combustible.
- Nivel 4: aparece un OVNI cada 2 segundos. Se necesitan 5 unidades de combustible.
  
  En aquellos niveles donde sea necesario reconstruir la nave, al princicpio del nivel aparecerá la pieza inferior en la posición donde se supone que debe estar la nave completa. Además aparecerán las piezas intermedia e inferior en una posición determinada. Se deben recoger en orden y llevarse a la posición donde está la pieza inferior. Una vez la nave haya sido reconstruida, comenzarán a aparecer las unidades de fuel como en el resto de niveles.
  
  ###  <a name = "Enemigos"> 4.3 Enemigos</a>
  
  En el juego habrá un total de 4 enemigos, todos ellos con movimiento toroidal. El tipo de enemigo y la frecuencia con la que aparecerá depende del nivel, pero en todos (a excepción de los meteoritos) aparecen en un extremo de la pantalla (derecho o izquierdo) y a una altura aleatoria (entre los límites superior e inferior de la pantalla). Estos enemigos son:
- Meteoritos (animado): aparecen en una posición aleatoria en la parte superior de la escena y caen hacia abajo con un ángulo aleatorio. Esto es, el meteorito cae hacia abajo afectado por la gravedad, pero con un ángulo respecto al eje Y aleatorio. Al chocar con el jugador o una plataforma, explotan.
  ![meteor](https://user-images.githubusercontent.com/82372508/160408909-595439e0-e0fb-4412-81fd-10894a5d3ba0.png)

- Alienígena con púas (animado): se mueven en una dirección aleatoria con una velocidad de 20 px/s. Al colisionar con alguna plataforma o con la parte superior de la pantalla, rebotan.
  ![puas](https://user-images.githubusercontent.com/82372508/160409012-947f26ad-8b44-4246-b44d-31ada4237289.png)

- Caza alienígena (no animado): se mueve horizontalmente a 40 px/s, aumentando y disminuyendo su altura cada segundo. Esto quiere decir que su velocidad en el eje X es siempre 40 px/s (o negativa si se mueve hacia la izquierda), mientras que su velocidad en el eje Y cambia cada segundo entre 25 y -25 px/s. La dirección del caza (si se mueve a la izquiera o a la derecha) es aleatoria. Al chocar con alguna plataforma explota.
  ![Captura de pantalla 2022-02-13 190059](https://user-images.githubusercontent.com/82372508/160409073-23624892-534e-4f9a-9955-4d148abb2af8.png)

- OVNI (no animado): se mueve a una velocidad constante de 25 px/s hacia el jugador (lo persigue). Al colisionar con alguna plataforma explota.
 ![Captura de pantalla 2022-02-13 190138](https://user-images.githubusercontent.com/82372508/160409147-18778a16-3937-4401-b2a0-25fe639b08c4.png)

  ###  <a name = "Objetos"> 4.4 Objetos</a>
  
  En el juego se puede interactuar con el Fuel, agarrándolo y transportándolo, y con el cohete, para depositar el Fuel. También se puede interactuar con todos los enemigos, ya sea colisionando con ellos o acertándoles un disparo.
  
  Además hay tres objetos que al recogerlos se le sumará una puntuación al jugador. Estos objetos aparecen en una posición aleatoria en intervalos de tiempo de 1-3 segundos y son afectados por la gravedad. Solo el jugador colisiona con ellos. Tan solo puede haber un objeto simultáneamente en el escenario (cuando se recoge, empieza la cuenta atrás para que el siguiente aparezca). Los tres objetos tienen la misma probabilidad de aparecer. Estos son:
  - Amuleto triangular: proporciona 100 puntos. ![amuleto](https://user-images.githubusercontent.com/82372508/170123786-38c15bbf-0834-4ad9-aaf5-1404b498a83e.png)
  - Lingote de oro: proporciona 250 puntos. ![lingote](https://user-images.githubusercontent.com/82372508/170124171-9115497e-d700-436e-a514-7d18dca8cb4a.png)
  - Diamante: proporciona 400 puntos. ![diamante](https://user-images.githubusercontent.com/82372508/170124306-6806375a-7ce8-4cc3-8a23-c61954347fbe.png)


  ###  <a name = "Puntuación"> 4.5 Puntuación</a>
  
  El jugador tendrá una puntuación que comenzará en cero y aumentará cada vez que recoga un objeto de puntuación (amuleto, lingote y diamante) y cada vez que se coloca una pieza de la nave (50 puntos) o una unidad de fuel (100 puntos). Cuando se alcanzan los 1000 puntos, se restarán 1000 puntos y se sumará una vida al jugador. Cuando el jugador pasa a un nivel siguiente, mantiene sus puntos del nivel anterior. Cuando se pierde la partida, los puntos se pierden.
  
  En la parte superior izquierda de la pantalla se mostrarán dos contadores de puntos: uno con la cantidad de puntos actual (al que se le restan puntos cuando se obtiene una vida) y otro con los puntos totales que se han obtenido (nunca se le restan puntos, tan solo sirve para saber los puntos totales que el jugador ha obtenido a lo largo de la partida). También se mostrará un icono con un número que indique las vidas del jugador.

  
  ##  <a name = "Referencias"> 5. Referencias</a>
  - Jetpac para ZX Spectrum: https://en.wikipedia.org/wiki/Jetpac
  
