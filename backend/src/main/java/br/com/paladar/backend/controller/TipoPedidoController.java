package br.com.paladar.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.paladar.backend.controller.dto.pedido.FormaPagamentoDTO;
import br.com.paladar.backend.controller.dto.pedido.TipoPedidoDTO;
import br.com.paladar.backend.controller.form.pedido.TipoPedidoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.services.TipoPedidoService;

@RestController
@RequestMapping("/api/formapedido")
public class TipoPedidoController {

	@Autowired
	private TipoPedidoService tipoPedidoService;

	@GetMapping
	public List<TipoPedidoDTO> getAllFormaPedido() {
		return tipoPedidoService.todosTipoPedido();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public TipoPedidoDTO createTipoPedido(@RequestBody TipoPedidoForm formaPedidoForm) throws ObjetoJaExisteException {
		return tipoPedidoService.criarTipoPedido(formaPedidoForm);
	}

	@GetMapping("/{id}")
	public TipoPedidoDTO GetTipoPedidoById(@PathVariable Long id) {
		return tipoPedidoService.buscarPorId(id);
	}

	@PutMapping("/{id}")
	public TipoPedidoDTO updateTipoPedido(@PathVariable Long id, @RequestBody TipoPedidoForm formaPedidoForm) {
		return tipoPedidoService.atualizarTipoPedido(id, formaPedidoForm);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTipoPedido(@PathVariable Long id) {
		tipoPedidoService.deletarPorId(id);

	}

}
