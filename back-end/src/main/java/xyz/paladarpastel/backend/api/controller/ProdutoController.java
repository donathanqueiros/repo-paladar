package xyz.paladarpastel.backend.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import xyz.paladarpastel.backend.api.exception.CategoriaProdutoNaoEncotrado;
import xyz.paladarpastel.backend.api.exception.EntidadeJaExisteException;
import xyz.paladarpastel.backend.api.exception.EntidadeNaoEncotradoException;
import xyz.paladarpastel.backend.api.exception.ImageNaoEncontrada;
import xyz.paladarpastel.backend.api.mapper.ProdutoMapper;
import xyz.paladarpastel.backend.api.model.dto.pedido.QuantidadeVendidaDTO;
import xyz.paladarpastel.backend.api.model.dto.produto.ProdutoDTO;
import xyz.paladarpastel.backend.api.model.form.produto.ProdutoForm;
import xyz.paladarpastel.backend.domain.exception.NegocioException;
import xyz.paladarpastel.backend.domain.services.produto.ProdutoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;

	private final ProdutoMapper produtoMapper = ProdutoMapper.INSTANCE;

	@GetMapping
	public List<ProdutoDTO> getAllProdutos() {
		var produtos = produtoService.todosProdutos();

		return produtos.stream().map(produtoMapper::toDTO).collect(Collectors.toList());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ProdutoDTO criarProduto(@RequestBody @Valid ProdutoForm produtoForm) throws EntidadeJaExisteException {
		var produto = produtoMapper.toModel(produtoForm);

		try {
			var produtoCriado = produtoService.criarProduto(produto);
			return produtoMapper.toDTO(produtoCriado);
		} catch (EntidadeNaoEncotradoException e) {
			throw new NegocioException(e.getMessage());
		} catch (EntidadeJaExisteException e) {
			throw new NegocioException(e.getMessage());
		}

	}

	@GetMapping("/{id}")
	public ProdutoDTO GetProdutoById(@PathVariable Long id) {
		var produtoEncontrado = produtoService.buscarPorId(id);
		return produtoMapper.toDTO(produtoEncontrado);
	}

	@PutMapping("/{id}")
	public ProdutoDTO updateProduto(@PathVariable Long id, @Valid @RequestBody ProdutoForm produtoForm) {
		var produto = produtoMapper.toModel(produtoForm);
		try {
			var produtoAtualizado = produtoService.atualizarProduto(id, produto);

			return produtoMapper.toDTO(produtoAtualizado);
		} catch (CategoriaProdutoNaoEncotrado e) {
			throw new NegocioException(e.getMessage());
		} catch (ImageNaoEncontrada e) {
			throw new NegocioException(e.getMessage());

		}

	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteProduto(@PathVariable Long id) {
		produtoService.deletarPorId(id);
	}

	@PatchMapping("/{id}/ativar")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void ativarProduto(@PathVariable Long id) {
		produtoService.ativarPorId(id);
	}

	@PatchMapping("/{id}/desativar")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void desativarProduto(@PathVariable Long id) {
		produtoService.desativarPorId(id);
	}

	@GetMapping("/maisvendidos")
	public List<QuantidadeVendidaDTO> getMaisVendidos() {
		return produtoService.maisVendidos();
	}

}
