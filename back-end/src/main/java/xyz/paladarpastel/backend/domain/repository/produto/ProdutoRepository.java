package xyz.paladarpastel.backend.domain.repository.produto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.model.produto.Produto;
import xyz.paladarpastel.backend.domain.repository.CustomRepository;

@Repository
public interface ProdutoRepository extends CustomRepository<Produto, Long> {

	@Query("SELECT p FROM Produto p join fetch p.categoriaProduto join fetch p.imgProduto")
	List<Produto> buscarTodos();

	@Query("SELECT p FROM Produto p join fetch p.categoriaProduto join fetch p.imgProduto WHERE p.nome = ?1")
	Optional<Produto> buscarPorNome(String nome);

	Optional<Produto> findByNome(String nome);

	List<Produto> findByCategoriaProduto(CategoriaProduto categoriaProduto);

}
