package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Ventas;

import java.util.List;

public interface VentasService {
    List<Ventas> listar();
    Ventas crear(Ventas ventas);
    Ventas actualizar(Integer codigo,Ventas ventas);
    Ventas buscarPorCodigo(Integer codigo);
    void eliminar(Integer codigo);
}
