package com.xavierlara.tienda2.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Clientes {
    @Id
    @Column(name = "dpi_cliente")
    private  Long dpiCliente;

    @NotBlank(message = "El nombre del cliente no puede estar vacio")
    @Column(name = "nombre_cliente")
    private String nombreCliente;

    @NotBlank(message = "El apellido del cliente no puede estar vacio")
    @Column(name = "apellido_cliente")
    private String apellidoCliente;

    @NotBlank(message = "La dirreccion no puede estar vacia")
    @Column(name = "direccion")
    private String direccion;

    @Column(name = "estado")
    private Boolean estado;

    public Long getDpiCliente() {
        return dpiCliente;
    }

    public void setDpiCliente(Long dpiCliente) {
        this.dpiCliente = dpiCliente;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getApellidoCliente() {
        return apellidoCliente;
    }

    public void setApellidoCliente(String apellidoCliente) {
        this.apellidoCliente = apellidoCliente;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }
}
