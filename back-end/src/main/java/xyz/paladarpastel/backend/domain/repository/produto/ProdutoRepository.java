package xyz.paladarpastel.backend.domain.repository.produto;

import java.util.List;
import java.util.Optional;

import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.model.produto.Produto;
import xyz.paladarpastel.backend.domain.repository.CustomRepository;

public interface ProdutoRepository extends CustomRepository<Produto, Long> {

	Optional<Produto> findByNome(String nome);

	List<Produto> findByCategoriaProduto(CategoriaProduto categoriaProduto);

}
