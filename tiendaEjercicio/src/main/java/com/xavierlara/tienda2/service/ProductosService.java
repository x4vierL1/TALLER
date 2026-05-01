package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Productos;

import java.util.List;

public interface ProductosService {
    List<Productos> listar();
    Productos crear(Productos productos);
    Productos actualizar(Integer codigo, Productos productos);
    Productos buscarPorCodigo(Integer codigo);
    void eliminar(Integer codigo);
}
