package br.com.paladar.backend.controller;


import br.com.paladar.backend.exception.ResourceNotFoundException;
import br.com.paladar.backend.model.produto.TipoProduto;
import br.com.paladar.backend.repository.produto.TipoProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class TipoProdutoController {

    @Autowired
    private TipoProdutoRepository tipoProdutoRepository;

    // get all tipoProdutos
    @GetMapping("/tipoproduto")
    public List<TipoProduto> getAllTipoProdutos() {
        return tipoProdutoRepository.findAll();
    }

    // create tipoProduto rest api
    @PostMapping("/tipoproduto")
    public TipoProduto createTipoProduto(@RequestBody TipoProduto tipoProduto) {
        return tipoProdutoRepository.save(tipoProduto);
    }

    // get tipoProduto by id rest api
    @GetMapping("/tipoproduto/{id}")
    public ResponseEntity<TipoProduto> GetTipoProdutoById(@PathVariable Long id) {

        TipoProduto tipoProduto = tipoProdutoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TipoProduto not exist with id: " + id));

        return ResponseEntity.ok(tipoProduto);
    }

    // update tipoProduto rest api
    @PutMapping("/tipoproduto/{id}")
    public ResponseEntity<TipoProduto> updateTipoProduto(@PathVariable Long id, @RequestBody TipoProduto tipoProdutoDetails) {

        TipoProduto tipoProduto = tipoProdutoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TipoProduto not exist with id: " + id));

        //TODO
//        tipoProduto.setFirstName(tipoProdutoDetails.getFirstName());
//        tipoProduto.setLastName(tipoProdutoDetails.getLastName());
//        tipoProduto.setEmailId(tipoProdutoDetails.getEmailId());

        TipoProduto updateTipoProduto = tipoProdutoRepository.save(tipoProduto);

        return ResponseEntity.ok(updateTipoProduto);
    }

    // delete tipoProduto rest api
    @DeleteMapping("/tipoproduto/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTipoProduto(@PathVariable Long id) {
        TipoProduto tipoProduto = tipoProdutoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TipoProduto not exist with id: " + id));

        tipoProdutoRepository.delete(tipoProduto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }


}
