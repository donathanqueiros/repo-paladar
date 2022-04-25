package xyz.paladarpastel.backend.api.model.form.produto;

import javax.validation.constraints.NotBlank;
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

	@NotBlank
	@Size(min = 2, max = 100)
	private String nome;

}
