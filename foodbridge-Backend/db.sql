-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 10, 2025 at 09:43 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodbridge`
--

-- --------------------------------------------------------

--
-- Table structure for table `DELIVERIES`
--

CREATE TABLE `DELIVERIES` (
  `ID` int(11) NOT NULL,
  `Employee_ID` int(11) DEFAULT NULL,
  `Donation_ID` int(11) DEFAULT NULL,
  `Recipient_ID` int(11) DEFAULT NULL,
  `Time` date DEFAULT NULL,
  `Proof` longblob DEFAULT NULL,
  `Method` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DONATIONS`
--

CREATE TABLE `DONATIONS` (
  `ID` int(11) NOT NULL,
  `Donor_ID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Quality_Score` int(11) DEFAULT NULL,
  `Date&Time` datetime DEFAULT NULL,
  `Expiry_Date` date DEFAULT NULL,
  `Event_Type` varchar(100) DEFAULT NULL,
  `Current_Status` varchar(50) DEFAULT NULL,
  `Field_Type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DONOR`
--

CREATE TABLE `DONOR` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `donor_type` enum('person','restaurant','organization') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DONOR`
--

INSERT INTO `DONOR` (`id`, `user_id`, `phone`, `address`, `donor_type`, `created_at`) VALUES
(9, 4, '03135536110', 'House no 388, Street no 23, Sector C/4', 'person', '2025-07-09 07:02:16'),
(10, 5, '03135536110', 'C4', 'person', '2025-07-09 07:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `PICKUPS`
--

CREATE TABLE `PICKUPS` (
  `ID` int(11) NOT NULL,
  `Employee_ID` int(11) DEFAULT NULL,
  `Donation_ID` int(11) DEFAULT NULL,
  `Time` date DEFAULT NULL,
  `Voucher_Number` int(11) DEFAULT NULL,
  `Method` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RECIPIENT`
--

CREATE TABLE `RECIPIENT` (
  `ID` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `Daily_Need` int(11) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Contact` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `REQUEST`
--

CREATE TABLE `REQUEST` (
  `ID` int(11) NOT NULL,
  `Recipient_ID` int(11) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Deliveries_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('donor','recipient','volunteer') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(4, 'Abdul Haadi', 'haadi1495@gmail.com', '1234', 'donor', '2025-07-09 07:02:16'),
(5, 'Haadi', 'haadi@gmail.com', '12345', 'donor', '2025-07-09 07:15:43'),
(17, 'Farhan', 'farhan3@gmail.com', '123456', 'volunteer', '2025-07-10 05:19:59'),
(21, 'Abdul Haadi', 'abdul@gmail.com', '123456', 'volunteer', '2025-07-10 05:45:38');

-- --------------------------------------------------------

--
-- Table structure for table `VOLUNTEER`
--

CREATE TABLE `VOLUNTEER` (
  `ID` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `Contact` varchar(15) DEFAULT NULL,
  `Relevant_Skill` varchar(255) DEFAULT NULL,
  `Availability` enum('Weekdays','Weekends','Anytime') DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `CNIC` varchar(20) DEFAULT NULL,
  `Department` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `VOLUNTEER`
--

INSERT INTO `VOLUNTEER` (`ID`, `user_id`, `Contact`, `Relevant_Skill`, `Availability`, `City`, `CNIC`, `Department`) VALUES
(5, 17, '03001234567', 'Driving', 'Weekends', 'Lahore', '35202125678', 'Logisti'),
(7, 21, '03135536110', ' ', 'Anytime', 'Mirpur AJK', '09809425', ' ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `DELIVERIES`
--
ALTER TABLE `DELIVERIES`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Employee_ID` (`Employee_ID`),
  ADD KEY `Donation_ID` (`Donation_ID`),
  ADD KEY `Recipient_ID` (`Recipient_ID`);

--
-- Indexes for table `DONATIONS`
--
ALTER TABLE `DONATIONS`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Donor_ID` (`Donor_ID`);

--
-- Indexes for table `DONOR`
--
ALTER TABLE `DONOR`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_donor_user` (`user_id`);

--
-- Indexes for table `PICKUPS`
--
ALTER TABLE `PICKUPS`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Employee_ID` (`Employee_ID`),
  ADD KEY `Donation_ID` (`Donation_ID`);

--
-- Indexes for table `RECIPIENT`
--
ALTER TABLE `RECIPIENT`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_recipient_user` (`user_id`);

--
-- Indexes for table `REQUEST`
--
ALTER TABLE `REQUEST`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Recipient_ID` (`Recipient_ID`),
  ADD KEY `Deliveries_ID` (`Deliveries_ID`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `VOLUNTEER`
--
ALTER TABLE `VOLUNTEER`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_volunteer_user` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `DONOR`
--
ALTER TABLE `DONOR`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `VOLUNTEER`
--
ALTER TABLE `VOLUNTEER`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `DELIVERIES`
--
ALTER TABLE `DELIVERIES`
  ADD CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`ID`),
  ADD CONSTRAINT `deliveries_ibfk_2` FOREIGN KEY (`Donation_ID`) REFERENCES `DONATIONS` (`ID`),
  ADD CONSTRAINT `deliveries_ibfk_3` FOREIGN KEY (`Recipient_ID`) REFERENCES `RECIPIENT` (`ID`);

--
-- Constraints for table `DONATIONS`
--
ALTER TABLE `DONATIONS`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`Donor_ID`) REFERENCES `DONOR` (`ID`);

--
-- Constraints for table `DONOR`
--
ALTER TABLE `DONOR`
  ADD CONSTRAINT `fk_donor_user` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `PICKUPS`
--
ALTER TABLE `PICKUPS`
  ADD CONSTRAINT `pickups_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`ID`),
  ADD CONSTRAINT `pickups_ibfk_2` FOREIGN KEY (`Donation_ID`) REFERENCES `DONATIONS` (`ID`);

--
-- Constraints for table `RECIPIENT`
--
ALTER TABLE `RECIPIENT`
  ADD CONSTRAINT `fk_recipient_user` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `REQUEST`
--
ALTER TABLE `REQUEST`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`Recipient_ID`) REFERENCES `RECIPIENT` (`ID`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`Deliveries_ID`) REFERENCES `DELIVERIES` (`ID`);

--
-- Constraints for table `VOLUNTEER`
--
ALTER TABLE `VOLUNTEER`
  ADD CONSTRAINT `fk_volunteer_user` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
