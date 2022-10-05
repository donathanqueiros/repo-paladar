package xyz.paladarpastel.backend.domain.repository.pedido;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import xyz.paladarpastel.backend.domain.model.pedido.FormaPagamento;

@Repository
public interface FormaPagamentoRository extends JpaRepository<FormaPagamento, Long> {

}
