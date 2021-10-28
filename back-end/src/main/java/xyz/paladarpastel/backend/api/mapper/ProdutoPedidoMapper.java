package xyz.paladarpastel.backend.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import xyz.paladarpastel.backend.api.model.dto.pedido.ProdutoPedidoDTO;
import xyz.paladarpastel.backend.domain.model.pedido.ProdutoPedido;
import xyz.paladarpastel.backend.domain.model.produto.Produto;

@Mapper(componentModel = "spring")
public interface ProdutoPedidoMapper {

	ProdutoPedidoMapper INSTANCE = Mappers.getMapper(ProdutoPedidoMapper.class);

	ProdutoPedidoDTO toDTO(ProdutoPedido produtoPedido);

	ProdutoPedido toModel(ProdutoPedidoDTO produtoPedido);

	@Mappings({ @Mapping(target = "categoriaProduto", source = "categoriaProduto.nome") })
	ProdutoPedido toModel(Produto produto);

}
