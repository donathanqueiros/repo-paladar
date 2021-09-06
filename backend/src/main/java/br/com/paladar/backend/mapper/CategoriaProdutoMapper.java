package br.com.paladar.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import br.com.paladar.backend.controller.dto.produto.CategoriaProdutoDTO;
import br.com.paladar.backend.controller.form.produto.CategoriaProdutoForm;
import br.com.paladar.backend.model.produto.CategoriaProduto;

@Mapper(componentModel = "spring")

public interface CategoriaProdutoMapper {

	CategoriaProdutoMapper INSTANCE = Mappers.getMapper(CategoriaProdutoMapper.class);

	CategoriaProduto toModel(CategoriaProdutoDTO categoriaProdutoDTO);

	CategoriaProduto toModel(CategoriaProdutoForm categoriaProdutoForm);

	CategoriaProdutoDTO toDTO(CategoriaProduto categoriaProdutoForm);

}
