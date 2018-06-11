<?php


  header('Access-Control-Allow-Origin: *');

  $mysqli = new mysqli("localhost", "root", "", "formulario");
	if ($mysqli->connect_error){

      $respuesta = array(
        'error' => TRUE,
        'mensaje' => 'Error interno del servidor: Imposible acceder a la base de datos'
      );
      echo json_encode($respuesta);
    	exit();

  }

  $nombre = $_POST['nombre'];
  $correo = $_POST['correo'];
  $contrasena = $_POST['contrasena'];



  $sql = "INSERT INTO usuario (nombre, correo, contrasena) VALUES ('$nombre','$correo','$contrasena')";
  $resultado = $mysqli->query($sql);

  if(!$resultado){
    $respuesta = array(
      'error' => TRUE,
      'mensaje' => 'Ocurrió un error al insertar el usuario en la base de datos'
    );
    echo json_encode($respuesta);
    exit();
  }

  $id_generado = $mysqli->insert_id;
  $nueva_ruta = './'.$id_generado.'/';
  $resultado = mkdir($nueva_ruta, 0700);

  if(!$resultado){
    $respuesta = array(
      'error' => TRUE,
      'mensaje' => 'Ocurrió un error al crear el directorio para el usuario'
    );
    echo json_encode($respuesta);
    exit();
  }

  $fotografias = array();
  if(isset($_FILES['foto1']))
    array_push($fotografias, 'foto1');
  if(isset($_FILES['foto2']))
    array_push($fotografias, 'foto2');
  if(isset($_FILES['foto3']))
    array_push($fotografias, 'foto3');
  if(isset($_FILES['foto4']))
    array_push($fotografias, 'foto4');
  if(isset($_FILES['foto5']))
    array_push($fotografias, 'foto5');
  if(isset($_FILES['foto6']))
    array_push($fotografias, 'foto6');
  if(isset($_FILES['foto7']))
    array_push($fotografias, 'foto7');
  if(isset($_FILES['foto8']))
    array_push($fotografias, 'foto8');
  if(isset($_FILES['foto9']))
    array_push($fotografias, 'foto9');
  if(isset($_FILES['foto10']))
    array_push($fotografias, 'foto10');

  foreach ($fotografias as $key => $value) {

    $target = $nueva_ruta . basename( $_FILES[$value]['name']);

    if (move_uploaded_file($_FILES[$value]['tmp_name'], $target)) {

      $mi_dominio = 'http://127.0.0.1/ionic';
      $variable_temp = $mi_dominio . substr($target, 1);

      $sql = "INSERT INTO fotos (ruta, usuario_idusuario) VALUES ('$variable_temp','$id_generado')";
      $resultado = $mysqli->query($sql);

      if(!$resultado){
        $respuesta = array(
          'error' => TRUE,
          'mensaje' => 'Ocurrió un error subir la imagen número '.($key + 1).' inténtalo de nuevo'
        );
        echo json_encode($respuesta);
        exit();
      }
    }else{
      $respuesta = array(
        'error' => TRUE,
        'mensaje' => 'Ocurrió un error subir la imagen número '.($key + 1).' inténtalo de nuevo'
      );
      echo json_encode($respuesta);
      exit();
    }
  }


  $respuesta = array(
    'error' => FALSE,
    'mensaje' => 'Transacción realizada con éxito'
  );

  echo json_encode($respuesta);;


 ?>
