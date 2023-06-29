// const stockProductos = [
//     {id: 1, class: "articulo", nombre: "Comida para perro grande", cantidad: 1, desc: "Comida balanceada tamaño grande", precio: 1200, img:"./img/comidaPG.jpg"},
//     {id: 2, class: "articulo", nombre: "Comida para perro pequeña", cantidad: 1, desc: "Comida balanceada tamaño pequeña", precio: 1100, img: "./img/comidaPC.jpg"},
//     {id: 3, class: "articulo", nombre: "Comida para gato grande", cantidad: 1, desc: "Comida balanceada tamaño grande", precio: 1200, img: "./img/comidaG.jpg"},
//     {id: 4, class: "articulo", nombre: "Comida para gato pequeña",cantidad: 1, desc: "Comida balanceada tamaño pequeña", precio: 1000, img: "./img/comidaG.jpg"},
//     {id: 5, class: "articulo", nombre: "Correa para perro", cantidad: 1, desc: "Correa reajustable para perros", precio: 1200, img: "./img/correa.jpg"},
//     {id: 6, class: "articulo", nombre: "Premio para mascotas", cantidad: 1, desc: "Un bocadillo ideal para tu mascota", precio: 900, img: "./img/premios.jpg"},
//     {id: 7, class: "articulo", nombre: "Arena para gato", cantidad: 1, desc: "Arena hipoalergenica para gatos", precio: 500, img: "./img/arenaGato.png"},
//     {id: 8, class: "articulo", nombre: "Collar para gato", cantidad: 1, desc: "Collar reajustable para gatos", precio: 500, img: "./img/collarG.png"},
//     {id: 9, class: "articulo", nombre: "Juguete para perro",cantidad: 1, desc: "Juguete duradero para perros en variedad de colores", precio: 200, img: "./img/JugueteP.png"},
//     {id: 10, class: "articulo", nombre: "Juguete para gato",cantidad: 1, desc: "Juguete super esponjoso para gatos con ruidos ", precio: 200, img: "./img/jugueteG.jpg"},
//     {id: 11, class: "articulo", nombre: "Cama para perros", cantidad: 1,desc: "Cama acolchonada para interior o exterior", precio: 2500, img: "./img/camaMascota.png"},
//     {id: 12, class: "articulo", nombre: "Cama para gatos", cantidad: 1, desc: "Cama acolchonada para gatos con manta incluida", precio: 2200, img: "./img/camaMascota.png"},
//     {id: 13, class: "articulo", nombre: "Ropa para perro", cantidad: 1, desc: "Ropa abrigada de invierno para perros", precio: 1000, img: "./img/ropaP.jpg"},
//     {id: 15, class: "articulo", nombre: "Champu para animales", cantidad: 1, desc: "Champú antipulgas para animales", precio: 1000, img: "./img/champu.png"},
//     {id: 16, class: "articulo", nombre: "Peine para animales", cantidad: 1, desc: "Peine con cerdas suaves para animales", precio: 700, img: "./img/peine.png"},
    
// ]

// algo nuevo//

let stockProductos = []

fetch("./products.json")
.then(response => response.json())
.then(data => (
    stockProductos = data;
    cargarProd(stockProductos);
))




function cargarProd(){

}

//termina algo nuevo//

const contenedorProductos = document.getElementById('container-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <div class="articulo">
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <div class="contenedorB"><button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button></div></div>
    `
    contenedorProductos.appendChild(div)


    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {

        agregarAlCarrito(producto.id)
    
    })
})


const agregarAlCarrito = (prodId) => {


    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1)
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length 

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
}

//buscador//
document.addEventListener("keyup", e => {

    if (e.target.matches("#search-box")) {

        if (e.key === "Escape") e.target.value = ""

        document.querySelectorAll(".articulo").forEach(cosa => {

            cosa.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? cosa.classList.remove("filtro")
                : cosa.classList.add("filtro")
        })

    }


})