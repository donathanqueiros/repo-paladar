package br.com.paladar.backend.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.paladar.backend.controller.dto.produto.CategoriaProdutoDTO;
import br.com.paladar.backend.controller.form.produto.CategoriaProdutoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.services.produto.CategoriaProdutoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/categoriaproduto")
public class CategoriaProdutoController {

	@Autowired
	private CategoriaProdutoService categoriaProdutoService;

	@GetMapping
	public List<CategoriaProdutoDTO> getAllCategoriaProduto() {
		return categoriaProdutoService.todosCategoriaProdutos();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CategoriaProdutoDTO createCategoriaProduto(@RequestBody @Valid CategoriaProdutoForm categoriaProdutoForm)
			throws ObjetoJaExisteException {
		return categoriaProdutoService.criarCategoriaProduto(categoriaProdutoForm);
	}

	@GetMapping("/{id}")
	public CategoriaProdutoDTO GetCategoriaProdutoById(@PathVariable Long id) {
		return categoriaProdutoService.buscarPorId(id);
	}

	@PutMapping("/{id}")
	public CategoriaProdutoDTO updateCategoriaProduto(@PathVariable Long id,
			@RequestBody @Valid CategoriaProdutoForm categoriaProdutoForm) {
		return categoriaProdutoService.atualizarCategoriaProduto(id, categoriaProdutoForm);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCategoriaProduto(@PathVariable Long id) {
		categoriaProdutoService.deletarPorId(id);

	}

}
