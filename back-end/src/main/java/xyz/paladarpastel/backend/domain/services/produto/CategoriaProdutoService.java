package xyz.paladarpastel.backend.domain.services.produto;

import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import xyz.paladarpastel.backend.api.exception.CategoriaProdutoNaoEncotrado;
import xyz.paladarpastel.backend.api.exception.EntidadeJaExisteException;
import xyz.paladarpastel.backend.api.exception.EntidadeNaoEncotradoException;
import xyz.paladarpastel.backend.api.exception.EntidadePossuiRelacionamentoException;
import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.model.produto.Produto;
import xyz.paladarpastel.backend.domain.repository.produto.CategoriaProdutoRepository;

@Service
@AllArgsConstructor(onConstructor = @__(@Lazy))
public class CategoriaProdutoService {

	@Lazy
	private final ProdutoService produtoService;

	@Lazy
	private final CategoriaProdutoRepository categoriaProdutoRepository;

	public List<CategoriaProduto> todosCategoriaProdutos() {
		return categoriaProdutoRepository.findAll();
	}

	public CategoriaProduto criarCategoriaProduto(CategoriaProduto categoriaProduto) throws EntidadeJaExisteException {
		verificaSeJaExiste(categoriaProduto.getNome());
		return categoriaProdutoRepository.save(categoriaProduto);
	}

	public CategoriaProduto buscarPorId(Long id) throws EntidadeNaoEncotradoException {
		return verificaSeExiste(id);
	}

	public CategoriaProduto atualizarCategoriaProduto(Long id, CategoriaProduto categoriaProduto)
			throws EntidadeNaoEncotradoException {
		verificaSeExiste(id);
		categoriaProduto.setId(id);
		return categoriaProdutoRepository.save(categoriaProduto);

	}

	public void deletarPorId(Long id) throws EntidadeNaoEncotradoException {
		CategoriaProduto categoria = verificaSeExiste(id);
		verificaSePossuiDependentes(categoria);
		categoriaProdutoRepository.deleteById(id);
	}

	private void verificaSePossuiDependentes(CategoriaProduto categoria) {
		List<Produto> todosProdutos = produtoService.buscarPorCategoria(categoria.getId());
		if (!todosProdutos.isEmpty()) {
			throw new EntidadePossuiRelacionamentoException(
					"Impossivel Excluir Essa Categoria pois ela possui Produtos vinculados");
		}
	}

	public CategoriaProduto verificaSeExiste(Long id) throws EntidadeNaoEncotradoException {
		return categoriaProdutoRepository.findById(id).orElseThrow(() -> new CategoriaProdutoNaoEncotrado(
				String.format("Categoria de Produto com o id %d não encontrado", id)));
	}

	private void verificaSeJaExiste(String nome) throws EntidadeJaExisteException {
		Optional<CategoriaProduto> categoriaProduto = categoriaProdutoRepository.findByNome(nome);
		if (categoriaProduto.isPresent()) {
			throw new EntidadeJaExisteException(String.format("Categoria de Produto com o nome %s já existe", nome));
		}
	}

}
