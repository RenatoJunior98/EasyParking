CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb`;


CREATE TABLE IF NOT EXISTS `mydb`.`Preco` (
  `PrecoID` INT NOT NULL AUTO_INCREMENT,
  `Minimo` double NOT NULL,
  `Hora1` double NOT NULL,
  `Hora2` double NOT NULL,
  `Hora3` double NOT NULL,
  `Hora4` double NOT NULL,
  `PrecoDiario` double NOT NULL,
  `Reserva` double NULL,
  PRIMARY KEY (`PrecoID`),
  UNIQUE INDEX `ID_UNIQUE` (`PrecoID` ASC)
  );



CREATE TABLE IF NOT EXISTS `mydb`.`Horario` (
  `HorarioID` INT NOT NULL AUTO_INCREMENT,
  `HoraInicio` TIME NOT NULL,
  `HoraFim` TIME NOT NULL,
  `DiaInicio` VARCHAR(45) NOT NULL,
  `DiaFim` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`HorarioID`),
  UNIQUE INDEX `ID_UNIQUE` (`HorarioID` ASC)
  );



CREATE TABLE IF NOT EXISTS `mydb`.`Parque` (
  `ParqueID` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Descricao` VARCHAR(45) NOT NULL,
  `ClassificacaoMedia` INT NULL,
  `LugaresTotal` INT NOT NULL,
  `LugaresPrioritarios` INT NOT NULL,
  `Localizacao` VARCHAR(45) NOT NULL,
  `Tipologia` VARCHAR(45) NOT NULL,
  `Preco_ID` INT NOT NULL,
  `horario_ID` INT NOT NULL,
  PRIMARY KEY (`ParqueID`),
  UNIQUE INDEX `ID_UNIQUE` (`ParqueID` ASC)
    );


CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(45) NOT NULL,
  `Pass` VARCHAR(45) NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `ID_UNIQUE` (`UserID` ASC),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC)
  );



CREATE TABLE IF NOT EXISTS `mydb`.`Reserva` (
  `ReservaID` INT NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(45) NOT NULL,
  `User_ID` INT NOT NULL,
  `Parque_ID` INT NOT NULL,
  `DataHora` TIMESTAMP NULL,
  PRIMARY KEY (`ReservaID`),
  UNIQUE INDEX `ID_UNIQUE` (`ReservaID` ASC),
  UNIQUE INDEX `Código_UNIQUE` (`Codigo` ASC)
  );



CREATE TABLE IF NOT EXISTS `mydb`.`Review` (
  `ReviewID` INT NOT NULL AUTO_INCREMENT,
  `Comentario` VARCHAR(45) NULL,
  `Classificacao` INT NOT NULL,
  `Parque_ID` INT NOT NULL,
  `User_ID` INT NOT NULL,
  PRIMARY KEY (`ReviewID`),
  UNIQUE INDEX `ID_UNIQUE` (`ReviewID` ASC)
    );
    

	alter table Parque add constraint Parque_Horario
	foreign key (Preco_ID) references Preco(PrecoID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;
    
     alter table Parque add constraint Parque_Preco
	foreign key (Horario_ID) references Horario(HorarioID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;
    

    alter table Reserva add constraint Reserva_Parque
	foreign key (Parque_ID) references Parque(ParqueID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;
    
    alter table Reserva add constraint Reserva_User
	foreign key (User_ID) references User(UserID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;
    

      alter table Review add constraint Review_User
	foreign key (User_ID) references User(UserID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;
    
    alter table Review add constraint Review_Parque
	foreign key (Parque_ID) references Parque(ParqueID)
    ON DELETE NO ACTION ON UPDATE NO ACTION;