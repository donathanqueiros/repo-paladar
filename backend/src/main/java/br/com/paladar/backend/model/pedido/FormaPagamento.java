package br.com.paladar.backend.model.pedido;

import javax.persistence.*;

import br.com.paladar.backend.model.produto.CategoriaProduto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "FORMA_PAGAMENTO")
public class FormaPagamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDFORMA_PAGAMENTO")
	private Long id;

	private String nome;

}
