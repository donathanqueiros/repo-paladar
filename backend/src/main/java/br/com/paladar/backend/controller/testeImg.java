package br.com.paladar.backend.controller;

import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("")
public class testeImg {

	@GetMapping(value = "/img/{id}", produces = MediaType.IMAGE_PNG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String id) throws IOException {
		InputStream in = getClass().getResourceAsStream("/br/com/paladar/backend/imagens/" + id + ".jpeg");

		return IOUtils.toByteArray(in);
	}

}
