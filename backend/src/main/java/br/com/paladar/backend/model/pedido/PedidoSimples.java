package br.com.paladar.backend.model.pedido;

import static br.com.paladar.backend.model.pedido.StatusPedido.CANCELADO;
import static br.com.paladar.backend.model.pedido.StatusPedido.ENTREGUE;
import static br.com.paladar.backend.model.pedido.StatusPedido.PENDENTE;
import static br.com.paladar.backend.model.pedido.StatusPedido.PRONTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import br.com.paladar.backend.exception.PedidoImpossivelDespacharException;
import br.com.paladar.backend.exception.PedidoJaCanceladoException;
import br.com.paladar.backend.model.cliente.ClienteSimples;
import br.com.paladar.backend.model.produto.Produto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PEDIDOS_SIMPLES")
public class PedidoSimples {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDPEDIDOS")
	private Long idPedido;

	@Enumerated(EnumType.STRING)
	@Builder.Default
	private StatusPedido status = PENDENTE;
	private Boolean entrega;
//	private String observacao;
	private BigDecimal total;
	@Builder.Default
	private LocalDateTime dataInicioPedido = LocalDateTime.now();
	private LocalDateTime dataFimPedido;

	@ManyToOne()
	@JoinColumn(name = "ID_CLIENTE", nullable = false)
	private ClienteSimples cliente;

	@ManyToOne()
	@JoinColumn(name = "ID_TIPO_PEDIDO")
	private TipoPedido tipoPedido;

	@ManyToOne()
	@JoinColumn(name = "ID_FORMA_PAGAMENTO")
	private FormaPagamento formaPagamento;

	@ManyToMany
	@JoinTable(name = "PEDIDO_SIMPLES_POSSUI_PRODUTO", joinColumns = {
			@JoinColumn(name = "IDCLIENTE") }, inverseJoinColumns = { @JoinColumn(name = "IDPRODUTO") })
	private List<Produto> produtos;

	public void despachar() throws PedidoImpossivelDespacharException {
		if (status.equals(PRONTO) && !entrega) {
			this.status = ENTREGUE;
		} else {
			this.status = status.despachar();
		}
		verificaSePedidoFoiEntregue(this);
	}

	private void verificaSePedidoFoiEntregue(PedidoSimples pedido) {
		if (pedido.getStatus().equals(ENTREGUE)) {
			pedido.setDataFimPedido(LocalDateTime.now());
		}
	}

	public void cancelar() throws PedidoJaCanceladoException {
		if (this.status == CANCELADO)
			throw new PedidoJaCanceladoException("Pedido", "id", this.idPedido.toString());
		this.status = CANCELADO;
	}

}
