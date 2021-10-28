package xyz.paladarpastel.backend.api.model.form.pedido;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormaPagamentoForm {

	@Size(min = 2, max = 100)
	private String nome;

}
