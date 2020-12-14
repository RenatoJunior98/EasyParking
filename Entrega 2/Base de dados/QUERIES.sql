select ID from horarios;
select ID from Precos;
select * from parque;
select * from horarios;
select * from precos;

select ParqueID as 'parque', Nome, lugaresTotal, precoDiario from parque inner join Preco where Preco_ID = precoID;