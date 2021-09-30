package br.com.paladar.backend.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.paladar.backend.controller.dto.produto.ImgProdutoDTO;
import br.com.paladar.backend.mapper.ImgProdutoMapper;
import br.com.paladar.backend.model.produto.ImgProduto;
import br.com.paladar.backend.repository.produto.ImgProdutoRepository;

@RestController
@RequestMapping("/img")
public class testeImg {

	@Autowired
	private ImgProdutoMapper imgProdutoMapper;

	@Autowired
	private ImgProdutoRepository imgProdutoRepository;

	@GetMapping(value = "/{id}", produces = MediaType.IMAGE_PNG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String id) throws IOException {

		String path = imgProdutoRepository.getOne(Long.parseLong(id)).getPath();

		InputStream in = getClass().getResourceAsStream(path);

		return IOUtils.toByteArray(in);
	}

	@PostMapping(value = "")
	public ImgProdutoDTO setImage(@RequestBody String base64) throws IOException {

		byte[] decodedImg = Base64.getDecoder().decode(base64.getBytes(StandardCharsets.UTF_8));

		Long quantidade = imgProdutoRepository.count() + 1;
		String path = new File("src/main/java/br/com/paladar/backend/imagens/" + quantidade + ".png").getAbsolutePath();

		System.out.println(path);
		FileUtils.writeByteArrayToFile(new File(path), decodedImg);
		ImgProduto imgSalva = imgProdutoRepository
				.save(ImgProduto.builder().path("/br/com/paladar/backend/imagens/" + quantidade + ".png").build());
		imgSalva.setSrc("http://localhost:8080/img/" + imgSalva.getId());

		imgProdutoRepository.flush();

		return imgProdutoMapper.toDTO(imgSalva);
	}

}
