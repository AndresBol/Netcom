-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: netcom
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'IT',1),(2,'Service Desk',1),(3,'Field Team',1),(4,'Engineering',1),(5,'Test Category',0),(6,'Test Categories',0),(7,'Test Categories',0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_notification_user` (`user_id`),
  CONSTRAINT `fk_notification_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=355 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (28,15,'Ticket assignation','Ticket assignated to Ana Lucia Rojas',1,'2025-11-29 23:53:24',0),(29,15,'Ticket created','Ticket created by Ana Lucia Rojas',1,'2025-11-29 23:53:28',0),(30,15,'Ticket assignation','Ticket assignated to Ana Lucia Rojas',1,'2025-11-29 23:54:59',0),(31,15,'Ticket created','Ticket created by Ana Lucia Rojas',1,'2025-11-29 23:55:03',0),(32,4,'Ticket assignation','Ticket assignated to Andrés Villalobos Soto',1,'2025-11-29 23:57:30',0),(33,15,'Ticket assignation','Ticket assignated to Andrés Villalobos Soto',1,'2025-11-29 23:57:33',0),(34,4,'Change made','status: Pending -> Assigned',1,'2025-11-29 23:57:37',0),(35,15,'Change made','status: Pending -> Assigned',1,'2025-11-29 23:57:41',0),(36,4,'Ticket assignation','Ticket assignated to Andrés Villalobos Soto',1,'2025-11-29 23:57:45',0),(37,15,'Ticket assignation','Ticket assignated to Andrés Villalobos Soto',1,'2025-11-29 23:57:48',0),(38,4,'Change made','status: Pending -> Assigned',1,'2025-11-29 23:57:53',0),(39,15,'Change made','status: Pending -> Assigned',1,'2025-11-29 23:57:56',0),(40,3,'Ticket assignation','Ticket assignated to Carlos Méndez López',1,'2025-11-29 23:59:38',0),(41,15,'Ticket assignation','Ticket assignated to Carlos Méndez López',1,'2025-11-29 23:59:41',0),(42,3,'Change made','status: Pending -> Assigned',1,'2025-11-29 23:59:45',0),(43,15,'Change made','status: Pending -> Assigned',1,'2025-11-29 23:59:48',0),(44,5,'Ticket assignation','Ticket assignated to Verónica Salazar Mora',1,'2025-11-29 23:59:53',0),(45,15,'Ticket assignation','Ticket assignated to Verónica Salazar Mora',1,'2025-11-29 23:59:56',0),(46,5,'Change made','status: Pending -> Assigned',1,'2025-11-30 00:00:00',0),(47,15,'Change made','status: Pending -> Assigned',1,'2025-11-30 00:00:03',0),(48,15,'Ticket assignation','Ticket assignated to Ana Lucia Rojas',1,'2025-11-30 00:02:41',0),(49,15,'Ticket created','Ticket created by Ana Lucia Rojas',1,'2025-11-30 00:02:45',0),(50,5,'Ticket assignation','Ticket assignated to Verónica Salazar Mora',1,'2025-11-30 00:03:12',0),(51,15,'Ticket assignation','Ticket assignated to Verónica Salazar Mora',1,'2025-11-30 00:03:15',0),(52,5,'Change made','status: Pending -> Assigned',1,'2025-11-30 00:03:20',0),(53,15,'Change made','status: Pending -> Assigned',1,'2025-11-30 00:03:23',0),(54,4,'Ticket assignation','Ticket assignated to Andrés Villalobos Soto',1,'2025-11-30 00:03:27',0),(55,15,'Ticket assignation','Ticket assignated to Andrés Villalobos Soto',1,'2025-11-30 00:03:31',0),(56,4,'Change made','status: Pending -> Assigned',1,'2025-11-30 00:03:35',0),(57,15,'Change made','status: Pending -> Assigned',1,'2025-11-30 00:03:38',0),(58,15,'Ticket# 42 | PC issue','Ticket assignation\nTicket assignated to Ana Lucia Rojas',1,'2025-11-30 00:23:58',0),(59,15,'Ticket# 42 | PC issue','Ticket created\nTicket created by Ana Lucia Rojas',1,'2025-11-30 00:24:02',0),(60,3,'Ticket# 42 | PC issue','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-11-30 00:27:35',0),(61,15,'Ticket# 42 | PC issue','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-11-30 00:27:38',0),(62,3,'Ticket# 42 | PC issue','Change made\nstatus: Pending -> Assigned',1,'2025-11-30 00:27:43',0),(63,15,'Ticket# 42 | PC issue','Change made\nstatus: Pending -> Assigned',1,'2025-11-30 00:27:46',0),(64,1,'Ticket# 43 | d','Ticket assignation\nTicket assignated to Juan García Bolaños',1,'2025-11-30 00:47:34',0),(65,1,'Ticket# 43 | d','Ticket created\nTicket created by Juan García Bolaños',1,'2025-11-30 00:47:38',0),(66,4,'Ticket# 43 | d','Ticket assignation\nTicket assignated to Andrés Villalobos Soto',1,'2025-11-30 00:48:01',0),(67,1,'Ticket# 43 | d','Ticket assignation\nTicket assignated to Andrés Villalobos Soto',1,'2025-11-30 00:48:03',0),(68,4,'Ticket# 43 | d','Change made\nstatus: Pending -> Assigned',1,'2025-11-30 00:48:07',0),(69,1,'Ticket# 43 | d','Change made\nstatus: Pending -> Assigned',1,'2025-11-30 00:48:11',0),(70,4,'Ticket# 43 | Test','Change made\ntitle: d -> Test',1,'2025-11-30 00:49:00',0),(71,1,'Ticket# 43 | Test','Change made\ntitle: d -> Test',1,'2025-11-30 00:49:03',0),(72,15,'Ticket# 44 | Email issues','Ticket assignation\nTicket assignated to Ana Lucia Rojas',1,'2025-11-30 00:51:53',0),(73,15,'Ticket# 44 | Email issues','Ticket created\nTicket created by Ana Lucia Rojas',1,'2025-11-30 00:51:56',0),(74,15,'Ticket# 45 | PC is not responding','Ticket assignation\nTicket assignated to Ana Lucia Rojas',1,'2025-11-30 00:53:17',0),(75,15,'Ticket# 45 | PC is not responding','Ticket created\nTicket created by Ana Lucia Rojas',1,'2025-11-30 00:53:21',0),(76,3,'Ticket# 45 | PC is not responding','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-11-30 00:56:26',0),(77,15,'Ticket# 45 | PC is not responding','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-11-30 00:56:29',0),(78,3,'Ticket# 45 | PC is not responding','Change made\nstatus: Pending -> Assigned',1,'2025-11-30 00:56:33',0),(79,15,'Ticket# 45 | PC is not responding','Change made\nstatus: Pending -> Assigned',1,'2025-11-30 00:56:36',0),(80,3,'Ticket# 44 | Email issues','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-11-30 00:56:40',0),(81,15,'Ticket# 44 | Email issues','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-11-30 00:56:43',0),(82,3,'Ticket# 44 | Email issues','Change made\nstatus: Pending -> Assigned',1,'2025-11-30 00:56:47',0),(83,15,'Ticket# 44 | Email issues','Change made\nstatus: Pending -> Assigned',1,'2025-11-30 00:56:51',0),(84,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-03 20:03:22',1),(85,10,'Welcome Back!','Welcome to Netcom, Ricardo Molina Céspedes! You have successfully logged into the application.',1,'2025-12-05 21:27:18',1),(86,10,'Ticket# 46 | Server Rejected error message','Ticket assignation\nTicket assignated to Ricardo Molina Céspedes',1,'2025-12-05 21:29:27',1),(87,10,'Ticket# 46 | Server Rejected error message','Ticket created\nTicket created by Ricardo Molina Céspedes',1,'2025-12-05 21:29:28',1),(88,7,'Welcome Back!','Welcome to Netcom, Paola Hernández Vargas! You have successfully logged into the application.',1,'2025-12-05 21:30:42',0),(89,7,'Ticket# 47 | Mail Alert message ','Ticket assignation\nTicket assignated to Paola Hernández Vargas',1,'2025-12-05 21:33:58',0),(90,7,'Ticket# 47 | Mail Alert message ','Ticket created\nTicket created by Paola Hernández Vargas',1,'2025-12-05 21:33:59',0),(91,8,'Welcome Back!','Welcome to Netcom, Luis Alberto Castillo! You have successfully logged into the application.',1,'2025-12-05 21:34:58',1),(92,6,'Welcome Back!','Welcome to Netcom, José Ramírez Calderón! You have successfully logged into the application.',1,'2025-12-05 21:40:15',0),(93,6,'Ticket# 48 | The Coaxial Cable is broken ','Ticket assignation\nTicket assignated to José Ramírez Calderón',1,'2025-12-05 21:42:30',0),(94,6,'Ticket# 48 | The Coaxial Cable is broken ','Ticket created\nTicket created by José Ramírez Calderón',1,'2025-12-05 21:42:30',0),(95,16,'Welcome Back!','Welcome to Netcom, Javier Morales Campos! You have successfully logged into the application.',1,'2025-12-05 21:43:18',0),(96,16,'Ticket# 49 | Modem error message code: 692','Ticket assignation\nTicket assignated to Javier Morales Campos',1,'2025-12-05 21:46:19',0),(97,16,'Ticket# 49 | Modem error message code: 692','Ticket created\nTicket created by Javier Morales Campos',1,'2025-12-05 21:46:20',0),(98,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-05 21:47:05',0),(99,4,'Ticket# 49 | Modem error message code: 692','Ticket assignation\nTicket assignated to Andrés Villalobos Soto',1,'2025-12-05 21:47:13',0),(100,16,'Ticket# 49 | Modem error message code: 692','Ticket assignation\nTicket assignated to Andrés Villalobos Soto',1,'2025-12-05 21:47:13',0),(101,4,'Ticket# 49 | Modem error message code: 692','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 21:47:14',0),(102,16,'Ticket# 49 | Modem error message code: 692','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 21:47:14',0),(103,4,'Ticket# 46 | Server Rejected error message','Ticket assignation\nTicket assignated to Andrés Villalobos Soto',1,'2025-12-05 21:47:15',0),(104,10,'Ticket# 46 | Server Rejected error message','Ticket assignation\nTicket assignated to Andrés Villalobos Soto',1,'2025-12-05 21:47:15',1),(105,4,'Ticket# 46 | Server Rejected error message','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 21:47:15',0),(106,10,'Ticket# 46 | Server Rejected error message','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 21:47:15',1),(107,5,'Ticket# 48 | The Coaxial Cable is broken ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 21:47:16',0),(108,6,'Ticket# 48 | The Coaxial Cable is broken ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 21:47:16',0),(109,5,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 21:47:16',0),(110,6,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 21:47:16',0),(111,5,'Ticket# 47 | Mail Alert message ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 21:47:16',0),(112,7,'Ticket# 47 | Mail Alert message ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 21:47:16',0),(113,5,'Ticket# 47 | Mail Alert message ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 21:47:17',0),(114,7,'Ticket# 47 | Mail Alert message ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 21:47:17',0),(115,9,'Welcome Back!','Welcome to Netcom, Gabriela Solís Jiménez! You have successfully logged into the application.',1,'2025-12-05 21:51:55',0),(116,9,'Ticket# 50 | Ink for the office printer ','Ticket assignation\nTicket assignated to Gabriela Solís Jiménez',1,'2025-12-05 21:54:12',0),(117,9,'Ticket# 50 | Ink for the office printer ','Ticket created\nTicket created by Gabriela Solís Jiménez',1,'2025-12-05 21:54:13',0),(118,15,'Welcome Back!','Welcome to Netcom, Ana Lucia Rojas! You have successfully logged into the application.',1,'2025-12-05 22:04:08',0),(119,15,'Ticket# 51 | Sign in error message ','Ticket assignation\nTicket assignated to Ana Lucia Rojas',1,'2025-12-05 22:06:38',0),(120,15,'Ticket# 51 | Sign in error message ','Ticket created\nTicket created by Ana Lucia Rojas',1,'2025-12-05 22:06:38',0),(121,10,'Welcome Back!','Welcome to Netcom, Ricardo Molina Céspedes! You have successfully logged into the application.',1,'2025-12-05 22:07:19',1),(122,10,'Ticket# 52 | Network Connection Prompt','Ticket assignation\nTicket assignated to Ricardo Molina Céspedes',1,'2025-12-05 22:08:56',1),(123,10,'Ticket# 52 | Network Connection Prompt','Ticket created\nTicket created by Ricardo Molina Céspedes',1,'2025-12-05 22:08:57',1),(124,16,'Welcome Back!','Welcome to Netcom, Javier Morales Campos! You have successfully logged into the application.',1,'2025-12-05 22:09:42',0),(125,16,'Ticket# 53 | Modem Setup assistance','Ticket assignation\nTicket assignated to Javier Morales Campos',1,'2025-12-05 22:11:09',0),(126,16,'Ticket# 53 | Modem Setup assistance','Ticket created\nTicket created by Javier Morales Campos',1,'2025-12-05 22:11:10',0),(127,9,'Welcome Back!','Welcome to Netcom, Gabriela Solís Jiménez! You have successfully logged into the application.',1,'2025-12-05 22:12:22',0),(128,9,'Ticket# 54 | IP configuration is not working ','Ticket assignation\nTicket assignated to Gabriela Solís Jiménez',1,'2025-12-05 22:13:51',0),(129,9,'Ticket# 54 | IP configuration is not working ','Ticket created\nTicket created by Gabriela Solís Jiménez',1,'2025-12-05 22:13:52',0),(130,15,'Welcome Back!','Welcome to Netcom, Ana Lucia Rojas! You have successfully logged into the application.',1,'2025-12-05 22:14:33',0),(131,15,'Ticket# 55 | Router red light and no internet. ','Ticket assignation\nTicket assignated to Ana Lucia Rojas',1,'2025-12-05 22:16:37',0),(132,15,'Ticket# 55 | Router red light and no internet. ','Ticket created\nTicket created by Ana Lucia Rojas',1,'2025-12-05 22:16:38',0),(133,7,'Welcome Back!','Welcome to Netcom, Paola Hernández Vargas! You have successfully logged into the application.',1,'2025-12-05 22:17:28',0),(134,7,'Ticket# 56 | Tablo TV is not working ','Ticket assignation\nTicket assignated to Paola Hernández Vargas',1,'2025-12-05 22:18:27',0),(135,7,'Ticket# 56 | Tablo TV is not working ','Ticket created\nTicket created by Paola Hernández Vargas',1,'2025-12-05 22:18:28',0),(136,8,'Welcome Back!','Welcome to Netcom, Luis Alberto Castillo! You have successfully logged into the application.',1,'2025-12-05 22:19:10',0),(137,8,'Ticket# 57 | Printer is getting an error message on the screen','Ticket assignation\nTicket assignated to Luis Alberto Castillo',1,'2025-12-05 22:20:28',0),(138,8,'Ticket# 57 | Printer is getting an error message on the screen','Ticket created\nTicket created by Luis Alberto Castillo',1,'2025-12-05 22:20:28',0),(139,16,'Welcome Back!','Welcome to Netcom, Javier Morales Campos! You have successfully logged into the application.',1,'2025-12-05 22:23:27',0),(140,16,'Ticket# 58 | Latency issue with my internet and low speed. ','Ticket assignation\nTicket assignated to Javier Morales Campos',1,'2025-12-05 22:25:27',0),(141,16,'Ticket# 58 | Latency issue with my internet and low speed. ','Ticket created\nTicket created by Javier Morales Campos',1,'2025-12-05 22:25:28',0),(142,10,'Welcome Back!','Welcome to Netcom, Ricardo Molina Céspedes! You have successfully logged into the application.',1,'2025-12-05 22:26:52',1),(143,10,'Ticket# 59 | The wall coaxial connection is broken ','Ticket assignation\nTicket assignated to Ricardo Molina Céspedes',1,'2025-12-05 22:29:20',0),(144,10,'Ticket# 59 | The wall coaxial connection is broken ','Ticket created\nTicket created by Ricardo Molina Céspedes',1,'2025-12-05 22:29:21',0),(145,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-05 22:45:52',0),(146,5,'Ticket# 58 | Latency issue with my internet and low speed. ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:20',0),(147,16,'Ticket# 58 | Latency issue with my internet and low speed. ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:20',0),(148,5,'Ticket# 58 | Latency issue with my internet and low speed. ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:21',0),(149,16,'Ticket# 58 | Latency issue with my internet and low speed. ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:21',0),(150,5,'Ticket# 55 | Router red light and no internet. ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:22',0),(151,15,'Ticket# 55 | Router red light and no internet. ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:22',0),(152,5,'Ticket# 55 | Router red light and no internet. ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:22',0),(153,15,'Ticket# 55 | Router red light and no internet. ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:22',0),(154,5,'Ticket# 52 | Network Connection Prompt','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:23',0),(155,10,'Ticket# 52 | Network Connection Prompt','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:23',0),(156,5,'Ticket# 52 | Network Connection Prompt','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:23',0),(157,10,'Ticket# 52 | Network Connection Prompt','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:23',0),(158,5,'Ticket# 56 | Tablo TV is not working ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:23',0),(159,7,'Ticket# 56 | Tablo TV is not working ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:23',0),(160,5,'Ticket# 56 | Tablo TV is not working ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:24',0),(161,7,'Ticket# 56 | Tablo TV is not working ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:24',0),(162,5,'Ticket# 54 | IP configuration is not working ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:24',0),(163,9,'Ticket# 54 | IP configuration is not working ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:24',0),(164,5,'Ticket# 54 | IP configuration is not working ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:25',0),(165,9,'Ticket# 54 | IP configuration is not working ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:25',0),(166,5,'Ticket# 51 | Sign in error message ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:25',0),(167,15,'Ticket# 51 | Sign in error message ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:25',0),(168,5,'Ticket# 51 | Sign in error message ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:26',0),(169,15,'Ticket# 51 | Sign in error message ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:26',0),(170,3,'Ticket# 50 | Ink for the office printer ','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-05 22:46:26',0),(171,9,'Ticket# 50 | Ink for the office printer ','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-05 22:46:26',0),(172,3,'Ticket# 50 | Ink for the office printer ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:27',0),(173,9,'Ticket# 50 | Ink for the office printer ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:27',0),(174,5,'Ticket# 53 | Modem Setup assistance','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:28',0),(175,16,'Ticket# 53 | Modem Setup assistance','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:28',0),(176,5,'Ticket# 53 | Modem Setup assistance','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:28',0),(177,16,'Ticket# 53 | Modem Setup assistance','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:28',0),(178,5,'Ticket# 59 | The wall coaxial connection is broken ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:29',0),(179,10,'Ticket# 59 | The wall coaxial connection is broken ','Ticket assignation\nTicket assignated to Verónica Salazar Mora',1,'2025-12-05 22:46:29',0),(180,5,'Ticket# 59 | The wall coaxial connection is broken ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:29',0),(181,10,'Ticket# 59 | The wall coaxial connection is broken ','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:29',0),(182,3,'Ticket# 57 | Printer is getting an error message on the screen','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-05 22:46:29',0),(183,8,'Ticket# 57 | Printer is getting an error message on the screen','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-05 22:46:29',0),(184,3,'Ticket# 57 | Printer is getting an error message on the screen','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:30',0),(185,8,'Ticket# 57 | Printer is getting an error message on the screen','Change made\nstatus: Pending -> Assigned',1,'2025-12-05 22:46:30',0),(186,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-06 11:12:05',0),(187,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-06 11:27:09',0),(188,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-07 12:00:34',0),(189,15,'Welcome Back!','Welcome to Netcom, Ana Lucia Rojas! You have successfully logged into the application.',1,'2025-12-07 12:03:37',0),(190,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-07 12:08:58',0),(191,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-07 12:13:05',0),(192,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-07 12:33:17',0),(193,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-07 12:51:24',0),(194,5,'Welcome Back!','Welcome to Netcom, Verónica Salazar Mora! You have successfully logged into the application.',1,'2025-12-07 15:14:57',0),(195,5,'Ticket# 53 | Modem Setup assistance','Reach the customer\nGetting more details',1,'2025-12-07 15:15:35',0),(196,16,'Ticket# 53 | Modem Setup assistance','Reach the customer\nGetting more details',1,'2025-12-07 15:15:35',0),(197,5,'Ticket# 53 | Modem Setup assistance','Change made\nstatus: Assigned -> In Progress',1,'2025-12-07 15:15:37',0),(198,16,'Ticket# 53 | Modem Setup assistance','Change made\nstatus: Assigned -> In Progress',1,'2025-12-07 15:15:37',0),(199,5,'Ticket# 53 | Modem Setup assistance','No further assistance needed \nCustomer confirm that they already fix the issue ',1,'2025-12-07 15:16:32',0),(200,16,'Ticket# 53 | Modem Setup assistance','No further assistance needed \nCustomer confirm that they already fix the issue ',1,'2025-12-07 15:16:32',0),(201,5,'Ticket# 53 | Modem Setup assistance','Change made\nstatus: In Progress -> Resolved',1,'2025-12-07 15:16:33',0),(202,16,'Ticket# 53 | Modem Setup assistance','Change made\nstatus: In Progress -> Resolved',1,'2025-12-07 15:16:33',0),(203,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-07 15:17:57',0),(204,16,'Welcome Back!','Welcome to Netcom, Javier Morales Campos! You have successfully logged into the application.',1,'2025-12-07 15:18:45',0),(205,5,'Ticket# 53 | Modem Setup assistance','Change made\nrating: 0 -> 3, comment:  -> I am happy that I was able to resolved the issue by myself. But thanks for your assistance. ',1,'2025-12-07 15:19:59',0),(206,16,'Ticket# 53 | Modem Setup assistance','Change made\nrating: 0 -> 3, comment:  -> I am happy that I was able to resolved the issue by myself. But thanks for your assistance. ',1,'2025-12-07 15:19:59',0),(207,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-07 15:56:12',0),(208,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-08 17:16:47',0),(209,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-08 17:17:17',0),(210,16,'Welcome Back!','Welcome to Netcom, Javier Morales Campos! You have successfully logged into the application.',1,'2025-12-08 17:17:47',0),(211,16,'Ticket# 60 | Server not found error message','Ticket assignation\nTicket assignated to Javier Morales Campos',1,'2025-12-08 17:20:17',0),(212,16,'Ticket# 60 | Server not found error message','Ticket created\nTicket created by Javier Morales Campos',1,'2025-12-08 17:20:18',0),(213,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-08 17:22:56',0),(214,3,'Ticket# 60 | Server not found error message','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-08 17:23:05',0),(215,16,'Ticket# 60 | Server not found error message','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-08 17:23:05',0),(216,3,'Ticket# 60 | Server not found error message','Change made\nstatus: Pending -> Assigned',1,'2025-12-08 17:23:06',0),(217,16,'Ticket# 60 | Server not found error message','Change made\nstatus: Pending -> Assigned',1,'2025-12-08 17:23:06',0),(218,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-08 22:38:23',0),(219,3,'Welcome Back!','Welcome to Netcom, Carlos Méndez López! You have successfully logged into the application.',1,'2025-12-08 22:39:02',0),(220,3,'Ticket# 60 | Server not found error message','I am working on the case\nIn progress',1,'2025-12-08 22:39:35',0),(221,16,'Ticket# 60 | Server not found error message','I am working on the case\nIn progress',1,'2025-12-08 22:39:35',0),(222,3,'Ticket# 60 | Server not found error message','Change made\nstatus: Assigned -> In Progress',1,'2025-12-08 22:39:36',0),(223,16,'Ticket# 60 | Server not found error message','Change made\nstatus: Assigned -> In Progress',1,'2025-12-08 22:39:36',0),(224,3,'Ticket# 60 | Server not found error message','Find the solution\nApply the solution to the Server not found error',1,'2025-12-08 22:40:21',0),(225,16,'Ticket# 60 | Server not found error message','Find the solution\nApply the solution to the Server not found error',1,'2025-12-08 22:40:21',0),(226,3,'Ticket# 60 | Server not found error message','Change made\nstatus: In Progress -> Resolved',1,'2025-12-08 22:40:22',0),(227,16,'Ticket# 60 | Server not found error message','Change made\nstatus: In Progress -> Resolved',1,'2025-12-08 22:40:22',0),(228,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-08 22:40:55',0),(229,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-09 22:21:54',0),(230,1,'Ticket# 61 | Test','Ticket assignation\nTicket assignated to Juan García Bolaños',1,'2025-12-09 22:38:30',0),(231,1,'Ticket# 61 | Test','Ticket created\nTicket created by Juan García Bolaños',1,'2025-12-09 22:38:31',0),(232,3,'Ticket# 61 | Test','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-09 22:38:50',0),(233,1,'Ticket# 61 | Test','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-09 22:38:50',0),(234,3,'Ticket# 61 | Test','Change made\nstatus: Pending -> Assigned',1,'2025-12-09 22:38:51',0),(235,1,'Ticket# 61 | Test','Change made\nstatus: Pending -> Assigned',1,'2025-12-09 22:38:51',0),(236,3,'Ticket# 61 | Test','test\ntest',1,'2025-12-09 22:39:25',0),(237,1,'Ticket# 61 | Test','test\ntest',1,'2025-12-09 22:39:25',0),(238,3,'Ticket# 61 | Test','Change made\nstatus: Assigned -> In Progress',1,'2025-12-09 22:39:26',0),(239,1,'Ticket# 61 | Test','Change made\nstatus: Assigned -> In Progress',1,'2025-12-09 22:39:26',0),(240,3,'Ticket# 61 | Test','test\ntest',1,'2025-12-09 22:39:39',0),(241,1,'Ticket# 61 | Test','test\ntest',1,'2025-12-09 22:39:39',0),(242,3,'Ticket# 61 | Test','Change made\nstatus: In Progress -> Resolved',1,'2025-12-09 22:39:40',0),(243,1,'Ticket# 61 | Test','Change made\nstatus: In Progress -> Resolved',1,'2025-12-09 22:39:40',1),(244,5,'Ticket# 51 | Sign in error message ','test\ntest',1,'2025-12-09 22:44:08',0),(245,15,'Ticket# 51 | Sign in error message ','test\ntest',1,'2025-12-09 22:44:08',0),(246,5,'Ticket# 51 | Sign in error message ','Change made\nstatus: Assigned -> In Progress',1,'2025-12-09 22:44:10',0),(247,15,'Ticket# 51 | Sign in error message ','Change made\nstatus: Assigned -> In Progress',1,'2025-12-09 22:44:10',0),(248,5,'Ticket# 51 | Sign in error message ','test\ntest',1,'2025-12-09 22:44:25',0),(249,15,'Ticket# 51 | Sign in error message ','test\ntest',1,'2025-12-09 22:44:25',0),(250,5,'Ticket# 51 | Sign in error message ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-09 22:44:26',0),(251,15,'Ticket# 51 | Sign in error message ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-09 22:44:26',0),(252,5,'Ticket# 55 | Router red light and no internet. ','test\ntest',1,'2025-12-09 22:48:30',0),(253,15,'Ticket# 55 | Router red light and no internet. ','test\ntest',1,'2025-12-09 22:48:30',0),(254,5,'Ticket# 55 | Router red light and no internet. ','Change made\nstatus: Assigned -> In Progress',1,'2025-12-09 22:48:32',0),(255,15,'Ticket# 55 | Router red light and no internet. ','Change made\nstatus: Assigned -> In Progress',1,'2025-12-09 22:48:32',0),(256,5,'Ticket# 55 | Router red light and no internet. ','test\ntest',1,'2025-12-09 22:48:42',0),(257,15,'Ticket# 55 | Router red light and no internet. ','test\ntest',1,'2025-12-09 22:48:42',0),(258,5,'Ticket# 55 | Router red light and no internet. ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-09 22:48:43',0),(259,15,'Ticket# 55 | Router red light and no internet. ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-09 22:48:43',0),(260,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-09 23:38:17',0),(261,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 09:40:30',0),(262,4,'Ticket# 5 | Network failure in main office','In Progress\nWorking on support ticket',1,'2025-12-10 16:22:34',0),(263,8,'Ticket# 5 | Network failure in main office','In Progress\nWorking on support ticket',1,'2025-12-10 16:22:34',0),(264,4,'Ticket# 5 | Network failure in main office','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 16:22:36',0),(265,8,'Ticket# 5 | Network failure in main office','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 16:22:36',0),(266,4,'Welcome Back!','Welcome to Netcom, Andrés Villalobos Soto! You have successfully logged into the application.',1,'2025-12-10 16:24:14',0),(267,4,'Ticket# 5 | Network failure in main office','Fix the issue\nAble to fix the issue ',1,'2025-12-10 16:25:06',0),(268,8,'Ticket# 5 | Network failure in main office','Fix the issue\nAble to fix the issue ',1,'2025-12-10 16:25:06',0),(269,4,'Ticket# 5 | Network failure in main office','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 16:25:07',0),(270,8,'Ticket# 5 | Network failure in main office','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 16:25:07',0),(271,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 16:25:48',0),(272,3,'Ticket# 6 | Hardware inspection request','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-10 16:27:06',0),(273,5,'Ticket# 6 | Hardware inspection request','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-10 16:27:06',0),(274,8,'Ticket# 6 | Hardware inspection request','Ticket assignation\nTicket assignated to Carlos Méndez López',1,'2025-12-10 16:27:06',0),(275,3,'Welcome Back!','Welcome to Netcom, Carlos Méndez López! You have successfully logged into the application.',1,'2025-12-10 16:29:23',0),(276,3,'Ticket# 6 | Hardware inspection request','Taking a look on the issue \nReviewing the error ',1,'2025-12-10 16:30:03',0),(277,8,'Ticket# 6 | Hardware inspection request','Taking a look on the issue \nReviewing the error ',1,'2025-12-10 16:30:03',0),(278,3,'Ticket# 6 | Hardware inspection request','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 16:30:05',0),(279,8,'Ticket# 6 | Hardware inspection request','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 16:30:05',0),(280,3,'Ticket# 6 | Hardware inspection request','The computer suffer a thermal shutdown issue\nProceed with the replacement of the PC unit ',1,'2025-12-10 16:31:10',0),(281,8,'Ticket# 6 | Hardware inspection request','The computer suffer a thermal shutdown issue\nProceed with the replacement of the PC unit ',1,'2025-12-10 16:31:10',0),(282,3,'Ticket# 6 | Hardware inspection request','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 16:31:12',0),(283,8,'Ticket# 6 | Hardware inspection request','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 16:31:12',0),(284,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 16:32:00',0),(285,13,'Ticket# 8 | Printer not working','Ticket assignation\nTicket assignated to Diego Alvarez Fuentes',1,'2025-12-10 16:43:04',0),(286,28,'Ticket# 8 | Printer not working','Ticket assignation\nTicket assignated to Diego Alvarez Fuentes',1,'2025-12-10 16:43:04',0),(287,10,'Ticket# 8 | Printer not working','Ticket assignation\nTicket assignated to Diego Alvarez Fuentes',1,'2025-12-10 16:43:04',0),(288,13,'Welcome Back!','Welcome to Netcom, Diego Alvarez Fuentes! You have successfully logged into the application.',1,'2025-12-10 16:44:07',0),(289,13,'Ticket# 8 | Printer not working','Working on issue\nIn progress',1,'2025-12-10 16:49:45',0),(290,10,'Ticket# 8 | Printer not working','Working on issue\nIn progress',1,'2025-12-10 16:49:45',0),(291,13,'Ticket# 8 | Printer not working','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 16:49:46',0),(292,10,'Ticket# 8 | Printer not working','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 16:49:47',0),(293,13,'Ticket# 8 | Printer not working','Find the root cause of the issue \nThe customer is having a network connection issue with the printer. ',1,'2025-12-10 16:50:50',0),(294,10,'Ticket# 8 | Printer not working','Find the root cause of the issue \nThe customer is having a network connection issue with the printer. ',1,'2025-12-10 16:50:50',0),(295,13,'Ticket# 8 | Printer not working','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 16:50:53',0),(296,10,'Ticket# 8 | Printer not working','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 16:50:53',0),(297,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 16:51:35',1),(298,27,'Ticket# 48 | The Coaxial Cable is broken ','Ticket assignation\nTicket assignated to Josue Calderon',1,'2025-12-10 16:55:44',0),(299,6,'Ticket# 48 | The Coaxial Cable is broken ','Ticket assignation\nTicket assignated to Josue Calderon',1,'2025-12-10 16:55:44',0),(300,27,'Ticket# 48 | The Coaxial Cable is broken ','Ticket assignation\nTicket assignated to Josue Calderon',1,'2025-12-10 16:55:58',0),(301,6,'Ticket# 48 | The Coaxial Cable is broken ','Ticket assignation\nTicket assignated to Josue Calderon',1,'2025-12-10 16:55:58',0),(302,27,'Welcome Back!','Welcome to Netcom, Josue Calderon! You have successfully logged into the application.',1,'2025-12-10 16:58:24',0),(303,27,'Ticket# 48 | The Coaxial Cable is broken ','Working on case \nIn progress',1,'2025-12-10 16:59:09',0),(304,6,'Ticket# 48 | The Coaxial Cable is broken ','Working on case \nIn progress',1,'2025-12-10 16:59:09',0),(305,27,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 16:59:10',0),(306,6,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 16:59:10',0),(307,27,'Ticket# 48 | The Coaxial Cable is broken ','Sent a replacement for the coaxial cable to the customer\nApproved a replacement and one of our agent will go to the side to do the new installation of the cable. ',1,'2025-12-10 17:00:17',0),(308,6,'Ticket# 48 | The Coaxial Cable is broken ','Sent a replacement for the coaxial cable to the customer\nApproved a replacement and one of our agent will go to the side to do the new installation of the cable. ',1,'2025-12-10 17:00:17',0),(309,27,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 17:00:19',0),(310,6,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 17:00:19',0),(311,27,'Ticket# 48 | The Coaxial Cable is broken ','Approved a replacement for the cable\nSent a special field to do the installation of the new cable on site. ',1,'2025-12-10 17:05:16',0),(312,6,'Ticket# 48 | The Coaxial Cable is broken ','Approved a replacement for the cable\nSent a special field to do the installation of the new cable on site. ',1,'2025-12-10 17:05:16',0),(313,27,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 17:05:17',0),(314,6,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 17:05:17',0),(315,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 17:08:37',1),(316,15,'Welcome Back!','Welcome to Netcom, Ana Lucia Rojas! You have successfully logged into the application.',1,'2025-12-10 17:10:11',0),(317,15,'Ticket# 62 | I want to process a Disconnection ','Ticket assignation\nTicket assignated to Ana Lucia Rojas',1,'2025-12-10 17:11:37',0),(318,15,'Ticket# 62 | I want to process a Disconnection ','Ticket created\nTicket created by Ana Lucia Rojas',1,'2025-12-10 17:11:38',0),(319,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 17:12:14',1),(320,15,'Ticket# 62 | I want to process a Disconnection ','Change made\nstatus: Pending -> Assigned',1,'2025-12-10 17:15:22',0),(321,14,'Ticket# 62 | I want to process a Disconnection ','Ticket assignation\nTicket assignated to Carla Dominguez ',1,'2025-12-10 17:15:23',0),(322,15,'Ticket# 62 | I want to process a Disconnection ','Ticket assignation\nTicket assignated to Carla Dominguez ',1,'2025-12-10 17:15:23',0),(323,14,'Welcome Back!','Welcome to Netcom, Carla Dominguez ! You have successfully logged into the application.',1,'2025-12-10 17:17:36',0),(324,14,'Ticket# 62 | I want to process a Disconnection ','Reviewing the case\nTaking a look at the request',1,'2025-12-10 17:18:18',0),(325,15,'Ticket# 62 | I want to process a Disconnection ','Reviewing the case\nTaking a look at the request',1,'2025-12-10 17:18:18',0),(326,14,'Ticket# 62 | I want to process a Disconnection ','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 17:18:20',0),(327,15,'Ticket# 62 | I want to process a Disconnection ','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 17:18:20',0),(328,14,'Ticket# 62 | I want to process a Disconnection ','Reach out the customer to coordinate the visit to the disconnection\nScheduled the disonnection of the service. ',1,'2025-12-10 17:19:33',0),(329,15,'Ticket# 62 | I want to process a Disconnection ','Reach out the customer to coordinate the visit to the disconnection\nScheduled the disonnection of the service. ',1,'2025-12-10 17:19:33',0),(330,14,'Ticket# 62 | I want to process a Disconnection ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 17:19:35',0),(331,15,'Ticket# 62 | I want to process a Disconnection ','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 17:19:35',0),(332,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 17:20:03',1),(333,15,'Welcome Back!','Welcome to Netcom, Ana Lucia Rojas! You have successfully logged into the application.',1,'2025-12-10 17:21:15',0),(334,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 17:23:18',1),(335,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 17:36:33',1),(336,1,'Ticket# 63 | Internal PC issue','Ticket assignation\nTicket assignated to Juan García Bolaños',1,'2025-12-10 17:46:30',0),(337,1,'Ticket# 63 | Internal PC issue','Ticket created\nTicket created by Juan García Bolaños',1,'2025-12-10 17:46:31',0),(338,1,'Ticket# 63 | Internal PC issue','Change made\nstatus: Pending -> Assigned',1,'2025-12-10 17:49:39',0),(339,28,'Ticket# 63 | Internal PC issue','Ticket assignation\nTicket assignated to Juan Garita',1,'2025-12-10 17:49:40',0),(340,1,'Ticket# 63 | Internal PC issue','Ticket assignation\nTicket assignated to Juan Garita',1,'2025-12-10 17:49:40',0),(341,6,'Welcome Back!','Welcome to Netcom, José Ramírez Calderón! You have successfully logged into the application.',1,'2025-12-10 17:51:36',0),(342,27,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nrating: 0 -> 1, comment:  -> I am not happy with the server it took so long to resolve this issue. ',1,'2025-12-10 17:52:12',0),(343,6,'Ticket# 48 | The Coaxial Cable is broken ','Change made\nrating: 0 -> 1, comment:  -> I am not happy with the server it took so long to resolve this issue. ',1,'2025-12-10 17:52:12',0),(344,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 17:52:40',0),(345,28,'Welcome Back!','Welcome to Netcom, Juan Garita! You have successfully logged into the application.',1,'2025-12-10 17:54:47',0),(346,28,'Ticket# 63 | Internal PC issue','Already talk to the affected user \nWorking on the solution',1,'2025-12-10 17:55:27',0),(347,1,'Ticket# 63 | Internal PC issue','Already talk to the affected user \nWorking on the solution',1,'2025-12-10 17:55:27',0),(348,28,'Ticket# 63 | Internal PC issue','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 17:55:29',0),(349,1,'Ticket# 63 | Internal PC issue','Change made\nstatus: Assigned -> In Progress',1,'2025-12-10 17:55:29',0),(350,28,'Ticket# 63 | Internal PC issue','Determine that the issue was not related with the VPN\nThe PC was not connected to the UTP cable, there for no internet or Network connection was establish',1,'2025-12-10 17:56:26',0),(351,1,'Ticket# 63 | Internal PC issue','Determine that the issue was not related with the VPN\nThe PC was not connected to the UTP cable, there for no internet or Network connection was establish',1,'2025-12-10 17:56:26',0),(352,28,'Ticket# 63 | Internal PC issue','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 17:56:27',0),(353,1,'Ticket# 63 | Internal PC issue','Change made\nstatus: In Progress -> Resolved',1,'2025-12-10 17:56:27',0),(354,1,'Welcome Back!','Welcome to Netcom, Juan García Bolaños! You have successfully logged into the application.',1,'2025-12-10 17:56:52',0);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priority`
--

DROP TABLE IF EXISTS `priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priority`
--

LOCK TABLES `priority` WRITE;
/*!40000 ALTER TABLE `priority` DISABLE KEYS */;
INSERT INTO `priority` VALUES (1,'Low',1),(2,'Medium',1),(3,'High',1),(4,'Critical',1);
/*!40000 ALTER TABLE `priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Administrator',1),(2,'Technician',1),(3,'Client',1);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sla`
--

DROP TABLE IF EXISTS `sla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `priority_id` int(11) NOT NULL,
  `response_time` int(11) NOT NULL,
  `resolution_time` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_sla_category` (`category_id`),
  KEY `fk_sla_priority` (`priority_id`),
  CONSTRAINT `fk_sla_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sla_priority` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sla`
--

LOCK TABLES `sla` WRITE;
/*!40000 ALTER TABLE `sla` DISABLE KEYS */;
INSERT INTO `sla` VALUES (1,1,4,15,240,'IT HVC',1),(2,1,3,30,480,'IT A',1),(3,1,2,45,600,'IT B',1),(4,1,1,60,720,'IT C',1),(5,2,4,15,240,'Service Desk HVC',1),(6,2,3,30,480,'Service Desk A',1),(7,2,2,45,600,'Service Desk B',1),(8,2,1,60,720,'Service Desk C',1),(9,3,4,60,480,'Field Team HVC',1),(10,3,3,60,480,'Field Team A',1),(11,3,2,60,480,'Field Team B',1),(12,3,1,60,960,'Field Team C',1),(13,4,4,1440,4320,'Engineering HVC',1),(14,4,3,1440,4320,'Engineering A',1),(15,4,2,1440,4320,'Engineering B',1),(16,4,1,1440,4320,'Engineering C',1),(17,6,3,1,2,'Test SLA',0),(18,7,4,30,60,'SLA test 2',0);
/*!40000 ALTER TABLE `sla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_field`
--

DROP TABLE IF EXISTS `special_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_field` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `category_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_special_field_category` (`category_id`),
  CONSTRAINT `fk_special_field_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_field`
--

LOCK TABLES `special_field` WRITE;
/*!40000 ALTER TABLE `special_field` DISABLE KEYS */;
INSERT INTO `special_field` VALUES (1,'Cybersecurity',1,1),(2,'Internal Technical Support',1,1),(3,'Server and Backup Administration',1,1),(4,'Hardware and Software Management',1,1),(5,'External Technical Support',2,1),(6,'Telephony / IPTV',2,1),(7,'Connectivity and Firewall Management',2,1),(8,'Physical Infrastructure Maintenance',3,1),(9,'Electrical / Outside Plant Equipment',3,1),(10,'Field Installations',3,1),(11,'Network Planning and Optimization',4,1),(12,'Critical Incident Analysis',4,1),(13,'Internal Networks',4,1),(14,'Test specialty',6,0),(15,'Test specialty',7,0);
/*!40000 ALTER TABLE `special_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Pending',1),(2,'Assigned',1),(3,'In Progress',1),(4,'Resolved',1),(5,'Closed',1);
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `priority_id` int(11) NOT NULL,
  `label_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `notification_status` varchar(50) NOT NULL,
  `notified_on` datetime DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_ticket_status` (`status_id`),
  KEY `fk_ticket_category` (`category_id`),
  KEY `fk_ticket_priority` (`priority_id`),
  KEY `fk_ticket_label` (`label_id`),
  CONSTRAINT `fk_ticket_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_label` FOREIGN KEY (`label_id`) REFERENCES `ticket_label` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_priority` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,4,1,2,3,'Login issue with main system','I cannot access the main dashboard; it keeps saying invalid credentials even after resetting my password.','sent','2025-10-20 12:30:00',5,'Quickly resolved, very satisfied.','2025-10-20 09:15:00',1),(2,4,2,3,5,'Internet connection failure','The connection drops every few minutes since this morning. I think it may be an internal network issue.','sent','2025-10-21 11:30:00',4,'Resolved the same day, thank you.','2025-10-21 08:55:00',1),(3,4,1,1,2,'Software installation request','Please install the new office software package on my computer before Monday.','sent','2025-10-23 10:30:00',5,'Software installed correctly.','2025-10-22 14:40:00',1),(4,4,3,2,6,'Unusual noise in UPS unit','The UPS in the lab keeps beeping continuously. It might be a battery issue.','sent','2025-10-23 11:00:00',5,'UPS battery replaced and working.','2025-10-23 07:45:00',1),(5,4,4,3,7,'Network failure in main office','The administrative area lost access to the internal network. Switches might need to be checked.','pending','2025-10-25 10:00:00',0,NULL,'2025-10-24 09:30:00',1),(6,4,2,1,4,'Hardware inspection request','My computer shuts down after a few minutes of use. It might be overheating.','pending','2025-10-26 12:00:00',0,NULL,'2025-10-25 08:55:00',1),(7,4,2,2,3,'Email not syncing','My company email is not syncing on my mobile device.','sent','2025-10-27 16:00:00',4,'Good service, but took longer than expected.','2025-10-26 09:00:00',1),(8,4,1,3,7,'Printer not working','The main office printer does not print any documents; it shows a paper jam error even when empty.','pending','2025-10-27 10:00:00',0,NULL,'2025-10-26 10:30:00',1),(46,2,1,3,4,'Server Rejected error message','When I attempt to connect my workstation to the server, I start getting the attached error message. Please need some assistance asap! Thanks ','Pending',NULL,0,'','2025-11-05 21:29:26',1),(47,2,2,2,11,'Mail Alert message ','I am getting an alert message while sending an email. It says something about the mail server reponse that has being blocked. Could you please take a look and help me? I upload the Alert message. Thanks  ','Pending',NULL,0,'','2025-12-05 21:33:57',1),(48,4,3,3,22,'The Coaxial Cable is broken ','I noticed that the the Coaxial cable is broken and my TV has a really bad signal, so I would like to have someone to take a look on my TV installation. ','Pending','2025-12-10 17:52:12',1,'I am not happy with the server it took so long to resolve this issue. ','2025-12-05 21:42:29',1),(49,2,1,3,10,'Modem error message code: 692','I am trying to set up the Network connection on a new PC here on the office, but when I am doing the connection and error message pop up. Please take a look on the attachments for additional details. Thanks ','Pending',NULL,0,'','2025-12-05 21:46:18',1),(50,2,1,2,7,'Ink for the office printer ','Please need assistance to get more ink on the office printer, as I noticed that the leve is low and there is an message from the printer asking to check the ink levels. ','Pending',NULL,0,'','2025-12-05 21:54:11',1),(51,4,2,2,12,'Sign in error message ','I am trying to create an new account on the system, but start getting an error message that says that the user already exists. Need some assistance, thanks. ','Pending','2025-12-09 22:44:26',0,'','2025-12-05 22:06:37',1),(52,2,2,3,12,'Network Connection Prompt','Error 633: The modem is already in use or not cofigurated properly. ','Pending',NULL,0,'','2025-12-05 22:08:55',1),(53,4,3,2,25,'Modem Setup assistance','Need assitance to do a new installation of a Modem that I just boght. Upload a photo about what exactly I want to do. ','Pending','2025-12-07 15:19:59',3,'I am happy that I was able to resolved the issue by myself. But thanks for your assistance. ','2025-12-05 22:11:08',1),(54,2,2,2,14,'IP configuration is not working ','I need some assistance to complete the configuration of my IP4 as is not working. ','Pending',NULL,0,'','2025-12-05 22:13:50',1),(55,4,2,3,14,'Router red light and no internet. ','My router is giving me an error mesagge, Failed to power on modem and when I go to see the router it has a red light on. ','Pending','2025-12-09 22:48:43',0,'','2025-12-05 22:16:36',1),(56,2,2,2,15,'Tablo TV is not working ','I am getting an error message when attempt to connect to my smart TV ','Pending',NULL,0,'','2025-12-05 22:18:26',1),(57,2,1,1,7,'Printer is getting an error message on the screen','When attempt to use the printer I am getting an support error message with the code: 5200. ','Pending',NULL,0,'','2025-12-05 22:20:27',1),(58,2,2,3,16,'Latency issue with my internet and low speed. ','I noticed that my internet is quite slow and I am having latency issues. I run a test and you can see the problem ','Pending',NULL,0,'','2025-12-05 22:25:26',1),(59,2,3,1,22,'The wall coaxial connection is broken ','I was cleaning my TV room and noticed that connection of the coxial cable that goes into de wall is broken. So I need an expert to come to my side and see how they can resolve this issue. ','Pending',NULL,0,'','2025-12-05 22:29:19',1),(60,4,1,2,1,'Server not found error message','I am trying to connect to my server and I start getting an error message saying that the Server is not found. ','Pending','2025-12-08 22:40:22',0,'','2025-12-08 17:20:16',1),(61,4,2,3,11,'Test','Test','Pending','2025-12-10 22:39:40',0,'','2025-12-09 22:38:29',1),(62,4,3,2,26,'I want to process a Disconnection ','Need assistance to schedule a disonnection of my service','Pending','2025-12-10 17:19:35',0,'','2025-12-10 17:11:37',1),(63,4,1,3,1,'Internal PC issue','Need the assistance for a VPN connection ','Pending','2025-12-10 17:56:27',0,'','2025-12-10 17:46:29',1);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_attachment`
--

DROP TABLE IF EXISTS `ticket_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeline_id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `extension` varchar(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_ticket_attachment_timeline` (`timeline_id`),
  CONSTRAINT `fk_ticket_attachment_timeline` FOREIGN KEY (`timeline_id`) REFERENCES `timeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_attachment`
--

LOCK TABLES `ticket_attachment` WRITE;
/*!40000 ALTER TABLE `ticket_attachment` DISABLE KEYS */;
INSERT INTO `ticket_attachment` VALUES (1,27,'uploads/image1.jpg','jpg',1),(2,27,'uploads/image2.jpg','jpg',1),(3,23,'uploads/image3.jpg','jpg',1),(4,13,'uploads/image4.jpg','jpg',1),(5,1,'uploads/image5.jpg','jpg',1),(44,117,'uploads/6933a318f3caf_Server errors.avif','avif',1),(45,119,'uploads/6933a4278ebeb_Email error Alert.png','png',1),(47,121,'uploads/6933a62760a0e_Cable broken.webp','webp',1),(48,123,'uploads/6933a70c90723_Connecting to BB Conection.jpeg','jpeg',1),(49,133,'uploads/6933a8e5e734f_Tinta de imporesora.jpg','jpg',1),(50,135,'uploads/6933abcf48239_sign in error message.png','png',1),(51,137,'uploads/6933ac59b0792_Network connection Prompt.jpg','jpg',1),(52,139,'uploads/6933acdeaff5d_Modem set up.jpeg','jpeg',1),(53,141,'uploads/6933ad80e019a_check-ipv4.png','png',1),(54,143,'uploads/6933ae26876c0_Modem no funciona.jpg','jpg',1),(55,143,'uploads/6933ae26880da_Power on modem error MCP2515....png','png',1),(56,145,'uploads/6933ae949329f_Tablo TV network issue.jpeg','jpeg',1),(57,147,'uploads/6933af0d6401a_Error de impresora.jpg','jpg',1),(58,149,'uploads/6933b03898bfc_Speed test.PNG','PNG',1),(59,151,'uploads/6933b12194fab_The wall coaxial cable connector is broken.jpg','jpg',1),(60,178,'uploads/69375d329baaf_Server not found.png','png',1),(61,201,'uploads/6939f2aaddec9_1.png','png',1),(62,206,'uploads/6939f46bb1e3f_5448eb1a-b109-4bed-b682-2860c2fc0816.png','png',1),(63,213,'uploads/6939f94b5488f_Printer-sharing-not-working.webp','webp',1);
/*!40000 ALTER TABLE `ticket_attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_label`
--

DROP TABLE IF EXISTS `ticket_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_ticket_label_category` (`category_id`),
  CONSTRAINT `fk_ticket_label_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_label`
--

LOCK TABLES `ticket_label` WRITE;
/*!40000 ALTER TABLE `ticket_label` DISABLE KEYS */;
INSERT INTO `ticket_label` VALUES (1,1,'VPN Access Issues',1),(2,1,'Password Reset',1),(3,1,'Cloud Service Outage',1),(4,1,'Server Resource Alert',1),(5,1,'Backup Failures',1),(6,1,'Security Incident',1),(7,1,'Printer',1),(8,1,'Software Deployment Requests',1),(9,1,'Monitoring Alerts',1),(10,1,'New Hardware Setup',1),(11,2,'Email Forwarding',1),(12,2,'Configuration',1),(13,2,'Intermittency',1),(14,2,'IP Blocking',1),(15,2,'IPTV Service',1),(16,2,'Latency',1),(17,2,'Link Down',1),(18,2,'Packet Lost',1),(19,2,'Page Blocking',1),(20,2,'Slowness',1),(21,2,'Telephony',1),(22,3,'Physical Problems',1),(23,3,'Damaged Pole',1),(24,3,'Electrical Issue',1),(25,3,'New Installation',1),(26,3,'Disconnection',1),(27,4,'RFO Elaboration',1),(28,4,'Maintenance Window',1),(29,4,'Core Network',1),(30,5,'Test label',1),(31,5,'Test label',1),(33,6,'Test labels',0),(34,7,'Test labels',0);
/*!40000 ALTER TABLE `ticket_label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeline`
--

DROP TABLE IF EXISTS `timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_timeline_ticket` (`ticket_id`),
  KEY `fk_timeline_user` (`user_id`),
  CONSTRAINT `fk_timeline_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_timeline_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeline`
--

LOCK TABLES `timeline` WRITE;
/*!40000 ALTER TABLE `timeline` DISABLE KEYS */;
INSERT INTO `timeline` VALUES (1,1,6,'Ticket Created','Ticket created by client José Ramírez Calderón','2025-10-20 09:15:00',1),(2,1,3,'Assigned to Technician','Ticket assigned to Carlos Méndez López by Admin Juan García Bolaños','2025-10-20 10:00:00',1),(3,1,3,'Investigation','Technician Carlos checked login server and user credentials','2025-10-20 11:00:00',1),(4,1,3,'Resolved','Login issue fixed by resetting password and clearing cache','2025-10-20 12:30:00',1),(5,2,6,'Ticket Created','Ticket created by client José Ramírez Calderón','2025-10-21 08:55:00',1),(6,2,3,'Assigned to Technician','Ticket assigned to Carlos Méndez López by Admin Juan García Bolaños','2025-10-21 09:10:00',1),(7,2,3,'Investigation','Technician Carlos checked network switches and router configuration','2025-10-21 10:00:00',1),(8,2,3,'Resolved','Internet connection restored','2025-10-21 11:30:00',1),(9,3,7,'Ticket Created','Ticket created by client Paola Hernández Vargas','2025-10-22 14:40:00',1),(10,3,4,'Assigned to Technician','Ticket assigned to Andrés Villalobos Soto by Admin Juan García Bolaños','2025-10-22 15:00:00',1),(11,3,4,'Installation Scheduled','Technician scheduled software installation on client PC','2025-10-23 09:00:00',1),(12,3,4,'Resolved','Software successfully installed','2025-10-23 10:30:00',1),(13,4,7,'Ticket Created','Ticket created by client Paola Hernández Vargas','2025-10-23 07:45:00',1),(14,4,5,'Assigned to Technician','Ticket assigned to Diego Alvarez Fuentes by Admin Juan García Bolaños','2025-10-23 09:30:00',1),(15,4,5,'Inspection','Technician Diego inspected UPS battery and connections','2025-10-23 10:15:00',1),(16,4,5,'Resolved','UPS battery replaced and issue resolved','2025-10-23 11:00:00',1),(17,5,8,'Ticket Created','Ticket created by client Luis Alberto Castillo','2025-10-24 09:30:00',1),(18,5,4,'Assigned to Technician','Ticket assigned to Andrés Villalobos Soto by Admin Juan García Bolaños','2025-10-24 09:45:00',1),(19,5,4,'Investigation','Technician Andrés checked switches and firewall configuration','2025-10-24 10:30:00',1),(20,6,8,'Ticket Created','Ticket created by client Luis Alberto Castillo','2025-10-25 08:55:00',1),(21,6,5,'Assigned to Technician','Ticket assigned to Diego Alvarez Fuentes by Admin Juan García Bolaños','2025-10-25 09:15:00',1),(22,6,5,'Inspection','Technician Diego checked hardware, found overheating issue','2025-10-25 10:00:00',1),(23,7,9,'Ticket Created','Ticket created by client Gabriela Solís Jiménez','2025-10-26 09:00:00',1),(24,7,3,'Assigned to Technician','Ticket assigned to Carlos Méndez López by Admin Juan García Bolaños','2025-10-26 09:15:00',1),(25,7,3,'Investigation','Checked mobile email configuration and server connectivity','2025-10-26 10:00:00',1),(26,7,3,'Resolved','Email service restored after server patch update','2025-10-27 16:00:00',1),(27,8,10,'Ticket Created','Ticket created by client Javier Morales Campos','2025-10-26 10:30:00',1),(28,8,7,'Assigned to Technician','Ticket assigned to Andrés Villalobos Soto by Admin Juan García Bolaños','2025-10-26 10:45:00',1),(29,8,7,'Investigation','Technician Andrés checked printer queue and paper feed mechanism','2025-10-26 11:15:00',1),(71,8,1,'Ticket assignation','Ticket assignated to Carlos Méndez López','2025-11-29 22:58:10',1),(75,8,1,'Change made','status: Pending -> Assigned','2025-11-29 23:02:19',1),(76,8,1,'Ticket assignation','Ticket assignated to Juan Garita','2025-11-29 23:02:30',1),(116,46,10,'Ticket assignation','Ticket assignated to Ricardo Molina Céspedes','2025-12-05 21:29:27',1),(117,46,10,'Ticket created','Ticket created by Ricardo Molina Céspedes','2025-12-05 21:29:28',1),(118,47,7,'Ticket assignation','Ticket assignated to Paola Hernández Vargas','2025-12-05 21:33:58',1),(119,47,7,'Ticket created','Ticket created by Paola Hernández Vargas','2025-12-05 21:33:59',1),(120,48,6,'Ticket assignation','Ticket assignated to José Ramírez Calderón','2025-12-05 21:42:30',1),(121,48,6,'Ticket created','Ticket created by José Ramírez Calderón','2025-12-05 21:42:30',1),(122,49,16,'Ticket assignation','Ticket assignated to Javier Morales Campos','2025-12-05 21:46:19',1),(123,49,16,'Ticket created','Ticket created by Javier Morales Campos','2025-12-05 21:46:20',1),(124,49,1,'Ticket assignation','Ticket assignated to Andrés Villalobos Soto','2025-12-05 21:47:13',1),(125,49,1,'Change made','status: Pending -> Assigned','2025-12-05 21:47:14',1),(126,46,1,'Ticket assignation','Ticket assignated to Andrés Villalobos Soto','2025-12-05 21:47:15',1),(127,46,1,'Change made','status: Pending -> Assigned','2025-12-05 21:47:15',1),(128,48,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 21:47:16',1),(129,48,1,'Change made','status: Pending -> Assigned','2025-12-05 21:47:16',1),(130,47,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 21:47:16',1),(131,47,1,'Change made','status: Pending -> Assigned','2025-12-05 21:47:17',1),(132,50,9,'Ticket assignation','Ticket assignated to Gabriela Solís Jiménez','2025-12-05 21:54:12',1),(133,50,9,'Ticket created','Ticket created by Gabriela Solís Jiménez','2025-12-05 21:54:13',1),(134,51,15,'Ticket assignation','Ticket assignated to Ana Lucia Rojas','2025-12-05 22:06:38',1),(135,51,15,'Ticket created','Ticket created by Ana Lucia Rojas','2025-12-05 22:06:38',1),(136,52,10,'Ticket assignation','Ticket assignated to Ricardo Molina Céspedes','2025-12-05 22:08:56',1),(137,52,10,'Ticket created','Ticket created by Ricardo Molina Céspedes','2025-12-05 22:08:57',1),(138,53,16,'Ticket assignation','Ticket assignated to Javier Morales Campos','2025-12-05 22:11:09',1),(139,53,16,'Ticket created','Ticket created by Javier Morales Campos','2025-12-05 22:11:10',1),(140,54,9,'Ticket assignation','Ticket assignated to Gabriela Solís Jiménez','2025-12-05 22:13:51',1),(141,54,9,'Ticket created','Ticket created by Gabriela Solís Jiménez','2025-12-05 22:13:52',1),(142,55,15,'Ticket assignation','Ticket assignated to Ana Lucia Rojas','2025-12-05 22:16:37',1),(143,55,15,'Ticket created','Ticket created by Ana Lucia Rojas','2025-12-05 22:16:38',1),(144,56,7,'Ticket assignation','Ticket assignated to Paola Hernández Vargas','2025-12-05 22:18:27',1),(145,56,7,'Ticket created','Ticket created by Paola Hernández Vargas','2025-12-05 22:18:28',1),(146,57,8,'Ticket assignation','Ticket assignated to Luis Alberto Castillo','2025-12-05 22:20:28',1),(147,57,8,'Ticket created','Ticket created by Luis Alberto Castillo','2025-12-05 22:20:28',1),(148,58,16,'Ticket assignation','Ticket assignated to Javier Morales Campos','2025-12-05 22:25:27',1),(149,58,16,'Ticket created','Ticket created by Javier Morales Campos','2025-12-05 22:25:28',1),(150,59,10,'Ticket assignation','Ticket assignated to Ricardo Molina Céspedes','2025-12-05 22:29:20',1),(151,59,10,'Ticket created','Ticket created by Ricardo Molina Céspedes','2025-12-05 22:29:21',1),(152,58,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 22:46:20',1),(153,58,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:21',1),(154,55,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 22:46:22',1),(155,55,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:22',1),(156,52,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 22:46:23',1),(157,52,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:23',1),(158,56,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 22:46:23',1),(159,56,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:24',1),(160,54,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 22:46:24',1),(161,54,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:25',1),(162,51,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 22:46:25',1),(163,51,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:26',1),(164,50,1,'Ticket assignation','Ticket assignated to Carlos Méndez López','2025-12-05 22:46:26',1),(165,50,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:27',1),(166,53,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 22:46:28',1),(167,53,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:28',1),(168,59,1,'Ticket assignation','Ticket assignated to Verónica Salazar Mora','2025-12-05 22:46:29',1),(169,59,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:29',1),(170,57,1,'Ticket assignation','Ticket assignated to Carlos Méndez López','2025-12-05 22:46:29',1),(171,57,1,'Change made','status: Pending -> Assigned','2025-12-05 22:46:30',1),(172,53,5,'Reach the customer','Getting more details','2025-12-07 15:15:35',1),(173,53,5,'Change made','status: Assigned -> In Progress','2025-12-07 15:15:37',1),(174,53,5,'No further assistance needed ','Customer confirm that they already fix the issue ','2025-12-07 15:16:32',1),(175,53,5,'Change made','status: In Progress -> Resolved','2025-12-07 15:16:33',1),(176,53,16,'Change made','rating: 0 -> 3, comment:  -> I am happy that I was able to resolved the issue by myself. But thanks for your assistance. ','2025-12-07 15:19:59',1),(177,60,16,'Ticket assignation','Ticket assignated to Javier Morales Campos','2025-12-08 17:20:17',1),(178,60,16,'Ticket created','Ticket created by Javier Morales Campos','2025-12-08 17:20:18',1),(179,60,1,'Ticket assignation','Ticket assignated to Carlos Méndez López','2025-12-08 17:23:05',1),(180,60,1,'Change made','status: Pending -> Assigned','2025-12-08 17:23:06',1),(181,60,3,'I am working on the case','In progress','2025-12-08 22:39:35',1),(182,60,3,'Change made','status: Assigned -> In Progress','2025-12-08 22:39:36',1),(183,60,3,'Find the solution','Apply the solution to the Server not found error','2025-12-08 22:40:21',1),(184,60,3,'Change made','status: In Progress -> Resolved','2025-12-08 22:40:22',1),(185,61,1,'Ticket assignation','Ticket assignated to Juan García Bolaños','2025-12-09 22:38:30',1),(186,61,1,'Ticket created','Ticket created by Juan García Bolaños','2025-12-09 22:38:31',1),(187,61,1,'Ticket assignation','Ticket assignated to Carlos Méndez López','2025-12-09 22:38:50',1),(188,61,1,'Change made','status: Pending -> Assigned','2025-12-09 22:38:51',1),(189,61,1,'test','test','2025-12-09 22:39:25',1),(190,61,1,'Change made','status: Assigned -> In Progress','2025-12-09 22:39:26',1),(191,61,1,'test','test','2025-12-09 22:39:39',1),(192,61,1,'Change made','status: In Progress -> Resolved','2025-12-09 22:39:40',1),(193,51,1,'test','test','2025-12-09 22:44:08',1),(194,51,1,'Change made','status: Assigned -> In Progress','2025-12-09 22:44:10',1),(195,51,1,'test','test','2025-12-09 22:44:24',1),(196,51,1,'Change made','status: In Progress -> Resolved','2025-12-09 22:44:26',1),(197,55,1,'test','test','2025-12-09 22:48:30',1),(198,55,1,'Change made','status: Assigned -> In Progress','2025-12-09 22:48:32',1),(199,55,1,'test','test','2025-12-09 22:48:42',1),(200,55,1,'Change made','status: In Progress -> Resolved','2025-12-09 22:48:43',1),(201,5,1,'In Progress','Working on support ticket','2025-12-10 16:22:34',1),(202,5,1,'Change made','status: Assigned -> In Progress','2025-12-10 16:22:36',1),(203,5,4,'Fix the issue','Able to fix the issue ','2025-12-10 16:25:06',1),(204,5,4,'Change made','status: In Progress -> Resolved','2025-12-10 16:25:07',1),(205,6,1,'Ticket assignation','Ticket assignated to Carlos Méndez López','2025-12-10 16:27:06',1),(206,6,3,'Taking a look on the issue ','Reviewing the error ','2025-12-10 16:30:03',1),(207,6,3,'Change made','status: Assigned -> In Progress','2025-12-10 16:30:05',1),(208,6,3,'The computer suffer a thermal shutdown issue','Proceed with the replacement of the PC unit ','2025-12-10 16:31:10',1),(209,6,3,'Change made','status: In Progress -> Resolved','2025-12-10 16:31:12',1),(210,8,1,'Ticket assignation','Ticket assignated to Diego Alvarez Fuentes','2025-12-10 16:43:04',1),(211,8,13,'Working on issue','In progress','2025-12-10 16:49:45',1),(212,8,13,'Change made','status: Assigned -> In Progress','2025-12-10 16:49:46',1),(213,8,13,'Find the root cause of the issue ','The customer is having a network connection issue with the printer. ','2025-12-10 16:50:50',1),(214,8,13,'Change made','status: In Progress -> Resolved','2025-12-10 16:50:53',1),(215,48,1,'Ticket assignation','Ticket assignated to Josue Calderon','2025-12-10 16:55:44',1),(217,48,27,'Working on case ','In progress','2025-12-10 16:59:09',1),(218,48,27,'Change made','status: Assigned -> In Progress','2025-12-10 16:59:10',1),(221,48,27,'Approved a replacement for the cable','Sent a special field to do the installation of the new cable on site. ','2025-12-10 17:05:16',1),(222,48,27,'Change made','status: In Progress -> Resolved','2025-12-10 17:05:17',1),(223,62,15,'Ticket assignation','Ticket assignated to Ana Lucia Rojas','2025-12-10 17:11:37',1),(224,62,15,'Ticket created','Ticket created by Ana Lucia Rojas','2025-12-10 17:11:38',1),(225,62,1,'Change made','status: Pending -> Assigned','2025-12-10 17:15:22',1),(226,62,1,'Ticket assignation','Ticket assignated to Carla Dominguez ','2025-12-10 17:15:23',1),(227,62,14,'Reviewing the case','Taking a look at the request','2025-12-10 17:18:18',1),(228,62,14,'Change made','status: Assigned -> In Progress','2025-12-10 17:18:20',1),(229,62,14,'Reach out the customer to coordinate the visit to the disconnection','Scheduled the disonnection of the service. ','2025-12-10 17:19:33',1),(230,62,14,'Change made','status: In Progress -> Resolved','2025-12-10 17:19:35',1),(231,63,1,'Ticket assignation','Ticket assignated to Juan García Bolaños','2025-12-10 17:46:30',1),(232,63,1,'Ticket created','Ticket created by Juan García Bolaños','2025-12-10 17:46:31',1),(233,63,1,'Change made','status: Pending -> Assigned','2025-12-10 17:49:39',1),(234,63,1,'Ticket assignation','Ticket assignated to Juan Garita','2025-12-10 17:49:40',1),(235,48,6,'Change made','rating: 0 -> 1, comment:  -> I am not happy with the server it took so long to resolve this issue. ','2025-12-10 17:52:12',1),(236,63,28,'Already talk to the affected user ','Working on the solution','2025-12-10 17:55:27',1),(237,63,28,'Change made','status: Assigned -> In Progress','2025-12-10 17:55:29',1),(238,63,28,'Determine that the issue was not related with the VPN','The PC was not connected to the UTP cable, there for no internet or Network connection was establish','2025-12-10 17:56:26',1),(239,63,28,'Change made','status: In Progress -> Resolved','2025-12-10 17:56:27',1);
/*!40000 ALTER TABLE `timeline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login_on` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `availability` enum('Available','Busy','Overload','Vacation','MedicalLeave') NOT NULL DEFAULT 'Available',
  `workload` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_user_role` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Juan García Bolaños','juan.garcia@Netcom.com','$2y$10$NuD0j5xBDmFQKtr/oDsLvuZKXWb3zw1iWOnsDs.ehTSMRCZ2BejJS','2025-12-10 17:56:52',1,'Available',0),(2,1,'María Fernanda Rojas','maria.rojas@Netcom.com','$2y$10$LWgzwP.eyRsxxTnhX8T6r.EahJZEA1dO7LPa.QTYdV0X2l4dL28rC',NULL,1,'Available',0),(3,2,'Carlos Méndez López','carlos.mendez@Netcom.com','$2y$10$xirPhxJwxTS.V0ct6kv2yeuMu80yfwPeIrLDOZ8lAr5iChiCX1Gvi','2025-12-10 16:29:23',1,'Available',0),(4,2,'Andrés Villalobos Soto','andres.villalobos@Netcom.com','$2y$10$fTUFEj2/6XOegLvOYtix5OqCqWX2Sp9NkhIb3puMURQu8LW6cr.G.','2025-12-10 16:24:14',1,'MedicalLeave',0),(5,2,'Verónica Salazar Mora','veronica.salazar@Netcom.com','$2y$10$t7kepQlLNgkzFL6Sy2Ic4eIpkBFjOkPeiwy9RJaiWbQ9TDsD/mR7W','2025-12-07 15:14:57',1,'Available',0),(6,3,'José Ramírez Calderón','jose.ramirez@gmail.com','$2y$10$LR21pzDLSAHGGrhKL8L54.II.d009/vdZPytZMvt3l6nN.ckKJxnC','2025-12-10 17:51:36',1,'Available',0),(7,3,'Paola Hernández Vargas','paola.hernandez@gmail.com','$2y$10$PV6z6kjcBIiyfkmgrl07mufhbR3xkQAkoYsuQEhCRZ7IsKgMQ5UVG',NULL,1,'Available',0),(8,3,'Luis Alberto Castillo','luis.castillo@hotmail.com','$2y$10$72U7EH8zXu7AGjX80RqGeezmOJkMH1914q6v5uRb0YI.4Wm8HYx8q',NULL,1,'Available',0),(9,3,'Gabriela Solís Jiménez','gabriela.solis@gmail.com','$2y$10$oZLIB/QvJf1AIElwKfGIDeVIcQriCB98QwFyNaNOjK/XMnRuFk3Ai',NULL,1,'Available',0),(10,3,'Ricardo Molina Céspedes','ricardo.molina@hotmail.com','$2y$10$PxAo/UCIDW6IKyw8yInB4ewE2XGHbQeruPanPfvLWhblSxQSRkuOu',NULL,1,'Available',0),(11,1,'Sofia Martinez Rivera','sofia.martinez@Netcom.com','$2y$10$95q590dsD6dE0NFGGyrm1elt9FNIrnrJpSSt7E7uiC6mjiaO3rg.i',NULL,1,'Available',0),(12,1,'Miguel Torres Delgado','miguel.torres@Netcom.com','$2y$10$WLZkwGAhAkmKGkkcL0nKx.z0ppVHPxxFb04RHLMdn2ODQ.38YkUKO',NULL,1,'Available',0),(13,2,'Diego Alvarez Fuentes','diego.alvarez@Netcom.com','$2y$10$bWpAeIp4zGMc/nM7930L6e63yL8ZhkdCmeGSqIGsHcCLzdftlO1k6','2025-12-10 16:44:07',1,'Available',0),(14,2,'Carla Dominguez ','carla.dominguez@Netcom.com','$2y$10$yR3EP6W9mCBYqmua0gX1IOKCberJRwtEEsJnlOKr6r.XBU1M4gEHO','2025-12-10 17:17:36',1,'Available',0),(15,3,'Ana Lucia Rojas','andresbol1706@gmail.com','$2y$10$uVSKizGU3ywZeRm9XouSVO4oXawJfUny9aOWjGvgtLqtS/d4g4p86','2025-12-10 17:21:15',1,'Available',0),(16,3,'Javier Morales Campos','javier.morales@hotmail.com','$2y$10$SAzZFb.iNKqa6IGCFwhUSenbJ2jKHelOOJ1XE9TLFDTagrPQTAHAq','2025-12-08 17:17:47',1,'Available',0),(19,2,'Francisco','Franciso@Netcom.com','$2y$10$SYzKBneDxvwAIQwf9oT91O4/gpyPS53b209KTLJUp9tVr.tJzsMgq',NULL,0,'Available',0),(27,2,'Josue Calderon','Josue.Calderon@Netcom.com','$2y$10$Uyo.jiyeh89.KxupZJ5Z2OOCS1.iNNYGq.1GcZ1eklp.q.17OZvwu','2025-12-10 16:58:24',1,'Available',0),(28,2,'Juan Garita','juan.garita@Netcom.com','$2y$10$8JdmaFUcT8bSHu58jR5M0uhRmESv8irYLvuvlka59A4c6Ru2MKsLW','2025-12-10 17:54:47',1,'Available',0),(29,2,'Pedro Jimenez','pedro.jimenez@Netcom.com','$2y$10$dZwGVc92zh0dvJPdvKxIeuX6rAOXOwFhK0NY4fBwataM37KmCjz6e',NULL,1,'Vacation',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_special_field`
--

DROP TABLE IF EXISTS `user_special_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_special_field` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `special_field_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_user_special_field_user` (`user_id`),
  KEY `fk_user_special_field_special_field` (`special_field_id`),
  CONSTRAINT `fk_user_special_field_special_field` FOREIGN KEY (`special_field_id`) REFERENCES `special_field` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_special_field_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_special_field`
--

LOCK TABLES `user_special_field` WRITE;
/*!40000 ALTER TABLE `user_special_field` DISABLE KEYS */;
INSERT INTO `user_special_field` VALUES (1,3,1,1),(2,3,3,1),(3,3,7,1),(4,4,2,1),(5,4,4,1),(6,4,6,0),(7,4,8,0),(8,5,5,1),(9,5,9,1),(10,5,10,1),(11,5,11,1),(12,5,12,1),(13,9,1,1),(14,9,8,1),(15,9,12,1),(16,10,4,1),(17,10,6,1),(18,10,8,1),(19,4,9,1),(20,4,7,1),(21,4,12,1),(22,19,10,0),(26,13,2,1),(27,13,6,1),(28,13,4,1),(29,13,13,1),(30,13,12,1),(31,27,2,1),(32,27,6,1),(33,27,8,1),(34,27,10,1),(35,27,11,1),(36,27,4,1),(37,27,3,1),(38,14,5,1),(39,14,10,1),(40,14,7,1),(41,14,2,1),(42,29,11,1),(43,29,8,1),(44,29,5,0),(45,29,3,1),(46,29,1,1),(47,29,9,1),(48,29,10,1),(49,29,6,1),(50,29,4,1),(51,29,2,1),(52,28,6,1),(53,28,2,1),(54,28,4,1),(55,28,10,1),(56,28,8,1),(57,28,11,1),(58,28,13,1),(59,28,1,1);
/*!40000 ALTER TABLE `user_special_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ticket`
--

DROP TABLE IF EXISTS `user_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `assigned_on` datetime NOT NULL DEFAULT current_timestamp(),
  `assigned_by` int(11) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_user_ticket_user` (`user_id`),
  KEY `fk_user_ticket_ticket` (`ticket_id`),
  KEY `fk_user_ticket_assigned_by` (`assigned_by`),
  CONSTRAINT `fk_user_ticket_assigned_by` FOREIGN KEY (`assigned_by`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_user_ticket_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_ticket_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ticket`
--

LOCK TABLES `user_ticket` WRITE;
/*!40000 ALTER TABLE `user_ticket` DISABLE KEYS */;
INSERT INTO `user_ticket` VALUES (1,6,1,'2025-10-20 09:15:00',NULL,1),(2,3,1,'2025-10-20 10:00:00',1,1),(3,6,2,'2025-10-21 08:55:00',NULL,1),(4,3,2,'2025-10-21 09:10:00',1,1),(5,7,3,'2025-10-22 14:40:00',NULL,1),(6,4,3,'2025-10-22 15:00:00',1,1),(7,7,4,'2025-10-23 07:45:00',NULL,1),(8,5,4,'2025-10-23 09:30:00',1,1),(9,8,5,'2025-10-24 09:30:00',NULL,1),(10,4,5,'2025-10-24 09:45:00',1,1),(11,8,6,'2025-10-25 08:55:00',NULL,1),(12,5,6,'2025-10-25 09:15:00',1,0),(13,9,7,'2025-10-26 09:00:00',NULL,1),(14,3,7,'2025-10-26 09:15:00',1,1),(15,10,8,'2025-10-26 10:30:00',NULL,1),(16,4,8,'2025-10-26 10:45:00',1,0),(42,3,8,'2025-11-29 22:58:10',1,0),(45,28,8,'2025-11-29 23:02:30',1,0),(65,10,46,'2025-12-05 21:29:27',10,1),(66,7,47,'2025-12-05 21:33:58',7,1),(67,6,48,'2025-12-05 21:42:30',6,1),(68,16,49,'2025-12-05 21:46:19',16,1),(69,4,49,'2025-12-05 21:47:13',1,1),(70,4,46,'2025-12-05 21:47:15',1,1),(71,5,48,'2025-12-05 21:47:16',1,0),(72,5,47,'2025-12-05 21:47:16',1,1),(73,9,50,'2025-12-05 21:54:12',9,1),(74,15,51,'2025-12-05 22:06:37',15,1),(75,10,52,'2025-12-05 22:08:56',10,1),(76,16,53,'2025-12-05 22:11:09',16,1),(77,9,54,'2025-12-05 22:13:51',9,1),(78,15,55,'2025-12-05 22:16:37',15,1),(79,7,56,'2025-12-05 22:18:27',7,1),(80,8,57,'2025-12-05 22:20:27',8,1),(81,16,58,'2025-12-05 22:25:27',16,1),(82,10,59,'2025-12-05 22:29:20',10,1),(83,5,58,'2025-12-05 22:46:20',1,1),(84,5,55,'2025-12-05 22:46:22',1,1),(85,5,52,'2025-12-05 22:46:23',1,1),(86,5,56,'2025-12-05 22:46:23',1,1),(87,5,54,'2025-12-05 22:46:24',1,1),(88,5,51,'2025-12-05 22:46:25',1,1),(89,3,50,'2025-12-05 22:46:26',1,1),(90,5,53,'2025-12-05 22:46:28',1,1),(91,5,59,'2025-12-05 22:46:29',1,1),(92,3,57,'2025-12-05 22:46:29',1,1),(93,16,60,'2025-12-08 17:20:17',16,1),(94,3,60,'2025-12-08 17:23:05',1,1),(95,1,61,'2025-12-09 22:38:30',1,1),(96,3,61,'2025-12-09 22:38:50',1,1),(97,3,6,'2025-12-10 16:27:06',1,1),(98,13,8,'2025-12-10 16:43:04',1,1),(99,27,48,'2025-12-10 16:55:58',1,1),(100,15,62,'2025-12-10 17:11:37',15,1),(101,14,62,'2025-12-10 17:15:23',1,1),(102,1,63,'2025-12-10 17:46:30',1,1),(103,28,63,'2025-12-10 17:49:40',1,1);
/*!40000 ALTER TABLE `user_ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 22:35:00
