package com.xavierlara.tienda.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_categoria")
    private Integer idCategoria;

    @NotBlank(message = "El nombre de la categoria no puede ir vacio.")
    @Column(name="nombre_categoria")
    private String nombreCategoria;

    @NotBlank(message = "La descripcion de la categoria no puede ir vacia.")
    @Column(name="descripcion_categoria")
    private String descripcionCategoria;

    public String getDescripcionCategoria() {
        return descripcionCategoria;
    }

    public String getNombreCategoria() {
        return nombreCategoria;
    }

    public Integer getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }

    public void setDescripcionCategoria(String descripcionCategoria) {
        this.descripcionCategoria = descripcionCategoria;
    }
}
