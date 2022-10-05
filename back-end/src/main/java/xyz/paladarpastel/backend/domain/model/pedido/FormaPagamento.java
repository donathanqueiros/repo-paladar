package xyz.paladarpastel.backend.domain.model.pedido;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "FORMA_PAGAMENTO")
public class FormaPagamento {

    @Id
    @Column(name = "IDFORMA_PAGAMENTO")
    private Long id;

    @Column(nullable = false)
    private String Nome;

    @Column
    private String Descricao;

}
