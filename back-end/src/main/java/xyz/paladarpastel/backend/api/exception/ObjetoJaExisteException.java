package xyz.paladarpastel.backend.api.exception;

import static org.springframework.util.StringUtils.capitalize;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ObjetoJaExisteException extends Exception {

	private static final long serialVersionUID = 1L;

	public ObjetoJaExisteException(String objeto, String tipo, String valor) {
		super(String.format("%s com %s %s ja esta registrado no sistema.", capitalize(objeto), tipo, valor));

	}

}
