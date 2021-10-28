package xyz.paladarpastel.backend.api.controller;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import xyz.paladarpastel.backend.api.mapper.ImgProdutoMapper;
import xyz.paladarpastel.backend.api.model.dto.produto.ImgProdutoDTO;
import xyz.paladarpastel.backend.domain.model.produto.ImgProduto;
import xyz.paladarpastel.backend.domain.repository.produto.ImgProdutoRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/img")
public class ImageController {

	@Value("${url.base}")
	private String urlBase;

	@Autowired
	private ImgProdutoMapper imgProdutoMapper;

	@Autowired
	private ImgProdutoRepository imgProdutoRepository;

	@GetMapping(value = "/{id}", produces = MediaType.IMAGE_PNG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String id) throws IOException {
		String pathString = imgProdutoRepository.getOne(Long.parseLong(id)).getPath();
		Path path = Paths.get(pathString);
		return Files.readAllBytes(path);
	}

	@PostMapping
	public ImgProdutoDTO setImage(@RequestBody String base64) throws Exception {
		byte[] decodedImg = Base64.getDecoder().decode(base64.getBytes(StandardCharsets.UTF_8));

		Long quantidade = imgProdutoRepository.count() + 1;

		String jarDir = System.getProperty("java.class.path").split(";")[0];
		String path = jarDir + File.separator + "../imagens" + File.separator + quantidade + ".png";
		FileUtils.writeByteArrayToFile(new File(path), decodedImg);
		System.out.println("img path => " + path);

		ImgProduto imgSalva = imgProdutoRepository.save(ImgProduto.builder().path(path).build());
		imgSalva.setSrc(urlBase + "/img/" + imgSalva.getId());

		imgProdutoRepository.saveAndFlush(imgSalva);
		return imgProdutoMapper.toDTO(imgSalva);
	}

}
