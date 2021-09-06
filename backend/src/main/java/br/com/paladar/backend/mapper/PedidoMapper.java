package br.com.paladar.backend.mapper;

import java.util.List;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import br.com.paladar.backend.controller.dto.pedido.PedidoDTO;
import br.com.paladar.backend.controller.form.pedido.PedidoForm;
import br.com.paladar.backend.model.pedido.Pedido;
import br.com.paladar.backend.model.produto.Produto;

@Mapper(componentModel = "spring")

public interface PedidoMapper {

	PedidoMapper INSTANCE = Mappers.getMapper(PedidoMapper.class);

	Pedido toModel(PedidoDTO pedidoDTO);

	@Mappings({ @Mapping(target = "cliente.id", source = "pedidoForm.clienteId"),
			@Mapping(target = "tipoPedido.id", source = "pedidoForm.tipoPedidoId"),
			@Mapping(target = "formaPagamento.id", source = "pedidoForm.formaPagamentoId"),
			@Mapping(target = "produtos",source  = "pedidoForm.produtosId")}
	)
		
	Pedido toModel(PedidoForm pedidoForm);

	PedidoDTO toDTO(Pedido pedido);

	@Named("idToModel")
	Produto idToModel(Long id);

	@IterableMapping(qualifiedByName = "idToModel")
	@Named("produtosMapped")
	List<Produto> map(List<Long> produtosId);

	default Produto map(Long produtoId) {

		Produto produto = Produto.builder().id(produtoId).build();

		return produto;
	}

}
