package br.com.paladar.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.controller.dto.pedido.FormaPagamentoDTO;
import br.com.paladar.backend.controller.form.pedido.FormaPagamentoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.mapper.FormaPagamentoMapper;
import br.com.paladar.backend.model.pedido.FormaPagamento;
import br.com.paladar.backend.repository.pedido.FormaPagamentoRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class FormaPagamentoService {

	private final FormaPagamentoRepository formaPagamentoRepository;

	private final FormaPagamentoMapper formaPagamentoMapper;

	public List<FormaPagamentoDTO> todosFormaPagamentos() {
		List<FormaPagamento> tipoPagamentos = formaPagamentoRepository.findAll();
		return tipoPagamentos.stream().map(formaPagamentoMapper::toDTO).collect(Collectors.toList());
	}

	public FormaPagamentoDTO criarTipoPagamento(FormaPagamentoForm formaPagamentoForm) throws ObjetoJaExisteException {
		verificaJaSeExiste(formaPagamentoForm.getNome());
		FormaPagamento formaPagamento = formaPagamentoMapper.toModel(formaPagamentoForm);
		FormaPagamento tipoPagamentoSalvo = formaPagamentoRepository.save(formaPagamento);
		return formaPagamentoMapper.toDTO(tipoPagamentoSalvo);
	}

	public FormaPagamentoDTO buscarPorId(Long id) throws ObjetoNaoEncotradoException {
		FormaPagamento tipoPagamento = verificaSeExiste(id);
		return formaPagamentoMapper.toDTO(tipoPagamento);
	}

	public FormaPagamentoDTO atualizarTipoPagamento(Long id, FormaPagamentoForm tipoPagamentoForm)
			throws ObjetoNaoEncotradoException {
		FormaPagamento TipoPagamentoEncontrado = verificaSeExiste(id);
		FormaPagamento TipoPagamentoAtualizado = formaPagamentoRepository.save(TipoPagamentoEncontrado);

		return formaPagamentoMapper.toDTO(TipoPagamentoAtualizado);
	}

	public void deletarPorId(Long id) throws ObjetoNaoEncotradoException {
		verificaSeExiste(id);
		formaPagamentoRepository.deleteById(id);
	}

	private FormaPagamento verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {
		return formaPagamentoRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException("Forma Pagamento", "id", id.toString()));
	}

	private void verificaJaSeExiste(String nome) throws ObjetoJaExisteException {
		Optional<FormaPagamento> tipoPagamento = formaPagamentoRepository.findByNome(nome);
		if (tipoPagamento.isPresent()) {
			throw new ObjetoJaExisteException(FormaPagamentoService.class.getName(), "nome", nome);
		}
	}

}
