package br.com.paladar.backend.controller.form.pedido;

import java.util.List;

import javax.validation.constraints.NotNull;

import br.com.paladar.backend.model.cliente.endereco.Endereco;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor

@AllArgsConstructor
public class PedidoSimplesForm {

	@NotNull
	private String nome;
	@NotNull
	private String telefone;
	@NotNull
	private String email;

	@NotNull
	private Boolean frete;

	private Endereco endereco;

//	private String observacao;

	@NotNull
	private List<Long> carrinho;

}
