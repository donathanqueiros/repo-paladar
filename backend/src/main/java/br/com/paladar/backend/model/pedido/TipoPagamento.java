package br.com.paladar.backend.model.pedido;

import javax.persistence.*;

@Entity
@Table(name = "TIPO_PAGAMENTO")
public class TipoPagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDTIPO_PAGAMENTO")
    private Long id;

    @Column(name = "NOME")
    private String nome;

    public TipoPagamento(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
