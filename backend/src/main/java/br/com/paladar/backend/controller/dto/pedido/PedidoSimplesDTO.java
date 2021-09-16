package br.com.paladar.backend.controller.dto.pedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import br.com.paladar.backend.controller.dto.cliente.ClienteSimplesDTO;
import br.com.paladar.backend.controller.dto.produto.ProdutoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PedidoSimplesDTO {

	private Long idPedido;
	private ClienteSimplesDTO cliente;
	private List<ProdutoDTO> produtos;
	private BigDecimal total;
	private String status;
	private LocalDateTime dataInicioPedido;
	private LocalDateTime dataFimPedido;
//	private String observacao;
//	private TipoPedido tipoPedido;
//	private FormaPagamento formaPagamento;


}
