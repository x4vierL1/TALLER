package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Productos;
import com.xavierlara.tienda2.exception.ResourceNotFoundException;
import com.xavierlara.tienda2.repository.ProductosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductosServiceImpl implements ProductosService {
    private final ProductosRepository productosRepository;

    public ProductosServiceImpl(ProductosRepository productosRepository) {
        this.productosRepository = productosRepository;
    }

    @Override
    public List<Productos> listar() {
        return productosRepository.findAll();
    }

    @Override
    public Productos crear(Productos productos) {
        productos.setCodigoProducto(null);
        return productosRepository.save(productos);
    }

    @Override
    public Productos buscarPorCodigo(Integer codigo) {
        return productosRepository.findById(codigo).orElseThrow(()-> new ResourceNotFoundException("Producto con codigo, no encontrado: "+ codigo));
    }

    @Override
    public Productos actualizar(Integer codigo, Productos productos) {
        Productos productosExistente = buscarPorCodigo(codigo);

        productosExistente.setNombreProducto(productos.getNombreProducto());
        productosExistente.setPrecio(productos.getPrecio());
        productosExistente.setStock(productos.getStock());
        productosExistente.setEstado(productos.getEstado());

        return productosRepository.save(productosExistente);
    }

    @Override
    public void eliminar(Integer codigo) {
        if (!productosRepository.existsById(codigo)){
            throw new ResourceNotFoundException("Producto con codigo, no encontrado: "+ codigo);
        }
        Productos productosExistente = buscarPorCodigo(codigo);
        productosRepository.deleteById(codigo);
    }
}
