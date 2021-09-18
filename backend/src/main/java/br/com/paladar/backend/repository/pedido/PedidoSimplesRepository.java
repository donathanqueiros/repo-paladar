package br.com.paladar.backend.repository.pedido;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

import br.com.paladar.backend.model.pedido.PedidoSimples;
import br.com.paladar.backend.model.pedido.StatusPedido;
import br.com.paladar.backend.repository.CustomRepository;

public interface PedidoSimplesRepository extends CustomRepository<PedidoSimples, Long> {

	List<PedidoSimples> findByStatus(StatusPedido tipoStatus);

	@Query("SELECT p FROM PedidoSimples p WHERE p.status != 'entregue'")
	List<PedidoSimples> findAllAndamento(Sort sort);

	@Query("SELECT p FROM PedidoSimples p WHERE p.status = 'entregue' or p.status = 'cancelado' ")
	List<PedidoSimples> findAllFinalizado(Sort sort);

}
