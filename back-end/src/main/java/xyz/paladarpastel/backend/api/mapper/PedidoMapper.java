package xyz.paladarpastel.backend.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import xyz.paladarpastel.backend.api.model.dto.pedido.PedidoDTO;
import xyz.paladarpastel.backend.api.model.form.pedido.PedidoForm;
import xyz.paladarpastel.backend.domain.model.pedido.Pedido;
import xyz.paladarpastel.backend.domain.model.pedido.ProdutoPedido;

@Mapper(componentModel = "spring")

public interface PedidoMapper {

	PedidoMapper INSTANCE = Mappers.getMapper(PedidoMapper.class);

	@Mappings({ @Mapping(target = "cliente.nome", source = "pedidoForm.nome"),
			@Mapping(target = "cliente.email", source = "pedidoForm.email"),
			@Mapping(target = "cliente.telefone", source = "pedidoForm.telefone"),
			@Mapping(target = "cliente.endereco", source = "pedidoForm.endereco"),
			@Mapping(target = "produtos", source = "pedidoForm.carrinho"),
			@Mapping(target = "entrega", source = "pedidoForm.frete") })
	Pedido toModel(PedidoForm pedidoForm);

	PedidoDTO toDTO(Pedido pedido);

	ProdutoPedido idToModel(Long id);

}
