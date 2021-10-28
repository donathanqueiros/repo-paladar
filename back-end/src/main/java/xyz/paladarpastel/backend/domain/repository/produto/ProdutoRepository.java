package xyz.paladarpastel.backend.domain.repository.produto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.model.produto.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

	Optional<Produto> findByNome(String nome);

	List<Produto> findByCategoriaProduto(CategoriaProduto categoriaProduto);

}
