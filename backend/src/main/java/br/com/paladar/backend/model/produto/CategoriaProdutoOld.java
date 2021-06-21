package br.com.paladar.backend.model.produto;

import br.com.paladar.backend.model.produto.ItemCategoriaProduto;
import br.com.paladar.backend.model.produto.Produto;

import java.util.ArrayList;
import java.util.List;

public class CategoriaProdutoOld {
    private Long id;
    private String nome;
    private String obrigatorio;
    private int quantidadeMax;

    private List<ItemCategoriaProduto> itemCategoriaProdutoList = new ArrayList<>();
    private Produto produto;


    public CategoriaProdutoOld() {

    }

    public CategoriaProdutoOld(Produto produto, String nome, String obrigatorio, int quantidadeMax) {
        this.nome = nome;
        this.obrigatorio = obrigatorio;
        this.quantidadeMax = quantidadeMax;
        this.produto = produto;
    }
}
