package br.com.paladar.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import br.com.paladar.backend.controller.dto.pedido.FormaPagamentoDTO;
import br.com.paladar.backend.controller.form.pedido.FormaPagamentoForm;
import br.com.paladar.backend.model.pedido.FormaPagamento;

@Mapper(componentModel = "spring")
public interface FormaPagamentoMapper {

	FormaPagamentoMapper INSTANCE = Mappers.getMapper(FormaPagamentoMapper.class);

	FormaPagamento toModel(FormaPagamentoDTO tipoPagamentoDTO);

	FormaPagamento toModel(FormaPagamentoForm tipoPagamentoForm);

	FormaPagamentoDTO toDTO(FormaPagamento tipoPagamento);

}
