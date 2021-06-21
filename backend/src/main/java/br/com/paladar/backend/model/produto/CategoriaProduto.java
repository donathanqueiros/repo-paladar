package br.com.paladar.backend.model.produto;

import javax.persistence.*;

@Entity
@Table(name = "CATEGORIA_PRODUTO")
public class CategoriaProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCATEGORIA_PRODUTO")
    private long id;

    @Column(name = "NOME")
    private String nome;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public CategoriaProduto() {
    }

    public CategoriaProduto(String nome) {
        this.nome = nome;
    }
}
