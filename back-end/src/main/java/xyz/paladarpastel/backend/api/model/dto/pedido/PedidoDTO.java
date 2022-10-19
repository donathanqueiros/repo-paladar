package xyz.paladarpastel.backend.api.model.dto.pedido;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.paladarpastel.backend.api.model.dto.cliente.ClienteDTO;
import xyz.paladarpastel.backend.domain.model.pedido.FormaPagamento;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedidoDTO {
	private Long idPedido;
	private ClienteDTO cliente;
	private List<ProdutoPedidoDTO> produtos;
	private BigDecimal total;
	private Boolean entrega;
	private FormaPagamento formaPagamento;
	@Builder.Default
	private BigDecimal troco = BigDecimal.ZERO;
	private String status;

	private Date dataInicioPedido;
	private Date dataFimPedido;
	private String observacao;

}
