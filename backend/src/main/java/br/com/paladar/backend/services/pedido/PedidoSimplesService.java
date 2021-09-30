package br.com.paladar.backend.services.pedido;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.controller.dto.PedidoSimplesDTO;
import br.com.paladar.backend.controller.form.pedido.PedidoSimplesForm;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.exception.PedidoImpossivelDespacharException;
import br.com.paladar.backend.exception.PedidoJaCanceladoException;
import br.com.paladar.backend.mapper.PedidoSimplesMapper;
import br.com.paladar.backend.model.cliente.ClienteSimples;
import br.com.paladar.backend.model.cliente.endereco.Endereco;
import br.com.paladar.backend.model.pedido.PedidoSimples;
import br.com.paladar.backend.model.produto.Produto;
import br.com.paladar.backend.repository.cliente.ClienteSimplesRepository;
import br.com.paladar.backend.repository.cliente.EnderecoRepository;
import br.com.paladar.backend.repository.pedido.PedidoSimplesRepository;
import br.com.paladar.backend.services.produto.ProdutoService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PedidoSimplesService {

	private PedidoSimplesMapper pedidoSimplesMapper = PedidoSimplesMapper.INSTANCE;

	private PedidoSimplesRepository pedidoSimplesRepository;

	private ClienteSimplesRepository clienteSimplesRepository;

	private ProdutoService produtoService;

	private EnderecoRepository enderecoRepository;

	public List<PedidoSimplesDTO> todosPedidos() {
		List<PedidoSimples> pedidos = pedidoSimplesRepository.findAll(Sort.by(Sort.Direction.ASC, "dataInicioPedido"));
		return pedidos.stream().map(pedidoSimplesMapper::toDTO).collect(Collectors.toList());
	}

	public List<PedidoSimplesDTO> pedidosFinalizado() {
		List<PedidoSimples> pedidos = pedidoSimplesRepository
				.findAllFinalizado(Sort.by(Sort.Direction.ASC, "dataInicioPedido"));
		return pedidos.stream().map(pedidoSimplesMapper::toDTO).collect(Collectors.toList());
	}

	public List<PedidoSimplesDTO> todosPedidosAndamento() {
		List<PedidoSimples> pedidos = pedidoSimplesRepository
				.findAllAndamento(Sort.by(Sort.Direction.ASC, "dataInicioPedido"));
		return pedidos.stream().map(pedidoSimplesMapper::toDTO).collect(Collectors.toList());
	}

	public PedidoSimplesDTO criarPedido(@Valid PedidoSimplesForm pedidoSimplesForm) {

		PedidoSimples pedidoSimples = pedidoSimplesMapper.toModel(pedidoSimplesForm);

		Endereco enderecoSalvo = enderecoRepository.save(pedidoSimples.getCliente().getEndereco());
		enderecoRepository.refresh(enderecoSalvo);
		pedidoSimples.getCliente().setEndereco(enderecoSalvo);

		ClienteSimples clienteSalvo = clienteSimplesRepository.saveAndFlush(pedidoSimples.getCliente());
		clienteSimplesRepository.refresh(clienteSalvo);

		pedidoSimples.setCliente(clienteSalvo);
		PedidoSimples pedidoSalvo = pedidoSimplesRepository.saveAndFlush(pedidoSimples);
		pedidoSimplesRepository.refresh(pedidoSalvo);

		BigDecimal valorTotal = calcularValorTotal(pedidoSalvo);
		pedidoSalvo.setTotal(valorTotal);
		pedidoSimplesRepository.flush();
		return pedidoSimplesMapper.toDTO(pedidoSalvo);
	}

	private BigDecimal calcularValorTotal(PedidoSimples pedido) {
		List<Produto> produtos = pedido.getProdutos();
		return produtos.stream().map(produto -> produto.getPreco()).reduce(BigDecimal.ZERO, BigDecimal::add);
	}

	public PedidoSimplesDTO buscarPorId(Long id) {
		PedidoSimples pedido = verificaSeExiste(id);
		return pedidoSimplesMapper.toDTO(pedido);
	}

	public void despachar(Long id) throws PedidoImpossivelDespacharException {

		PedidoSimples pedido = verificaSeExiste(id);
		pedido.despachar();
		pedidoSimplesRepository.flush();

	}

	public void cancelar(Long id) throws PedidoJaCanceladoException {
		PedidoSimples pedido = verificaSeExiste(id);
		pedido.cancelar();
		pedidoSimplesRepository.flush();

	}

	private PedidoSimples verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {

		return pedidoSimplesRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(PedidoSimples.class.getName(), "id", id.toString()));
	}



}
