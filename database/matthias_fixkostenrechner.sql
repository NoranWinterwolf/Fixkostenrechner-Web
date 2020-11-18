-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Nov 2020 um 10:52
-- Server-Version: 10.4.14-MariaDB
-- PHP-Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `matthias_fixkostenrechner`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `incomes`
--

CREATE TABLE `incomes` (
  `incomeId` int(2) NOT NULL,
  `incomeName` varchar(30) NOT NULL,
  `value` decimal(7,2) NOT NULL,
  `incomeInterval` int(1) DEFAULT 1,
  `personId` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `incomes`
--

INSERT INTO `incomes` (`incomeId`, `incomeName`, `value`, `incomeInterval`, `personId`) VALUES
(3, 'Gehalt', '1200.00', 1, 11),
(4, 'Zuschlag', '50.00', 1, 11);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `outgoings`
--

CREATE TABLE `outgoings` (
  `outgoingId` int(2) NOT NULL,
  `outgoingName` varchar(30) NOT NULL,
  `value` decimal(7,2) NOT NULL,
  `outgoingInterval` int(1) NOT NULL DEFAULT 1,
  `personId` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `outgoings`
--

INSERT INTO `outgoings` (`outgoingId`, `outgoingName`, `value`, `outgoingInterval`, `personId`) VALUES
(23, 'Miete', '350.57', 1, 11),
(24, 'Essen', '300.00', 1, 11);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `persons`
--

CREATE TABLE `persons` (
  `personId` int(2) NOT NULL,
  `personName` varchar(30) NOT NULL,
  `personRef` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `persons`
--

INSERT INTO `persons` (`personId`, `personName`, `personRef`) VALUES
(10, 'Testperson', 1),
(11, 'Test2', 1),
(12, 'Test3', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(2) NOT NULL,
  `user` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `user`, `password`) VALUES
(1, 'TestAccount', '7d67db21f6bb5c8c08c41caa1cfa4f39aca58d36');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `incomes`
--
ALTER TABLE `incomes`
  ADD PRIMARY KEY (`incomeId`),
  ADD KEY `personId` (`personId`);

--
-- Indizes für die Tabelle `outgoings`
--
ALTER TABLE `outgoings`
  ADD PRIMARY KEY (`outgoingId`),
  ADD KEY `personId` (`personId`);

--
-- Indizes für die Tabelle `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`personId`),
  ADD KEY `personRef` (`personRef`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `incomes`
--
ALTER TABLE `incomes`
  MODIFY `incomeId` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `outgoings`
--
ALTER TABLE `outgoings`
  MODIFY `outgoingId` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT für Tabelle `persons`
--
ALTER TABLE `persons`
  MODIFY `personId` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `incomes`
--
ALTER TABLE `incomes`
  ADD CONSTRAINT `incomes_ibfk_1` FOREIGN KEY (`personId`) REFERENCES `persons` (`personId`);

--
-- Constraints der Tabelle `outgoings`
--
ALTER TABLE `outgoings`
  ADD CONSTRAINT `outgoings_ibfk_1` FOREIGN KEY (`personId`) REFERENCES `persons` (`personId`);

--
-- Constraints der Tabelle `persons`
--
ALTER TABLE `persons`
  ADD CONSTRAINT `persons_ibfk_1` FOREIGN KEY (`personRef`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
