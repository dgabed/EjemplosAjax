<?php

    include('database.php');

    $id = $_POST['id'];
    $query = "SELECT * FROM task WHERE id = $id";
    $result = mysqli_query($connection, $query);
    
    if(!$result){
        die('Consulta de selección fallida');
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id']
        );
    }

    $jsonstring = json_encode($json[0]);//Para que devuelva un solo elemento y no un array
    echo $jsonstring;
?>