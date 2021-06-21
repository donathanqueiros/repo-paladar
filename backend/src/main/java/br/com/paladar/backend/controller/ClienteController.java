package br.com.paladar.backend.controller;

import br.com.paladar.backend.exception.ResourceNotFoundException;
import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.repository.cliente.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ClienteController {

	@Autowired
	private ClienteRepository clienteRepository;

	// get all clientes
	@GetMapping("/clientes")
	public List<Cliente> getAllClientes() {
		return clienteRepository.findAll();
	}

	// create cliente rest api
	@PostMapping("/clientes")
	public Cliente createCliente(@RequestBody Cliente cliente) {
		return clienteRepository.save(cliente);
	}

	// get cliente by id rest api
	@GetMapping("/clientes/{id}")
	public ResponseEntity<Cliente> GetClienteById(@PathVariable Long id) {

		Cliente cliente = clienteRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cliente not exist with id: " + id));

		return ResponseEntity.ok(cliente);
	}

	// update cliente rest api
	@PutMapping("/clientes/{id}")
	public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails) {

		Cliente cliente = clienteRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cliente not exist with id: " + id));

		// TODO
		// cliente.setFirstName(clienteDetails.getFirstName());
		// cliente.setLastName(clienteDetails.getLastName());
		// cliente.setEmailId(clienteDetails.getEmailId());

		Cliente updateCliente = clienteRepository.save(cliente);

		return ResponseEntity.ok(updateCliente);
	}

	// delete cliente rest api
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCliente(@PathVariable Long id) {
		Cliente cliente = clienteRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cliente not exist with id: " + id));

		clienteRepository.delete(cliente);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);

	}

}
