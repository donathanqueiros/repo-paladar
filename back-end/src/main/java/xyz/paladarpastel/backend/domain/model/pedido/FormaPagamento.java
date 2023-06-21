package xyz.paladarpastel.backend.domain.model.pedido;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormaPagamento {

    @Id
    @Column(name = "IDFORMA_PAGAMENTO")
    private Long id;

    @Column(nullable = false)
    private String Nome;

    @Column
    private String Descricao;

}
