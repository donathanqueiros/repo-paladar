package br.com.paladar.backend.controller.form.pedido;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TipoPedidoForm {

	@Size(min = 2, max = 100)
	private String nome;

}
