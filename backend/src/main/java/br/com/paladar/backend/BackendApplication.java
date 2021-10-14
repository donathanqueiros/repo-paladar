package br.com.paladar.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import br.com.paladar.backend.repository.CustomRepositoryImpl;

@SpringBootApplication
@ComponentScan(basePackages = { "br.com.paladar.backend.*" })
@EnableJpaRepositories(repositoryBaseClass = CustomRepositoryImpl.class)
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}
