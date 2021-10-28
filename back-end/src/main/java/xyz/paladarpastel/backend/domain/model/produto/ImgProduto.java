package xyz.paladarpastel.backend.domain.model.produto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "IMG_PRODUTO")
public class ImgProduto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long id;

	private String src;

	@Column(nullable = true, unique = true)
	private String path;

}
