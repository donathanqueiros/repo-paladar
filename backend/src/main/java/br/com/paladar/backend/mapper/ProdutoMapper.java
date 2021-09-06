package br.com.paladar.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import br.com.paladar.backend.controller.dto.produto.ProdutoDTO;
import br.com.paladar.backend.controller.form.produto.ProdutoForm;
import br.com.paladar.backend.model.produto.Produto;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

	ProdutoMapper INSTANCE = Mappers.getMapper(ProdutoMapper.class);

	ProdutoDTO toDTO(Produto produto);

	Produto toModel(ProdutoDTO produto);

	@Mapping(target = "id", defaultExpression = "")
	Produto toModel(ProdutoForm produtoForm);

}
