package xyz.paladarpastel.backend.api.exception;

public class CategoriaProdutoNaoEncotrado extends EntidadeNaoEncotradoException {

	public CategoriaProdutoNaoEncotrado(String mensagem) {
		super(mensagem);
	}

	public CategoriaProdutoNaoEncotrado(String message, Throwable cause) {
		super(message, cause);
	}

	private static final long serialVersionUID = 1L;

}
