package br.com.paladar.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import br.com.paladar.backend.controller.dto.pedido.TipoPedidoDTO;
import br.com.paladar.backend.controller.form.pedido.TipoPedidoForm;
import br.com.paladar.backend.model.pedido.TipoPedido;

@Mapper(componentModel = "spring")
public interface TipoPedidoMapper {

	TipoPedidoMapper INSTANCE = Mappers.getMapper(TipoPedidoMapper.class);

	TipoPedido toModel(TipoPedidoDTO tipoPedidoDTO);

	TipoPedido toModel(TipoPedidoForm tipoPedidoForm);

	TipoPedidoDTO toDTO(TipoPedido tipoPedido);

}
