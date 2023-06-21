package xyz.paladarpastel.backend.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import xyz.paladarpastel.backend.api.exception.EntidadeJaExisteException;
import xyz.paladarpastel.backend.api.exception.EntidadeNaoEncotradoException;
import xyz.paladarpastel.backend.api.mapper.PedidoMapper;
import xyz.paladarpastel.backend.api.model.dto.pedido.PedidoDTO;
import xyz.paladarpastel.backend.api.model.form.pedido.PedidoForm;
import xyz.paladarpastel.backend.domain.exception.NegocioException;
import xyz.paladarpastel.backend.domain.exception.PedidoImpossivelDespacharException;
import xyz.paladarpastel.backend.domain.exception.PedidoJaCanceladoException;
import xyz.paladarpastel.backend.domain.model.pedido.Pedido;
import xyz.paladarpastel.backend.domain.services.pedido.PedidoService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

	@Autowired
	private PedidoMapper pedidoMapper;

	@Autowired
	private PedidoService pedidoService;

	@GetMapping
	public List<PedidoDTO> getAllPedidoSimpless() {
		var pedidos = pedidoService.todosPedidos();
		return pedidos.stream().map(pedidoMapper::toDTO).collect(Collectors.toList());
	}

	@GetMapping("/andamento")
	public List<PedidoDTO> getPedidoSimplessAndamento() {
		var pedidos = pedidoService.todosPedidosAndamento();
		return pedidos.stream().map(pedidoMapper::toDTO).collect(Collectors.toList());
	}

	@GetMapping("/finalizado")
	public List<PedidoDTO> getPedidoSimplessFinalizados() {
		var pedidos = pedidoService.pedidosFinalizado();
		return pedidos.stream().map(pedidoMapper::toDTO).collect(Collectors.toList());
	}

	@PostMapping("{id}/despachar")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void despachar(@PathVariable Long id)
			throws EntidadeJaExisteException, EntidadeNaoEncotradoException, PedidoImpossivelDespacharException {
		pedidoService.despachar(id);
	}

	@DeleteMapping("{id}/cancelar")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void cancelar(@PathVariable Long id) throws EntidadeNaoEncotradoException, PedidoJaCanceladoException {
		pedidoService.cancelar(id);
	}

	@RequestMapping(method = RequestMethod.POST, produces = "application/json")
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public PedidoDTO createPedido(@RequestBody @Valid PedidoForm pedidoForm) throws EntidadeJaExisteException {
		Pedido pedidoRecebido = pedidoMapper.toModel(pedidoForm);

		System.out.println("passou aqui");

		try {
			Pedido pedidoRegistrado = pedidoService.criarPedido(pedidoRecebido);
			return pedidoMapper.toDTO(pedidoRegistrado);
		} catch (EntidadeNaoEncotradoException e) {
			throw new NegocioException(e.getMessage());
		}

	}

	@GetMapping("/{id}")
	public PedidoDTO getById(@PathVariable Long id) {
		var pedido = pedidoService.buscarPorId(id);
		return pedidoMapper.toDTO(pedido);
	}

}
