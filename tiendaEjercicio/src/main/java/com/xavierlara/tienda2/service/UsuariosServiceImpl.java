package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Usuarios;
import com.xavierlara.tienda2.exception.ResourceNotFoundException;
import com.xavierlara.tienda2.repository.UsuariosRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosServiceImpl implements UsuariosService {
    private final UsuariosRepository usuariosRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuariosServiceImpl(UsuariosRepository usuariosRepository, PasswordEncoder passwordEncoder) {
        this.usuariosRepository = usuariosRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public List<Usuarios> listar() {
        return usuariosRepository.findAll();
    }

    @Override
    public Usuarios crear(Usuarios usuarios) {
        usuarios.setCodigoUsuario(null);
        usuarios.setPassword(passwordEncoder.encode(usuarios.getPassword()));
        return usuariosRepository.save(usuarios);
    }

    @Override
    public Usuarios buscarPorCodigo(Integer codigo) {
        return usuariosRepository.findById(codigo).orElseThrow(()-> new ResourceNotFoundException("Usuario con codigo, no encontrado: "+ codigo));
    }

    @Override
    public Usuarios actualizar(Integer codigo, Usuarios usuarios) {
        Usuarios usuarioExistente = buscarPorCodigo(codigo);
        usuarioExistente.setUsername(usuarios.getUsername());
        usuarioExistente.setPassword(passwordEncoder.encode(usuarios.getPassword()));
        usuarioExistente.setEmail(usuarios.getEmail());
        usuarioExistente.setRol(usuarios.getRol());
        usuarioExistente.setEstado(usuarios.getEstado());

        return usuariosRepository.save(usuarioExistente) ;
    }


    @Override
    public void eliminar(Integer codigo) {
        if (!usuariosRepository.existsById(codigo)){
            throw new ResourceNotFoundException("Usuario con codigo, no encontrado: "+ codigo);
        }
        Usuarios usuarioExistente = buscarPorCodigo(codigo);
        usuariosRepository.deleteById(codigo);
    }

}
