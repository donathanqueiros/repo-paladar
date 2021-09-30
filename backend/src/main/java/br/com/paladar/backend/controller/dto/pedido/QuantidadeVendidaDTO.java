package br.com.paladar.backend.controller.dto.pedido;

import br.com.paladar.backend.controller.dto.produto.ProdutoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuantidadeVendidaDTO {
	
	ProdutoDTO produto;
	Long quantidadeVendida;
	
	

}
