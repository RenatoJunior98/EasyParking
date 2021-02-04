
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Estrutura da tabela `Horario`
--

CREATE TABLE `Horario` (
  `HorarioID` int(11) NOT NULL AUTO_INCREMENT,
  `HoraInicio` time NOT NULL,
  `HoraFim` time NOT NULL,
  `DiaInicio` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `DiaFim` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Estrutura da tabela `Parque`
--

CREATE TABLE `Parque` (
  `ParqueID` int(11) NOT NULL,
  `Nome` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `Descricao` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `LugaresDisponiveis` int(11) NOT NULL,
  `LugaresTotal` int(11) NOT NULL,
  `LugaresPrioritarios` int(11) NOT NULL,
  `Latitude` double NOT NULL,
  `Longitude` double NOT NULL,
  `Tipologia` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `Preco_ID` int(11) NOT NULL,
  `horario_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Estrutura da tabela `Preco`
--

CREATE TABLE `Preco` (
  `PrecoID` int(11) NOT NULL,
  `Minimo` double NOT NULL,
  `Hora1` double NOT NULL,
  `Hora2` double NOT NULL,
  `Hora3` double NOT NULL,
  `Hora4` double NOT NULL,
  `PrecoDiario` double NOT NULL,
  `Reserva` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Estrutura da tabela `Reserva`
--

CREATE TABLE `Reserva` (
  `ReservaID` int(11) NOT NULL,
  `Codigo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `DiaReserva` date DEFAULT NULL,
  `User_ID` int(11) NOT NULL,
  `Parque_ID` int(11) NOT NULL,
  `DataHora` timestamp NULL DEFAULT NULL,
  `RE_ID` int(11) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Estrutura da tabela `ReservaEstado`
--

CREATE TABLE `ReservaEstado` (
  `REID` int(11) NOT NULL,
  `Estado` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Estrutura da tabela `Review`
--

CREATE TABLE `Review` (
  `ReviewID` int(11) NOT NULL,
  `Comentario` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Classificacao` int(11) NOT NULL,
  `Parque_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Estrutura da tabela `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `Pass` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `Nome` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for table `Horario`
--
ALTER TABLE `Horario`
  ADD PRIMARY KEY (`HorarioID`),
  ADD UNIQUE KEY `ID_UNIQUE` (`HorarioID`);

--
-- Indexes for table `Parque`
--
ALTER TABLE `Parque`
  ADD PRIMARY KEY (`ParqueID`),
  ADD UNIQUE KEY `ID_UNIQUE` (`ParqueID`),
  ADD KEY `Parque__Horario` (`Preco_ID`),
  ADD KEY `Parque_Preco` (`horario_ID`);

--
-- Indexes for table `Preco`
--
ALTER TABLE `Preco`
  ADD PRIMARY KEY (`PrecoID`),
  ADD UNIQUE KEY `ID_UNIQUE` (`PrecoID`);

--
-- Indexes for table `Reserva`
--
ALTER TABLE `Reserva`
  ADD PRIMARY KEY (`ReservaID`),
  ADD UNIQUE KEY `ID_UNIQUE` (`ReservaID`),
  ADD UNIQUE KEY `Código_UNIQUE` (`Codigo`),
  ADD KEY `Reserva_Parque` (`Parque_ID`),
  ADD KEY `Reserva_User` (`User_ID`),
  ADD KEY `Reserva_ReservaEstado` (`RE_ID`);

--
-- Indexes for table `ReservaEstado`
--
ALTER TABLE `ReservaEstado`
  ADD PRIMARY KEY (`REID`);

--
-- Indexes for table `Review`
--
ALTER TABLE `Review`
  ADD PRIMARY KEY (`ReviewID`),
  ADD UNIQUE KEY `ID_UNIQUE` (`ReviewID`),
  ADD KEY `Review_User` (`User_ID`),
  ADD KEY `Review_Parque` (`Parque_ID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `ID_UNIQUE` (`UserID`),
  ADD UNIQUE KEY `Username_UNIQUE` (`Username`);


--
-- AUTO_INCREMENT for table `Horario`
--
ALTER TABLE `Horario`
  MODIFY `HorarioID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Parque`
--
ALTER TABLE `Parque`
  MODIFY `ParqueID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Preco`
--
ALTER TABLE `Preco`
  MODIFY `PrecoID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Reserva`
--
ALTER TABLE `Reserva`
  MODIFY `ReservaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ReservaEstado`
--
ALTER TABLE `ReservaEstado`
  MODIFY `REID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Review`
--
ALTER TABLE `Review`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;


--
-- Limitadores para a tabela `Parque`
--
ALTER TABLE `Parque`
  ADD CONSTRAINT `Parque_Horario` FOREIGN KEY (`Preco_ID`) REFERENCES `Preco` (`precoid`),
  ADD CONSTRAINT `Parque_Preco` FOREIGN KEY (`horario_ID`) REFERENCES `Horario` (`horarioid`),
  ADD CONSTRAINT `Parque__Horario` FOREIGN KEY (`Preco_ID`) REFERENCES `Preco` (`precoid`);

--
-- Limitadores para a tabela `Reserva`
--
ALTER TABLE `Reserva`
  ADD CONSTRAINT `Reserva_Parque` FOREIGN KEY (`Parque_ID`) REFERENCES `Parque` (`parqueid`),
  ADD CONSTRAINT `Reserva_ReservaEstado` FOREIGN KEY (`RE_ID`) REFERENCES `ReservaEstado` (`reid`),
  ADD CONSTRAINT `Reserva_User` FOREIGN KEY (`User_ID`) REFERENCES `User` (`userid`);

--
-- Limitadores para a tabela `Review`
--
ALTER TABLE `Review`
  ADD CONSTRAINT `Review_Parque` FOREIGN KEY (`Parque_ID`) REFERENCES `Parque` (`parqueid`),
  ADD CONSTRAINT `Review_User` FOREIGN KEY (`User_ID`) REFERENCES `User` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
