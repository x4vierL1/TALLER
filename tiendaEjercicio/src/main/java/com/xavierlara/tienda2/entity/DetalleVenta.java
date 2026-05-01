package com.xavierlara.tienda2.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

import java.math.BigDecimal;

@Entity
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_detalle_venta")
    private Integer codigoDetalleVenta;

    @NotNull(message = "La cantidad no puede estar vacía")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    @Column(name = "cantidad")
    private Integer cantidad;

    @NotNull(message = "El precio unitario no puede estar vacío")
    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

    @NotNull(message = "El subtotal no puede estar vacío")
    @Column(name = "subtotal")
    private BigDecimal subtotal;

    @NotNull(message = "El producto es obligatorio")
    @Column(name = "productos_codigo_producto")
    private Integer productosCodigoProducto;

    @NotNull(message = "La venta es obligatoria")
    @Column(name = "ventas_codigo_venta")
    private Integer ventasCodigoVenta;

    // GETTERS Y SETTERS

    public Integer getCodigoDetalleVenta() {
        return codigoDetalleVenta;
    }

    public void setCodigoDetalleVenta(Integer codigoDetalleVenta) {
        this.codigoDetalleVenta = codigoDetalleVenta;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public Integer getProductosCodigoProducto() {
        return productosCodigoProducto;
    }

    public void setProductosCodigoProducto(Integer productosCodigoProducto) {
        this.productosCodigoProducto = productosCodigoProducto;
    }

    public Integer getVentasCodigoVenta() {
        return ventasCodigoVenta;
    }

    public void setVentasCodigoVenta(Integer ventasCodigoVenta) {
        this.ventasCodigoVenta = ventasCodigoVenta;
    }
}