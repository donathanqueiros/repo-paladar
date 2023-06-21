package xyz.paladarpastel.backend.domain.model.pedido;

import static xyz.paladarpastel.backend.domain.model.pedido.StatusPedido.CANCELADO;
import static xyz.paladarpastel.backend.domain.model.pedido.StatusPedido.ENTREGUE;
import static xyz.paladarpastel.backend.domain.model.pedido.StatusPedido.PENDENTE;
import static xyz.paladarpastel.backend.domain.model.pedido.StatusPedido.PRONTO;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import xyz.paladarpastel.backend.domain.exception.PedidoImpossivelDespacharException;
import xyz.paladarpastel.backend.domain.exception.PedidoJaCanceladoException;
import xyz.paladarpastel.backend.domain.model.cliente.Cliente;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PEDIDOS")
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDPEDIDOS")
	private Long idPedido;

	@Enumerated(EnumType.STRING)
	@Builder.Default
	@Setter(AccessLevel.PRIVATE)
	private StatusPedido status = PENDENTE;

	private Boolean entrega;

	private String observacao;

	@Builder.Default
	private BigDecimal troco = BigDecimal.ZERO;

	private BigDecimal total;

	@Builder.Default
	private Date dataInicioPedido = new Date();
	private Date dataFimPedido;

	@ManyToOne
	@JoinColumn(name = "ID_FORMA_PAGAMENTO", nullable = true)
	private FormaPagamento formaPagamento;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "ID_CLIENTE", nullable = false)
	private Cliente cliente;

	@OneToMany(mappedBy = "pedido", cascade = CascadeType.PERSIST)
	private List<ProdutoPedido> produtos;

	public void despachar() throws PedidoImpossivelDespacharException {
		if (status.equals(PRONTO) && !entrega) {
			this.status = ENTREGUE;
		} else {
			this.status = status.despachar();
		}
		verificaSePedidoFoiEntregue(this);
	}

	private void verificaSePedidoFoiEntregue(Pedido pedido) {
		if (pedido.getStatus().equals(ENTREGUE)) {
			pedido.setDataFimPedido(new Date());
		}
	}

	public void cancelar() throws PedidoJaCanceladoException {
		if (this.status == CANCELADO)
			throw new PedidoJaCanceladoException("Pedido", "id", this.idPedido.toString());
		this.status = CANCELADO;
		this.setDataFimPedido(new Date());
	}

}
