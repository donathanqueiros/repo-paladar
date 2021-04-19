package br.com.paladar.backend.repository.produto;

import br.com.paladar.backend.model.produto.TipoProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoProdutoRepository extends JpaRepository<TipoProduto, Long> {

}
