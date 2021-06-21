package br.com.paladar.backend.controller;

import br.com.paladar.backend.exception.ResourceNotFoundException;
import br.com.paladar.backend.model.produto.CategoriaProduto;
import br.com.paladar.backend.repository.produto.CategoriaProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CategoriaProdutoController {

	@Autowired
	private CategoriaProdutoRepository categoriaProdutoRepository;

	// get all tipoProdutos
	@GetMapping("/categoriaproduto")
	public List<CategoriaProduto> getAllCategoriaProduto() {
		return categoriaProdutoRepository.findAll();
	}

	// create tipoProduto rest api
	@PostMapping("/categoriaproduto")
	public CategoriaProduto createCategoriaProduto(@RequestBody CategoriaProduto categoriaProduto) {
		return categoriaProdutoRepository.save(categoriaProduto);
	}

	// get tipoProduto by id rest api
	@GetMapping("/categoriaproduto/{id}")
	public ResponseEntity<CategoriaProduto> GetCategoriaProdutoById(@PathVariable Long id) {

		CategoriaProduto categoriaProduto = categoriaProdutoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TipoProduto not exist with id: " + id));

		return ResponseEntity.ok(categoriaProduto);
	}

	// update tipoProduto rest api
	@PutMapping("/categoriaproduto/{id}")
	public ResponseEntity<CategoriaProduto> updateCategoriaProduto(@PathVariable Long id,
			@RequestBody CategoriaProduto categoriaProdutoDetails) {

		CategoriaProduto categoriaProduto = categoriaProdutoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TipoProduto not exist with id: " + id));

		// TODO
		// tipoProduto.setFirstName(tipoProdutoDetails.getFirstName());
		// tipoProduto.setLastName(tipoProdutoDetails.getLastName());
		// tipoProduto.setEmailId(tipoProdutoDetails.getEmailId());

		CategoriaProduto updateCategoriaProduto = categoriaProdutoRepository.save(categoriaProduto);

		return ResponseEntity.ok(updateCategoriaProduto);
	}

	// delete tipoProduto rest api
	@DeleteMapping("/categoriaproduto/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCategoriaProduto(@PathVariable Long id) {
		CategoriaProduto categoriaProduto = categoriaProdutoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TipoProduto not exist with id: " + id));

		categoriaProdutoRepository.delete(categoriaProduto);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);

	}

}
