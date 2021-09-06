package br.com.paladar.backend.services.pedido;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.controller.dto.pedido.PedidoDTO;
import br.com.paladar.backend.controller.form.pedido.PedidoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.exception.PedidoImpossivelDespacharException;
import br.com.paladar.backend.exception.PedidoJaCanceladoException;
import br.com.paladar.backend.mapper.PedidoMapper;
import br.com.paladar.backend.model.pedido.Pedido;
import br.com.paladar.backend.model.pedido.StatusPedido;
import br.com.paladar.backend.model.produto.Produto;
import br.com.paladar.backend.repository.pedido.PedidoRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PedidoService {

	private final PedidoRepository pedidoRepository;

	private final PedidoMapper pedidoMapper = PedidoMapper.INSTANCE;

	public List<PedidoDTO> todosPedidos() {
		List<Pedido> pedidos = pedidoRepository.findAll();
		return pedidos.stream().map(pedidoMapper::toDTO).collect(Collectors.toList());
	}

	public List<PedidoDTO> todosPedidosAndamento() {
		List<Pedido> pedidos = pedidoRepository.findAllAndamento(Sort.by(Sort.Direction.DESC, "dataInicioPedido"));
		return pedidos.stream().map(pedidoMapper::toDTO).collect(Collectors.toList());
	}

	public List<PedidoDTO> pedidosPendente() {
		List<Pedido> pedidos = pedidoRepository.findByStatus(StatusPedido.PENDENTE);
		return pedidos.stream().map(pedidoMapper::toDTO).collect(Collectors.toList());
	}

	public List<PedidoDTO> pedidosPreparando() {
		List<Pedido> pedidos = pedidoRepository.findByStatus(StatusPedido.PREPARANDO);
		return pedidos.stream().map(pedidoMapper::toDTO).collect(Collectors.toList());
	}

	public PedidoDTO criarPedido(PedidoForm pedidoForm) throws ObjetoJaExisteException {
		Pedido pedido = pedidoMapper.toModel(pedidoForm);
		Pedido pedidoSalvo = pedidoRepository.saveAndFlush(pedido);
		pedidoRepository.refresh(pedidoSalvo);
		BigDecimal valorTotal = calcularValorTotal(pedido);
		pedidoSalvo.setTotal(valorTotal);
		pedidoRepository.flush();
		return pedidoMapper.toDTO(pedidoSalvo);
	}

	public void despachar(Long id) throws ObjetoNaoEncotradoException, PedidoImpossivelDespacharException {
		Pedido pedido = verificaSeExiste(id);
		pedido.despachar();
		pedidoRepository.flush();
	}

	public void cancelar(Long id) throws ObjetoNaoEncotradoException, PedidoJaCanceladoException {
		Pedido pedido = verificaSeExiste(id);
		pedido.cancelar();
		pedidoRepository.flush();
	}

	private BigDecimal calcularValorTotal(Pedido pedido) {
		List<Produto> produtos = pedido.getProdutos();
		return produtos.stream().map(produto -> produto.getPreco()).reduce(BigDecimal.ZERO, BigDecimal::add);
	}

	public PedidoDTO buscarPorId(Long id) throws ObjetoNaoEncotradoException {
		Pedido pedido = verificaSeExiste(id);
		return pedidoMapper.toDTO(pedido);
	}

	private Pedido verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {

		return pedidoRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(Pedido.class.getName(), "id", id.toString()));
	}

}
