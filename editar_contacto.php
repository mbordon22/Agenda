<?php 
    include_once("includes/layout/header.php"); 
    include_once("includes/functions/funciones.php");

    $id = filter_var($_GET["id"], FILTER_VALIDATE_INT);

    $resultado = obtenerContacto($id);
    $contacto = $resultado->fetch_assoc();


?>


<div class="contenedor-barra d-grid">
    <a href="index.php" class="btn btn-volver">Volver</a>
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto" autocomplete="OFF">
        <h4>Editar Contacto <span>Todos los campos son obligatorios</span></h4>

        <?php include_once("includes/layout/formulario.php") ?>
    </form>
</div>

<?php include_once("includes/layout/footer.php"); ?>