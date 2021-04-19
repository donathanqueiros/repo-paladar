package br.com.paladar.backend.controller;


import br.com.paladar.backend.exception.ResourceNotFoundException;
import br.com.paladar.backend.model.produto.Produto;
import br.com.paladar.backend.repository.produto.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    // get all produtos
    @GetMapping("/produtos")
    public List<Produto> getAllProdutos() {
        return produtoRepository.findAll();
    }

    // create produto rest api
    @PostMapping("/produtos")
    public Produto createProduto(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    // get produto by id rest api
    @GetMapping("/produtos/{id}")
    public ResponseEntity<Produto> GetProdutoById(@PathVariable Long id) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto not exist with id: " + id));

        return ResponseEntity.ok(produto);
    }

    // update produto rest api
    @PutMapping("/produtos/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produtoDetails) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto not exist with id: " + id));

        //TODO
//        produto.setFirstName(produtoDetails.getFirstName());
//        produto.setLastName(produtoDetails.getLastName());
//        produto.setEmailId(produtoDetails.getEmailId());

        Produto updateProduto = produtoRepository.save(produto);

        return ResponseEntity.ok(updateProduto);
    }

    // delete produto rest api
    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduto(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produto not exist with id: " + id));

        produtoRepository.delete(produto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }


}
