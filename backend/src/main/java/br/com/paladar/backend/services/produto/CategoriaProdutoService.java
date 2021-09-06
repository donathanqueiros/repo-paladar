package br.com.paladar.backend.services.produto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.controller.dto.produto.CategoriaProdutoDTO;
import br.com.paladar.backend.controller.form.produto.CategoriaProdutoForm;
import br.com.paladar.backend.exception.ObjetoJaExisteException;
import br.com.paladar.backend.exception.ObjetoNaoEncotradoException;
import br.com.paladar.backend.mapper.CategoriaProdutoMapper;
import br.com.paladar.backend.model.produto.CategoriaProduto;
import br.com.paladar.backend.repository.produto.CategoriaProdutoRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CategoriaProdutoService {

	private final CategoriaProdutoRepository categoriaProdutoRepository;

	private final CategoriaProdutoMapper categoriaProdutoMapper = CategoriaProdutoMapper.INSTANCE;

	public List<CategoriaProdutoDTO> todosCategoriaProdutos() {
		List<CategoriaProduto> categoriaProdutos = categoriaProdutoRepository.findAll();
		return categoriaProdutos.stream().map(categoriaProdutoMapper::toDTO).collect(Collectors.toList());
	}

	public CategoriaProdutoDTO criarCategoriaProduto(CategoriaProdutoForm categoriaProdutoForm)
			throws ObjetoJaExisteException {
		verificaJaSeExiste(categoriaProdutoForm.getNome());
		CategoriaProduto categoriaProduto = categoriaProdutoMapper.toModel(categoriaProdutoForm);
		CategoriaProduto categoriaProdutoSalvo = categoriaProdutoRepository.save(categoriaProduto);
		return categoriaProdutoMapper.toDTO(categoriaProdutoSalvo);
	}

	public CategoriaProdutoDTO buscarPorId(Long id) throws ObjetoNaoEncotradoException {
		CategoriaProduto categoriaProduto = verificaSeExiste(id);
		return categoriaProdutoMapper.toDTO(categoriaProduto);
	}

	public CategoriaProdutoDTO atualizarCategoriaProduto(Long id, CategoriaProdutoForm categoriaProdutoForm)
			throws ObjetoNaoEncotradoException {
		CategoriaProduto CategoriaProdutoEncontrado = verificaSeExiste(id);
		CategoriaProduto CategoriaProdutoAtualizado = categoriaProdutoRepository.save(CategoriaProdutoEncontrado);

		return categoriaProdutoMapper.toDTO(CategoriaProdutoAtualizado);
	}

	public void deletarPorId(Long id) throws ObjetoNaoEncotradoException {
		verificaSeExiste(id);
		categoriaProdutoRepository.deleteById(id);
	}

	private CategoriaProduto verificaSeExiste(Long id) throws ObjetoNaoEncotradoException {
		return categoriaProdutoRepository.findById(id).orElseThrow(
				() -> new ObjetoNaoEncotradoException("Categoria de Produto", "id", id.toString()));
	}

	private void verificaJaSeExiste(String nome) throws ObjetoJaExisteException {
		Optional<CategoriaProduto> categoriaProduto = categoriaProdutoRepository.findByNome(nome);
		if (categoriaProduto.isPresent()) {
	throw new ObjetoJaExisteException("Categoria de Produto", "nome", nome);
		}
	}

}
