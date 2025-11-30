<?php

/*Encabezada de las solicitudes*/
/*CORS*/
//header("Access-Control-Allow-Origin: * ");
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = ['http://localhost:5173'];

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); 
}

// Composer autoloader
require_once 'vendor/autoload.php';

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
require_once "models/sla.php";
require_once "models/user.php";
require_once "models/role.php";
require_once "models/special-field.php";
require_once "models/user-special-field.php";
require_once "models/ticket-attachment.php";
require_once "models/timeline.php";
require_once "models/user_ticket.php";
require_once "models/notification.php";



/***--- Agregar todos los controladores*/
require_once "controllers/category.php";
require_once "controllers/priority.php";
require_once "controllers/status.php";
require_once "controllers/ticket-label.php";
require_once "controllers/ticket.php";
require_once "controllers/sla.php";
require_once "controllers/user.php";
require_once "controllers/role.php";
require_once "controllers/special-field.php";
require_once "controllers/timeline.php";
require_once "controllers/user-ticket.php";
require_once "controllers/ticket-attachment.php";
require_once "controllers/notification.php";

//Enrutador
require_once "routes/RoutesController.php";
$index = new RoutesController();
$index->index();


