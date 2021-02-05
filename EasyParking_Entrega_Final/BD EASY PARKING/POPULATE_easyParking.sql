INSERT INTO `Horario` (`HorarioID`, `HoraInicio`, `HoraFim`, `DiaInicio`, `DiaFim`) VALUES
(1, '00:00:00', '00:00:00', 'Segunda-feira', 'Domingo');

INSERT INTO `Parque` (`ParqueID`, `Nome`, `Descricao`, `LugaresDisponiveis`, `LugaresTotal`, `LugaresPrioritarios`, `Latitude`, `Longitude`, `Tipologia`, `Preco_ID`, `horario_ID`) VALUES
(1, 'Santos- Rio', 'Morada: Rua da Cintura Porto de Lisboa', 209, 210, 2, 38.706138, -9.151017, 'Superfície', 1, 1),
(2, 'Dom Luis I', 'Morada: Rua Dom Luís I Nº 42', 158, 158, 2, 38.707681, -9.15221, 'Superfície', 2, 1),
(3, 'Alcântara', 'Morada: Rua das Fontainhas, 13-45', 186, 202, 4, 38.706007, -9.175066, 'Superfície', 3, 1),
(4, 'Calçada do Combro', 'Morada: Entre Calçada do Combro nº 93 e Travessa André Valente nº 7', 248, 248, 4, 38.711188, -9.147541, 'Estrutura', 4, 1),
(7, 'Campo das Cebolas', 'Morada: Rua da Alfândega', 196, 205, 4, 38.70888, -9.131141, 'Estrutura', 5, 1),
(8, 'Chão do Loureiro', 'Morada: Entre Largo da Atafona e Calçada Marquês de Tancos', 192, 192, 6, 38.712416, -9.135017, 'Estrutura', 5, 1),
(9, 'Alto dos Moinhos', 'Morada: Rua João Chagas, nº 3 - Urb. A.Moinhos', 269, 279, 7, 38.74784, -9.177575, 'Estrutura', 1, 1),
(10, 'Ameixoeira', 'Morada: Azinhaga da Cidade', 0, 501, 4, 38.779591, -9.158056, 'Superfície', 1, 1),
(11, 'Areeiro', 'Morada: Av.ª Almirante Gago Coutinho (junto ao Clube de Campismo de Lisboa)', 180, 180, 4, 38.744081, -9.132344, 'Superfície', 1, 1),
(12, 'Avenida Lusíada', 'Morada: Entre Largo da Revista Militar e a Rua Galileu Galilei', 92, 92, 3, 38.75214, -9.188309, 'Superfície', 1, 1),
(13, 'Belém', 'Morada: Rua de Belém, 124', 30, 76, 3, 38.69723, -9.203909, 'Superfície', 1, 1),
(14, 'Avenida de Pádua', 'Morada: Av. De Pádua, no acesso ao Cemitério dos Olivais', 248, 248, 3, 38.762998, -9.107515, 'Superfície', 1, 1),
(15, 'Campo de Ourique- Correia Teles', 'Morada: Rua Correia Teles 103', 245, 245, 4, 38.719168, -9.170647, 'Superfície, Estrutura', 1, 1),
(16, 'Campo Grande', 'Morada: Campo Grande em frente ao Caleidoscópio', 196, 196, 3, 38.757586, -9.155495, 'Superfície', 1, 1),
(17, 'Casal Vistoso', 'Morada: Rua João da Silva – Complexo Desportivo do Casal Vistoso', 256, 256, 4, 38.742375, -9.128965, 'Estrutura', 1, 1),
(18, 'Cidade Universitária', 'Morada: Rua Professor António Flores (junto ao ISCTE)', 620, 620, 5, 38.750596, -9.155042, 'Superfície', 1, 1),
(19, 'Colégio Militar', 'Morada: Pç. Cosme Damião, em frente ao Estádio da Luz', 415, 415, 9, 38.752172, -9.188327, 'Superfície', 1, 1),
(20, 'Combatentes', 'Morada: Av. Forças Armadas - Ramal de acesso à Av. Combatentes', 155, 155, 3, 38.745735, -9.162904, 'Superfície', 1, 1),
(21, 'Damasceno Monteiro', 'Morada: Rua Damasceno Monteiro, 2', 81, 81, 2, 38.718095, -9.130581, 'Superfície', 1, 1);

