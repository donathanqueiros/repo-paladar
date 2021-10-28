package xyz.paladarpastel.backend.api.model.form.produto;

import java.math.BigDecimal;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.model.produto.ImgProduto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoForm {

	@NotNull
	@Size(min = 2, max = 100)
	private String nome;

	@NotNull
	@Size(min = 0, max = 100)
	private String descricao;

	@NotNull
	private BigDecimal preco;

	@NotNull
	private CategoriaProduto categoriaProduto;
	@NotNull
	private ImgProduto imgProduto;

}
