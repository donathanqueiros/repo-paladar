package br.com.paladar.backend.repository.cliente;

import br.com.paladar.backend.model.cliente.endereco.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

}
