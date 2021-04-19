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
    @JoinColumn(name = "ID_TIPO_PRODUTO")
    private TipoProduto tipoProduto;


    public Produto() {

    }

    public Produto(String nome, String descricao, double preco, TipoProduto tipoProduto) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.tipoProduto = tipoProduto;
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

    public TipoProduto getTipoProduto() {
        return tipoProduto;
    }

    public void setTipoProduto(TipoProduto tipoProduto) {
        this.tipoProduto = tipoProduto;
    }
}
