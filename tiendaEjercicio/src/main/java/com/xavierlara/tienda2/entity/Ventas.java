package com.xavierlara.tienda2.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Ventas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_venta")
    private Integer codigoVenta;

    @Column(name = "fecha_venta")
    private LocalDate fechaVenta;

    @NotNull(message = "El total de la venta no puede estar vacio")
    @Column(name = "total")
    private BigDecimal total;

    @NotNull(message = "El estado de la venta no puede estar vacio")
    @Column(name = "estado")
    private Boolean estado;

    @NotNull(message = "El dpi de la venta no puede estar vacio")
    @Column(name = "clientes_dpi_cliente")
    private Long clientesDpiCliente;

    @NotNull(message = "El codigo del usuario no puede estar vacio")
    @Column(name = "usuarios_codigo_usuario")
    private Integer usuariosCodigoUsuario;

    public Integer getCodigoVenta() {
        return codigoVenta;
    }

    public void setCodigoVenta(Integer codigoVenta) {
        this.codigoVenta = codigoVenta;
    }

    public LocalDate getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(LocalDate fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public Long getClientesDpiCliente() {
        return clientesDpiCliente;
    }

    public void setClientesDpiCliente(Long clientesDpiCliente) {
        this.clientesDpiCliente = clientesDpiCliente;
    }

    public Integer getUsuariosCodigoUsuario() {
        return usuariosCodigoUsuario;
    }

    public void setUsuariosCodigoUsuario(Integer usuariosCodigoUsuario) {
        this.usuariosCodigoUsuario = usuariosCodigoUsuario;
    }
}