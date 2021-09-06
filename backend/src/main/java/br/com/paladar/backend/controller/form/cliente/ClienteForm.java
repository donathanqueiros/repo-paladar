package br.com.paladar.backend.controller.form.cliente;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.com.paladar.backend.model.cliente.endereco.Endereco;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteForm {

	@NotNull
	@Size(min = 2, max = 200)
	private String nome;

	@NotNull
	@Email
	private String email;

	@NotNull
	@Size(min = 4, max = 50)
	private String senha;

	@NotNull
	@Size(min = 11, max = 14)
	private String telefone;

	@NotNull
	private Endereco endereco;
	
	

}
