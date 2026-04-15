package com.xavierlara.tienda.service;
import com.xavierlara.tienda.entity.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> listar();
    Producto crear(Producto producto);
    Producto actualizar (Integer id, Producto producto);
    Producto buscarPorId(Integer id);
    void eliminar(Integer id);
}
