

const contenedorProductos = document.getElementById('container-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let stockProductos = []
let carrito = []

fetch('./products.json')
.then(response => response.json())
.then(data => {
    stockProductos = data;
    cargarProd(stockProductos);
}
);

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {Toastify({
    text: "Has vaciado tu carrito :D",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        fontSize: "1.5em", 
      background: "linear-gradient(to right, #223399, #3390cf)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
    carrito.length = 0
    actualizarCarrito()
})

function cargarProd(){

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
}


const agregarAlCarrito = (prodId) => {Toastify({
    text: "Producto agregado ",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();


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
    Toastify({
    text: "Articulo eliminado",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to left, #00b09b, #3dc996)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
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


cargarProd()