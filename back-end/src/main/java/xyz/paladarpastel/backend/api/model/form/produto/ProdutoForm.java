package xyz.paladarpastel.backend.api.model.form.produto;

import java.math.BigDecimal;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
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

	@NotBlank
	@Size(min = 2, max = 100)
	private String nome;

	@NotBlank
	@Size(min = 0, max = 100)
	private String descricao;

	private Boolean ativo = true;

	@NotNull
	private BigDecimal preco;

	@Valid
	@NotNull
	private CategoriaProduto categoriaProduto;

	@Valid
	@NotNull
	private ImgProduto imgProduto;

}
