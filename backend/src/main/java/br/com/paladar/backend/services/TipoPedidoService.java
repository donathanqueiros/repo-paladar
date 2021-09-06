package br.com.paladar.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.controller.dto.pedido.TipoPedidoDTO;
import br.com.paladar.backend.controller.form.pedido.TipoPedidoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.mapper.TipoPedidoMapper;
import br.com.paladar.backend.model.pedido.TipoPedido;
import br.com.paladar.backend.repository.pedido.TipoPedidoRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TipoPedidoService {

	private final TipoPedidoRepository formaPedidoRepository;

	private final TipoPedidoMapper formaPedidoMapper;

	private final String NOME_CLASSE = "Forma do Pedido";

	public List<TipoPedidoDTO> todosTipoPedido() {
		List<TipoPedido> formaPedidos = formaPedidoRepository.findAll();
		return formaPedidos.stream().map(formaPedidoMapper::toDTO).collect(Collectors.toList());
	}

	public TipoPedidoDTO criarTipoPedido(TipoPedidoForm formaPedidoForm) throws ObjetoJaExisteException {
		verificaJaSeExiste(formaPedidoForm.getNome());
		TipoPedido formaPedido = formaPedidoMapper.toModel(formaPedidoForm);
		TipoPedido formaPedidoSalvo = formaPedidoRepository.save(formaPedido);
		return formaPedidoMapper.toDTO(formaPedidoSalvo);
	}

	public TipoPedidoDTO buscarPorId(Long id) throws ObjetoNaoEncotradoException {
		TipoPedido formaPedido = verificaSeExiste(id);
		return formaPedidoMapper.toDTO(formaPedido);
	}

	public TipoPedidoDTO atualizarTipoPedido(Long id, TipoPedidoForm formaPedidoForm)
			throws ObjetoNaoEncotradoException {
		TipoPedido FormaPedidoEncontrado = verificaSeExiste(id);
		TipoPedido FormaPedidoAtualizado = formaPedidoRepository.save(FormaPedidoEncontrado);

		return formaPedidoMapper.toDTO(FormaPedidoAtualizado);
	}

	public void deletarPorId(Long id) throws ObjetoNaoEncotradoException {
		verificaSeExiste(id);
		formaPedidoRepository.deleteById(id);
	}

	private TipoPedido verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {
		return formaPedidoRepository.findById(id)
				.orElseThrow(() -> new ObjetoNaoEncotradoException(NOME_CLASSE, "id", id.toString()));
	}

	private void verificaJaSeExiste(String nome) throws ObjetoJaExisteException {
		Optional<TipoPedido> formaPedido = formaPedidoRepository.findByNome(nome);
		if (formaPedido.isPresent()) {
			throw new ObjetoJaExisteException(NOME_CLASSE, "nome", nome);
		}
	}

}
