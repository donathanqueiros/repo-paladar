package br.com.paladar.backend.repository.produto;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.paladar.backend.model.produto.ImgProduto;


public interface ImgProdutoRepository extends JpaRepository<ImgProduto, Long> {


}
