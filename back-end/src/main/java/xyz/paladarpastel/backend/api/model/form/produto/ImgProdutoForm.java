package xyz.paladarpastel.backend.api.model.form.produto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImgProdutoForm {
	private Long id;
	private String src;

}
