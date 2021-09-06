package br.com.paladar.backend.controller.form.pedido;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PedidoForm {

	@NotNull
	private Boolean entrega;

	private String observacao;
	@NotNull
	private Long clienteId;

	@NotNull
	private Long formaPagamentoId;
	@NotNull
	private Long tipoPedidoId;
	@NotNull

	private List<Long> produtosId;

}
