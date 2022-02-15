package xyz.paladarpastel.backend.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PedidoImpossivelDespacharException extends ResponseStatusException {

	private static final long serialVersionUID = 1L;

	public PedidoImpossivelDespacharException(String reason) {
		this(HttpStatus.BAD_REQUEST, reason);
	}

	public PedidoImpossivelDespacharException(HttpStatus status, String reason) {
		super(status, reason);
	}

	public PedidoImpossivelDespacharException() {
		this(HttpStatus.BAD_REQUEST, "Esse Pedido não pode ser despachado");
	}

}
