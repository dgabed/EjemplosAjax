<?php

    include('database.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];

    $query = "UPDATE task SET name = '$name', description = '$description' WHERE
    id = '$id'";

    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Consulta de actualización fallida');
    }

    $jsonstring = json_encode($json[0]);
    echo "Tarea actualizada satisfactoriamente";
?>