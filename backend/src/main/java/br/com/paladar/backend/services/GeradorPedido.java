package br.com.paladar.backend.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.pedido.Pedido;
import br.com.paladar.backend.model.produto.Produto;
import br.com.paladar.backend.repository.pedido.PedidoRepository;

@Service
@Transactional
public class GeradorPedido {

	@Autowired
	PedidoRepository pedidoRepository;
	@Autowired
	Notificador notificador;

	@Transactional(rollbackFor = { SQLException.class })
	public void gerarPedido(Cliente cliente, List<Produto> listaProdutos, String obs) {
		Pedido pedido = pedidoRepository.save(new Pedido(cliente, listaProdutos, obs));

		notificador.notificar(cliente, pedido);
	}

}
