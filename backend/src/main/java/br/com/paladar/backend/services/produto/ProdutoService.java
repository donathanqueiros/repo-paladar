package br.com.paladar.backend.services.produto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.controller.dto.produto.ProdutoDTO;
import br.com.paladar.backend.controller.form.produto.ProdutoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.mapper.ProdutoMapper;
import br.com.paladar.backend.model.produto.Produto;
import br.com.paladar.backend.repository.produto.ProdutoRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProdutoService {

	private final ProdutoRepository produtoRepository;

	private final ProdutoMapper produtoMapper = ProdutoMapper.INSTANCE;

	public List<ProdutoDTO> todosProdutos() {
		List<Produto> produtos = produtoRepository.findAll();
		return produtos.stream().map(produtoMapper::toDTO).collect(Collectors.toList());
	}

	public ProdutoDTO criarProduto(ProdutoForm produtoForm) throws ObjetoJaExisteException {
		verificaJaSeExiste(produtoForm.getNome());
		Produto produto = produtoMapper.toModel(produtoForm);
		Produto produtoSalvo = produtoRepository.save(produto);
		return produtoMapper.toDTO(produtoSalvo);
	}

	public ProdutoDTO buscarPorId(Long id) throws ObjetoNaoEncotradoException {
		Produto produto = produtoRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(Produto.class.getName(), "id", id.toString()));
		return produtoMapper.toDTO(produto);
	}

	public ProdutoDTO atualizarProduto(Long id, ProdutoForm produto) throws ObjetoNaoEncotradoException {
		Produto ProdutoEncontrado = verificaSeExiste(id);
		Produto ProdutoAtualizado = produtoRepository.save(ProdutoEncontrado);

		return produtoMapper.toDTO(ProdutoAtualizado);
	}

	public void deletarPorId(Long id) throws ObjetoNaoEncotradoException {
		verificaSeExiste(id);
		produtoRepository.deleteById(id);
	}

	private Produto verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {

		return produtoRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(Produto.class.getName(), "id", id.toString()));
	}

	private void verificaJaSeExiste(String nome) throws ObjetoJaExisteException {
		Optional<Produto> produto = produtoRepository.findByNome(nome);
		if (produto.isPresent()) {
			throw new ObjetoJaExisteException(Produto.class.getName(), "nome", nome);
		}
	}

}
