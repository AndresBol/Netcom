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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'IT',1),(2,'Service Desk',1),(3,'Field Team',1),(4,'Engineering',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sla`
--

LOCK TABLES `sla` WRITE;
/*!40000 ALTER TABLE `sla` DISABLE KEYS */;
INSERT INTO `sla` VALUES (1,1,4,15,240,'IT HVC',1),(2,1,3,30,480,'IT A',1),(3,1,2,45,600,'IT B',1),(4,1,1,60,720,'IT C',1),(5,2,4,15,240,'Service Desk HVC',1),(6,2,3,30,480,'Service Desk A',1),(7,2,2,45,600,'Service Desk B',1),(8,2,1,60,720,'Service Desk C',1),(9,3,4,60,480,'Field Team HVC',1),(10,3,3,60,480,'Field Team A',1),(11,3,2,60,480,'Field Team B',1),(12,3,1,60,960,'Field Team C',1),(13,4,4,1440,4320,'Engineering HVC',1),(14,4,3,1440,4320,'Engineering A',1),(15,4,2,1440,4320,'Engineering B',1),(16,4,1,1440,4320,'Engineering C',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_field`
--

LOCK TABLES `special_field` WRITE;
/*!40000 ALTER TABLE `special_field` DISABLE KEYS */;
INSERT INTO `special_field` VALUES (1,'Cybersecurity',1,1),(2,'Internal Technical Support',1,1),(3,'Server and Backup Administration',1,1),(4,'Hardware and Software Management',1,1),(5,'External Technical Support',2,1),(6,'Telephony / IPTV',2,1),(7,'Connectivity and Firewall Management',2,1),(8,'Physical Infrastructure Maintenance',3,1),(9,'Electrical / Outside Plant Equipment',3,1),(10,'Field Installations',3,1),(11,'Network Planning and Optimization',4,1),(12,'Critical Incident Analysis',4,1),(13,'Internal Networks',4,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Open',1),(2,'In Progress',1),(3,'Resolved',1),(4,'Closed',1);
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
  `notified_on` datetime NOT NULL DEFAULT current_timestamp(),
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,3,1,2,3,'Login issue with main system','I cannot access the main dashboard; it keeps saying invalid credentials even after resetting my password.','sent','2025-10-20 12:30:00',5,'Quickly resolved, very satisfied.','2025-10-20 09:15:00',1),(2,3,2,3,5,'Internet connection failure','The connection drops every few minutes since this morning. I think it may be an internal network issue.','sent','2025-10-21 11:30:00',4,'Resolved the same day, thank you.','2025-10-21 08:55:00',1),(3,3,1,1,2,'Software installation request','Please install the new office software package on my computer before Monday.','sent','2025-10-23 10:30:00',5,'Software installed correctly.','2025-10-22 14:40:00',1),(4,4,3,2,6,'Unusual noise in UPS unit','The UPS in the lab keeps beeping continuously. It might be a battery issue.','sent','2025-10-23 11:00:00',5,'UPS battery replaced and working.','2025-10-23 07:45:00',1),(5,2,4,3,7,'Network failure in main office','The administrative area lost access to the internal network. Switches might need to be checked.','pending','2025-10-25 10:00:00',0,NULL,'2025-10-24 09:30:00',1),(6,2,2,1,4,'Hardware inspection request','My computer shuts down after a few minutes of use. It might be overheating.','pending','2025-10-26 12:00:00',0,NULL,'2025-10-25 08:55:00',1),(7,3,2,2,3,'Email not syncing','My company email is not syncing on my mobile device.','sent','2025-10-27 16:00:00',4,'Good service, but took longer than expected.','2025-10-26 09:00:00',1),(8,1,3,3,5,'Printer not working','The main office printer does not print any documents; it shows a paper jam error even when empty.','pending','2025-10-28 10:00:00',0,NULL,'2025-10-27 10:30:00',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_attachment`
--

LOCK TABLES `ticket_attachment` WRITE;
/*!40000 ALTER TABLE `ticket_attachment` DISABLE KEYS */;
INSERT INTO `ticket_attachment` VALUES (1,27,'uploads/image1.jpg','jpg',1),(2,27,'uploads/image2.jpg','jpg',1),(3,23,'uploads/image3.jpg','jpg',1),(4,13,'uploads/image4.jpg','jpg',1),(5,1,'uploads/image5.jpg','jpg',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_label`
--

LOCK TABLES `ticket_label` WRITE;
/*!40000 ALTER TABLE `ticket_label` DISABLE KEYS */;
INSERT INTO `ticket_label` VALUES (1,1,'VPN Access Issues',1),(2,1,'Password Reset',1),(3,1,'Cloud Service Outage',1),(4,1,'Server Resource Alert',1),(5,1,'Backup Failures',1),(6,1,'Security Incident',1),(7,1,'Printer',1),(8,1,'Software Deployment Requests',1),(9,1,'Monitoring Alerts',1),(10,1,'New Hardware Setup',1),(11,2,'Email Forwarding',1),(12,2,'Configuration',1),(13,2,'Intermittency',1),(14,2,'IP Blocking',1),(15,2,'IPTV Service',1),(16,2,'Latency',1),(17,2,'Link Down',1),(18,2,'Packet Lost',1),(19,2,'Page Blocking',1),(20,2,'Slowness',1),(21,2,'Telephony',1),(22,3,'Physical Problems',1),(23,3,'Damaged Pole',1),(24,3,'Electrical Issue',1),(25,3,'New Installation',1),(26,3,'Disconnection',1),(27,4,'RFO Elaboration',1),(28,4,'Maintenance Window',1),(29,4,'Core Network',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeline`
--

LOCK TABLES `timeline` WRITE;
/*!40000 ALTER TABLE `timeline` DISABLE KEYS */;
INSERT INTO `timeline` VALUES (1,1,6,'Ticket Created','Ticket created by client José Ramírez Calderón','2025-10-20 09:15:00',1),(2,1,3,'Assigned to Technician','Ticket assigned to Carlos Méndez López by Admin Juan García Bolaños','2025-10-20 10:00:00',1),(3,1,3,'Investigation','Technician Carlos checked login server and user credentials','2025-10-20 11:00:00',1),(4,1,3,'Resolved','Login issue fixed by resetting password and clearing cache','2025-10-20 12:30:00',1),(5,2,6,'Ticket Created','Ticket created by client José Ramírez Calderón','2025-10-21 08:55:00',1),(6,2,3,'Assigned to Technician','Ticket assigned to Carlos Méndez López by Admin Juan García Bolaños','2025-10-21 09:10:00',1),(7,2,3,'Investigation','Technician Carlos checked network switches and router configuration','2025-10-21 10:00:00',1),(8,2,3,'Resolved','Internet connection restored','2025-10-21 11:30:00',1),(9,3,7,'Ticket Created','Ticket created by client Paola Hernández Vargas','2025-10-22 14:40:00',1),(10,3,4,'Assigned to Technician','Ticket assigned to Andrés Villalobos Soto by Admin Juan García Bolaños','2025-10-22 15:00:00',1),(11,3,4,'Installation Scheduled','Technician scheduled software installation on client PC','2025-10-23 09:00:00',1),(12,3,4,'Resolved','Software successfully installed','2025-10-23 10:30:00',1),(13,4,7,'Ticket Created','Ticket created by client Paola Hernández Vargas','2025-10-23 07:45:00',1),(14,4,5,'Assigned to Technician','Ticket assigned to Diego Alvarez Fuentes by Admin Juan García Bolaños','2025-10-23 09:30:00',1),(15,4,5,'Inspection','Technician Diego inspected UPS battery and connections','2025-10-23 10:15:00',1),(16,4,5,'Resolved','UPS battery replaced and issue resolved','2025-10-23 11:00:00',1),(17,5,8,'Ticket Created','Ticket created by client Luis Alberto Castillo','2025-10-24 09:30:00',1),(18,5,4,'Assigned to Technician','Ticket assigned to Andrés Villalobos Soto by Admin Juan García Bolaños','2025-10-24 09:45:00',1),(19,5,4,'Investigation','Technician Andrés checked switches and firewall configuration','2025-10-24 10:30:00',1),(20,6,8,'Ticket Created','Ticket created by client Luis Alberto Castillo','2025-10-25 08:55:00',1),(21,6,5,'Assigned to Technician','Ticket assigned to Diego Alvarez Fuentes by Admin Juan García Bolaños','2025-10-25 09:15:00',1),(22,6,5,'Inspection','Technician Diego checked hardware, found overheating issue','2025-10-25 10:00:00',1),(23,7,9,'Ticket Created','Ticket created by client Gabriela Solís Jiménez','2025-10-26 09:00:00',1),(24,7,3,'Assigned to Technician','Ticket assigned to Carlos Méndez López by Admin Juan García Bolaños','2025-10-26 09:15:00',1),(25,7,3,'Investigation','Checked mobile email configuration and server connectivity','2025-10-26 10:00:00',1),(26,7,3,'Resolved','Email service restored after server patch update','2025-10-27 16:00:00',1),(27,8,10,'Ticket Created','Ticket created by client Javier Morales Campos','2025-10-26 10:30:00',1),(28,8,7,'Assigned to Technician','Ticket assigned to Andrés Villalobos Soto by Admin Juan García Bolaños','2025-10-26 10:45:00',1),(29,8,7,'Investigation','Technician Andrés checked printer queue and paper feed mechanism','2025-10-26 11:15:00',1);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_user_role` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Juan García Bolaños','juan.garcia@empresa.com','admin123',NULL,1),(2,1,'María Fernanda Rojas','maria.rojas@empresa.com','secureadmin',NULL,1),(3,2,'Carlos Méndez López','carlos.mendez@empresa.com','techpass1',NULL,1),(4,2,'Andrés Villalobos Soto','andres.villalobos@empresa.com','tecnico22',NULL,1),(5,2,'Verónica Salazar Mora','veronica.salazar@empresa.com','repairteam',NULL,1),(6,3,'José Ramírez Calderón','jose.ramirez@gmail.com','client01',NULL,1),(7,3,'Paola Hernández Vargas','paola.hernandez@gmail.com','client02',NULL,1),(8,3,'Luis Alberto Castillo','luis.castillo@hotmail.com','client03',NULL,1),(9,3,'Gabriela Solís Jiménez','gabriela.solis@empresa.com','ownerpass',NULL,1),(10,3,'Ricardo Molina Céspedes','ricardo.molina@empresa.com','ownersecure',NULL,1),(11,1,'Sofia Martinez Rivera','sofia.martinez@company.com','adminpass2',NULL,1),(12,1,'Miguel Torres Delgado','miguel.torres@company.com','adminsecure2',NULL,1),(13,2,'Diego Alvarez Fuentes','diego.alvarez@company.com','techpass3',NULL,1),(14,2,'Carla Dominguez Pacheco','carla.dominguez@company.com','techsecure3',NULL,1),(15,3,'Ana Lucia Rojas','ana.rojas@gmail.com','client04',NULL,1),(16,3,'Javier Morales Campos','javier.morales@hotmail.com','client05',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_special_field`
--

LOCK TABLES `user_special_field` WRITE;
/*!40000 ALTER TABLE `user_special_field` DISABLE KEYS */;
INSERT INTO `user_special_field` VALUES (1,3,1,1),(2,3,3,1),(3,3,7,1),(4,4,2,1),(5,4,4,1),(6,4,6,1),(7,4,8,1),(8,5,5,1),(9,5,9,1),(10,5,10,1),(11,5,11,1),(12,5,12,1),(13,9,1,1),(14,9,11,1),(15,9,12,1),(16,10,4,1),(17,10,6,1),(18,10,8,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ticket`
--

LOCK TABLES `user_ticket` WRITE;
/*!40000 ALTER TABLE `user_ticket` DISABLE KEYS */;
INSERT INTO `user_ticket` VALUES (1,6,1,'2025-10-20 09:15:00',NULL,1),(2,3,1,'2025-10-20 10:00:00',1,1),(3,6,2,'2025-10-21 08:55:00',NULL,1),(4,3,2,'2025-10-21 09:10:00',1,1),(5,7,3,'2025-10-22 14:40:00',NULL,1),(6,4,3,'2025-10-22 15:00:00',1,1),(7,7,4,'2025-10-23 07:45:00',NULL,1),(8,5,4,'2025-10-23 09:30:00',1,1),(9,8,5,'2025-10-24 09:30:00',NULL,1),(10,4,5,'2025-10-24 09:45:00',1,1),(11,8,6,'2025-10-25 08:55:00',NULL,1),(12,5,6,'2025-10-25 09:15:00',1,1),(13,9,7,'2025-10-26 09:00:00',NULL,1),(14,3,7,'2025-10-26 09:15:00',1,1),(15,10,8,'2025-10-26 10:30:00',NULL,1),(16,4,8,'2025-10-26 10:45:00',1,1);
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

-- Dump completed on 2025-10-26 21:57:29
