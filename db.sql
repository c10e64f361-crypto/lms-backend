-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: lms_quocphong
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `announcement_reads`
--

DROP TABLE IF EXISTS `announcement_reads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement_reads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `announcement_id` int NOT NULL,
  `user_id` int NOT NULL,
  `read_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_read` (`announcement_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `announcement_reads_ibfk_1` FOREIGN KEY (`announcement_id`) REFERENCES `announcements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `announcement_reads_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement_reads`
--

LOCK TABLES `announcement_reads` WRITE;
/*!40000 ALTER TABLE `announcement_reads` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcement_reads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Chuyển đổi số',NULL,'2025-11-01 07:55:38'),(2,'An ninh mạng',NULL,'2025-11-01 07:55:38'),(3,'Trí tuệ nhân tạo',NULL,'2025-11-01 07:55:38'),(4,'Quản lý dữ liệu',NULL,'2025-11-01 07:55:38'),(5,'Lập trình','Mô tả','2025-11-07 07:21:46'),(6,'ok','ok','2025-11-07 07:24:04');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `video_url` varchar(255) DEFAULT NULL,
  `duration` int DEFAULT '0',
  `order_number` int DEFAULT '0',
  `status` enum('Hoàn thành','Chưa hoàn thành','Khóa') DEFAULT 'Chưa hoàn thành',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chapters_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (16,122,'Chương 1','không có','/uploads/videos/chapter-1763346275791-807042763.mp4',10,999,'Chưa hoàn thành','2025-11-17 02:14:35','2025-11-17 02:24:35',NULL),(17,122,'Chương 2','Mô tả','/uploads/videos/chapter-1763345696192-97373498.mp4',20,999,'Chưa hoàn thành','2025-11-17 02:14:56','2025-11-17 02:14:56',NULL),(18,121,'f','d','/uploads/videos/chapter-1763348027000-170087451.mp4',2,999,'Chưa hoàn thành','2025-11-17 02:53:47','2025-11-17 02:53:47',NULL),(19,121,'f','gf','/uploads/videos/chapter-1763348044701-117870567.mp4',3,999,'Chưa hoàn thành','2025-11-17 02:54:04','2025-11-17 02:54:04',NULL);
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL,
  `description` text,
  `instructor` varchar(100) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `level` enum('Cơ bản','Nâng cao','Chuyên sâu') DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` decimal(10,0) DEFAULT '0',
  `students` int DEFAULT '0',
  `status` enum('Đang mở','Sắp mở','Đã kết thúc') DEFAULT 'Đang mở',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_id` int DEFAULT NULL,
  `tag` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (87,'CDS01','Chuyển đổi số cơ bản','Giới thiệu về chuyển đổi số','Nguyễn Văn A',45,'/uploads/images/cds-co-ban.jpg','Cơ bản','2025-01-10','2025-02-20',0,120,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'chuyển đổi số'),(88,'CDS02','Chiến lược chuyển đổi số','Xây dựng kế hoạch chuyển đổi số','Trần Thị B',60,'/uploads/images/chien-luoc-cds.jpg','Nâng cao','2025-02-01','2025-03-15',0,85,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'chiến lược'),(89,'CDS03','AI trong chuyển đổi số','Ứng dụng AI trong doanh nghiệp','Lê Văn C',75,'/uploads/images/ai-cds.jpg','Chuyên sâu','2025-03-05','2025-05-10',0,60,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'AI'),(90,'CDS04','IoT và chuyển đổi số','Kết nối vạn vật trong doanh nghiệp','Phạm Thị D',55,'/uploads/images/iot-cds.jpg','Nâng cao','2025-04-01','2025-05-15',0,70,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'IoT'),(91,'CDS05','Blockchain cơ bản','Công nghệ blockchain và ứng dụng','Hoàng Văn E',70,'/uploads/images/blockchain.jpg','Chuyên sâu','2025-05-10','2025-07-05',0,45,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'blockchain'),(92,'CDS06','Cloud Computing','Điện toán đám mây cho doanh nghiệp','Nguyễn Thị F',65,'/uploads/images/cloud.jpg','Nâng cao','2025-01-20','2025-03-10',0,95,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'cloud'),(93,'CDS07','Big Data cơ bản','Phân tích dữ liệu lớn','Trần Văn G',80,'/uploads/images/big-data.jpg','Chuyên sâu','2025-02-15','2025-04-20',0,55,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'big data'),(94,'CDS08','5G và chuyển đổi số','Công nghệ 5G trong doanh nghiệp','Lê Thị H',50,'/uploads/images/5g.jpg','Cơ bản','2025-03-20','2025-04-25',0,110,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'5G'),(95,'CDS09','Cybersecurity cơ bản','An ninh mạng trong chuyển đổi số','Phạm Văn I',60,'/uploads/images/cyber.jpg','Cơ bản','2025-04-15','2025-06-01',0,100,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'cybersecurity'),(96,'CDS10','Digital Marketing','Tiếp thị số trong doanh nghiệp','Hoàng Thị K',55,'/uploads/images/digital-marketing.jpg','Nâng cao','2025-05-05','2025-06-20',0,75,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',1,'marketing'),(97,'ANNM01','An ninh mạng cơ bản','Kiến thức nền tảng an ninh mạng','Nguyễn Văn L',60,'/uploads/images/an-ninh-co-ban.jpg','Cơ bản','2025-01-15','2025-03-01',0,130,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'an ninh mạng'),(98,'ANNM02','Firewall & IDS','Cấu hình tường lửa và phát hiện xâm nhập','Trần Thị M',75,'/uploads/images/firewall.jpg','Nâng cao','2025-02-10','2025-04-05',0,80,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'firewall'),(99,'ANNM03','Ethical Hacking','Kỹ thuật kiểm tra bảo mật','Lê Văn N',90,'/uploads/images/hacking.jpg','Chuyên sâu','2025-03-15','2025-05-30',0,50,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'hacking'),(100,'ANNM04','Mã hóa dữ liệu','Nguyên lý và ứng dụng mã hóa','Phạm Thị O',70,'/uploads/images/ma-hoa.jpg','Nâng cao','2025-04-01','2025-05-20',0,65,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'crypto'),(101,'ANNM05','Phishing & Social Engineering','Phòng chống lừa đảo','Hoàng Văn P',55,'/uploads/images/phishing.jpg','Cơ bản','2025-05-10','2025-06-15',0,105,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'phishing'),(102,'ANNM06','Penetration Testing','Kiểm thử xâm nhập','Nguyễn Thị Q',85,'/uploads/images/pentest.jpg','Chuyên sâu','2025-01-25','2025-03-25',0,40,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'pentest'),(103,'ANNM07','Network Security','Bảo mật mạng doanh nghiệp','Trần Văn R',70,'/uploads/images/network-sec.jpg','Nâng cao','2025-02-20','2025-04-10',0,70,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'network'),(104,'ANNM08','Malware Analysis','Phân tích mã độc','Lê Thị S',80,'/uploads/images/malware.jpg','Chuyên sâu','2025-03-25','2025-05-15',0,35,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'malware'),(105,'ANNM09','Incident Response','Xử lý sự cố an ninh','Phạm Văn T',65,'/uploads/images/incident.jpg','Nâng cao','2025-04-20','2025-06-05',0,60,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'incident'),(106,'ANNM10','Zero Trust Security','Mô hình Zero Trust','Hoàng Thị U',60,'/uploads/images/zero-trust.jpg','Chuyên sâu','2025-05-15','2025-07-01',0,45,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',2,'zero trust'),(107,'AI01','AI cơ bản','Giới thiệu về trí tuệ nhân tạo','Nguyễn Văn V',50,'/uploads/images/ai-co-ban.jpg','Cơ bản','2025-01-20','2025-02-25',0,150,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'AI'),(108,'AI02','Machine Learning','Học máy và ứng dụng','Trần Thị W',80,'/uploads/images/ml.jpg','Nâng cao','2025-02-15','2025-04-20',0,90,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'machine learning'),(109,'AI03','Deep Learning','Học sâu với mạng nơ-ron','Lê Văn X',90,'/uploads/images/dl.jpg','Chuyên sâu','2025-03-20','2025-06-01',0,55,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'deep learning'),(110,'AI04','NLP cơ bản','Xử lý ngôn ngữ tự nhiên','Phạm Thị Y',75,'/uploads/images/nlp.jpg','Nâng cao','2025-04-10','2025-06-05',0,70,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'NLP'),(111,'AI05','Computer Vision','Thị giác máy tính','Hoàng Văn Z',85,'/uploads/images/cv.jpg','Chuyên sâu','2025-05-05','2025-07-10',0,40,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'computer vision'),(112,'AI06','Reinforcement Learning','Học tăng cường','Nguyễn Thị AA',95,'/uploads/images/rl.jpg','Chuyên sâu','2025-01-30','2025-04-15',0,30,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'reinforcement'),(113,'AI07','Generative AI','AI sinh tạo','Trần Văn BB',70,'/uploads/images/gen-ai.jpg','Nâng cao','2025-02-25','2025-04-20',0,80,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'generative'),(114,'AI08','AI Ethics','Đạo đức trong AI','Lê Thị CC',55,'/uploads/images/ai-ethics.jpg','Cơ bản','2025-03-30','2025-05-01',0,100,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'ethics'),(115,'AI09','MLOps cơ bản','Triển khai mô hình ML','Phạm Văn DD',75,'/uploads/images/mlops.jpg','Nâng cao','2025-04-25','2025-06-15',0,60,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'mlops'),(116,'AI10','AI in Healthcare','AI trong y tế','Hoàng Thị EE',80,'/uploads/images/ai-health.jpg','Chuyên sâu','2025-05-20','2025-07-20',0,45,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',3,'healthcare'),(117,'QLDL01','Quản lý CSDL','Thiết kế và quản lý cơ sở dữ liệu','Nguyễn Văn FF',60,'/uploads/images/db.jpg','Cơ bản','2025-01-25','2025-03-10',0,110,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',4,'database'),(118,'QLDL02','Big Data cơ bản','Giới thiệu Big Data','Trần Thị GG',70,'/uploads/images/big-data2.jpg','Nâng cao','2025-02-20','2025-04-15',0,75,'Đang mở','2025-11-07 07:40:00','2025-11-07 07:40:00',4,'big data'),(119,'QLDL03','Data Warehouse','Kho dữ liệu và phân tích','Lê Văn HH',65,'/uploads/images/dwh.jpg','Nâng cao','2025-03-25','2025-05-10',0,60,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',4,'data warehouse'),(120,'QLDL04','ETL Process','Quy trình ETL','Phạm Thị II',55,'/uploads/images/etl2.jpg','Chuyên sâu','2025-04-20','2025-05-30',0,50,'Sắp mở','2025-11-07 07:40:00','2025-11-07 07:40:00',4,'ETL'),(121,'QLDL05','Data Governance','Quản trị dữ liệu','Hoàng Văn JJ',75,'/uploads/images/course-1762504706457-315597619.png','Chuyên sâu','2025-05-14','2025-07-09',0,40,'Đang mở','2025-11-07 07:40:00','2025-11-07 08:38:26',4,'governance'),(122,'LAP01','Khoá học lập trình','lập trinh','c',10,'/uploads/images/course-1762503006479-642144483.png','Cơ bản','2025-11-07','2025-11-28',100000,0,'Đang mở','2025-11-07 08:10:06','2025-11-07 08:10:06',5,'hoc');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussions`
