SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY','')); # necessario para ser possivel utilizar o group by

select LugaresDisponiveis, lugaresTotal from Parque where ParqueID =?; #selecionar lugares disponiveis e totais de um parque

select LugaresPrioritarios, Tipologia, ParqueID, Latitude, Longitude, Descricao, Nome, LugaresTotal, precoDiario, LugaresDisponiveis from Parque inner join Preco where Preco_ID = precoID AND ParqueID = ? AND Nome LIKE "%?%" ORDER BY `Parque`.`Nome` ASC; #selecionar informação de um parque(dado id), dos parques (sem parametros) ou dos pasques que respondem a pesquisa do nome

select COUNT(ReservaID) from Reserva where codigo = ?; #verifica se codigo existe

INSERT INTO Reserva (Codigo, User_ID, Parque_ID, diaReserva, DataHora) values (?,?,?,?, CURRENT_TIMESTAMP); # fazer nova reserva

UPDATE Reserva SET RE_ID=3 WHERE DiaReserva = DATE_ADD(CURDATE(), INTERVAL -1 DAY) AND RE_ID = 2; # atualizar estado da reserva 

select Parque_ID from Reserva WHERE DiaReserva = CURDATE() AND RE_ID = 5;  # selecionar id do parque de reservas

UPDATE Parque SET LugaresDisponiveis= (LugaresDisponiveis -1) WHERE parqueID=?; # update lugares disponiveis

UPDATE Reserva SET RE_ID=2 WHERE DiaReserva = CURDATE() AND RE_ID = 5;  # atualizar estado da reserva

select Estado, Parque.Nome, Descricao, Codigo, DATE_FORMAT(DataHora, '%d/%m/%Y às %h:%i') as DataHora, DATE_FORMAT(DiaReserva, '%d/%m/%Y') as DiaReserva from ReservaEstado inner join Parque inner join Reserva inner join User where Reserva.Parque_ID = ParqueID AND REID = RE_ID AND Reserva.User_ID = UserID AND UserID = ?; # Selecionar informação da reserva

select COUNT(ReservaID) as nReservas from Reserva where Codigo = ? AND diaReserva = CURDATE() AND RE_ID = 2 AND Parque_ID = ?; # validar codigo de reserva

UPDATE Reserva SET RE_ID=4 WHERE Codigo= ?; # atualizar estado da reserva

INSERT INTO Review (Comentario, Classificacao, Parque_ID, User_ID) values (?,?,?,?); # Fazer nova review

select Nome, Classificacao, Comentario from Review inner join User where Parque_ID = ? AND UserID = User_ID; # Selecionar informação das reviews de um parque

select userID, nome from User where Username = ? and Pass = ?; # login

select userID from User where Username = ?; # Verificar se username existe

insert into User (Username, Pass, Nome) values (?,?,?); # Registo de utilizador