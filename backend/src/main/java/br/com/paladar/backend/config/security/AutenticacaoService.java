package br.com.paladar.backend.config.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.repository.cliente.ClienteRepository;

@Service
public class AutenticacaoService implements UserDetailsService {

	@Autowired
	private ClienteRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Cliente> clienteOp = repository.findByEmail(username);
		System.out.println(clienteOp.get().getPerfil().getAuthority());
		if (clienteOp.isPresent()) {
			return clienteOp.get();

		}

		throw new UsernameNotFoundException("Dados inválidos!");
	}

}
