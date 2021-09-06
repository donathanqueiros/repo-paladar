package br.com.paladar.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import br.com.paladar.backend.controller.dto.cliente.ClienteDTO;
import br.com.paladar.backend.controller.dto.pedido.PedidoDTO;
import br.com.paladar.backend.controller.dto.produto.ProdutoDTO;
import br.com.paladar.backend.controller.form.cliente.ClienteForm;
import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.pedido.Pedido;
import br.com.paladar.backend.model.produto.Produto;

@Mapper(componentModel = "spring")

public interface ClienteMapper {

	ClienteMapper INSTANCE = Mappers.getMapper(ClienteMapper.class);

	Cliente toModel(ClienteDTO clienteDTO);

	Cliente toModel(ClienteForm clienteForm);

	ClienteDTO toDTO(Cliente cliente);

	PedidoDTO toDTO(Pedido pedido);

	Pedido toModel(PedidoDTO pedidoDTO);

	ProdutoDTO toDTO(Produto produto);

	Produto toModel(ProdutoDTO produto);

}
