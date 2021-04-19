package br.com.paladar.backend.model.produto;

public class ItemCategoriaProduto {
    private CategoriaProduto categoriaProduto = new CategoriaProduto();
    private long id;
    private String nome;
    private int quantidadeMax;
    private double preco;

    public ItemCategoriaProduto() {

    }

    public ItemCategoriaProduto(CategoriaProduto categoriaProduto, String nome, int quantidadeMax, double preco) {
        this.categoriaProduto = categoriaProduto;
        this.nome = nome;
        this.quantidadeMax = quantidadeMax;
        this.preco = preco;
    }
}
