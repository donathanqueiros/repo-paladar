package br.com.paladar.backend.services;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.pedido.Pedido;
import br.com.paladar.backend.model.produto.Produto;
import br.com.paladar.backend.repository.cliente.ClienteRepository;
import br.com.paladar.backend.repository.pedido.PedidoRepository;

@Transactional
public class GeradorPedido {

	@Autowired
	PedidoRepository pedidoRepository;
	ClienteRepository clienteRepository;
	@Autowired
	Notificador notificador;

//	@Transactional(rollbackFor = { SQLException.class })
//	public Pedido gerarPedido(Long idCliente, List<Produto> listaProdutos, String obs) {
//		Optional<Cliente> cliente = clienteRepository.findById(idCliente);
//		
//		Pedido pedido = pedidoRepository.save(new Pedido(cliente.get(), listaProdutos, obs));
//
//		notificador.notificar(pedido);
//
//		return pedido;
//	}

}
