package br.com.paladar.backend.repository.pedido;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.paladar.backend.model.pedido.FormaPagamento;
import br.com.paladar.backend.services.FormaPagamentoService;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamento, Long> {

	Optional<FormaPagamento> findByNome(String nome);

}
