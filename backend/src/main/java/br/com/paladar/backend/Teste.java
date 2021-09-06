package br.com.paladar.backend;

import java.util.ArrayList;
import java.util.List;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.produto.Produto;
import br.com.paladar.backend.service.GeradorPedido;

public class teste {

	public static void main(String[] args) {
		Cliente cliente = new Cliente("donathan@email.com", "1234", "donathan queiros", "14998387470");
		String obs = "observação";

		GeradorPedido gerador = new GeradorPedido();

		List<Produto> listaItens = new ArrayList<>();

		gerador.gerarPedido(cliente, listaItens, obs);

	}

}
