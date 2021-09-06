package br.com.paladar.backend.controller.dto.cliente;

import java.util.ArrayList;
import java.util.List;

import br.com.paladar.backend.controller.dto.pedido.PedidoDTO;
import br.com.paladar.backend.model.Perfil;
import br.com.paladar.backend.model.cliente.endereco.Endereco;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	
	private Perfil perfil;

}
