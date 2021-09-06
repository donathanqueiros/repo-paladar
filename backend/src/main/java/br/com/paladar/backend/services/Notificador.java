package br.com.paladar.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.pedido.Pedido;

public class Notificador {
	@Autowired
	DisparoEmail disparador;

	public void notificar(Pedido pedido) {
		disparador.enviar(pedido);
		
	}

}
