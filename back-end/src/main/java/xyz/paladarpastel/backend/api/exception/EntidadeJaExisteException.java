package xyz.paladarpastel.backend.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import xyz.paladarpastel.backend.domain.exception.NegocioException;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class EntidadeJaExisteException extends NegocioException {

	public EntidadeJaExisteException(String message, Throwable cause) {
		super(message, cause);
	}

	public EntidadeJaExisteException(String mensagem) {
		super(mensagem);
	}

	private static final long serialVersionUID = 1L;

}
