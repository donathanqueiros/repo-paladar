package xyz.paladarpastel.backend.api.exception;

import static org.springframework.util.StringUtils.capitalize;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ObjetoNaoEncotradoException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ObjetoNaoEncotradoException(String objeto, String tipo, String valor) {
		super(String.format("%s com %s %s não encontrado.", capitalize(objeto), tipo, valor));
	}

	public ObjetoNaoEncotradoException(String string) {
		super(string);
	}

}
