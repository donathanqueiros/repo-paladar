package br.com.paladar.backend.repository.pedido;

import br.com.paladar.backend.model.cliente.Cliente;
import br.com.paladar.backend.model.pedido.FormaPedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormaPedidoRepository extends JpaRepository<FormaPedido, Long> {

}
