package br.com.paladar.backend.controller.dto.pedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import br.com.paladar.backend.controller.dto.cliente.ClienteDTO;
import br.com.paladar.backend.controller.dto.produto.ProdutoDTO;
import br.com.paladar.backend.model.pedido.TipoPedido;
import br.com.paladar.backend.model.pedido.StatusPedido;
import br.com.paladar.backend.model.pedido.FormaPagamento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedidoDTO {

	private Long idPedido;
	private ClienteDTO cliente;
	private List<ProdutoDTO> produtos;
	private BigDecimal total;
	private String status;
	private LocalDateTime dataInicioPedido;
	private LocalDateTime dataFimPedido;
	private String observacao;
	private TipoPedido tipoPedido;
	private FormaPagamento formaPagamento;


}
