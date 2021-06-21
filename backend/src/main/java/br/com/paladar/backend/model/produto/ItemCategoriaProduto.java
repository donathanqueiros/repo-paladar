package br.com.paladar.backend.model.produto;

public class ItemCategoriaProduto {
    private CategoriaProdutoOld categoriaProdutoOld = new CategoriaProdutoOld();
    private long id;
    private String nome;
    private int quantidadeMax;
    private double preco;

    public ItemCategoriaProduto() {

    }

    public ItemCategoriaProduto(CategoriaProdutoOld categoriaProdutoOld, String nome, int quantidadeMax, double preco) {
        this.categoriaProdutoOld = categoriaProdutoOld;
        this.nome = nome;
        this.quantidadeMax = quantidadeMax;
        this.preco = preco;
    }
}
