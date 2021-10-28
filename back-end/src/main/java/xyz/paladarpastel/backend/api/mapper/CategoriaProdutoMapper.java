package xyz.paladarpastel.backend.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import xyz.paladarpastel.backend.api.model.dto.produto.CategoriaProdutoDTO;
import xyz.paladarpastel.backend.api.model.form.produto.CategoriaProdutoForm;
import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;

@Mapper(componentModel = "spring")

public interface CategoriaProdutoMapper {

	CategoriaProdutoMapper INSTANCE = Mappers.getMapper(CategoriaProdutoMapper.class);

	CategoriaProduto toModel(CategoriaProdutoDTO categoriaProdutoDTO);

	CategoriaProduto toModel(CategoriaProdutoForm categoriaProdutoForm);

	CategoriaProdutoDTO toDTO(CategoriaProduto categoriaProdutoForm);

}
