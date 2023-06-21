package xyz.paladarpastel.backend.api.model.form.pedido;

import java.math.BigDecimal;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.paladarpastel.backend.domain.model.cliente.endereco.Endereco;
import xyz.paladarpastel.backend.domain.model.pedido.FormaPagamento;

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

	private BigDecimal troco;

	private FormaPagamento formaPagamento;

	@NotNull
	private Boolean frete;

	private Endereco endereco;

	private String observacao;

	@Size(min = 1)
	private List<Long> carrinho;

}
