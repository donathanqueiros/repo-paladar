package br.com.paladar.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class PedidoImpossivelDespacharException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public PedidoImpossivelDespacharException() {
		super("Esse Pedido não pode ser despachado");
	}

}