--

DROP TABLE IF EXISTS `discussions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `user_id` int NOT NULL,
  `parent_id` int DEFAULT NULL,
  `content` text NOT NULL,
  `likes` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `user_id` (`user_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `discussions_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `discussions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `discussions_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `discussions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussions`
--

LOCK TABLES `discussions` WRITE;
/*!40000 ALTER TABLE `discussions` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` enum('pdf','docx','pptx') COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uploaded_by` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uploaded_by` (`uploaded_by`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'Hướng dẫn sử dụng LMS','/uploads/documents/huong-dan-lms.pdf','pdf','2025-11-06 01:44:17',1),(2,'Báo cáo tổng kết 2025','/uploads/documents/bao-cao-2025.docx','docx','2025-11-06 01:44:17',1),(3,'Slide giới thiệu hệ thống','/uploads/documents/slide-gioi-thieu.pptx','pptx','2025-11-06 01:44:17',1),(4,'Tài liệu bảo mật thông tin','/uploads/documents/tai-lieu-bao-mat.pdf','pdf','2025-11-06 01:44:17',1),(5,'Quy trình xử lý sự cố','/uploads/documents/quy-trinh-su-co.docx','docx','2025-11-06 01:44:17',1),(6,'Hướng dẫn sử dụng LMS','/uploads/documents/huong-dan-lms.pdf','pdf','2025-11-06 01:49:56',1),(7,'Báo cáo tổng kết 2025','/uploads/documents/bao-cao-2025.docx','docx','2025-11-06 01:49:56',1),(8,'Slide giới thiệu hệ thống','/uploads/documents/slide-gioi-thieu.pptx','pptx','2025-11-06 01:49:56',1),(9,'Tài liệu bảo mật thông tin','/uploads/documents/tai-lieu-bao-mat.pdf','pdf','2025-11-06 01:49:56',1),(10,'Quy trình xử lý sự cố','/uploads/documents/quy-trinh-su-co.docx','docx','2025-11-06 01:49:56',1),(12,'Báo cáo tổng kết Q1 2025','/uploads/documents/doc-1762394353892-479951462.docx','docx','2025-11-06 01:50:59',1),(13,'Tài liệu đào tạo nội bộ','/uploads/documents/doc-1762419030221-628181578.pdf','pdf','2025-11-06 01:50:59',1),(14,'Checklist kiểm tra hệ thống','/uploads/documents/checklist-he-thong.pdf','pdf','2025-11-06 01:50:59',1),(15,'Sổ tay nhân viên mới','/uploads/documents/so-tay-nhan-vien.pdf','pdf','2025-11-06 01:50:59',1),(16,'Hướng dẫn bảo mật thông tin','/uploads/documents/hd-bao-mat.pdf','pdf','2025-11-06 01:50:59',1),(17,'Quy trình xử lý sự cố mạng','/uploads/documents/quy-trinh-su-co.pdf','pdf','2025-11-06 01:50:59',1),(18,'Tài liệu hội thảo AI 2025','/uploads/documents/hoi-thao-ai-2025.pdf','pdf','2025-11-06 01:50:59',1),(19,'Biên bản họp tháng 4','/uploads/documents/bien-ban-thang-4.pdf','pdf','2025-11-06 01:50:59',1),(20,'Hướng dẫn triển khai dự án','/uploads/documents/hd-trien-khai.pdf','pdf','2025-11-06 01:50:59',1),(21,'Mẫu hợp đồng lao động','/uploads/documents/mau-hop-dong.docx','docx','2025-11-06 01:50:59',1),(22,'Báo cáo tài chính Q1','/uploads/documents/bao-cao-tai-chinh.docx','docx','2025-11-06 01:50:59',1),(23,'Kế hoạch kinh doanh 2025','/uploads/documents/ke-hoach-2025.docx','docx','2025-11-06 01:50:59',1),(24,'Biên bản kiểm tra an toàn','/uploads/documents/bb-kiem-tra.docx','docx','2025-11-06 01:50:59',1),(25,'Hồ sơ nhân sự mẫu','/uploads/documents/ho-so-nhan-su.docx','docx','2025-11-06 01:50:59',1),(26,'Slide giới thiệu công ty','/uploads/documents/slide-gioi-thieu.pptx','pptx','2025-11-06 01:50:59',1),(27,'Báo cáo kết quả kinh doanh','/uploads/documents/slide-bao-cao.pptx','pptx','2025-11-06 01:50:59',1),(28,'Đào tạo chuyển đổi số','/uploads/documents/slide-chuyen-doi-so.pptx','pptx','2025-11-06 01:50:59',1),(29,'Hội thảo an ninh mạng','/uploads/documents/slide-an-ninh-mang.pptx','pptx','2025-11-06 01:50:59',1),(30,'Kế hoạch marketing Q2','/uploads/documents/slide-marketing.pptx','pptx','2025-11-06 01:50:59',1),(31,'OK','/uploads/documents/doc-1762394313523-762248512.docx','docx','2025-11-06 01:58:33',1);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `enrolled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_enrollment` (`user_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_questions`
--

DROP TABLE IF EXISTS `exam_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int NOT NULL,
  `question_text` text NOT NULL,
  `option_a` varchar(255) NOT NULL,
  `option_b` varchar(255) NOT NULL,
  `option_c` varchar(255) NOT NULL,
  `option_d` varchar(255) NOT NULL,
  `correct_answer` char(1) NOT NULL,
  `points` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `exam_id` (`exam_id`),
  CONSTRAINT `exam_questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exam_questions_chk_1` CHECK ((`correct_answer` in (_utf8mb4'A',_utf8mb4'B',_utf8mb4'C',_utf8mb4'D')))
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_questions`
--

LOCK TABLES `exam_questions` WRITE;
/*!40000 ALTER TABLE `exam_questions` DISABLE KEYS */;
INSERT INTO `exam_questions` VALUES (2,3,'câu 1','a','f','f','f','A',1,'2025-11-05 01:34:10'),(3,3,'ksjd','fhs','h','hs','jhs','A',1,'2025-11-05 01:34:20'),(5,5,'câu hỏi 1','1','3','2','4','A',1,'2025-11-06 02:41:11'),(6,2,'câu 2','s','c','d','d','A',1,'2025-11-06 09:04:10'),(7,2,'Câu hỏi','A','D','BC','d','A',1,'2025-11-06 09:19:29'),(8,2,'2 + 2 = ?','3','4','5','6','B',1,'2025-11-06 09:19:36'),(10,2,'f','f','f','g','g','A',1,'2025-11-14 08:29:14'),(11,2,'Câu 10: Viết tắt của HTML là gì?','Hyper Text Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlink and Text Markup Language','A',1,'2025-11-14 08:29:27'),(12,2,'Câu 98: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = 32, 32 + 32 = 64, 64 + 64 = ?','128','6464','256','640','A',1,'2025-11-14 08:29:27'),(13,2,'Câu 6: React là thư viện hay framework?','Thư viện','Framework','Ngôn ngữ','IDE','A',1,'2025-11-14 08:29:38'),(14,2,'Câu 7: HTTP status 404 nghĩa là gì?','OK','Not Found','Server Error','Redirect','B',1,'2025-11-14 08:29:38'),(15,45,'Câu 10: Viết tắt của HTML là gì?','Hyper Text Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlink and Text Markup Language','A',1,'2025-11-14 08:29:52'),(16,45,'Câu 98: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = 32, 32 + 32 = 64, 64 + 64 = ?','128','6464','256','640','A',1,'2025-11-14 08:29:52'),(17,45,'Câu 99: Tác giả \"Sang thu\"?','Hữu Thỉnh','Tố Hữu','Xuân Diệu','Chính Hữu','A',1,'2025-11-14 08:29:52'),(18,45,'Câu 1: Thủ đô của Việt Nam là gì?','Hà Nội','TP.HCM','Đà Nẵng','Cần Thơ','A',1,'2025-11-14 08:29:52'),(19,45,'Câu 3: Hành tinh nào lớn nhất Hệ Mặt Trời?','Trái Đất','Sao Hỏa','Sao Mộc','Sao Kim','C',1,'2025-11-14 08:29:52'),(20,45,'Câu 2: 1 + 1 bằng mấy?','1','2','3','4','B',1,'2025-11-14 08:29:52'),(21,2,'Câu 10: Viết tắt của HTML là gì?','Hyper Text Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlink and Text Markup Language','A',1,'2025-11-14 08:31:34'),(22,2,'Câu 98: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = 32, 32 + 32 = 64, 64 + 64 = ?','128','6464','256','640','A',1,'2025-11-14 08:31:34'),(23,66,'Câu 10: Viết tắt của HTML là gì?','Hyper Text Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlink and Text Markup Language','A',1,'2025-11-14 08:32:13'),(24,66,'Câu 98: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = 32, 32 + 32 = 64, 64 + 64 = ?','128','6464','256','640','A',1,'2025-11-14 08:32:13'),(25,66,'Câu 99: Tác giả \"Sang thu\"?','Hữu Thỉnh','Tố Hữu','Xuân Diệu','Chính Hữu','A',1,'2025-11-14 08:32:13'),(26,66,'Câu 1: Thủ đô của Việt Nam là gì?','Hà Nội','TP.HCM','Đà Nẵng','Cần Thơ','A',1,'2025-11-14 08:32:13'),(27,66,'Câu 2: 1 + 1 bằng mấy?','1','2','3','4','B',1,'2025-11-14 08:32:13'),(28,66,'Câu 3: Hành tinh nào lớn nhất Hệ Mặt Trời?','Trái Đất','Sao Hỏa','Sao Mộc','Sao Kim','C',1,'2025-11-14 08:32:13'),(29,44,'Câu 10: Viết tắt của HTML là gì?','Hyper Text Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlink and Text Markup Language','A',1,'2025-11-14 08:38:08'),(30,44,'Viết tắt của HTML là gì?','Hyper Text Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlink and Text Markup Language','A',1,'2025-11-14 08:42:31'),(31,44,'1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = 32, 32 + 32 = 64, 64 + 64 = ?','128','6464','256','640','A',1,'2025-11-14 08:42:31'),(32,44,'Tác giả \"Sang thu\"?','Hữu Thỉnh','Tố Hữu','Xuân Diệu','Chính Hữu','A',1,'2025-11-14 08:42:31'),(33,44,'Thủ đô của Việt Nam là gì?','Hà Nội','TP.HCM','Đà Nẵng','Cần Thơ','A',1,'2025-11-14 08:42:31'),(36,65,'Tác giả \"Sang thu\"?','Hữu Thỉnh','Tố Hữu','Xuân Diệu','Chính Hữu','A',1,'2025-11-14 08:44:20'),(37,65,'Thủ đô của Việt Nam là gì?','Hà Nội','TP.HCM','Đà Nẵng','Cần Thơ','A',1,'2025-11-14 08:44:20'),(38,65,'1 + 1 bằng mấy?','1','2','3','4','B',1,'2025-11-14 08:44:20');
/*!40000 ALTER TABLE `exam_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_results`
--

DROP TABLE IF EXISTS `exam_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `exam_id` int NOT NULL,
  `score` int NOT NULL,
  `total_questions` int NOT NULL,
  `correct_answers` int NOT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_result` (`user_id`,`exam_id`),
  KEY `exam_id` (`exam_id`),
  CONSTRAINT `exam_results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exam_results_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_results`
--

LOCK TABLES `exam_results` WRITE;
/*!40000 ALTER TABLE `exam_results` DISABLE KEYS */;
INSERT INTO `exam_results` VALUES (1,3,3,100,2,2,'2025-11-05 01:34:28'),(6,3,5,0,1,0,'2025-11-06 02:41:21'),(11,3,2,75,4,3,'2025-11-07 08:57:12'),(16,3,44,100,5,5,'2025-11-14 08:46:53'),(17,3,45,33,6,2,'2025-11-14 08:47:37'),(18,3,66,0,6,0,'2025-11-14 08:53:53');
/*!40000 ALTER TABLE `exam_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_user_answers`
--

DROP TABLE IF EXISTS `exam_user_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_user_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `result_id` int NOT NULL,
  `question_id` int NOT NULL,
  `selected_answer` char(1) NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `result_id` (`result_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `exam_user_answers_ibfk_1` FOREIGN KEY (`result_id`) REFERENCES `exam_results` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exam_user_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `exam_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_user_answers`
--

LOCK TABLES `exam_user_answers` WRITE;
/*!40000 ALTER TABLE `exam_user_answers` DISABLE KEYS */;
INSERT INTO `exam_user_answers` VALUES (11,6,5,'B',0),(16,11,6,'A',1),(17,11,7,'A',1),(18,11,8,'A',0),(32,1,6,'A',1),(33,1,7,'A',1),(34,1,8,'A',0),(35,16,29,'A',1),(36,16,30,'A',1),(37,16,31,'A',1),(38,16,32,'A',1),(39,16,33,'A',1),(40,17,15,'B',0),(41,17,16,'C',0),(42,17,17,'A',1),(43,17,18,'A',1),(44,17,19,'A',0),(45,17,20,'C',0),(46,18,23,'C',0),(47,18,24,'C',0),(48,18,25,'D',0),(49,18,26,'D',0),(50,18,27,'D',0),(51,18,28,'A',0);
/*!40000 ALTER TABLE `exam_user_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exams`
--

DROP TABLE IF EXISTS `exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `duration` int NOT NULL,
  `max_attempts` int DEFAULT '1',
  `scoring_method` enum('Cao nhất','Trung bình','Cuối cùng') DEFAULT 'Cao nhất',
  `status` enum('Chưa mở','Đang mở','Đã kết thúc') DEFAULT 'Chưa mở',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exams`
--

LOCK TABLES `exams` WRITE;
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
INSERT INTO `exams` VALUES (2,'Thi thử AI','Kiểm tra kiến thức trí tuệ nhân tạo','2025-11-07 07:00:00','2025-11-15 09:00:00',120,3,'Trung bình','Đang mở','2025-11-05 00:21:57','2025-11-07 08:53:41'),(3,'ok','ok','2025-11-05 08:02:00','2025-11-06 08:02:00',120,1,'Cao nhất','Đã kết thúc','2025-11-05 01:03:00','2025-11-06 01:22:30'),(5,'kỳ thi chuyển đổi số','','2025-11-06 09:40:00','2025-11-07 09:40:00',120,2,'Cao nhất','Đã kết thúc','2025-11-06 02:40:54','2025-11-07 06:38:30'),(36,'Kỳ thi Toán cơ bản - Kỳ 1','Kỳ thi định kỳ môn Toán lớp 6','2025-11-10 09:00:00','2025-11-10 10:00:00',60,1,'Cao nhất','Đã kết thúc','2025-11-08 02:41:10','2025-11-14 07:03:18'),(37,'Kỳ thi Toán nâng cao - Kỳ 2','Kỳ thi định kỳ môn Toán lớp 12','2025-11-12 14:00:00','2025-11-12 15:00:00',90,2,'Trung bình','Đã kết thúc','2025-11-08 02:41:10','2025-11-14 07:03:18'),(38,'Thi thử Toán Đại học A','Thi thử môn Toán Đại học khối A','2025-11-15 08:00:00','2025-11-15 10:00:00',120,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(39,'Kỳ thi Toán Olympic','Kỳ thi Olympic Toán học cấp trường','2025-11-20 09:00:00','2025-11-20 11:00:00',120,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(40,'Toán lớp 10 - Kỳ 1','Kỳ thi học kỳ 1 môn Toán lớp 10','2025-11-25 08:30:00','2025-11-25 09:30:00',60,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-14 07:03:16'),(41,'Toán lớp 11 - Kỳ 2','Kỳ thi học kỳ 2 môn Toán lớp 11','2025-11-28 14:30:00','2025-11-28 15:30:00',60,1,'Trung bình','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(42,'Thi thử Toán A1','Thi thử môn Toán khối A1','2025-12-01 09:00:00','2025-12-01 11:00:00',120,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:14'),(43,'Toán lớp 9 - Kỳ 1','Kỳ thi học kỳ 1 môn Toán lớp 9','2025-12-05 08:00:00','2025-12-05 09:00:00',60,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:14'),(44,'Kỳ thi Toán cấp tỉnh','Kỳ thi Toán học cấp tỉnh','2025-11-13 02:00:00','2025-12-10 05:00:00',180,1,'Cao nhất','Đang mở','2025-11-08 02:41:10','2025-11-14 08:43:38'),(45,'Toán lớp 8 - Kỳ 2','Kỳ thi học kỳ 2 môn Toán lớp 8','2025-11-13 13:01:00','2025-12-15 01:00:00',60,1,'Trung bình','Đang mở','2025-11-08 02:41:10','2025-11-14 08:31:07'),(46,'Lập trình C# cơ bản','Kỳ thi lập trình C# cho sinh viên mới','2025-11-11 10:00:00','2025-11-11 11:00:00',60,1,'Cao nhất','Đã kết thúc','2025-11-08 02:41:10','2025-11-14 07:03:18'),(47,'Web Development - Kỳ 1','Kỳ thi phát triển web học kỳ 1','2025-11-13 15:00:00','2025-11-13 16:00:00',60,1,'Cao nhất','Đã kết thúc','2025-11-08 02:41:10','2025-11-14 07:03:18'),(48,'Database Design','Kỳ thi thiết kế cơ sở dữ liệu','2025-11-16 09:00:00','2025-11-16 10:30:00',90,1,'Trung bình','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(49,'JavaScript Advanced','Kỳ thi JavaScript nâng cao','2025-11-18 14:00:00','2025-11-18 15:30:00',90,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(50,'Network Fundamentals','Kỳ thi cơ bản mạng máy tính','2025-11-21 08:00:00','2025-11-21 09:00:00',60,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-14 07:03:16'),(51,'Python Programming','Kỳ thi lập trình Python','2025-11-23 10:00:00','2025-11-23 11:30:00',90,1,'Trung bình','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(52,'Software Engineering','Kỳ thi kỹ thuật phần mềm','2025-11-26 09:00:00','2025-11-26 11:00:00',120,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-14 07:03:16'),(53,'Data Structures','Kỳ thi cấu trúc dữ liệu','2025-11-29 14:00:00','2025-11-29 16:00:00',120,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(54,'Operating Systems','Kỳ thi hệ điều hành','2025-12-02 08:30:00','2025-12-02 10:00:00',90,1,'Trung bình','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(55,'Computer Graphics','Kỳ thi đồ họa máy tính','2025-12-04 15:00:00','2025-12-04 17:00:00',120,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:14'),(56,'English Level A1','Kỳ thi tiếng Anh trình độ A1','2025-11-09 09:00:00','2025-11-09 10:00:00',60,1,'Cao nhất','Đã kết thúc','2025-11-08 02:41:10','2025-11-14 07:03:18'),(57,'English Level A2','Kỳ thi tiếng Anh trình độ A2','2025-11-14 14:00:00','2025-11-14 15:00:00',60,1,'Cao nhất','Đã kết thúc','2025-11-08 02:41:10','2025-11-14 08:30:34'),(58,'TOEIC Practice 1','Luyện thi TOEIC lần 1','2025-11-17 08:00:00','2025-11-17 10:00:00',120,1,'Trung bình','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(59,'IELTS Listening','Kỳ thi IELTS Listening','2025-11-19 10:00:00','2025-11-19 11:00:00',60,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(60,'Business English','Kỳ thi tiếng Anh thương mại','2025-11-22 09:00:00','2025-11-22 10:30:00',90,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-14 07:03:16'),(61,'English Grammar','Kỳ thi ngữ pháp tiếng Anh','2025-11-24 15:00:00','2025-11-24 16:00:00',60,1,'Trung bình','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(62,'TOEFL iBT Practice','Luyện thi TOEFL iBT','2025-11-27 08:30:00','2025-11-27 11:30:00',180,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-14 07:03:16'),(63,'English Vocabulary','Kỳ thi từ vựng tiếng Anh','2025-11-30 14:00:00','2025-11-30 15:00:00',60,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(64,'IELTS Writing','Kỳ thi IELTS Writing','2025-12-03 09:00:00','2025-12-03 10:30:00',90,1,'Trung bình','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:10'),(65,'English Speaking Test','Kỳ thi nói tiếng Anh','2025-12-06 16:00:00','2025-12-06 17:00:00',60,1,'Cao nhất','Chưa mở','2025-11-08 02:41:10','2025-11-08 02:41:14'),(66,'ok','ok','2025-11-14 15:31:00','2025-11-15 15:31:00',120,1,'Cao nhất','Đang mở','2025-11-14 08:31:51','2025-11-14 08:32:05');
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_progress`
--

DROP TABLE IF EXISTS `learning_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning_progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `chapters_completed` json DEFAULT NULL,
  `total_score` int DEFAULT '0',
  `max_score` int DEFAULT '0',
  `badge` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('Đang học','Hoàn thành') DEFAULT 'Đang học',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_progress` (`user_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `learning_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `learning_progress_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_progress`
--

LOCK TABLES `learning_progress` WRITE;
/*!40000 ALTER TABLE `learning_progress` DISABLE KEYS */;
INSERT INTO `learning_progress` VALUES (124,3,122,'[16]',0,0,NULL,'2025-11-17 03:11:19','Đang học'),(125,3,121,'[18, 19]',0,0,NULL,'2025-11-17 03:12:07','Đang học');
/*!40000 ALTER TABLE `learning_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_bank`
--

DROP TABLE IF EXISTS `question_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_bank` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_text` text NOT NULL,
  `option_a` varchar(255) NOT NULL,
  `option_b` varchar(255) NOT NULL,
  `option_c` varchar(255) NOT NULL,
  `option_d` varchar(255) NOT NULL,
  `correct_answer` char(1) NOT NULL,
  `category` varchar(100) DEFAULT 'Chung',
  `difficulty` enum('Dễ','Trung bình','Khó') DEFAULT 'Trung bình',
  `points` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `question_bank_chk_1` CHECK ((`correct_answer` in (_utf8mb4'A',_utf8mb4'B',_utf8mb4'C',_utf8mb4'D')))
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_bank`
--

LOCK TABLES `question_bank` WRITE;
/*!40000 ALTER TABLE `question_bank` DISABLE KEYS */;
INSERT INTO `question_bank` VALUES (1,'AI là gì?','Trí tuệ nhân tạo','Robot','Máy tính','Tất cả','A','AI','Dễ',1,'2025-11-05 01:13:17','2025-11-05 01:13:17'),(2,'2 + 2 = ?','3','4','5','6','D','Toán','Dễ',1,'2025-11-05 01:13:17','2025-11-08 02:36:29'),(6,'Câu hỏi abc','A','C','B','D','A','Chung','Trung bình',1,'2025-11-08 02:33:30','2025-11-08 02:33:30'),(8,'Câu 1: Thủ đô của Việt Nam là gì?','Hà Nội','TP.HCM','Đà Nẵng','Cần Thơ','A','Chung','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(9,'Câu 2: 1 + 1 bằng mấy?','1','2','3','4','B','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(10,'Câu 3: Hành tinh nào lớn nhất Hệ Mặt Trời?','Trái Đất','Sao Hỏa','Sao Mộc','Sao Kim','C','Khoa học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(11,'Câu 4: Ai là tác giả của \"Truyện Kiều\"?','Nguyễn Du','Hồ Xuân Hương','Tố Hữu','Xuân Diệu','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(12,'Câu 5: 2^10 bằng bao nhiêu?','100','1024','512','256','B','Toán','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(13,'Câu 6: React là thư viện hay framework?','Thư viện','Framework','Ngôn ngữ','IDE','A','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(14,'Câu 7: HTTP status 404 nghĩa là gì?','OK','Not Found','Server Error','Redirect','B','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(15,'Câu 8: 1KB = bao nhiêu byte?','1000','1024','2048','4096','B','Tin học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(16,'Câu 9: Nguyên tố hóa học có ký hiệu \"O\" là gì?','Oxy','Vàng','Sắt','Đồng','A','Khoa học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(17,'Câu 10: Viết tắt của HTML là gì?','Hyper Text Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyperlink and Text Markup Language','A','Lập trình','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(18,'Câu 11: Thủ đô của Nhật Bản?','Tokyo','Osaka','Kyoto','Hiroshima','A','Chung','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(19,'Câu 12: 15 x 15 = ?','200','225','250','300','B','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(20,'Câu 13: Tác giả \"Lão Hạc\"?','Nam Cao','Ngô Tất Tố','Vũ Trọng Phụng','Tô Hoài','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(21,'Câu 14: Node.js dùng để làm gì?','Frontend','Backend','Database','Design','B','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(22,'Câu 15: 100! có bao nhiêu chữ số 0 ở cuối?','20','24','28','30','B','Toán','Khó',5,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(23,'Câu 16: useState là hook của?','Vue','React','Angular','Svelte','B','Lập trình','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(24,'Câu 17: Đơn vị đo điện trở?','Volt','Ampere','Ohm','Watt','C','Vật lý','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(25,'Câu 18: CSS viết tắt là gì?','Creative Style Sheets','Cascading Style Sheets','Computer Style Sheets','Colorful Style Sheets','B','Lập trình','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(26,'Câu 19: 1 lít = bao nhiêu cm³?','100','500','1000','2000','C','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(27,'Câu 20: Ai phát minh ra bóng đèn?','Edison','Tesla','Newton','Einstein','A','Khoa học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(28,'Câu 21: Git command để tạo branch?','git branch','git checkout -b','git new','git create','B','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(29,'Câu 22: 7! = ?','5040','720','40320','50400','A','Toán','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(30,'Câu 23: Tác giả \"Chí Phèo\"?','Nam Cao','Kim Lân','Thạch Lam','Nguyễn Tuân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(31,'Câu 24: JWT là gì?','JSON Web Token','Java Web Tool','JavaScript Web Template','JSON Web Template','A','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(32,'Câu 25: pH của nước tinh khiết?','0','7','14','10','B','Hóa học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(33,'Câu 26: useEffect chạy khi?','Mỗi render','Chỉ lần đầu','Khi dependency thay đổi','Khi component unmount','C','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(34,'Câu 27: 1 năm ánh sáng = ?','9.46 nghìn tỷ km','1.5 triệu km','384 nghìn km','150 triệu km','A','Khoa học','Khó',4,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(35,'Câu 28: SQL là viết tắt của?','Structured Query Language','Simple Query Language','System Query Language','Standard Query Language','A','Lập trình','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(36,'Câu 29: 2^20 = ?','1024','1048576','65536','4096','B','Toán','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(37,'Câu 30: Ai là tác giả \"Tắt đèn\"?','Ngô Tất Tố','Nam Cao','Vũ Trọng Phụng','Tô Hoài','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(38,'Câu 31: REST API là gì?','Representational State Transfer','Remote System Transfer','Real-time State Transfer','Resource State Transfer','A','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(39,'Câu 32: Tác giả \"Vợ nhặt\"?','Kim Lân','Nam Cao','Ngô Tất Tố','Tô Hoài','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(40,'Câu 33: 1 + 2 + ... + 100 = ?','5050','5000','5100','4950','A','Toán','Khó',4,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(41,'Câu 34: MongoDB là database gì?','SQL','NoSQL','Graph','Cache','B','Lập trình','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(42,'Câu 35: pH < 7 là?','Kiềm','Trung tính','Axit','Muối','C','Hóa học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(43,'Câu 36: Axios dùng để?','Styling','API calls','State management','Routing','B','Lập trình','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(44,'Câu 37: Tác giả \"Đồng chí\"?','Chính Hữu','Tố Hữu','Xuân Diệu','Huy Cận','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(45,'Câu 38: 1000! có bao nhiêu chữ số?','2568','3000','2000','3568','A','Toán','Khó',5,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(46,'Câu 39: Docker dùng để?','Deploy','Containerization','Testing','Design','B','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(47,'Câu 40: Tác giả \"Số phận con người\"?','M.Gorky','Nam Cao','Tô Hoài','Kim340','A','Văn học','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(48,'Câu 41: 1 + 1/2 + 1/3 + ... + 1/100 ≈ ?','4.5','5.187','6.0','7.2','B','Toán','Khó',5,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(49,'Câu 42: Redux là gì?','State management','UI library','Router','Compiler','A','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(50,'Câu 43: Tác giả \"Hai đứa trẻ\"?','Thạch Lam','Nam Cao','Kim Lân','Tô Hoài','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(51,'Câu 44: CORS là gì?','Cross-Origin Resource Sharing','Client-Side Rendering','Cache Optimization','Component Reuse System','A','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(52,'Câu 45: Tốc độ ánh sáng?','300,000 km/s','150,000 km/s','500,000 km/s','100,000 km/s','A','Vật lý','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(53,'Câu 46: useReducer dùng khi?','State đơn giản','State phức tạp','Form','Animation','B','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(54,'Câu 47: Tác giả \"Bình Ngô đại cáo\"?','Nguyễn Trãi','Lê Lợi','Trần Hưng Đạo','Lý Thường Kiệt','A','Lịch sử','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(55,'Câu 48: 2^64 = ?','1.8e19','4.2e18','1.2e20','9e18','A','Toán','Khó',4,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(56,'Câu 49: GraphQL khác REST ở?','Query cụ thể','Luôn trả JSON','Không cần endpoint','Tất cả','D','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(57,'Câu 50: Tác giả \"Tư tưởng Hồ Chí Minh\"?','Hồ Chí Minh','Nguyễn Ái Quốc','Cả A và B','Không ai','C','Chính trị','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(58,'Câu 51: 100 câu hỏi đã đủ chưa?','Chưa','Đủ rồi','Cần thêm','Quá nhiều','B','Chung','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(59,'Câu 52: SQL injection là gì?','Lỗi bảo mật','Tối ưu query','Join table','Index','A','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(60,'Câu 53: Tác giả \"Vang bóng một thời\"?','Nguyễn Tuân','Nam Cao','Tô Hoài','Vũ Trọng Phụng','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(61,'Câu 54: 1 + 1 = 10 trong hệ nào?','Nhị phân','Thập phân','Bát phân','Thập lục phân','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(62,'Câu 55: Kubernetes là gì?','Orchestration','Database','Frontend','IDE','A','Lập trình','Khó',4,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(63,'Câu 56: Tác giả \"Người lái đò sông Đà\"?','Nguyễn Tuân','Tô Hoài','Nam Cao','Kim Lân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(64,'Câu 57: 1 GB = ?','1024 MB','1000 MB','1000 KB','1024 KB','A','Tin học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(65,'Câu 58: useMemo dùng để?','Tính toán nặng','State','Side effect','Routing','A','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(66,'Câu 59: Tác giả \"Đất nước\"?','Nguyễn Khoa Điềm','Tố Hữu','Chính Hữu','Xuân Diệu','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(67,'Câu 60: 1 + 2 + 3 + ... + n = n(n+1)/2, n=1000 = ?','500500','500000','501000','499500','A','Toán','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(68,'Câu 61: JWT lưu ở đâu?','LocalStorage','Cookie','Session','Tất cả','D','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(69,'Câu 62: Tác giả \"Mùa lạc\"?','Nguyễn Khải','Nam Cao','Tô Hoài','Kim Lân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(70,'Câu 63: 1 ngày = ?','24 giờ','23 giờ 56 phút','24 giờ 30 phút','25 giờ','A','Chung','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(71,'Câu 64: React 18 có gì mới?','Concurrent Mode','Server Components','Tất cả','Không có','C','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(72,'Câu 65: Tác giả \"Tình yêu và thù hận\"?','Nguyễn Huy Tưởng','Tô Hoài','Nam Cao','Kim Lân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(73,'Câu 66: 1 + 1/2 + 1/4 + ... = ?','1','2','3','Vô hạn','B','Toán','Khó',4,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(74,'Câu 67: WebSocket dùng để?','Realtime','File upload','Caching','Routing','A','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(75,'Câu 68: Tác giả \"Bến quê\"?','Nguyễn Minh Châu','Nam Cao','Tô Hoài','Kim Lân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(76,'Câu 69: 1 TB = ?','1024 GB','1000 GB','1000 MB','1024 MB','A','Tin học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(77,'Câu 70: useCallback dùng để?','Memoize function','Memoize value','Side effect','State','A','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(78,'Câu 71: Tác giả \"Đôi mắt\"?','Nam Cao','Tô Hoài','Kim Lân','Nguyễn Tuân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(79,'Câu 72: 1 + 1 = 11 trong hệ nào?','Nhị phân','Thập phân','Bát phân','Thập lục phân','C','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(80,'Câu 73: OAuth là gì?','Authentication','Authorization','Cả hai','Encryption','C','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(81,'Câu 74: Tác giả \"Hồn Trương Ba, da hàng thịt\"?','Lưu Quang Vũ','Nguyễn Tuân','Nam Cao','Tô Hoài','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(82,'Câu 75: 1 + 1/3 + 1/9 + ... = ?','1.5','2','1','Vô hạn','A','Toán','Khó',4,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(83,'Câu 76: SSR là gì?','Server-Side Rendering','Static Site Rendering','Single Source Rendering','Secure Site Rendering','A','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(84,'Câu 77: Tác giả \"Rừng xà nu\"?','Nguyễn Trung Thành','Tô Hoài','Nam Cao','Kim Lân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(85,'Câu 78: 1 + 2 + 4 + 8 + ... + 2^10 = ?','2047','2048','1023','1024','A','Toán','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(86,'Câu 79: Microservices là gì?','Nhiều service nhỏ','Một service lớn','Database','Frontend','A','Lập trình','Khó',3,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(87,'Câu 80: Tác giả \"Chiếc lược ngà\"?','Nguyễn Quang Sáng','Tô Hoài','Nam Cao','Kim Lân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(88,'Câu 81: 1 + 1 = 2 trong hệ nào?','Nhị phân','Thập phân','Bát phân','Thập lục phân','B','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(89,'Câu 82: Tác giả \"Làng\"?','Kim Lân','Nam Cao','Tô Hoài','Nguyễn Tuân','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(90,'Câu 83: 1 + 1/2 + 1/4 + 1/8 + ... = ?','1','2','3','Vô hạn','B','Toán','Khó',4,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(91,'Câu 84: CI/CD là gì?','Continuous Integration/Deployment','Code Inspection','Cache Invalidation','Component Import','A','Lập trình','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(92,'Câu 85: Tác giả \"Tư cách miền Nam\"?','Sơn Nam','Tô Hoài','Nam Cao','Kim Lân','A','Văn học','Trung bình',2,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(93,'Câu 86: 1 + 1 = 10 trong hệ nhị phân, 1 + 1 = ? trong hệ bát phân','2','10','11','12','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(94,'Câu 87: Tác giả \"Mùa xuân nho nhỏ\"?','Thanh Hải','Tô Hoài','Nam Cao','Kim Lân','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(95,'Câu 88: 1 + 2 + 3 + ... + 50 = ?','1275','1250','1300','1225','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(96,'Câu 89: Tác giả \"Đoàn thuyền đánh cá\"?','Huy Cận','Tố Hữu','Xuân Diệu','Chính Hữu','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(97,'Câu 90: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = ?','8','16','44','22','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(98,'Câu 91: Tác giả \"Bài thơ về tiểu đội xe không kính\"?','Phạm Tiến Duật','Tố Hữu','Xuân Diệu','Chính Hữu','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(99,'Câu 92: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = ?','16','88','64','80','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(100,'Câu 93: Tác giả \"Đồng chí\"?','Chính Hữu','Tố Hữu','Xuân Diệu','Huy Cận','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(101,'Câu 94: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = ?','32','1616','64','160','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(102,'Câu 95: Tác giả \"Mẹ tôi\"?','Ét-môn-đô đơ A-mi-xi','Nam Cao','Tô Hoài','Kim Lân','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(103,'Câu 96: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = 32, 32 + 32 = ?','64','3232','128','320','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(104,'Câu 97: Tác giả \"Bếp lửa\"?','Bằng Việt','Tố Hữu','Xuân Diệu','Chính Hữu','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(105,'Câu 98: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = 32, 32 + 32 = 64, 64 + 64 = ?','128','6464','256','640','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(106,'Câu 99: Tác giả \"Sang thu\"?','Hữu Thỉnh','Tố Hữu','Xuân Diệu','Chính Hữu','A','Văn học','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57'),(107,'Câu 100: 1 + 1 = 2, 2 + 2 = 4, 4 + 4 = 8, 8 + 8 = 16, 16 + 16 = 32, 32 + 32 = 64, 64 + 64 = 128, 128 + 128 = ?','256','128128','512','1280','A','Toán','Dễ',1,'2025-11-14 08:06:57','2025-11-14 08:06:57');
/*!40000 ALTER TABLE `question_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `title` text NOT NULL,
  `options` json NOT NULL,
  `correct_answer` char(1) NOT NULL,
  `points` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_answers`
--

DROP TABLE IF EXISTS `user_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `user_id` int NOT NULL,
  `selected_answer` char(1) NOT NULL,
  `is_correct` tinyint(1) DEFAULT '0',
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_answer` (`question_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answers`
--

LOCK TABLES `user_answers` WRITE;
/*!40000 ALTER TABLE `user_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cccd` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('Học viên','Giáo viên','Quản trị viên') COLLATE utf8mb4_unicode_ci DEFAULT 'Học viên',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cccd` (`cccd`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Quản trị viên','admin@qp.vn','$2b$10$/1jH868tTU4atEAGQpnYwOi4ztuclkKGW466S/ctMwEJNsVWXnda6','000000001','Quản trị viên','2025-11-01 08:18:39','active'),(2,'Nguyễn Văn A','a@qp.vn','$2b$10$6nAxy1mNzpDtfyIaM1glGeutPy3rtt1LbHT3.d/oioj9F0zFoCCIi','123456789012','Học viên','2025-11-01 08:57:32','active'),(3,'Nguyễn Văn Đứcn','admin@qp.vnn','$2b$10$VabaW3RA2JtUlr0NIlPV1uHTIDq3Ymhu0Yxo1zd5PVAq25gdZnhhK','123456789009','Giáo viên','2025-11-01 09:00:43','active'),(4,'Nguyễn Văn Đứcn','admin@qp.vnnn','$2b$10$r2EYRWHmb6JuTULx05lY2uG0xWgQ7hL62T4adfryBZaMRd5HG5hT.','123456789004','Học viên','2025-11-01 09:23:33','active'),(5,'Nguyễn Văn A','a@example.com','hashed_password',NULL,'Học viên','2025-01-01 00:00:00','active'),(6,'Trần Thị B','b@example.com','hashed_password',NULL,'Học viên','2025-01-02 00:00:00','active'),(7,'Lê Văn C','c@example.com','hashed_password',NULL,'Học viên','2025-01-03 00:00:00','active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17 13:50:14
