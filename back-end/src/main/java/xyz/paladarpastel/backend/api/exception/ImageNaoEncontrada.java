package xyz.paladarpastel.backend.api.exception;

public class ImageNaoEncontrada extends EntidadeNaoEncotradoException {

	private static final long serialVersionUID = 1L;

	public ImageNaoEncontrada(String message, Throwable cause) {
		super(message, cause);
	}

	public ImageNaoEncontrada(String mensagem) {
		super(mensagem);
	}

}
