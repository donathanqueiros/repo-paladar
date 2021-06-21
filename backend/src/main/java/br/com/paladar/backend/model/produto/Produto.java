package br.com.paladar.backend.model.produto;

import javax.persistence.*;


@Entity
@Table(name = "PRODUTOS")
public class Produto {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPRODUTOS")
    private long id;

    @Column(name = "NOME")
    private String nome;

    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "PRECO")
    private double preco;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_CATEGORIA_PRODUTO")
    private CategoriaProduto categoriaProduto;


    public Produto() {

    }

    public Produto(String nome, String descricao, double preco, CategoriaProduto categoriaProduto) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoriaProduto = categoriaProduto;
    }


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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public CategoriaProduto getCategoriaProduto() {
        return categoriaProduto;
    }

    public void setCategoriaProduto(CategoriaProduto categoriaProduto) {
        this.categoriaProduto = categoriaProduto;
    }
}
