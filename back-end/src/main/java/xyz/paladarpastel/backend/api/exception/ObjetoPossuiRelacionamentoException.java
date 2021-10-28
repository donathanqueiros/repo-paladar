package xyz.paladarpastel.backend.api.exception;

import static org.springframework.util.StringUtils.capitalize;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ObjetoPossuiRelacionamentoException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ObjetoPossuiRelacionamentoException(String objeto, String tipo, String valor) {
		super(String.format("%s com %s %s não encontrado.", capitalize(objeto), tipo, valor));
	}

	public ObjetoPossuiRelacionamentoException(String string) {
		super(string);
	}

}
