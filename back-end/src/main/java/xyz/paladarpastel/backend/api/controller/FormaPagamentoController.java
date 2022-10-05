package xyz.paladarpastel.backend.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.paladarpastel.backend.domain.model.pedido.FormaPagamento;
import xyz.paladarpastel.backend.domain.repository.pedido.FormaPagamentoRository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/formapagamento")
public class FormaPagamentoController {

    @Autowired
    private FormaPagamentoRository formaPagamentoRository;

    @GetMapping
    public List<FormaPagamento> getAllCategoriaProduto() {

        return formaPagamentoRository.findAll();
    }

}
