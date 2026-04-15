package com.xavierlara.tienda.controller;

import com.xavierlara.tienda.entity.Usuario;
import com.xavierlara.tienda.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RegisterController {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;

    public RegisterController(UsuarioService usuarioService, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/register")
    public String mostrarFormularioRegistro(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "register";
    }

    @PostMapping("/register")
    public String registrarUsuario(@Valid @ModelAttribute("usuario") Usuario usuario,
                                   BindingResult result,
                                   Model model) {

        System.out.println("=== REGISTRO DE USUARIO ===");
        System.out.println("Nombre: " + usuario.getNombreUsuario());
        System.out.println("Apellido: " + usuario.getApellidoUsuario());
        System.out.println("Correo: " + usuario.getCorreo());
        System.out.println("Contraseña (sin encriptar): " + usuario.getPassword());

        if (result.hasErrors()) {
            System.out.println("ERRORES DE VALIDACIÓN:");
            result.getAllErrors().forEach(error -> System.out.println(error.toString()));
            model.addAttribute("modoEdicion", false);
            return "register";
        }

        // Verificar si el correo ya existe
        if (usuarioService.existeCorreo(usuario.getCorreo())) {
            System.out.println("ERROR: El correo ya existe: " + usuario.getCorreo());
            model.addAttribute("errorCorreo", "El correo electrónico ya está registrado.");
            return "register";
        }

        // Verificar si el nombre de usuario ya existe
        if (usuarioService.existeNombreUsuario(usuario.getNombreUsuario())) {
            System.out.println("ERROR: El nombre de usuario ya existe: " + usuario.getNombreUsuario());
            model.addAttribute("errorNombre", "El nombre de usuario ya está registrado.");
            return "register";
        }

        // Encriptar la contraseña antes de guardar
        String passwordEncriptada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordEncriptada);
        System.out.println("Contraseña encriptada: " + passwordEncriptada);

        // Guardar el usuario
        Usuario usuarioGuardado = usuarioService.crear(usuario);
        System.out.println("Usuario guardado con ID: " + usuarioGuardado.getIdUsuario());

        return "redirect:/login";
    }
}