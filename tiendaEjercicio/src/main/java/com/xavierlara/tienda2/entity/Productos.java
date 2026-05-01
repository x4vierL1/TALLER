package com.xavierlara.tienda2.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

import java.math.BigDecimal;

@Entity
public class Productos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_producto")
    private Integer codigoProducto;

    @NotBlank(message = "El nombre del producto no puede ir vacío")
    @Column(name = "nombre_producto")
    private String nombreProducto;

    @NotNull(message = "El precio del producto no puede estar vacío")
    @Column(name = "precio")
    private BigDecimal precio;

    @NotNull(message = "El stock del producto no puede estar vacío")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Column(name = "stock")
    private Integer stock;

    @NotNull(message = "El estado del producto no puede estar vacío")
    @Column(name = "estado")
    private Boolean estado;

    // Getters y Setters

    public Integer getCodigoProducto() {
        return codigoProducto;
    }

    public void setCodigoProducto(Integer codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }
}