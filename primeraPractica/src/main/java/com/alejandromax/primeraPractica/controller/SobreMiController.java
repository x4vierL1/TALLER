package com.alejandromax.primeraPractica.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;

@Controller
public class SobreMiController {

    @GetMapping("/sobremi")
    public String mostrarSobremi(Model model){
        model.addAttribute("Nombre" , "Xavier Fernando Lara Balcazar");
        model.addAttribute("Edad", 18);

        List<String> pasatiempos = Arrays.asList("jugar futbol" , "Jugar wii" , "escribir"
                , "leer" , "ver streams de creadores de contenido" , "cocinar" , "programar, etc...");
        model.addAttribute("Pasatiempos", pasatiempos);

        return "sobremi";

    }
}