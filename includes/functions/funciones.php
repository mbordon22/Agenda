<?php 

    //Obtenemos todos los contactos
    function obtenerContactos(){
        include_once("bd.php");

        try{
            return $conn->query("SELECT * FROM `contactos`");
        
        }catch(Exception $e){

            echo "Error!!". $e->getMessage(). "<br>";
            return false;
        }

    }

    //Obtener un contacto por medio del id
    function obtenerContacto($id){
        include_once("bd.php");

        try{
            return $conn->query("SELECT * FROM `contactos` WHERE id = $id");
        
        }catch(Exception $e){

            echo "Error!!". $e->getMessage(). "<br>";
            return false;
        }

    }


?>