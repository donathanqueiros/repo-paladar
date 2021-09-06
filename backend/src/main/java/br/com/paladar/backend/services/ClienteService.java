package br.com.paladar.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.controller.dto.cliente.ClienteDTO;
import br.com.paladar.backend.controller.form.cliente.ClienteForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.mapper.ClienteMapper;
import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.repository.cliente.ClienteRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ClienteService {

	private final ClienteRepository clienteRepository;

	private final ClienteMapper clienteMapper = ClienteMapper.INSTANCE;

	public List<ClienteDTO> todosClientes() {
		List<Cliente> clientes = clienteRepository.findAll();
		return clientes.stream().map(clienteMapper::toDTO).collect(Collectors.toList());
	}

	public ClienteDTO criarCliente(ClienteForm clienteForm) throws ObjetoJaExisteException {
		verificaJaSeExiste(clienteForm.getEmail());
		Cliente cliente = clienteMapper.toModel(clienteForm);
		Cliente clienteSalvo = clienteRepository.save(cliente);
		return clienteMapper.toDTO(clienteSalvo);
	}

	public ClienteDTO buscarPorId(Long id) throws ObjetoNaoEncotradoException {
		Cliente cliente = clienteRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(Cliente.class.getName(), "id", id.toString()));
		return clienteMapper.toDTO(cliente);
	}

	public ClienteDTO atualizarCliente(Long id, ClienteDTO cliente) throws ObjetoNaoEncotradoException {
		Cliente ClienteEncontrado = verificaSeExiste(id);
		Cliente ClienteAtualizado = clienteRepository.save(ClienteEncontrado);

		return clienteMapper.toDTO(ClienteAtualizado);
	}

	public void deletarPorId(Long id) throws ObjetoNaoEncotradoException {
		verificaSeExiste(id);
		clienteRepository.deleteById(id);
	}

	private Cliente verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {

		return clienteRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(Cliente.class.getName(), "id", id.toString()));
	}

	private void verificaJaSeExiste(String email) throws ObjetoJaExisteException {
		Optional<Cliente> cliente = clienteRepository.findByEmail(email);
		if (cliente.isPresent()) {
			throw new ObjetoJaExisteException(Cliente.class.getName(), "email", email);
		}
	}

}
