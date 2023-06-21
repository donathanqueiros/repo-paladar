package xyz.paladarpastel.backend.domain.services.pedido;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import xyz.paladarpastel.backend.api.exception.EntidadeNaoEncotradoException;
import xyz.paladarpastel.backend.api.exception.ProdutoInativoException;
import xyz.paladarpastel.backend.api.mapper.ProdutoMapper;
import xyz.paladarpastel.backend.domain.exception.PedidoImpossivelDespacharException;
import xyz.paladarpastel.backend.domain.exception.PedidoJaCanceladoException;
import xyz.paladarpastel.backend.domain.model.pedido.Pedido;
import xyz.paladarpastel.backend.domain.model.pedido.ProdutoPedido;
import xyz.paladarpastel.backend.domain.model.produto.Produto;
import xyz.paladarpastel.backend.domain.repository.pedido.FormaPagamentoRository;
import xyz.paladarpastel.backend.domain.repository.pedido.PedidoRepository;
import xyz.paladarpastel.backend.domain.repository.produto.ProdutoRepository;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PedidoService {

	private ProdutoMapper produtoMapper = ProdutoMapper.INSTANCE;
	private PedidoRepository pedidoRepository;
	private ProdutoRepository produtoRepository;
	private FormaPagamentoRository formaPagamentoRepository;
	private NotificacaoService notificacaoService;

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

		var formaPagamento = formaPagamentoRepository.findById(
				pedido.getFormaPagamento().getId()).orElseThrow(
						() -> new EntidadeNaoEncotradoException(
								"Forma de pagamento não encontrada com o id: "
										+ pedido.getFormaPagamento().getId()));

		pedido.setFormaPagamento(formaPagamento);

		Set<Long> ids = produtoPedidos.stream().map(ProdutoPedido::getId).collect(Collectors.toSet());

		for (Long id : ids) {

			Produto prod = produtoRepository.findById(id).orElseThrow(
					() -> new EntidadeNaoEncotradoException(String.format("Não existe um produto com id: %d", id)));

			if (!prod.getAtivo()) {
				throw new ProdutoInativoException(String.format("Produto com o id %d esta inativo ", id));
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
		System.out.println("passou aqui3");
		try {
			notificacaoService.notificarPedidoConfirmado(pedidoSalvo);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			// e.printStackTrace();
		}

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

	private Pedido verificaSeExiste(Long id) throws EntidadeNaoEncotradoException {
		return pedidoRepository.findById(id).orElseThrow(
				() -> new EntidadeNaoEncotradoException(String.format("Pedido com o id %d não existe", id)));
	}

}
