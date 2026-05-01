package com.xavierlara.tienda2.service;

import com.xavierlara.tienda2.entity.Usuarios;
import com.xavierlara.tienda2.enumtypes.UserType;
import com.xavierlara.tienda2.repository.UsuariosRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    private final UsuariosRepository usuariosRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuariosRepository usuariosRepository, PasswordEncoder passwordEncoder) {
        this.usuariosRepository = usuariosRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuarios usuarios = usuariosRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el usuario " + username));

        return User.builder()
                .username(usuarios.getEmail())
                .password(usuarios.getPassword())
                .roles(usuarios.getRol().name())
                .build();
    }

    public boolean register(String username, String password, String email, UserType rol, Boolean estado) {

        if (usuariosRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("El email ya está registrado.");
        }

        Usuarios nuevoUsuario = new Usuarios();
        nuevoUsuario.setUsername(username);
        nuevoUsuario.setPassword(passwordEncoder.encode(password));
        nuevoUsuario.setEmail(email);


        if (rol != null) {
            nuevoUsuario.setRol(rol);
        } else {
            nuevoUsuario.setRol(UserType.USER); // fallback
        }

        nuevoUsuario.setEstado(estado);

        usuariosRepository.save(nuevoUsuario);
        return true;
    }
}