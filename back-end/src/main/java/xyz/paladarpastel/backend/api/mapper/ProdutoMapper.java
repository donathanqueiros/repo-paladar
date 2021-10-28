package xyz.paladarpastel.backend.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import xyz.paladarpastel.backend.api.model.dto.produto.ProdutoDTO;
import xyz.paladarpastel.backend.api.model.form.produto.ProdutoForm;
import xyz.paladarpastel.backend.domain.model.pedido.ProdutoPedido;
import xyz.paladarpastel.backend.domain.model.produto.Produto;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {
	ProdutoMapper INSTANCE = Mappers.getMapper(ProdutoMapper.class);

	ProdutoDTO toDTO(Produto produto);

	Produto toModel(ProdutoDTO produto);

	Produto toModel(ProdutoForm produtoForm);

	@Mappings({ @Mapping(target = "categoriaProduto", source = "categoriaProduto.nome") })
	ProdutoPedido toModel(Produto produto);
}
