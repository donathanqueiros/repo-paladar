package br.com.paladar.backend.repository.pedido;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.paladar.backend.model.pedido.TipoPedido;
import br.com.paladar.backend.services.TipoPedidoService;

public interface TipoPedidoRepository extends JpaRepository<TipoPedido, Long> {

	Optional<TipoPedido> findByNome(String nome);

}
