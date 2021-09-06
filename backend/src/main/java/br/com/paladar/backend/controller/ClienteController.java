package br.com.paladar.backend.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.paladar.backend.controller.dto.cliente.ClienteDTO;
import br.com.paladar.backend.controller.form.cliente.ClienteForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.services.ClienteService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/clientes")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ClienteController {


	private ClienteService clienteService;

	@GetMapping
	public List<ClienteDTO> todosClientes() {
		return clienteService.todosClientes();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ClienteDTO criarCliente(@RequestBody @Valid ClienteForm cliente) throws ObjetoJaExisteException {
		return clienteService.criarCliente(cliente);
	}

	@GetMapping("/{id}")
	public ClienteDTO buscarPorId(@PathVariable Long id) throws ObjetoNaoEncotradoException {
		return clienteService.buscarPorId(id);
	}

	@PutMapping("/{id}")
	public ClienteDTO atualizarCliente(@PathVariable Long id, @RequestBody @Valid ClienteDTO cliente)
			throws ObjetoNaoEncotradoException {

		return clienteService.atualizarCliente(id, cliente);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletarPorId(@PathVariable Long id) throws ObjetoNaoEncotradoException {
		clienteService.deletarPorId(id);

	}

}
