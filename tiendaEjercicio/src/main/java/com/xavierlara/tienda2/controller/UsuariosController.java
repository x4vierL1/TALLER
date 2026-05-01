package com.xavierlara.tienda2.controller;

import com.xavierlara.tienda2.entity.Usuarios;
import com.xavierlara.tienda2.service.UsuariosService;
import jakarta.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@Validated
@Controller
@RequestMapping("/usuarios")
public class UsuariosController {

    private final UsuariosService usuariosService;

    public UsuariosController(UsuariosService usuariosService) {
        this.usuariosService = usuariosService;
    }

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("usuarios", usuariosService.listar());
        return "usuarios";
    }

    @GetMapping("/nuevo")
    public String mostrarFormulario(Model model) {
        model.addAttribute("usuario", new Usuarios());
        model.addAttribute("modoEdicion", false);
        return "usuarios-form";
    }

    @PostMapping("/guardar")
    public String crear(@Valid @ModelAttribute("usuario") Usuarios usuario,
                        BindingResult result,
                        Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", false);
            return "usuarios-form";
        }

        usuariosService.crear(usuario);
        return "redirect:/usuarios";
    }

    @GetMapping("/editar/{codigo}")
    public String formularioEditar(@PathVariable Integer codigo, Model model) {
        model.addAttribute("usuario", usuariosService.buscarPorCodigo(codigo));
        model.addAttribute("modoEdicion", true);
        return "usuarios-form";
    }

    @PostMapping("/actualizar/{codigo}")
    public String actualizar(@PathVariable Integer codigo,
                             @Valid @ModelAttribute("usuario") Usuarios usuario,
                             BindingResult result,
                             Model model) {

        if (result.hasErrors()) {
            model.addAttribute("modoEdicion", true);
            return "usuarios-form";
        }

        usuariosService.actualizar(codigo, usuario);
        return "redirect:/usuarios";
    }

    @GetMapping("/eliminar/{codigo}")
    public String eliminar(@PathVariable Integer codigo) {
        usuariosService.eliminar(codigo);
        return "redirect:/usuarios";
    }
}