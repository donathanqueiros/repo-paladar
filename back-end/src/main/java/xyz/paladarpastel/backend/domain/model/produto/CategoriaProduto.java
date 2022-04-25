package xyz.paladarpastel.backend.domain.model.produto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import xyz.paladarpastel.backend.core.validation.Groups;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CATEGORIA_PRODUTO")
public class CategoriaProduto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDCATEGORIA_PRODUTO")
	@NotNull(groups = Groups.CategoriaProdutoId.class)
	private Long id;

	@NotBlank
	@Column(nullable = false)
	private String nome;

}
