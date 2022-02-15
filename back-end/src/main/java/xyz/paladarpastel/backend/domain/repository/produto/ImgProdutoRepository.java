package xyz.paladarpastel.backend.domain.repository.produto;

import org.springframework.stereotype.Repository;

import xyz.paladarpastel.backend.domain.model.produto.ImgProduto;
import xyz.paladarpastel.backend.domain.repository.CustomRepository;

@Repository
public interface ImgProdutoRepository extends CustomRepository<ImgProduto, Long> {

}
