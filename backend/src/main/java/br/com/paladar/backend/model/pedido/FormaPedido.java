package br.com.paladar.backend.model.pedido;

import javax.persistence.*;

@Entity
@Table(name = "FORMA_PEDIDOS")
public class FormaPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDFORMA_PEDIDOS")

    private Long id;

    @Column(name = "TIPO")
    private String tipo;

    public FormaPedido(String tipo) {
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
