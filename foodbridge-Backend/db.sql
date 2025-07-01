-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 01, 2025 at 06:26 AM
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
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `donor_type` enum('person','restaurant','organization') DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DONOR`
--

INSERT INTO `DONOR` (`id`, `name`, `email`, `phone`, `address`, `donor_type`, `password`, `created_at`) VALUES
(3, 'A', 'haadi1495@gmail.com', '03135536110', 'House no 388 ,Street no 23,Sector C/4', 'person', '1234', '2025-06-29 03:34:42'),
(4, 'Abdul Haadi', 'haadi@gmail.com', '03135536110', 'House no 388 ,Street no 23,Sector C/4', 'person', '123', '2025-06-29 03:37:17'),
(5, 'Another User', 'john@example.com', '9876543210', '456 Oak Ave', 'restaurant', 'password123', '2025-06-29 04:16:12'),
(8, 'A', 'haadi195@gmail.com', '03135536110', 'House no 388 ,Street no 23,Sector C/4', 'person', '111', '2025-06-29 04:53:04');

-- --------------------------------------------------------

--
-- Table structure for table `EMPLOYEES`
--

CREATE TABLE `EMPLOYEES` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `CNIC` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Contact` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `Daily_Need` int(11) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
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
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `EMPLOYEES`
--
ALTER TABLE `EMPLOYEES`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `CNIC` (`CNIC`),
  ADD UNIQUE KEY `Email` (`Email`);

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
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `REQUEST`
--
ALTER TABLE `REQUEST`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Recipient_ID` (`Recipient_ID`),
  ADD KEY `Deliveries_ID` (`Deliveries_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `DONOR`
--
ALTER TABLE `DONOR`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- Constraints for table `PICKUPS`
--
ALTER TABLE `PICKUPS`
  ADD CONSTRAINT `pickups_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`ID`),
  ADD CONSTRAINT `pickups_ibfk_2` FOREIGN KEY (`Donation_ID`) REFERENCES `DONATIONS` (`ID`);

--
-- Constraints for table `REQUEST`
--
ALTER TABLE `REQUEST`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`Recipient_ID`) REFERENCES `RECIPIENT` (`ID`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`Deliveries_ID`) REFERENCES `DELIVERIES` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
