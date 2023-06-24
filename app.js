//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');  //LA VARIABLE SE PUEDE HACER SIN EL CONST PERO QUEDA MEJON CON EL
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //CUANDO AGREGAR UN CURSO CUANDO APRIETAS "AGREGAR AL CARRITO"
    listaCursos.addEventListener('click', agregarCurso);

    //ELIMINA CURSOS DEL CARRITO
    carrito.addEventListener('click', eliminarCurso);

    //VACIAR EL CARRITO
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //RECETEAMOS EL ARREGLO

        limpiarHTML(); //ELIMINAMOS TODO EL HTML
    })
}


//FUNCIONES
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
  
}

//ELIMINA UN CURSO DEL CARRITO
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //ELIMINA EL ARREGLO DE ARTICULOSCARRITO POR EL DATA-ID
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //ITERAR SOBRE EL CARRITO Y MOSTRAR SU HTML
    }
}

    //LEE EL CONTENIDO DEL HTML AL QUE LE DIMOS CLICK Y EXTRAE LA INFOMACION DEL CURSO
function leerDatosCurso(curso) {
    //console.log(curso);

    //Crer un objeto con el contenido del curso actual
    const infoCurso = { 
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    //Revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id  );
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;   //RETORNA OBJETOS ACTUALIZADOS
            } else {
                return curso; //RETORNA LOS OBJETOS QUE NO SON DUPLICADOS
            }

        } )
        articulosCarrito = [...cursos];
        //Actualizamos la cantidad
    } else {  
        //Agrega el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
  
    console.log(articulosCarrito);

    carritoHTML();
}


//MUESTRA EL CARRITO DE COMPRAS EN EL HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();


    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
           <td>
              <img src="${imagen}" width="100">
           </td>
           <td>${titulo}</td>
           <td>${precio}</td>
           <td>${cantidad}</td>
           <td>
              <a href="#" class="borrar-curso" data-id="${id}" > x </a>
           </td>
        `;

        //AGREGA EL HTML DEL CARRITO EN EL tbody
        contenedorCarrito.appendChild(row);
     });

}

//ELIMINA LOS CURSOS DEL tbody
function limpiarHTML(){
    //FORMA LENTA DE LIMPIAR
    //contenedorCarrito.innerHTML='';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }  //LO QUE HACE ESTE CODIGO ES ELIMINAR EL PRIMER HIJO JHASTA QUE NO HAYAN MÁS
}