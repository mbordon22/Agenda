<?php 
    include_once("includes/functions/funciones.php");
    include_once("includes/layout/header.php"); 

    //Guardamos los datos obtenidos de la BD de la funcion en una variable.
    $contactos = obtenerContactos();
    //Obtenemos la cantidad de contactos.
    $cantContactos = $contactos->num_rows;
?>


<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto" autocomplete="OFF">
        <h4>Añada un contacto <span>Todos los campos son obligatorios</span></h4>

        <?php include_once("includes/layout/formulario.php") ?>
    </form>
</div>

<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>

        <input type="text" id="buscar" class="buscador sombra" autocomplete="OFF" placeholder="Buscar contacto...">

        <p class="total-contactos"><span></span> Contactos</p>

        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <?php if($contactos->num_rows):
                        
                            foreach($contactos as $contacto): ?>
                                <tr>
                                    <td><?php echo $contacto["nombre"]; ?></td>
                                    <td><?php echo $contacto["empresa"]; ?></td>
                                    <td><?php echo $contacto["telefono"]; ?></td>
                                    <td>
                                        <a href="editar_contacto.php?id=<?php echo $contacto["id"]; ?>" class="btn btn-editar">
                                            <i class="fas fa-pen-square"></i>
                                        </a>

                                        <button type="button" class="btn btn-borrar" data-id="<?php echo $contacto["id"]; ?>">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            <?php endforeach;

                        endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include_once("includes/layout/footer.php") ?>