package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Clientes;
import com.xavierlara.tienda2.exception.ResourceNotFoundException;
import com.xavierlara.tienda2.repository.ClientesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientesServiceImpl implements ClientesService{
    private final ClientesRepository clientesRepository;

    public ClientesServiceImpl(ClientesRepository clientesRepository) {
        this.clientesRepository = clientesRepository;
    }

    @Override
    public List<Clientes> listar() {
        return clientesRepository.findAll();
    }

    @Override
    public Clientes crear(Clientes clientes) {
        return clientesRepository.save(clientes);
    }

    @Override
    public Clientes buscarPorDpi(Long dpi) {
        return clientesRepository.findById(dpi).orElseThrow(()-> new ResourceNotFoundException("Cliente con DPI, no encontrado: "+ dpi));
    }

    @Override
    public Clientes actualizar(Long dpi, Clientes clientes) {
        Clientes clienteExistente = buscarPorDpi(dpi);

        clienteExistente.setDpiCliente(clientes.getDpiCliente());
        clienteExistente.setNombreCliente(clientes.getNombreCliente());
        clienteExistente.setApellidoCliente(clientes.getApellidoCliente());
        clienteExistente.setDireccion(clientes.getDireccion());
        clienteExistente.setEstado(clientes.getEstado());

        return clientesRepository.save(clienteExistente);
    }


    @Override
    public void eliminar(Long dpi) {
        if (!clientesRepository.existsById(dpi)){
            throw new ResourceNotFoundException("Cliente con ID, no encontrado: "+ dpi);
        }
        Clientes clienteExistente = buscarPorDpi(dpi);
        clientesRepository.deleteById(dpi);
    }
}
