package br.com.paladar.backend.services;

import org.springframework.stereotype.Component;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.pedido.Pedido;

public class DisparoEmail {

	public void enviar(Pedido pedido) {
		Cliente cliente = pedido.getCliente();
		System.out.println("Envdiando Email cliente " + cliente.getNome());

	}

}
