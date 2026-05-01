package com.xavierlara.tienda2;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class TiendaEjercicioApplication implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(TiendaEjercicioApplication.class);

    public static void main(String[] args) {
		SpringApplication.run(TiendaEjercicioApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
        log.info("API jalando...");
    }
}
