drop database if exists tiendaejerciciodb_in5bm;
create database tiendaejerciciodb_in5bm;
use tiendaejerciciodb_in5bm;

create table clientes(
	dpi_cliente bigint not null  primary key,
    nombre_cliente varchar(50) not null,
    apellido_cliente varchar(50) not null,
    direccion varchar(100) not null,
    estado boolean not null
);
create table usuarios(
	codigo_usuario int auto_increment not null primary key,
    username varchar(45) not null,
    password varchar(100) not null,
    email varchar(60) not null,
    rol varchar(45) not null,
	estado boolean
);

create table ventas(
	codigo_venta int auto_increment not null primary key,
    fecha_venta date not null,
    total decimal(10,2) not null,
    estado boolean not null,
    clientes_dpi_cliente bigint not null,
    usuarios_codigo_usuario int not null,
     constraint fk_ventas_clientes
        foreign key(clientes_dpi_cliente)
        references clientes(dpi_cliente)
		on delete cascade
        on update cascade,
	constraint fk_ventas_usuarios
        foreign key(usuarios_codigo_usuario)
        references usuarios(codigo_usuario)
		on delete cascade
        on update cascade 
);


create table productos(
	codigo_producto int auto_increment not null primary key,
    nombre_producto varchar(60) not null,
    precio decimal(10,2) not null,
    stock int not null,
	estado boolean
);

create table detalleventa(
	codigo_detalle_venta int auto_increment not null primary key,
    cantidad int not null,
    precio_unitario decimal(10,2) not null,
    subtotal decimal(10,2) not null,
    productos_codigo_producto int not null,
    ventas_codigo_venta int not null,
     constraint fk_detalleventa_productos
        foreign key(productos_codigo_producto)
        references productos(codigo_producto)
		on delete cascade
        on update cascade,
	constraint fk_detalleventa_ventas
        foreign key(ventas_codigo_venta)
        references ventas(codigo_venta)
		on delete cascade
        on update cascade 
);



