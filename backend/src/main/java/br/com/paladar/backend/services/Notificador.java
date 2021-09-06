package br.com.paladar.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.pedido.Pedido;

@Service
public class Notificador {
	@Autowired
	DisparoEmail disparador;

	public void notificar(Cliente cliente, Pedido pedido) {
		disparador.enviar(cliente, pedido);
	}

}
