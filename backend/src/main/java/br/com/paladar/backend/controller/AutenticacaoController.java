package br.com.paladar.backend.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.paladar.backend.config.security.AutenticacaoService;
import br.com.paladar.backend.config.security.TokenService;
import br.com.paladar.backend.controller.dto.LoginForm;
import br.com.paladar.backend.controller.dto.TokenDto;
import br.com.paladar.backend.controller.form.cliente.ClienteForm;
import br.com.paladar.backend.mapper.ClienteMapper;
import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.repository.cliente.ClienteRepository;

@RestController
@RequestMapping("/api")
public class AutenticacaoController {

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private TokenService tokenService;

	@Autowired
	private ClienteRepository repository;

//	@Autowired
//	private ClienteMapper clienteMapper;

	@PostMapping("/auth")
	public ResponseEntity<TokenDto> autenticar(@RequestBody LoginForm form) {
		UsernamePasswordAuthenticationToken dadosLogin = form.converter();

		try {
			Authentication authentication = authManager.authenticate(dadosLogin);
			String token = tokenService.gerarToken(authentication);
			return ResponseEntity.ok(new TokenDto(token, "Bearer"));
		} catch (AuthenticationException e) {
			return ResponseEntity.badRequest().build();
		}
	}

//	@PostMapping("/singnin")
//	public void signin(@RequestBody @Valid ClienteForm clienteForm) {
//		Cliente cliente = clienteMapper.toModel(clienteForm);
//		String passwordEncoder = new BCryptPasswordEncoder().encode(cliente.getSenha());
//		cliente.setSenha(passwordEncoder);
//
//		repository.save(cliente);
//	}
	
	
	@PostMapping("/encriptado")
	public String retorno(@RequestParam String valor) {
		return new BCryptPasswordEncoder().encode(valor);
	}
	
	

	@PostMapping("/validateEmail")
	public Boolean emailExists(@RequestParam String email) {
		return repository.findByEmail(email).isPresent();
	}

}
