<?php
// Composer autoloader
require_once 'vendor/autoload.php';
/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

/*--- Requerimientos Clases o librerías*/
require_once "controllers/core/Config.php";
require_once "controllers/core/HandleException.php";
require_once "controllers/core/Logger.php";
require_once "controllers/core/MySqlConnect.php";
require_once "controllers/core/Request.php";
require_once "controllers/core/Response.php";

/***--- Agregar todos los modelos*/
require_once "models/category.php";
require_once "models/priority.php";
require_once "models/status.php";
require_once "models/ticket-label.php";
require_once "models/ticket.php";


/***--- Agregar todos los controladores*/
require_once "controllers/category.php";
require_once "controllers/priority.php";
require_once "controllers/status.php";
require_once "controllers/ticket-label.php";
require_once "controllers/ticket.php";

//Enrutador
require_once "routes/RoutesController.php";
$index = new RoutesController();
$index->index();


