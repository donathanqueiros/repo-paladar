package br.com.paladar.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import br.com.paladar.backend.controller.dto.produto.ImgProdutoDTO;
import br.com.paladar.backend.model.produto.ImgProduto;

@Mapper(componentModel = "spring")
public interface ImgProdutoMapper {

	ImgProdutoMapper INSTANCE = Mappers.getMapper(ImgProdutoMapper.class);

	ImgProduto toModel(ImgProdutoDTO imgProdutoDTO);

	ImgProdutoDTO toDTO(ImgProduto imgProduto);

}
