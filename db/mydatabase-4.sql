-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 31, 2024 at 06:56 AM
-- Server version: 8.4.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add vehicle', 7, 'add_vehicle'),
(26, 'Can change vehicle', 7, 'change_vehicle'),
(27, 'Can delete vehicle', 7, 'delete_vehicle'),
(28, 'Can view vehicle', 7, 'view_vehicle'),
(29, 'Can add ride', 8, 'add_ride'),
(30, 'Can change ride', 8, 'change_ride'),
(31, 'Can delete ride', 8, 'delete_ride'),
(32, 'Can view ride', 8, 'view_ride'),
(33, 'Can add employee', 9, 'add_employee'),
(34, 'Can change employee', 9, 'change_employee'),
(35, 'Can delete employee', 9, 'delete_employee'),
(36, 'Can view employee', 9, 'view_employee'),
(37, 'Can add ride request', 10, 'add_riderequest'),
(38, 'Can change ride request', 10, 'change_riderequest'),
(39, 'Can delete ride request', 10, 'delete_riderequest'),
(40, 'Can view ride request', 10, 'view_riderequest'),
(41, 'Can add ride response', 11, 'add_rideresponse'),
(42, 'Can change ride response', 11, 'change_rideresponse'),
(43, 'Can delete ride response', 11, 'delete_rideresponse'),
(44, 'Can view ride response', 11, 'view_rideresponse');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(9, 'rides', 'employee'),
(8, 'rides', 'ride'),
(10, 'rides', 'riderequest'),
(11, 'rides', 'rideresponse'),
(7, 'rides', 'vehicle'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-05-28 11:19:24.893845'),
(2, 'auth', '0001_initial', '2024-05-28 11:19:25.246278'),
(3, 'admin', '0001_initial', '2024-05-28 11:19:25.338481'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-05-28 11:19:25.344076'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-05-28 11:19:25.349101'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-05-28 11:19:25.396422'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-05-28 11:19:25.431988'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-05-28 11:19:25.447873'),
(9, 'auth', '0004_alter_user_username_opts', '2024-05-28 11:19:25.453194'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-05-28 11:19:25.483622'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-05-28 11:19:25.487893'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-05-28 11:19:25.493315'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-05-28 11:19:25.533301'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-05-28 11:19:25.576755'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-05-28 11:19:25.593338'),
(16, 'auth', '0011_update_proxy_permissions', '2024-05-28 11:19:25.603493'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-05-28 11:19:25.643663'),
(18, 'rides', '0001_initial', '2024-05-28 11:19:25.883231'),
(19, 'rides', '0002_alter_ride_id_alter_vehicle_id', '2024-05-28 11:19:26.138446'),
(20, 'rides', '0003_employee_remove_ride_available_seats_and_more', '2024-05-28 11:19:26.756615'),
(21, 'sessions', '0001_initial', '2024-05-28 11:19:26.783888'),
(22, 'rides', '0004_remove_ride_arrival_time_remove_vehicle_owner_and_more', '2024-05-30 08:49:24.996827'),
(23, 'rides', '0005_ride_arrival_time', '2024-05-30 08:58:14.389237'),
(24, 'rides', '0006_riderequest_rideresponse', '2024-05-30 12:39:22.291760'),
(25, 'rides', '0007_alter_riderequest_unique_together_and_more', '2024-05-30 15:12:55.237228');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('hxth7mln0lwpfz1rur38bpk2kc3ng9td', 'e30:1sCvBA:rV4CM_F-IicFQammeoTqp910-HpvwFA7VxRPqf0nRMU', '2024-06-14 05:51:52.487528'),
('zz8am6izd1c8g7b1v69qi8somkpsp65q', 'e30:1sCvA0:eYipuFT_p7MnrkSaxaG5gF2nB3q_QllpFCOU45LE2Ls', '2024-06-14 05:50:40.388105');

-- --------------------------------------------------------

--
-- Table structure for table `rides_employee`
--

CREATE TABLE `rides_employee` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `email_id` varchar(254) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rides_employee`
--

INSERT INTO `rides_employee` (`id`, `name`, `employee_id`, `email_id`, `gender`, `mobile_number`, `password`) VALUES
(1, 'GopiKarthick', '10678923', 'gopi.karthic@test.com', 'M', '87609790211', 'temporary_password'),
(3, 'ranjith', '10678925', 'ranjith.nagaraj@test.com', 'M', '87609790213', 'temporary_password'),
(4, 'mathina', '10678926', 'mathina.begam@test.com', 'F', '87609790233', 'temporary_password'),
(5, 'test', '123456', 'test@email.com', 'M', '9876543210', 'pbkdf2_sha256$720000$Ql2lhotOjQDbxNneqoTc81$X8LW7GdbhIahRFTa9qiKNvvz1HxKFawfXcz6d4DbVUk='),
(6, 'test12345', '1234567', 'test12345@email.com', 'M', '9876543245', 'pbkdf2_sha256$720000$TsdHcTPyy8XBsXUxZm8FAk$89A4zH2BoruznN0xWj8QBlrxdrE7OZX+3vzS622vLc8='),
(7, 'test1', '1234561', 'test1@email.com', 'M', '9876543210', 'pbkdf2_sha256$720000$BC14ZfhXRJLJcDivCnuCpT$NfyaQKRi2y+R1yv9ZigJEUhsrIDlHU/hkSDp1hfjCcs=');

-- --------------------------------------------------------

--
-- Table structure for table `rides_ride`
--

CREATE TABLE `rides_ride` (
  `id` bigint NOT NULL,
  `origin` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `departure_time` datetime(6) DEFAULT NULL,
  `driver` varchar(255) NOT NULL,
  `vehicle` varchar(255) NOT NULL,
  `destination_latitude` double NOT NULL,
  `destination_longitude` double NOT NULL,
  `origin_latitude` double NOT NULL,
  `origin_longitude` double NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `passengers` int NOT NULL,
  `arrival_time` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rides_ride`
--

INSERT INTO `rides_ride` (`id`, `origin`, `destination`, `departure_time`, `driver`, `vehicle`, `destination_latitude`, `destination_longitude`, `origin_latitude`, `origin_longitude`, `vehicle_type`, `passengers`, `arrival_time`) VALUES
(1, 'Chennai Meenambakkam Airport', 'Comcast India Engineering Center', '2024-05-30 10:30:00.000000', '5', '11', 12.9469572, 80.2313978, 12.993374, 80.17258667, 'CR', 3, NULL),
(2, 'Chennai Meenambakkam Airport', 'Comcast India Engineering Center', '2024-05-30 10:30:00.000000', '5', '11', 12.9469572, 80.2313978, 12.993374, 80.17258667, 'CR', 3, NULL),
(3, 'Chennai Meenambakkam Airport', 'Comcast India Engineering Center', '2024-05-30 10:30:00.000000', '5', '11', 12.9469572, 80.2313978, 12.993374, 80.17258667, 'CR', 3, NULL),
(4, 'Chennai Meenambakkam Airport', 'Comcast India Engineering Center', '2024-05-30 10:30:00.000000', '5', '11', 12.9469572, 80.2313978, 12.993374, 80.17258667, 'CR', 3, NULL),
(5, 'Chennai Meenambakkam Airport', 'Comcast India Engineering Center', '2024-05-30 10:30:00.000000', '5', '11', 12.9469572, 80.2313978, 12.993374, 80.17258667, 'CR', 3, NULL),
(6, 'Chennai Meenambakkam Airport', 'Comcast India Engineering Center', '2024-05-30 10:30:00.000000', '5', '11', 12.9469572, 80.2313978, 12.993374, 80.17258667, 'CR', 3, NULL),
(7, 'Chennai Meenambakkam Airport', 'Comcast India Engineering Center', '2024-05-30 10:30:00.000000', '5', '11', 12.9469572, 80.2313978, 12.993374, 80.17258667, 'CR', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rides_riderequest`
--

CREATE TABLE `rides_riderequest` (
  `id` bigint NOT NULL,
  `status` varchar(1) NOT NULL,
  `employee_id` bigint NOT NULL,
  `ride_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rides_riderequest`
--

INSERT INTO `rides_riderequest` (`id`, `status`, `employee_id`, `ride_id`) VALUES
(1, 'P', 1, 1),
(4, 'P', 5, 7);

-- --------------------------------------------------------

--
-- Table structure for table `rides_rideresponse`
--

CREATE TABLE `rides_rideresponse` (
  `id` bigint NOT NULL,
  `status` varchar(1) NOT NULL,
  `driver_id` bigint NOT NULL,
  `ride_request_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rides_rideresponse`
--

INSERT INTO `rides_rideresponse` (`id`, `status`, `driver_id`, `ride_request_id`) VALUES
(1, 'A', 1, 1),
(8, 'R', 5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `rides_vehicle`
--

CREATE TABLE `rides_vehicle` (
  `id` bigint NOT NULL,
  `model` varchar(200) NOT NULL,
  `number_of_seats` int NOT NULL,
  `vehicle_id` varchar(255) DEFAULT NULL,
  `vehicle_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rides_vehicle`
--

INSERT INTO `rides_vehicle` (`id`, `model`, `number_of_seats`, `vehicle_id`, `vehicle_type`) VALUES
(1, 'hyundai venue', 4, NULL, 'CR'),
(2, 'hyundai i20', 2, NULL, 'CR'),
(3, 'kia carens', 7, 'TN 14 001', 'Four Wheeler'),
(4, 'Alto', 3, 'test_1234', 'CR'),
(5, 'Alto', 3, 'test_12345', 'CR'),
(6, 'Alto', 3, 'test_12345cc', 'CR'),
(7, 'Alto', 3, 'test_12345cccscd', 'CR'),
(8, 'Alto', 3, 'test_12345cccscdcdc', 'CR'),
(9, 'Alto', 3, 'test_12345cccscdcdcvd', 'CR'),
(10, 'Alto', 3, 'test_12345cccscdcdcvdccds', 'CR'),
(11, 'Alto', 3, 'test_12345cccscdcdcvdccdscdccd', 'CR'),
(12, 'Alto', 3, 'test_12345cccscdcdcvdccdscdccdcdcdc', 'CR'),
(13, 'fronx', 3, 'test5646', 'CR');

-- --------------------------------------------------------

--
-- Table structure for table `rides_vehicle_employees`
--

CREATE TABLE `rides_vehicle_employees` (
  `id` bigint NOT NULL,
  `vehicle_id` bigint NOT NULL,
  `employee_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rides_vehicle_employees`
--

INSERT INTO `rides_vehicle_employees` (`id`, `vehicle_id`, `employee_id`) VALUES
(1, 11, 5),
(2, 12, 5),
(3, 13, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `rides_employee`
--
ALTER TABLE `rides_employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- Indexes for table `rides_ride`
--
ALTER TABLE `rides_ride`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rides_riderequest`
--
ALTER TABLE `rides_riderequest`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rides_riderequest_ride_id_employee_id_ad3c45dc_uniq` (`ride_id`,`employee_id`),
  ADD KEY `rides_riderequest_employee_id_90958a7c_fk_rides_employee_id` (`employee_id`),
  ADD KEY `rides_riderequest_ride_id_ea5c0a96_fk_rides_ride_id` (`ride_id`);

--
-- Indexes for table `rides_rideresponse`
--
ALTER TABLE `rides_rideresponse`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rides_rideresponse_ride_request_id_driver_id_d8970c03_uniq` (`ride_request_id`,`driver_id`),
  ADD KEY `rides_rideresponse_driver_id_b4161e4f_fk_rides_employee_id` (`driver_id`),
  ADD KEY `rides_rideresponse_ride_request_id_573de65e_fk_rides_rid` (`ride_request_id`);

--
-- Indexes for table `rides_vehicle`
--
ALTER TABLE `rides_vehicle`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `rides_vehicle_employees`
--
ALTER TABLE `rides_vehicle_employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rides_vehicle_employees_vehicle_id_employee_id_889c38c1_uniq` (`vehicle_id`,`employee_id`),
  ADD KEY `rides_vehicle_employ_employee_id_68f594a8_fk_rides_emp` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `rides_employee`
--
ALTER TABLE `rides_employee`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rides_ride`
--
ALTER TABLE `rides_ride`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rides_riderequest`
--
ALTER TABLE `rides_riderequest`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rides_rideresponse`
--
ALTER TABLE `rides_rideresponse`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rides_vehicle`
--
ALTER TABLE `rides_vehicle`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `rides_vehicle_employees`
--
ALTER TABLE `rides_vehicle_employees`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `rides_riderequest`
--
ALTER TABLE `rides_riderequest`
  ADD CONSTRAINT `rides_riderequest_employee_id_90958a7c_fk_rides_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `rides_employee` (`id`),
  ADD CONSTRAINT `rides_riderequest_ride_id_ea5c0a96_fk_rides_ride_id` FOREIGN KEY (`ride_id`) REFERENCES `rides_ride` (`id`);

--
-- Constraints for table `rides_rideresponse`
--
ALTER TABLE `rides_rideresponse`
  ADD CONSTRAINT `rides_rideresponse_driver_id_b4161e4f_fk_rides_employee_id` FOREIGN KEY (`driver_id`) REFERENCES `rides_employee` (`id`),
  ADD CONSTRAINT `rides_rideresponse_ride_request_id_573de65e_fk_rides_rid` FOREIGN KEY (`ride_request_id`) REFERENCES `rides_riderequest` (`id`);

--
-- Constraints for table `rides_vehicle_employees`
--
ALTER TABLE `rides_vehicle_employees`
  ADD CONSTRAINT `rides_vehicle_employ_employee_id_68f594a8_fk_rides_emp` FOREIGN KEY (`employee_id`) REFERENCES `rides_employee` (`id`),
  ADD CONSTRAINT `rides_vehicle_employees_vehicle_id_178e2182_fk_rides_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `rides_vehicle` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
