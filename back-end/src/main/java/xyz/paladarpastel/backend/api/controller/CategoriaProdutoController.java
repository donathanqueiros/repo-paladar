package xyz.paladarpastel.backend.api.controller;

import java.util.List;
import java.util.stream.Collectors;

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

import xyz.paladarpastel.backend.api.exception.ObjetoJaExisteException;
import xyz.paladarpastel.backend.api.mapper.CategoriaProdutoMapper;
import xyz.paladarpastel.backend.api.model.dto.produto.CategoriaProdutoDTO;
import xyz.paladarpastel.backend.api.model.form.produto.CategoriaProdutoForm;
import xyz.paladarpastel.backend.domain.services.produto.CategoriaProdutoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/categoriaproduto")
public class CategoriaProdutoController {

	@Autowired
	private CategoriaProdutoService categoriaProdutoService;

	@Autowired
	private CategoriaProdutoMapper categoriaProdutoMapper;

	@GetMapping
	public List<CategoriaProdutoDTO> getAllCategoriaProduto() {
		var categoriaProdutos = categoriaProdutoService.todosCategoriaProdutos();

		return categoriaProdutos.stream().map(categoriaProdutoMapper::toDTO).collect(Collectors.toList());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CategoriaProdutoDTO createCategoriaProduto(@RequestBody @Valid CategoriaProdutoForm categoriaProdutoForm)
			throws ObjetoJaExisteException {
		var categoriaProduto = categoriaProdutoMapper.toModel(categoriaProdutoForm);
		var categoriaProdutoCriada = categoriaProdutoService.criarCategoriaProduto(categoriaProduto);
		return categoriaProdutoMapper.toDTO(categoriaProdutoCriada);
	}

	@GetMapping("/{id}")
	public CategoriaProdutoDTO GetCategoriaProdutoById(@PathVariable Long id) {
		var categoriaProduto = categoriaProdutoService.buscarPorId(id);
		return categoriaProdutoMapper.toDTO(categoriaProduto);

	}

	@PutMapping("/{id}")
	public CategoriaProdutoDTO updateCategoriaProduto(@PathVariable Long id,
			@RequestBody @Valid CategoriaProdutoForm categoriaProdutoForm) {
		var categoriaProduto = categoriaProdutoMapper.toModel(categoriaProdutoForm);
		var categoriaProdutoAtualizada = categoriaProdutoService.atualizarCategoriaProduto(id, categoriaProduto);
		return categoriaProdutoMapper.toDTO(categoriaProdutoAtualizada);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCategoriaProduto(@PathVariable Long id) {
		categoriaProdutoService.deletarPorId(id);
	}

}
