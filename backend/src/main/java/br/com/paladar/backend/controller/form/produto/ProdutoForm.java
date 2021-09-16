package br.com.paladar.backend.controller.form.produto;

import java.math.BigDecimal;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.com.paladar.backend.model.produto.CategoriaProduto;
import br.com.paladar.backend.model.produto.ImgProduto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

	private ImgProduto imgProduto = ImgProduto.builder().id(1L).build();

}
