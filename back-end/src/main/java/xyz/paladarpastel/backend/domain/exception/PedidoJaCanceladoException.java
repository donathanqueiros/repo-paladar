package xyz.paladarpastel.backend.domain.exception;

import static org.springframework.util.StringUtils.capitalize;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PedidoJaCanceladoException extends ResponseStatusException {

	private static final long serialVersionUID = 1L;

	public PedidoJaCanceladoException(String reason) {
		this(HttpStatus.BAD_REQUEST, reason);
	}

	public PedidoJaCanceladoException(HttpStatus status, String reason) {
		super(status, reason);
	}

	public PedidoJaCanceladoException(String objeto, String tipo, String valor) {
		this(HttpStatus.BAD_REQUEST,
				String.format("%s com %s %s ja esta registrado no sistema.", capitalize(objeto), tipo, valor));
	}
}
