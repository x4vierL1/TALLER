package com.xavierlara.tienda.controller;

import com.xavierlara.tienda.entity.Usuario;
import com.xavierlara.tienda.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@Controller
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioService usuarioService, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("usuarios", usuarioService.listar());
        return "usuario";
    }

    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("usuario", new Usuario());
        model.addAttribute("modoEdicion", false);
        return "usuario-form";
    }

    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("usuario") Usuario usuario,
                        BindingResult result,
                        Model model) {

        // Verificar si el correo ya existe
        if (usuarioService.existeCorreo(usuario.getCorreo())) {
            result.rejectValue("correo", "error.usuario", "El correo electrónico ya está registrado.");
        }

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "usuario-form";
        }


        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        usuarioService.crear(usuario);
        return "redirect:/usuario";
    }

    @GetMapping("/editar/{id}")
    public String formularioEditar(Model model, @PathVariable Integer id) {
        model.addAttribute("usuario", usuarioService.buscarPorId(id));
        model.addAttribute("modoEdicion", true);
        return "usuario-form";
    }

    @PostMapping("/actualizar/{id}")
    public String actualizar(@PathVariable Integer id,
                             @Valid @ModelAttribute("usuario") Usuario usuario,
                             BindingResult result,
                             Model model) {

        // Verificar si el correo ya existe (excluyendo el usuario actual)
        Usuario existente = usuarioService.buscarPorId(id);
        if (!existente.getCorreo().equals(usuario.getCorreo()) &&
                usuarioService.existeCorreo(usuario.getCorreo())) {
            result.rejectValue("correo", "error.usuario", "El correo electrónico ya está registrado.");
        }

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "usuario-form";
        }


        if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        } else {

            usuario.setPassword(existente.getPassword());
        }

        usuarioService.actualizar(id, usuario);
        return "redirect:/usuario";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Integer id) {
        usuarioService.eliminar(id);
        return "redirect:/usuario";
    }
}