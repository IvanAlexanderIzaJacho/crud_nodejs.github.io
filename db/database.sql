CREATE DATABASE IF NOT EXISTS fibersport;

use fibersport;

create table Cliente(
	idCliente int auto_increment not null primary key ,
    dniCliente varchar(45) not null,
    apellidoCliente varchar(40) not null,
    nombreCliente varchar(40) not null,
    direccionCliente varchar(50) not null,
    edadCliente int not null
);

describe Cliente;

insert into Cliente values
 (1, '0509475849', 'De la Cruz', 'Joe', 'Latacunga', '23'),
 (2, '0544475878', 'Tasinchana', 'Andre', 'Quito', '30'),
 (3, '0567775877', 'Toapanta', 'Elizabeth', 'Guayaquil', '44'),
 (4, '0511234455', 'Villacres', 'Carlos', 'Cuenca', '20');

select *from Cliente;
