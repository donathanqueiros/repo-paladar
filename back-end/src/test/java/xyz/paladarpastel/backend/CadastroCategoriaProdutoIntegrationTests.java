package xyz.paladarpastel.backend;

import static org.assertj.core.api.Assertions.assertThat;

import javax.validation.ConstraintViolationException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import xyz.paladarpastel.backend.domain.model.produto.CategoriaProduto;
import xyz.paladarpastel.backend.domain.services.produto.CategoriaProdutoService;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CadastroCategoriaProdutoIntegrationTests {

    @Autowired
    private CategoriaProdutoService cadastroCategoriaProdutoService;

    @Test
    public void testarCadastroCategoriaProdutoComSucesso() {
        // cenario
        var categoriaProduto = new CategoriaProduto();
        categoriaProduto.setNome("Categoria de Teste");

        // acao
        categoriaProduto = cadastroCategoriaProdutoService.criarCategoriaProduto(categoriaProduto);

        // validacao
        assertThat(categoriaProduto).isNotNull();
        assertThat(categoriaProduto.getId()).isNotNull();

    }

    @Test
    public void testarCasdastroCategoriaProdutoSemNove() {
        // cenario
        var categoriaProduto = new CategoriaProduto();
        categoriaProduto.setNome(null);

        // acao

        ConstraintViolationException erroEsperado = Assertions.assertThrows(ConstraintViolationException.class, () -> {
            cadastroCategoriaProdutoService.criarCategoriaProduto(categoriaProduto);
        });

        // validacao
        assertThat(erroEsperado).isNotNull();
    }

}
