package br.com.paladar.backend.repository.cliente;

import br.com.paladar.backend.model.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
