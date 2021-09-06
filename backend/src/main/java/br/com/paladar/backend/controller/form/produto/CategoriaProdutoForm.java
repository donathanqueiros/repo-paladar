package br.com.paladar.backend.controller.form.produto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaProdutoForm {

	@NotNull
	@Size(min = 2, max = 100)
	private String nome;

}
