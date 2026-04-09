package com.alejandromax.primeraPractica.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DatosController {

    @GetMapping("/datos")
    public String mostrarDatos(Model model) {
        model.addAttribute("Nombre", "Alejandro Benjamin");
        model.addAttribute("Apellido", "Max Lopez");
        model.addAttribute("Edad", 21);

        return "datos";
    }
}
