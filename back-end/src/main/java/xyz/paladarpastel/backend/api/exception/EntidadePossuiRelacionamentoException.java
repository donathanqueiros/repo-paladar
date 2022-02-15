package xyz.paladarpastel.backend.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import xyz.paladarpastel.backend.domain.exception.NegocioException;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class EntidadePossuiRelacionamentoException extends NegocioException {

	private static final long serialVersionUID = 1L;


	public EntidadePossuiRelacionamentoException(String message, Throwable cause) {
		super(message, cause);
	}

	public EntidadePossuiRelacionamentoException(String mensagem) {
		super(mensagem);
	}

}
