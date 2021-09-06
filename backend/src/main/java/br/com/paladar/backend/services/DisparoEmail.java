package br.com.paladar.backend.service;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.pedido.Pedido;

public class DisparoEmail {

	public void enviar(Cliente cliente, Pedido pedido) {
		System.out.println("Envdiando Email cliente " + cliente.getNome());

	}

}
