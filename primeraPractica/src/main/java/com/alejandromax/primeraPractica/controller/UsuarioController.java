package com.alejandromax.primeraPractica.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;

@Controller
public class UsuarioController {

    @GetMapping("/usuario")
    public String mostrarPerfil(Model model) {

        model.addAttribute("Nombre", "Juan");
        model.addAttribute("Edad", 20);

        List<String> habilidades = Arrays.asList("Java", "Spring Boot", "HTML");
        model.addAttribute("Habilidades", habilidades);

        return "usuario";
    }
}