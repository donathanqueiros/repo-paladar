package br.com.paladar.backend.model.cliente.endereco;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ENDERECOS")
public class Endereco {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDENDERECOS")

	private Long id;

	@Column(name = "CEP")
	private Integer cep;

	@Column(name = "ESTADO")
	private String estado;

	@Column(name = "CIDADE")
	private String cidade;

	@Column(name = "BAIRRO")
	private String bairro;

	@Column(name = "LOGRADOURO")
	private String logradouro;

	@Column(name = "NUMERO")
	private Integer numero;

}
