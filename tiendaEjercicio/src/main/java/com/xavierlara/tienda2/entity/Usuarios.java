package com.xavierlara.tienda2.entity;

import com.xavierlara.tienda2.enumtypes.UserType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "usuarios", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})

public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_usuario")
    private Integer codigoUsuario;

    @NotBlank(message = "El username no puede ir vacio")
    @Column(name = "username")
    private String username;

    @NotBlank(message = "La password no puede ir vacia")
    @Column(name = "password")
    private String password;

    @Email
    @NotBlank(message = "El email no puede ir vacio")
    @Column(name = "email")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol")
    private UserType rol;

    @NotNull
    @Column(name = "estado")
    private Boolean estado;

    public Integer getCodigoUsuario() {
        return codigoUsuario;
    }

    public void setCodigoUsuario(Integer codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserType getRol() {
        return rol;
    }

    public void setRol(UserType rolUsuario) {
        this.rol = rolUsuario;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }
}
