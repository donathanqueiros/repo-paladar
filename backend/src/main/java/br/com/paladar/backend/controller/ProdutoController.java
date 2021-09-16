package br.com.paladar.backend.controller;

import java.util.List;

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

import br.com.paladar.backend.controller.dto.produto.ProdutoDTO;
import br.com.paladar.backend.controller.form.produto.ProdutoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.services.produto.ProdutoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;

	@GetMapping
	public List<ProdutoDTO> getAllProdutos() {
		return produtoService.todosProdutos();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ProdutoDTO createProduto(@RequestBody ProdutoForm produto) throws ObjetoJaExisteException {
		return produtoService.criarProduto(produto);
	}

	@GetMapping("/{id}")
	public ProdutoDTO GetProdutoById(@PathVariable Long id) {
		return produtoService.buscarPorId(id);
	}

	@PutMapping("/{id}")
	public ProdutoDTO updateProduto(@PathVariable Long id, @RequestBody ProdutoForm produtoForm) {
		return produtoService.atualizarProduto(id, produtoForm);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteProduto(@PathVariable Long id) {
		produtoService.deletarPorId(id);
	}

	@GetMapping("/teste/{id}")
	@ResponseStatus(HttpStatus.OK)
	public  List<ProdutoDTO> teste(@PathVariable Long id) {
		return produtoService.buscarPorCategoria(id);
	}

}
