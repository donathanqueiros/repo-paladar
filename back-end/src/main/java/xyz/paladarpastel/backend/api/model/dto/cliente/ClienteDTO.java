package xyz.paladarpastel.backend.api.model.dto.cliente;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.paladarpastel.backend.domain.model.cliente.endereco.Endereco;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDTO {

	private long id;

	private String email;

	private String nome;

	private String telefone;

	private Endereco endereco;

}
