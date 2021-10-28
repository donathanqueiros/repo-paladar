package xyz.paladarpastel.backend.domain.repository.produto;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;


public interface CategoriaProdutoRepository extends JpaRepository<CategoriaProduto, Long> {

	Optional<CategoriaProduto> findByNome(String nome);

}
