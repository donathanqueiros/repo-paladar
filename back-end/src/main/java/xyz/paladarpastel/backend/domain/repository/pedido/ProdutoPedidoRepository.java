package xyz.paladarpastel.backend.domain.repository.pedido;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import xyz.paladarpastel.backend.domain.model.pedido.ProdutoPedido;
import xyz.paladarpastel.backend.domain.repository.CustomRepository;

public interface ProdutoPedidoRepository extends CustomRepository<ProdutoPedido, Long> {

	@Query(value = "SELECT nome,COUNT(*) AS quantidade_vendida FROM produto_pedido ppd\r\n"
			+	"GROUP BY nome\r\n"
				+ "ORDER BY quantidade_vendida DESC,nome asc\r\n" + "LIMIT 10", nativeQuery = true)
	List<Object[]> maisVendidos();



}
