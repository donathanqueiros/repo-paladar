package xyz.paladarpastel.backend.api.exception;

import static org.springframework.util.StringUtils.capitalize;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ProdutoInativoException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ProdutoInativoException(String objeto, String tipo, String valor) {
		super(String.format("%s com %s %s esta inativo.", capitalize(objeto), tipo, valor));
	}

	public ProdutoInativoException(String string) {
		super(string);
	}

}
