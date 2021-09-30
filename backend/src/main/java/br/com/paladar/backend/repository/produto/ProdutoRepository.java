package br.com.paladar.backend.repository.produto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.paladar.backend.model.produto.CategoriaProduto;
import br.com.paladar.backend.model.produto.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

	Optional<Produto> findByNome(String nome);

	List<Produto> findByCategoriaProduto(CategoriaProduto categoriaProduto);

	@Query(value = "SELECT idproduto,COUNT(*) AS quantidade_vendida FROM pedido_simples_possui_produto pspd\r\n"
			+ "JOIN  produtos p ON p.id = pspd.idproduto\r\n" + "GROUP BY idproduto\r\n"
			+ "ORDER BY quantidade_vendida DESC,nome asc\r\n" + "LIMIT 10", nativeQuery = true)
	List<Object[]> maisVendidos();

}
