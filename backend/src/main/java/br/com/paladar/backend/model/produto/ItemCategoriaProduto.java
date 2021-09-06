package br.com.paladar.backend.model.produto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemCategoriaProduto {
	private long id;
	private String nome;
	private int quantidadeMax;
	private double preco;

}
