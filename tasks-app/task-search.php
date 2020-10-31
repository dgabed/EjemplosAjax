<?php

    include('database.php');

    $search = $_POST['search'];
    if(!empty($search)){
        $query = "SELECT * FROM task WHERE name LIKE '$search%'";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die("Error de consulta". mysqli_error($connection));
        }

        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[]=array(
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description']
            );
        }
        //transformo en formato json con encode, 
        $jsonstring = json_encode($json);
        echo $jsonstring;//y lo devuelvo en formato de string

    }






?>