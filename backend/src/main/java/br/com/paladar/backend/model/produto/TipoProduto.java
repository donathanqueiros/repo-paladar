package br.com.paladar.backend.model.produto;

import javax.persistence.*;

@Entity
@Table(name = "TIPO_PRODUTOS")
public class TipoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDTIPO_PRODUTOS")
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

    public TipoProduto() {
    }

    public TipoProduto(String nome) {
        this.nome = nome;
    }
}
