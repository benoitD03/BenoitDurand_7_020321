-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version 8.0.23
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE=‘+00:00’ */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=‘NO_AUTO_VALUE_ON_ZERO’ */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Table structure for table `Messages`
--
DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUSERS` int NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT ‘Un Titre’,
  `content` varchar(255) NOT NULL DEFAULT ‘Un Message’,
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idUSERS` (`idUSERS`),
  CONSTRAINT `fk_idUSERS` FOREIGN KEY (`idUSERS`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`idUSERS`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Messages`
--
LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
INSERT INTO `Messages` VALUES (34,5,‘Montre connectée’,‘Ma nouvelle montre connectée’,‘http://localhost:3000/images/smart-watch-821557_1280.jpg1615914917039.jpg','2021-03-16 17:15:17’,‘2021-03-16 17:15:17’),(41,16,‘Bonjour’,‘Bonjour à tous, je vous souhaite de passer une bonne journée !’,NULL,‘2021-03-18 08:56:59’,‘2021-03-18 08:56:59’),(47,2,’Encore ...’,’Quand je vois que l\’OM a encore perdu ce week end ’,’http://localhost:3000/images/Di_Maria.webp1616260637728.webp','2021-03-20 17:17:17',‘2021-03-20 17:17:17’),(49,10,‘Vivement...‘,’...Les vacances !’,’http://localhost:3000/images/sea-5603352_1280.jpg1616261056423.jpg','2021-03-20 17:24:16',‘2021-03-20 17:24:16’),(50,17,’Hello !’,’Bonjour moi c\‘est Jacky, et je suis ravi d\‘être parmis vous !’,NULL,‘2021-03-20 17:50:29’,‘2021-03-20 17:50:29’);
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `SequelizeMeta`
--
DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `SequelizeMeta`
--
LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES (‘20210303144638-create-user.js’),(‘20210303150504-create-messagee.js’),(‘20210319085438-create-like.js’);
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `Users`
--
DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Users`
--
LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (2,'bens.92@hotmail.fr’,‘Benoit’,‘$2b$10$BR3IiJrEF8UA1hsQEQG7ouNSBz/t1yggOpHz9rwb.zXtY.ivGbQXO’,’Je n\’ai pas d\‘idée de description !’,0,‘http://localhost:3000/images/photo_profil_1.jpg1615918894503.jpg','2021-03-04 11:41:09’,‘2021-03-20 17:57:14’),(5,'blabla@test.com’,‘blabla’,‘$2b$10$7yuvCSw5m9r9Rf.OEYW7/exLJfM0yEtRmC4Q3ot1iMupIXZNYrZYq’,‘Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.’,0,‘http://localhost:3000/images/child-1359236_1280.jpg1615919793984.jpg','2021-03-05 08:34:52’,‘2021-03-20 17:27:04’),(10,'marie@test.com’,‘Marie’,‘$2b$10$0KVy7uiDSxcMvUSpc33E3.8BEIdWEiJXNG6PEI9AWD0W0aVaH8Yca’,‘Nouvelle Description de Marie’,0,‘http://localhost:3000/images/pink-hair-1450045_1280.jpg1615919657415.jpg','2021-03-12 13:37:03’,‘2021-03-16 18:34:17’),(16,'admin@test.com’,‘admin’,‘$2b$10$Xey2yRwI2DRioRb8PVH9buyPjZz119v6UuDDbStEqoAofSY8IUzre’,‘Je suis un administrateur de Groupomania . ’,1,‘http://localhost:3000/images/user_default.jpg','2021-03-18 08:41:50’,‘2021-03-18 08:41:50’),(17,'jacky@test.com’,' Jacky’,‘$2b$10$ilP0tI7DdrFGwc0FOHXPiOxXjxTMlaTyOXiguxjYJqvPIAsk.tGmi’,‘Lorem ipsum dolor sit amet, consectetur adipiscing elit.’,0,‘http://localhost:3000/images/hunger-413685_1280.jpg1616262499199.jpg','2021-03-20 17:41:58’,‘2021-03-20 17:48:19’);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2021-03-22  9:56:25