INSERT INTO `Preco` (`PrecoID`, `Minimo`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `PrecoDiario`, `Reserva`) VALUES
(1, 0.4, 1, 1.8, 2.6, 3.4, 19.4, 0.6),
(2, 0.3, 1.2, 2.4, 3.6, 4.8, 10, 0.3),
(3, 0.5, 1.2, 2.4, 3.6, 4.8, 10, 0.3),
(4, 0.5, 1.45, 2.9, 4.7, 6.65, 13.05, 0.4),
(5, 0.5, 1.5, 3, 4.5, 6, 25, 0.75),
(6, 0.5, 1.45, 2.95, 4.8, 6.8, 20, 0.6);

INSERT INTO `Reserva` (`ReservaID`, `Codigo`, `DiaReserva`, `User_ID`, `Parque_ID`, `DataHora`, `RE_ID`) VALUES
(10, '8C9016168', '2021-01-26', 1, 14, '2021-01-25 15:21:00', 4),
(11, '6S9F0Y44W', '2021-01-29', 1, 7, '2021-01-25 15:21:05', 2),
(12, '83L3XCAJ7', '2021-01-26', 1, 17, '2021-01-25 15:21:13', 4),
(13, 'DI1YA0573', '2021-01-27', 5, 3, '2021-01-25 15:41:51', 2),
(14, '0ZA73EFZT', '2021-01-28', 5, 9, '2021-01-25 16:49:28', 2),
(15, 'DY1LEZGI1', '2021-01-28', 5, 13, '2021-01-25 20:26:22', 2),
(17, 'ZQ01TD34B', '2021-01-27', 1, 13, '2021-01-31 11:25:00', 5),
(19, '6O9J3BB2O', '2021-02-02', 1, 11, '2021-01-27 16:40:42', 3),
(21, 'SW575T1DA', '2021-02-01', 28, 9, '2021-01-31 18:34:44', 3),
(22, '23LP43874', '2021-02-28', 1, 3, '2021-02-01 09:12:41', 5),
(23, '98S8VF7D5', '2021-02-25', 5, 18, '2021-02-03 16:31:23', 5),
(25, 'I26MC4E2N', '2021-02-14', 5, 21, '2021-02-03 17:15:15', 5),
(27, '4GQTDAA6K', '2021-02-07', 30, 15, '2021-02-03 19:28:10', 5);

INSERT INTO `ReservaEstado` (`REID`, `Estado`) VALUES
(1, 'Por pagar'),
(2, 'Ativa'),
(3, 'Cancelada'),
(4, 'Utilizada'),
(5, 'Em espera');

INSERT INTO `Review` (`ReviewID`, `Comentario`, `Classificacao`, `Parque_ID`, `User_ID`) VALUES
(1, 'Otimo parque!', 5, 1, 1),
(2, 'Pequena demora mas satisfatório', 3, 1, 2),
(3, 'Fila de entrada com demasiado tempo de espera', 2, 1, 3),
(4, 'Fácil de encontrar', 4, 1, 4),
(11, 'Gosto do parque, mas é caro', 4, 7, 1),
(12, 'Barato', 4, 3, 5),
(14, 'pavimento gasto', 3, 16, 5),
(17, '', 5, 13, 5),
(23, 'Otimo parque', 4, 3, 5),
(27, 'Barato', 4, 17, 5),
(29, '', 4, 14, 1),
(30, 'Otimo parque', 4, 9, 5),
(31, 'Otimo parque', 4, 21, 30),
(32, 'Otimo parque', 3, 8, 30);

INSERT INTO `User` (`UserID`, `Username`, `Pass`, `Nome`) VALUES
(1, 'Xico', 'Xa123', 'Francisco Almeida'),
(2, 'Mary', 'Ms123', 'Maria Santos'),
(3, 'PedroS', 'Ps123', 'Pedro Silva'),
(4, 'Jonas', 'Jo123', 'João Oliveira'),
(5, 'RVIana', 'Rv123', 'Ruben Viana'),
(14, 'TMendes', 'Tm123', 'Tiago Mendes'),
(18, 'FLamar', 'Fl123', 'Fernando Lamar'),
(20, 'RJota', 'Rj123', 'Romeu Jota'),
(21, 'alex', 'AR123', 'Alexandre Rodrigues'),
(22, 'cruz', 'pass', 'Ricardo Cruz'),
(24, 'LSantos', 'Ls123', 'Luciana Santos'),
(26, 'AfonsoT', '12345', 'Afonso Torres'),
(28, 'ContaTeste', 'teste123', 'Conta Teste'),
(29, 'BCarvalho', 'Bc123', 'Bruno Carvalho'),
(30, 'LMiguel', 'Lm123', 'Luis Miguel');