package xyz.paladarpastel.backend.domain.services.produto;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import xyz.paladarpastel.backend.api.exception.ObjetoJaExisteException;
import xyz.paladarpastel.backend.api.exception.ObjetoNaoEncotradoException;
import xyz.paladarpastel.backend.api.exception.ObjetoPossuiRelacionamentoException;
import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.model.produto.Produto;
import xyz.paladarpastel.backend.domain.repository.produto.CategoriaProdutoRepository;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CategoriaProdutoService {

	private final ProdutoService produtoService;

	private final CategoriaProdutoRepository categoriaProdutoRepository;


	public List<CategoriaProduto> todosCategoriaProdutos() {
		return categoriaProdutoRepository.findAll();
	}

	public CategoriaProduto criarCategoriaProduto(CategoriaProduto categoriaProduto) throws ObjetoJaExisteException {
		verificaSeJaExiste(categoriaProduto.getNome());
		return categoriaProdutoRepository.save(categoriaProduto);
	}

	public CategoriaProduto buscarPorId(Long id) throws ObjetoNaoEncotradoException {
		return verificaSeExiste(id);
	}

	public CategoriaProduto atualizarCategoriaProduto(Long id, CategoriaProduto categoriaProduto)
			throws ObjetoNaoEncotradoException {
		verificaSeExiste(id);
		categoriaProduto.setId(id);
		return categoriaProdutoRepository.save(categoriaProduto);

	}

	public void deletarPorId(Long id) throws ObjetoNaoEncotradoException {
		CategoriaProduto categoria = verificaSeExiste(id);
		verificaSePossuiDependentes(categoria);
		categoriaProdutoRepository.deleteById(id);
	}

	private void verificaSePossuiDependentes(CategoriaProduto categoria) {
		List<Produto> todosProdutos = produtoService.buscarPorCategoria(categoria.getId());
		if (!todosProdutos.isEmpty()) {
			throw new ObjetoPossuiRelacionamentoException(
					"Impossivel Excluir Essa Categoria pois ela possui Produtos vinculados");
		}
	}

	private CategoriaProduto verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {
		return categoriaProdutoRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException("Categoria de Produto", "id", id.toString()));
	}

	private void verificaSeJaExiste(String nome) throws ObjetoJaExisteException {
		Optional<CategoriaProduto> categoriaProduto = categoriaProdutoRepository.findByNome(nome);
		if (categoriaProduto.isPresent()) {
			throw new ObjetoJaExisteException("Categoria de Produto", "nome", nome);
		}
	}

}
