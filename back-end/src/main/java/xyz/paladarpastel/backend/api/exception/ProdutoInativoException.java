package xyz.paladarpastel.backend.api.exception;

import xyz.paladarpastel.backend.domain.exception.NegocioException;

public class ProdutoInativoException extends NegocioException {

	private static final long serialVersionUID = 1L;

	public ProdutoInativoException(String message, Throwable cause) {
		super(message, cause);
	}

	public ProdutoInativoException(String mensagem) {
		super(mensagem);
	}

}
