package xyz.paladarpastel.backend.api.model.dto.pedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.paladarpastel.backend.api.model.dto.cliente.ClienteDTO;

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
	private String status;
	private LocalDateTime dataInicioPedido;
	private LocalDateTime dataFimPedido;
	private String observacao;

}
