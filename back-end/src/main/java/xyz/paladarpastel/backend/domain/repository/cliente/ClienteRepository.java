package xyz.paladarpastel.backend.domain.repository.cliente;

import java.util.Optional;

import xyz.paladarpastel.backend.domain.model.cliente.Cliente;
import xyz.paladarpastel.backend.domain.repository.CustomRepository;

public interface ClienteRepository extends CustomRepository<Cliente, Long> {

	Optional<Cliente> findByEmail(String email);

}
