package br.com.paladar.backend.repository.produto;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.paladar.backend.model.produto.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

	Optional<Produto> findByNome(String nome);

}
