package br.com.paladar.backend.model.pedido;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.produto.Produto;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "PEDIDOS")
public class Pedido {
	@Deprecated
	public Pedido() {
	}

	public Pedido(Cliente cliente, List<Produto> listaProdutos, String observacao) {
		this.cliente = cliente;
		this.produtos = listaProdutos;
		this.data = new Date();
		this.status = StatusPedido.PENDENTE;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDPEDIDOS")
	private Long id;

	@Column(name = "STATUS")
	@Enumerated(EnumType.STRING)
	private StatusPedido status;

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}

	@Column(name = "DATA")
	private Date data;

	@Column(name = "OBSERVACAO")
	private String observacao;

	@Column(name = "TOTAL")
	private double Total;

	@ManyToOne()
	@JoinColumn(name = "ID_CLIENTE")
	private Cliente cliente;

	@ManyToOne()
	@JoinColumn(name = "ID_FORMA_PEDIDO")
	private FormaPedido formaPedido;

	@ManyToOne()
	@JoinColumn(name = "ID_TIPO_PAGAMENTO")
	private TipoPagamento tipoPagamento;

	@ManyToMany
	@JoinTable(name = "PEDIDO_HAS_PRODUTO", joinColumns = { @JoinColumn(name = "IDCLIENTE") }, inverseJoinColumns = {
			@JoinColumn(name = "IDPRODUTO") })
	private List<Produto> produtos = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public StatusPedido getStatus() {
		return status;
	}

	public void setStatus(StatusPedido status) {
		this.status = status;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public FormaPedido getFormaPedido() {
		return formaPedido;
	}

	public void setFormaPedido(FormaPedido formaPedido) {
		this.formaPedido = formaPedido;
	}

	public TipoPagamento getTipoPagamento() {
		return tipoPagamento;
	}

	public void setTipoPagamento(TipoPagamento tipoPagamento) {
		this.tipoPagamento = tipoPagamento;
	}

	public double getTotal() {
		return Total;
	}

	public void setTotal(double total) {
		Total = total;
	}

	public List<Produto> getProdutos() {
		return produtos;
	}

}
