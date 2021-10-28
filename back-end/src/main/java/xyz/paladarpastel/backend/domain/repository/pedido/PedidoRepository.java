package xyz.paladarpastel.backend.domain.repository.pedido;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

import xyz.paladarpastel.backend.domain.model.pedido.Pedido;
import xyz.paladarpastel.backend.domain.model.pedido.StatusPedido;
import xyz.paladarpastel.backend.domain.repository.CustomRepository;

public interface PedidoRepository extends CustomRepository<Pedido, Long> {

	List<Pedido> findByStatus(StatusPedido tipoStatus);

	@Query("SELECT p FROM Pedido p WHERE p.status != 'ENTREGUE' or p.status != 'CANCELADO'")
	List<Pedido> findAllAndamento(Sort sort);

	@Query("SELECT p FROM Pedido p WHERE p.status = 'ENTREGUE' or p.status = 'CANCELADO' ")
	List<Pedido> findAllFinalizado(Sort sort);

}
