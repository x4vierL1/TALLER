package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Usuarios;

import java.util.List;

public interface UsuariosService {
    List<Usuarios> listar();
    Usuarios crear(Usuarios usuarios);
    Usuarios actualizar(Integer codigo, Usuarios usuarios);
    Usuarios buscarPorCodigo(Integer codigo);
    void eliminar(Integer codigo);
}
