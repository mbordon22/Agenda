<?php 

//Variable que guarda todas las peticiones, ya sea de POST, GET O COOKIE
$accion = (isset($_REQUEST['accion'])) ? $_REQUEST['accion'] : '';

if($accion == "crear"){

    //Creara un nuevo registro en la base de datos.
    include_once("../functions/bd.php"); //Conectamos a la bd.

    //validamos las entradas.
    $nombre = filter_var($_POST["nombre"], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST["empresa"], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST["telefono"], FILTER_SANITIZE_STRING);

    try{
        
        $smst = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) value (?, ?, ?)");
        $smst->bind_param("sss", $nombre, $empresa, $telefono);
        $smst->execute();

        //affected_rows nos indica si hay un cambio en la tabla de la bd
        if($smst->affected_rows == 1){
            $respuesta = array(
                "respuesta" => "correcto",
                "datos" => array(
                    "nombre" => $nombre,
                    "empresa" => $empresa,
                    "telefono" => $telefono,
                    "numero_id" => $smst->insert_id
                )
            );
        }
        
        $smst->close();
        $conn->close();

    }catch(Exception $e){

        $respuesta = array(
            "error" => $e->getMessage()
        );
    }

    echo json_encode($respuesta);


} elseif($accion == 'borrar') {
 
    include_once("../functions/bd.php"); //Conectamos a la bd.

    $id = filter_var($_GET["id"], FILTER_SANITIZE_NUMBER_INT);

    try{
        $stmt = $conn->prepare("DELETE FROM contactos WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if($stmt->affected_rows == 1){
            $respuesta = array(
                "respuesta" => "correcto"
            );
        }

        $stmt->close();
        $conn->close();

    }catch(Exception $e){

        $respuesta = array(
            "error" => $e->getMessage()
        );
    }

    echo json_encode($respuesta);



} elseif($accion == "editar"){

    include_once("../functions/bd.php"); //Conectacmos la bd.

    //echo json_encode($_POST);

    //validamos las entradas.
    $nombre = filter_var($_POST["nombre"], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST["empresa"], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST["telefono"], FILTER_SANITIZE_STRING);
    $id = filter_var($_POST["id"], FILTER_VALIDATE_INT);


    try{

        $stmt = $conn->prepare("UPDATE contactos SET nombre = ?,empresa = ?, telefono = ? WHERE id = ? ");
        $stmt->bind_param("sssi", $nombre, $empresa, $telefono, $id);
        $stmt->execute();
        if($stmt->affected_rows == 1){
            $respuesta = array( "respuesta" => "correcto" );
        }else{
            $respuesta = array( "respuesta" => "Hubo un error" );
        }

        $stmt->close();
        $conn->close();

    }catch(Exception $e){

        $respuesta = array(
            "error" => $e->getMessage()
        );
    }

    echo json_encode($respuesta);

}
