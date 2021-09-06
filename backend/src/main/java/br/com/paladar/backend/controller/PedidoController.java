package br.com.paladar.backend.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.paladar.backend.controller.dto.pedido.PedidoDTO;
import br.com.paladar.backend.controller.form.pedido.PedidoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.exception.PedidoImpossivelDespacharException;
import br.com.paladar.backend.exception.PedidoJaCanceladoException;
import br.com.paladar.backend.services.pedido.PedidoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

	@Autowired
	private PedidoService pedidoService;

	@GetMapping
	public List<PedidoDTO> getAllProdutos() {
		return pedidoService.todosPedidos();
	}

	@GetMapping("/andamento")
	public List<PedidoDTO> getProdutosAndamento() {
		return pedidoService.todosPedidosAndamento();
	}
//	@GetMapping("/pendente")
//	public List<PedidoDTO> getProdutosPendente() {
//		return pedidoService.pedidosPendente();
//	}
//
//	@GetMapping("/preparando")
//	public List<PedidoDTO> getProdutosPreparando() {
//		return pedidoService.pedidosPreparando();
//	}

	@PostMapping("{id}/despachar")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void despachar(@PathVariable Long id)
			throws ObjetoJaExisteException, ObjetoNaoEncotradoException, PedidoImpossivelDespacharException {
		pedidoService.despachar(id);
	}

	@PostMapping("{id}/cancelar")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void cancelar(@PathVariable Long id) throws ObjetoNaoEncotradoException, PedidoJaCanceladoException {
		pedidoService.cancelar(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public PedidoDTO createPedido(@RequestBody @Valid PedidoForm pedidoForm) throws ObjetoJaExisteException {
		return pedidoService.criarPedido(pedidoForm);
	}

	@GetMapping("/{id}")
	public PedidoDTO GetProdutoById(@PathVariable Long id) {
		return pedidoService.buscarPorId(id);
	}

}
