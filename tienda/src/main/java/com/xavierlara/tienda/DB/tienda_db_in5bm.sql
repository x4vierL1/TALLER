drop database if exists tienda_db_in5bm;
create database tienda_db_in5bm;

-- Eliminar la tabla si existe
DROP TABLE IF EXISTS usuario;

-- Crear la tabla con los nombres correctos
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre_usuario VARCHAR(60) NOT NULL,
    apellido_usuario VARCHAR(60) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);
 
create table categoria(
	id_categoria int auto_increment not null primary key,
    nombre_categoria varchar(60) not null,
    descripcion_categoria varchar(150)
);
 
create table producto(
	id_producto int auto_increment not null primary key,
    nombre_producto varchar(80) not null,
    precio_producto decimal(10,2) not null,
    stock int not null,
    id_categoria int not null,
    constraint fk_producto_categoria
        foreign key (id_categoria)
        references categoria(id_categoria)
        on delete cascade
        on update cascade
);
 
create table pedido(
	id_pedido int auto_increment not null primary key,
    fecha_pedido varchar(60) not null,
    total_pedido decimal(10,2) not null,
    id_usuario int not null,
    constraint fk_pedido_usuario
        foreign key (id_usuario)
        references usuario(id_usuario)
        on delete cascade
        on update cascade
);
 
create table detalle_pedido(
	id_detalle int auto_increment not null primary key,
    cantidad int not null,
    precio_unitario decimal(10,2) not null,
    id_pedido int not null,
    id_producto int not null,
    constraint fk_detalle_pedido
        foreign key (id_pedido)
        references pedido(id_pedido),
    constraint fk_detalle_producto
        foreign key (id_producto)
        references producto(id_producto)
        on delete cascade
        on update cascade
);

INSERT INTO usuario (nombre_usuario, apellido_usuario, edad_usuario)
VALUES ('Juan', 'Pérez', 25);

select * from usuario;
select * from producto;
select * from pedido;
select * from detalle_pedido;
select* from categoria;