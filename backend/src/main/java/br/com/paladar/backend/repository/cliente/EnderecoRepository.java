package br.com.paladar.backend.repository.cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.paladar.backend.model.cliente.endereco.Endereco;


public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

}
