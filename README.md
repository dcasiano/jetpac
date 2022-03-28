# _**Jetpac**_

*Documento de diseño de videojuego*

### **David Casiano Flores**

_Correo de contacto_ : dcasiano@ucm.es

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
    3.1 [Configuración](#Configuración)  
    3.2 [Interfaz y control](#Interfaz)  

4. [Contenido](#Contenido)  
    4.1 [Historia](#Historia)  
    4.2 [Personajes](#Personajes)  

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
