package br.com.paladar.backend.repository.pedido;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

import br.com.paladar.backend.model.pedido.Pedido;
import br.com.paladar.backend.model.pedido.StatusPedido;
import br.com.paladar.backend.repository.CustomRepository;

public interface PedidoRepository extends CustomRepository<Pedido, Long> {

	List<Pedido> findByStatus(StatusPedido tipoStatus);

	@Query("SELECT p FROM Pedido p WHERE p.status != 'entregue'")
	List<Pedido> findAllAndamento(Sort sort);



}
