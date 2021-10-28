package xyz.paladarpastel.backend.api.model.dto.produto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {

	private long id;

	private String nome;

	private String descricao;

	private BigDecimal preco;
	
	private Boolean ativo;

	private CategoriaProduto categoriaProduto;

	private ImgProdutoDTO imgProduto;
	

}
