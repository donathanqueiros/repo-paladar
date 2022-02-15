package xyz.paladarpastel.backend.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import xyz.paladarpastel.backend.domain.exception.NegocioException;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class EntidadeNaoEncotradoException extends NegocioException {

	public EntidadeNaoEncotradoException(String mensagem) {
		super(mensagem);
	}

	public EntidadeNaoEncotradoException(String message, Throwable cause) {
		super(message, cause);
	}

	private static final long serialVersionUID = 1L;

}
