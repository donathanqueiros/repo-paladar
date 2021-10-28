package xyz.paladarpastel.backend.api.model.dto.pedido;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuantidadeVendidaDTO {
	
	ProdutoPedidoDTO produto;
	Long quantidadeVendida;
	
	

}
