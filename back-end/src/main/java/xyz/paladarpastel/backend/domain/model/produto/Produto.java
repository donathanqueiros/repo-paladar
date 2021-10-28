package xyz.paladarpastel.backend.domain.model.produto;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PRODUTOS")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String descricao;

	@Column(nullable = false)
	private BigDecimal preco;

	@Builder.Default
	@Column(nullable = false, columnDefinition = "boolean default true")
	@Setter(AccessLevel.PRIVATE)
	private Boolean ativo = true;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_CATEGORIA_PRODUTO")
	private CategoriaProduto categoriaProduto;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_IMG_PRODUTO")
	private ImgProduto imgProduto;

	public void ativar() {
		this.ativo = true;
	}

	public void desativar() {
		this.ativo = false;
	}

}
