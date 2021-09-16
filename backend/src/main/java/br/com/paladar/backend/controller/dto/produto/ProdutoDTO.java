package br.com.paladar.backend.controller.dto.produto;

import java.math.BigDecimal;

import br.com.paladar.backend.model.produto.CategoriaProduto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {

	private long id;

	private String nome;

	private String descricao;

	private BigDecimal preco;

	private CategoriaProduto categoriaProduto;

	private ImgProdutoDTO imgProduto;

}
