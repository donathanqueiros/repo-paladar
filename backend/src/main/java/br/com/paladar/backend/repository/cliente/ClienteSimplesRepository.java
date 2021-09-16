package br.com.paladar.backend.repository.cliente;

import java.util.Optional;

import br.com.paladar.backend.model.cliente.ClienteSimples;
import br.com.paladar.backend.repository.CustomRepository;

public interface ClienteSimplesRepository extends CustomRepository<ClienteSimples, Long> {

	Optional<ClienteSimples> findByEmail(String email);

}
