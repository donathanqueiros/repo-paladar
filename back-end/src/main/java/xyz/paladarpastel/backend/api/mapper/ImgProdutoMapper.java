package xyz.paladarpastel.backend.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import xyz.paladarpastel.backend.api.model.dto.produto.ImgProdutoDTO;
import xyz.paladarpastel.backend.domain.model.produto.ImgProduto;

@Mapper(componentModel = "spring")
public interface ImgProdutoMapper {

	ImgProdutoMapper INSTANCE = Mappers.getMapper(ImgProdutoMapper.class);

	ImgProduto toModel(ImgProdutoDTO imgProdutoDTO);

	ImgProdutoDTO toDTO(ImgProduto imgProduto);

}
