package xyz.paladarpastel.backend.domain.services.produto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import xyz.paladarpastel.backend.api.exception.EntidadeJaExisteException;
import xyz.paladarpastel.backend.api.exception.EntidadeNaoEncotradoException;
import xyz.paladarpastel.backend.api.exception.ImageNaoEncontrada;
import xyz.paladarpastel.backend.api.model.dto.pedido.QuantidadeVendidaDTO;
import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.model.produto.ImgProduto;
import xyz.paladarpastel.backend.domain.model.produto.Produto;
import xyz.paladarpastel.backend.domain.repository.produto.ImgProdutoRepository;
import xyz.paladarpastel.backend.domain.repository.produto.ProdutoRepository;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProdutoService {

	private ProdutoRepository produtoRepository;

	private CategoriaProdutoService categoriaProdutoService;

	private ImgProdutoRepository imgProdutoRepository;

	public List<Produto> todosProdutos() {
		return produtoRepository.buscarTodos();
	}

	public Produto criarProduto(Produto produto) throws EntidadeJaExisteException {
		verificaJaSeExiste(produto.getNome());

		CategoriaProduto categoriaProduto = categoriaProdutoService
				.verificaSeExiste(produto.getCategoriaProduto().getId());

		ImgProduto imgProduto = imgProdutoRepository.findById(produto.getImgProduto().getId())
				.orElseThrow(() -> new ImageNaoEncontrada(
						String.format("Image com o id: %d não encontrada", produto.getImgProduto().getId())));

		produto.setCategoriaProduto(categoriaProduto);
		produto.setImgProduto(imgProduto);

		return produtoRepository.save(produto);
	}


	public Produto atualizarProduto(Long id, Produto produto) {

		verificaSeExiste(id);
		categoriaProdutoService.verificaSeExiste(produto.getCategoriaProduto().getId());

		imgProdutoRepository.findById(produto.getImgProduto().getId()).orElseThrow(() -> new ImageNaoEncontrada(
				String.format("Image com o id: %d não encontrada", produto.getImgProduto().getId())));

		produto.setId(id);
		return produtoRepository.save(produto);
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
	


	public Produto buscarPorId(Long id) throws EntidadeNaoEncotradoException {
		return verificaSeExiste(id);
	}




	public List<Produto> buscarPorCategoria(Long id) {
		return produtoRepository.findByCategoriaProduto(CategoriaProduto.builder().id(id).build());
	}
	public void deletarPorId(Long id) throws EntidadeNaoEncotradoException {
		verificaSeExiste(id);
		produtoRepository.deleteById(id);
	}

	private Produto verificaSeExiste(Long id) throws EntidadeNaoEncotradoException {
		return produtoRepository.findById(id).orElseThrow(
				() -> new EntidadeNaoEncotradoException(String.format("Produto com o id %d não existe", id)));
	}

	private void verificaJaSeExiste(String nome) throws EntidadeJaExisteException {
		Optional<Produto> produto = produtoRepository.findByNome(nome);
		if (produto.isPresent()) {
			throw new EntidadeJaExisteException(String.format("Produto com o nome %s já existe", nome));
		}
	}

	public List<QuantidadeVendidaDTO> maisVendidos() {

		List<QuantidadeVendidaDTO> quantidadeVendidas = new ArrayList<>();
		// List<Object[]> valores = produtoPedidoRepository.maisVendidos();
		// valores.forEach(valor -> {
		// ProdutoPedidoDTO produto = Long.parseLong(String.valueOf(valor[0])));
		//
		// QuantidadeVendidaDTO dto = QuantidadeVendidaDTO.builder().produto(produto)
		// .quantidadeVendida(Long.parseLong(String.valueOf(valor[1]))).build();
		//
		// quantidadeVendidaDTOs.add(dto);
		//
		// });
		return quantidadeVendidas;
	}



}
