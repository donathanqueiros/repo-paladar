package xyz.paladarpastel.backend.api.model.form.pedido;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.paladarpastel.backend.domain.model.cliente.endereco.Endereco;

@Data
@Builder
@NoArgsConstructor

@AllArgsConstructor
public class PedidoForm {

	@NotBlank
	private String nome;

	@NotBlank
	private String telefone;

	@NotBlank
	private String email;

	@NotNull
	private Boolean frete;

	private Endereco endereco;

	private String observacao;

	@NotBlank
	@Size(min = 1)
	private List<Long> carrinho;

}
