package br.com.paladar.backend.repository.cliente;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.paladar.backend.model.cliente.Cliente;


public interface ClienteRepository extends JpaRepository<Cliente, Long> {

	Optional<Cliente> findByEmail(String email);

}
