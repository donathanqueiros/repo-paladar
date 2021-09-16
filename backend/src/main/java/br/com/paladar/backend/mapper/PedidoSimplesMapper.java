package br.com.paladar.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import br.com.paladar.backend.controller.dto.PedidoSimplesDTO;
import br.com.paladar.backend.controller.form.pedido.PedidoSimplesForm;
import br.com.paladar.backend.model.pedido.PedidoSimples;
import br.com.paladar.backend.model.produto.Produto;

@Mapper(componentModel = "spring")

public interface PedidoSimplesMapper {

	PedidoSimplesMapper INSTANCE = Mappers.getMapper(PedidoSimplesMapper.class);

//	PedidoSimples toModel(PedidoDTO pedidoDTO);

	@Mappings({ @Mapping(target = "cliente.nome", source = "pedidoSimplesForm.nome"),
			@Mapping(target = "cliente.email", source = "pedidoSimplesForm.email"),
			@Mapping(target = "cliente.telefone", source = "pedidoSimplesForm.telefone"),
			@Mapping(target = "cliente.endereco", source = "pedidoSimplesForm.endereco"),
			@Mapping(target = "produtos", source = "pedidoSimplesForm.carrinho"),
			@Mapping(target = "entrega", source = "pedidoSimplesForm.frete") })

	PedidoSimples toModel(PedidoSimplesForm pedidoSimplesForm);

	PedidoSimplesDTO toDTO(PedidoSimples pedido);

//
//	@Named("idToModel")
	Produto idToModel(Long id);
//
//	@IterableMapping(qualifiedByName = "idToModel")
//	@Named("produtosMapped")
//	List<Produto> map(List<Long> produtosId);
//
//	default Produto map(Long carrinhoId) {
//
//		Produto produto = Produto.builder().id(carrinhoId).build();
//
//		return produto;
//	}

}
