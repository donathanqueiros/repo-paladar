package br.com.paladar.backend.repository.produto;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.paladar.backend.model.produto.CategoriaProduto;
import br.com.paladar.backend.services.produto.CategoriaProdutoService;


public interface CategoriaProdutoRepository extends JpaRepository<CategoriaProduto, Long> {

	Optional<CategoriaProduto> findByNome(String nome);

}
