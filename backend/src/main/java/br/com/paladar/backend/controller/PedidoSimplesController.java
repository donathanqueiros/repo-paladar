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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.paladar.backend.controller.dto.PedidoSimplesDTO;
import br.com.paladar.backend.controller.dto.pedido.PedidoDTO;
import br.com.paladar.backend.controller.form.pedido.PedidoSimplesForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.exception.PedidoImpossivelDespacharException;
import br.com.paladar.backend.exception.PedidoJaCanceladoException;
import br.com.paladar.backend.services.pedido.PedidoSimplesService;

@RestController
@RequestMapping("/api/pedidossimples")
public class PedidoSimplesController {

	@Autowired
	private PedidoSimplesService pedidoSimplesService;

	@GetMapping
	public List<PedidoSimplesDTO> getAllProdutos() {
		return pedidoSimplesService.todosPedidos();
	}

	@GetMapping("/andamento")
	public List<PedidoSimplesDTO> getProdutosAndamento() {
		return pedidoSimplesService.todosPedidosAndamento();
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
		pedidoSimplesService.despachar(id);
	}

	@PostMapping("{id}/cancelar")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void cancelar(@PathVariable Long id) throws ObjetoNaoEncotradoException, PedidoJaCanceladoException {
		pedidoSimplesService.cancelar(id);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(method = RequestMethod.POST, produces = "application/json")
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public PedidoSimplesDTO createPedido(@RequestBody @Valid PedidoSimplesForm pedidoSimplesForm)
			throws ObjetoJaExisteException {

		return pedidoSimplesService.criarPedido(pedidoSimplesForm);
	}

	@GetMapping("/{id}")
	public PedidoDTO GetProdutoById(@PathVariable Long id) {
		return pedidoSimplesService.buscarPorId(id);
	}

}
