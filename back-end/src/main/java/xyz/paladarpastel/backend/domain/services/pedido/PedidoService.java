package xyz.paladarpastel.backend.domain.services.pedido;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import xyz.paladarpastel.backend.api.exception.ObjetoNaoEncotradoException;
import xyz.paladarpastel.backend.api.exception.ProdutoInativoException;
import xyz.paladarpastel.backend.api.mapper.ProdutoMapper;
import xyz.paladarpastel.backend.domain.exception.PedidoImpossivelDespacharException;
import xyz.paladarpastel.backend.domain.exception.PedidoJaCanceladoException;
import xyz.paladarpastel.backend.domain.model.pedido.Pedido;
import xyz.paladarpastel.backend.domain.model.pedido.ProdutoPedido;
import xyz.paladarpastel.backend.domain.model.produto.Produto;
import xyz.paladarpastel.backend.domain.repository.pedido.PedidoRepository;
import xyz.paladarpastel.backend.domain.repository.produto.ProdutoRepository;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PedidoService {

	private ProdutoMapper produtoMapper = ProdutoMapper.INSTANCE;
	private PedidoRepository pedidoRepository;
	private ProdutoRepository produtoRepository;

	public List<Pedido> todosPedidos() {
		return pedidoRepository.findAll(Sort.by(Sort.Direction.ASC, "dataInicioPedido"));
	}

	public List<Pedido> pedidosFinalizado() {
		return pedidoRepository.findAllFinalizado(Sort.by(Sort.Direction.ASC, "dataInicioPedido"));
	}

	public List<Pedido> todosPedidosAndamento() {
		return pedidoRepository.findAllAndamento(Sort.by(Sort.Direction.ASC, "dataInicioPedido"));
	}

	@Transactional
	public Pedido criarPedido(Pedido pedido) {
		List<ProdutoPedido> produtoPedidos = pedido.getProdutos();

		List<ProdutoPedido> produtoPedidosNovo = new ArrayList<>();

		Set<Long> ids = produtoPedidos.stream().map(ProdutoPedido::getId).collect(Collectors.toSet());

		for (Long id : ids) {

			Produto prod = produtoRepository.getOne(id);
			if (!prod.getAtivo()) {
				throw new ProdutoInativoException("Produto", "id", id.toString());
			}

			ProdutoPedido produtoPedido = produtoMapper.toModel(prod);

			produtoPedido.setQuantidade(
					produtoPedidos.stream().filter((p) -> p.getId().equals(id)).collect(Collectors.toList()).size());
			produtoPedido.setId(null);
			produtoPedido.setPedido(pedido);
			produtoPedidosNovo.add(produtoPedido);
		}
		
		pedido.setProdutos(produtoPedidosNovo);

		Pedido pedidoSalvo = pedidoRepository.save(pedido);

		BigDecimal valorTotal = calcularValorTotal(pedidoSalvo);
		pedidoSalvo.setTotal(valorTotal);

		return pedidoSalvo;
	}

	private BigDecimal calcularValorTotal(Pedido pedido) {
		List<ProdutoPedido> produtos = pedido.getProdutos();
		BigDecimal precoProdutos = produtos.stream()
				.map(produto -> produto.getPreco().multiply(new BigDecimal(produto.getQuantidade())))
				.reduce(BigDecimal.ZERO, BigDecimal::add);
		BigDecimal frete = pedido.getEntrega() ? BigDecimal.valueOf(5) : BigDecimal.ZERO;

		return precoProdutos.add(frete);
	}

	public Pedido buscarPorId(Long id) {
		return verificaSeExiste(id);
	}

	public void despachar(Long id) throws PedidoImpossivelDespacharException {
		Pedido pedido = verificaSeExiste(id);
		pedido.despachar();
		pedidoRepository.save(pedido);
	}

	public void cancelar(Long id) throws PedidoJaCanceladoException {
		Pedido pedido = verificaSeExiste(id);
		pedido.cancelar();
		pedidoRepository.save(pedido);
	}

	private Pedido verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {
		return pedidoRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(Pedido.class.getName(), "id", id.toString()));
	}

}
