const formularioContacto = document.querySelector("#contacto"),
      listadoContactos = document.querySelector("#listado-contactos tbody"),
      buscador = document.querySelector("#buscar");

eventListener();

function eventListener(){

    //Cuando el formulario de editar o crear se ejecuta.
    formularioContacto.addEventListener("submit", leerFormulario);

    //Listener para eliminar el boton.
    if(listadoContactos){
        listadoContactos.addEventListener("click", eliminarContacto);
    }

    if(buscador){
        buscador.addEventListener("input", buscarContactos);
    }

    numeroContactos();
}

function leerFormulario(e){
    
    e.preventDefault();

    //Obtenemos los valores.

    const nombre = document.querySelector("#nombre").value,
          empresa = document.querySelector("#empresa").value,
          telefono = document.querySelector("#telefono").value,
          accion = document.querySelector("#accion").value;


    if(nombre === "" || empresa === "" || telefono === ""){
            //Si algun campo viene vacio mostramos esta notificación
            mensajeNotificacion("Todos los datos deben ser Ocupados", "error");
    }
    else{

        //Pasa la validacion por lo tanto, creamos el llamado a ajax.
        //Guardamos los datos en un objeto.
        const infoContacto = new FormData();
        infoContacto.append("nombre", nombre);
        infoContacto.append("empresa", empresa);
        infoContacto.append("telefono", telefono);
        infoContacto.append("accion", accion);

        if(accion === "crear"){

            //Creamos un nuevo contacto.
            insertarBD(infoContacto);
        }
        else{
            //Editamos un contacto.
            const idRegistro = document.querySelector("#id").value;

            infoContacto.append("id", idRegistro);
            actualizarBD(infoContacto);

        }
    }
}

//Insertar en la base de datos via AJAX.
function insertarBD(datos){

    //llamado a ajax.
    //crear el objeto.
    const xhr = new XMLHttpRequest();

    //abrir la conexion.
    xhr.open("POST", "includes/modelos/modelo-contacto.php" , true);

    //pasar datos.
    xhr.onload = function(){
        if(this.status === 200){

            //leemos la respuesta de PHP.
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);

            //Inserta un nuevo elemento a la tabla.
            const nuevoContacto = document.createElement("tr");

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //Creamos contenedor para los botones
            const contenedorAcciones = document.createElement("td");

            //Crear Icono editar.
            const iconoEditar = document.createElement("i");
            iconoEditar.classList.add("fas", "fa-pen-square");

            //Crea el enlace para editar.
            const btnEditar = document.createElement("a");
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar_contacto.php?id=${respuesta.datos.numero_id}`;
            btnEditar.classList.add("btn", "btn-editar");

            //Aagregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //Crear el icono de eliminar
            const iconoEliminar = document.createElement("i");
            iconoEliminar.classList.add("fas", "fa-trash-alt");

            //Crear el boton para eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute("data-id", respuesta.datos.numero_id);
            btnEliminar.classList.add("btn", "btn-borrar");

            //Agregando al padre
            contenedorAcciones.appendChild(btnEliminar);

            //Agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);

            //Agregarlo a los contactos
            listadoContactos.appendChild(nuevoContacto);

            //Resetear el formulario
            document.querySelector("form").reset();

            //Mostrar Notificación
            mensajeNotificacion("Contacto Creado Correctamente", "correcto");
            
            //Actualizamos el numero de contactos.
            numeroContactos();
        }
    }

    //enviar datos
    xhr.send(datos);

}

//Actualizar Contactos en la bd via AJAX
function actualizarBD(datos){
    //llamado ajax
    //Creamos el obtejo
    const xhr = new XMLHttpRequest();

    //Abrimos la conexion
    xhr.open("POST", "includes/modelos/modelo-contacto.php", true);

    //Leer la respuesta
    xhr.onload = function(){

        if(this.status === 200){

            const respuesta = JSON.parse(xhr.responseText);

            if(respuesta.respuesta == "correcto"){
                //Mostramos la notificación
                mensajeNotificacion("Contacto Actualizado", "correcto");
            }else{
                mensajeNotificacion("Huno un error", "correcto");
            }

            //Despues de 3 segundos redireccionar.
            setTimeout( () => {
                window.location.href = "index.php";
            }, 4000);
        }
    }

    //Enviar datos
    xhr.send(datos);
}

//Eliminar Conctacos en la bd via AJAX
function eliminarContacto(e) {
    if(e.target.parentElement.classList.contains('btn-borrar')){
        //tomar el id
        const id = e.target.parentElement.getAttribute('data-id');

        //preguntar al usuario
        const respuesta= confirm('¿Estas seguro?');

        if(respuesta){
            //llamado a ajax
            //crear el objeto
            const xhr = new XMLHttpRequest();

            //abrir la conexion
            xhr.open('GET', `includes/modelos/modelo-contacto.php?id=${id}&accion=borrar`, true);

            //leer la respuesta
            xhr.onload = function() {

                if (this.status === 200) {
                
                    const resultado= JSON.parse(xhr.responseText);
                
                    if(resultado.respuesta == "correcto"){
                        
                        e.target.parentElement.parentElement.parentElement.remove();
                        const cantidad = document.querySelector(".total-contactos span");

                        //Mostramos la notificación
                        mensajeNotificacion("Contacto Eliminado", "correcto");

                    }else{
                        mensajeNotificacion("Hubo un problema al eliminar el contacto", "error");
                    }
                }
                
                //Actualizamos el numero de contactos.
                numeroContactos();
            }
            //enviar la peticion
            xhr.send();
        }   
    }
}

//Buscador de registros
function buscarContactos(e){
    const expresion = new RegExp(e.target.value, "i"),
          registros = document.querySelectorAll("tbody tr");

          registros.forEach(registro => {
            registro.style.display = "none";

            
            if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){

                registro.style.display = "table-row";
            }

          });
          numeroContactos();
          
}

//Mensaje de notificacion
function mensajeNotificacion(mensaje, clase){

    //Creamos el HTML de la notificación.
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, "notificacion", "sombra");
    notificacion.textContent = mensaje;

    //Colocamos el mensaje en el formulario.
    formularioContacto.insertBefore(notificacion, document.querySelector("form h4"));

    //Ocultar y mostrar la notificación
    setTimeout(function(){

        notificacion.classList.add("visible");
        setTimeout(function(){

            notificacion.classList.remove("visible");
            setTimeout(function(){
                
                notificacion.remove();
            },500)
        }, 3000)
    }, 100);
}

//Muestra el numero de contactos.
function numeroContactos(){

    const contactos = document.querySelectorAll("tbody tr"),
          contenedorNumero = document.querySelector(".total-contactos span");

    let total = 0;

    contactos.forEach(contacto => {
        
        if(contacto.style.display === "" || contacto.style.display === "table-row"){

            total++;
        }

    });

    contenedorNumero.textContent = total;


}