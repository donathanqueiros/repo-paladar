package xyz.paladarpastel.backend.api.model.dto.pedido;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoPedidoDTO {

	private Long id;
	private String nome;
	private String descricao;
	private BigDecimal preco;
	private Integer quantidade;
	private String categoriaProduto;

}
