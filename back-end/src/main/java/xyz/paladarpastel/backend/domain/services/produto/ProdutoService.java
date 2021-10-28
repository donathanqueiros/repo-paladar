package xyz.paladarpastel.backend.domain.services.produto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import xyz.paladarpastel.backend.api.exception.ObjetoJaExisteException;
import xyz.paladarpastel.backend.api.exception.ObjetoNaoEncotradoException;
import xyz.paladarpastel.backend.api.model.dto.pedido.QuantidadeVendidaDTO;
import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.model.produto.Produto;
import xyz.paladarpastel.backend.domain.repository.produto.ProdutoRepository;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProdutoService {

	private final ProdutoRepository produtoRepository;

	public List<Produto> todosProdutos() {
		return produtoRepository.findAll();
	}

	public Produto criarProduto(Produto produto) throws ObjetoJaExisteException {
		verificaJaSeExiste(produto.getNome());
		return produtoRepository.save(produto);
	}

	public Produto buscarPorId(Long id) throws ObjetoNaoEncotradoException {
		return produtoRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(Produto.class.getName(), "id", id.toString()));
	}

	public List<Produto> buscarPorCategoria(Long id) throws ObjetoNaoEncotradoException {
		return produtoRepository.findByCategoriaProduto(CategoriaProduto.builder().id(id).build());
	}

	public Produto atualizarProduto(Long id, Produto produto) throws ObjetoNaoEncotradoException {
		verificaSeExiste(id);
		produto.setId(id);
		return produtoRepository.save(produto);
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

	public List<QuantidadeVendidaDTO> maisVendidos() {

		List<QuantidadeVendidaDTO> quantidadeVendidas = new ArrayList<>();
//		List<Object[]> valores = produtoPedidoRepository.maisVendidos();
//		valores.forEach(valor -> {
//			ProdutoPedidoDTO produto = Long.parseLong(String.valueOf(valor[0])));
//
//			QuantidadeVendidaDTO dto = QuantidadeVendidaDTO.builder().produto(produto)
//					.quantidadeVendida(Long.parseLong(String.valueOf(valor[1]))).build();
//
//			quantidadeVendidaDTOs.add(dto);
//
//		});
		return quantidadeVendidas;
	}

	public void ativarPorId(Long id) {
		Produto produto = verificaSeExiste(id);
		produto.ativar();
		produtoRepository.save(produto);
	}

	public void desativarPorId(Long id) {
		Produto produto = verificaSeExiste(id);
		produto.desativar();
		produtoRepository.save(produto);
	}

}
