package br.com.paladar.backend.model.pedido;

import br.com.paladar.backend.exception.PedidoImpossivelDespacharException;

public enum StatusPedido {

	CANCELADO("cancelado") {

		@Override
		public StatusPedido despachar() throws PedidoImpossivelDespacharException {
			throw new PedidoImpossivelDespacharException();
		}

	},
	PENDENTE("pendente") {

		@Override
		public StatusPedido despachar() {

			return PREPARANDO;
		}

	},
	PREPARANDO("preparando") {

		@Override
		public StatusPedido despachar() {
			return PRONTO;
		}

	},
	ENTREGA("entrega") {
		@Override
		public StatusPedido despachar() {
			return ENTREGUE;
		}

	},
	PRONTO("pronto") {

		@Override
		public StatusPedido despachar() {
			return ENTREGA;
		}

	},
	ENTREGUE("entregue") {

		@Override
		public StatusPedido despachar() throws PedidoImpossivelDespacharException {
			throw new PedidoImpossivelDespacharException();

		}

	};

	StatusPedido(String nome) {
		this.nome = nome;

	}

	@Override
	public String toString() {
		return nome;
	}

	private String nome;

	abstract StatusPedido despachar() throws PedidoImpossivelDespacharException;

}
