package com.xavierlara.tienda.service;

import com.xavierlara.tienda.entity.Categoria;
import com.xavierlara.tienda.exception.ResourceNotFoundException;
import com.xavierlara.tienda.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaServiceImpl(CategoriaRepository categoriaReposiroty) {
        this.categoriaRepository = categoriaReposiroty;
    }

    @Override
    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    @Override
    public Categoria crear(Categoria categoria) {
        categoria.setIdCategoria(null);
        return categoriaRepository.save(categoria);
    }

    @Override
    public Categoria actualizar(Integer id, Categoria categoria) {
        Categoria existente = buscarPorId(id);
        existente.setNombreCategoria(categoria.getNombreCategoria());
        existente.setDescripcionCategoria(categoria.getDescripcionCategoria());
        return categoriaRepository.save(existente);
    }

    @Override
    public Categoria buscarPorId(Integer id) {
        return categoriaRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Categoria con ID no encontrada " + id));
    }

    @Override
    public void eliminar(Integer id) {
        if (!categoriaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Categoria no encontrada con ID:" + id);
        }
        categoriaRepository.deleteById(id);
    }
}
