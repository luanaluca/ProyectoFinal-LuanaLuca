

const loginButton = document.getElementById('login-btn')
const registerButton = document.getElementById('register-btn')
const botoncarrito = document.getElementById('boton-carrito')
const saludoUsuario = document.getElementById('saludo-usuario')

const contenedorCursos = document.getElementById('contenedor-cursos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

usuarioActual
    ? (
        loginButton.innerHTML = 'Cerrar sesión',
        registerButton.innerHTML = '',
        saludoUsuario.innerHTML = `Hola ${usuarioActual.nombre}`
    )
    : (
        loginButton.innerHTML = 'Iniciar sesión',
        botoncarrito.style.display = 'none',
        saludoUsuario.style.display = 'none'
    );

// Cerrar sesión
loginButton.addEventListener('click', () => localStorage.removeItem('usuarioActual'))

//PRIMER PRIMER PASO, INYECTAR EL HTML
let carrito = []
//const listaCursos = stockCursos


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    console.log(carrito)
})

stockCursos.forEach((curso) => {
    const div = document.createElement('div')


	if ((curso.disp) == true) { 
        div.classList.add('curso')
        div.innerHTML = `
            <img src=${curso.img} alt= "">
            <h3>${curso.nombre}</h3>
            <p>${curso.desc}</p>
            <p class="precioCurso">Precio: $${curso.precio}</p>
            <button id="agregar${curso.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        contenedorCursos.appendChild(div)
          //2 - SEGUNDO PASO, LUEGO DE QUE INSERTEMOS EL HTML EN EL DOM:
        const boton = document.getElementById(`agregar${curso.id}`)
        //Por cada elemento de mi array, creo un div, lo cuelgo, le pongo un id particular, una vez colgado
        //le hago un get element by id (el de agregar) Obtengo el elemento y a dicho elemento le agregamos
        //el add event listener
 
        boton.addEventListener('click', () => {
         //esta funcion ejecuta el agregar el carrito con la id del producto

            usuarioActual
            ? (
                agregarAlCarrito(curso.id) 
            )
            : (
                Swal.fire('Para comprar el curso debes acceder a tu cuenta')

            );    

         
         })

	}
	else {	
        div.classList.add('curso')
        div.innerHTML = `
        <img src=${curso.img} alt= "">
        <h3>${curso.nombre}</h3>
        <p>${curso.desc}</p>
        <p class="precioCurso">Precio: $${curso.precio}</p>
        <button id="agregar-disabled${curso.id}" class="boton-agregar-disabled">Proximamente </button>
        `
        contenedorCursos.appendChild(div)
	}  
   
})

const agregarAlCarrito = (cursoId) => {
    //const existe = carrito.some(curso => curso.id === cursoId)

    /*if (existe) {
        const item = carrito.find((curso) => curso.id === cursoId)
        const indice = carrito.indexOf(item)
        let buffer = carrito[indice].cant
        carrito[indice].cant = ++buffer
        //stockCursos[indice].cant--
        //actualizarCarrito()
        console.log(item)
        console.log('indice: ',indice)
        console.log('buffer: ',buffer)
        }
    else {*/
        const item = stockCursos.find((curso) => curso.id === cursoId)
        carrito.push(item)
        actualizarCarrito()
        console.log(item)
    }
    
    //console.log('carrito: ',carrito)
    //console.log('existe: ',existe)
    //console.log('stockCursos: ',stockCursos)

    
//}

const eliminarDelCarrito = (cursoId) => {
    const item = carrito.find((curso) => curso.id === cursoId)
    const indice = carrito.indexOf(item)
    //
    if (carrito[indice].cant > 1) {
        carrito[indice].cant--
        actualizarCarrito()
    }
    else {
        carrito.splice(indice,1)
        actualizarCarrito()
    }
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML=''
    carrito.forEach((curso) => {
        const div = document.createElement('div')
        div.className = ('cursoEnCarrito')
        div.innerHTML = `
        <p>${curso.nombre}</p>
        <p>Precio: $${curso.precio}</p>
        <p>Cantidad: ${curso.cant}</p>
        <button onclick = "eliminarDelCarrito(${curso.id})" class ="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    //contadorCarrito.innerText = carrito.length
    contadorCarrito.innerText = carrito.reduce((acc,curso) => acc + curso.cant,0)
    precioTotal.innerText = carrito.reduce((acc,curso) => acc + curso.cant*curso.precio,0)
}