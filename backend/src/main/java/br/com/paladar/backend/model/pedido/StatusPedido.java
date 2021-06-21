package br.com.paladar.backend.model.pedido;

public enum StatusPedido {
	CANCELADO("cancelado"), PENDENTE("pendente"), PREPARANDO("preparando"), PRONTO("pronto"), ENTREGUE("entregue");

	StatusPedido(String nome) {

	}
}
