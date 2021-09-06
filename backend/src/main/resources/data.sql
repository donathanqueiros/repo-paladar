

delete from pedido_possui_produto;

delete from produtos;
delete from pedidos;
delete from clientes;
delete from enderecos;
delete from perfis;

delete from categoria_produto;
delete from forma_pagamento;
delete from tipo_pedido;


ALTER TABLE tipo_pedido AUTO_INCREMENT = 1;
ALTER TABLE forma_pagamento AUTO_INCREMENT = 1;
ALTER TABLE categoria_produto AUTO_INCREMENT = 1;
ALTER TABLE enderecos AUTO_INCREMENT = 1;
ALTER TABLE clientes AUTO_INCREMENT = 1;
ALTER TABLE produtos AUTO_INCREMENT = 1;
ALTER TABLE pedidos AUTO_INCREMENT = 1;
ALTER TABLE perfis AUTO_INCREMENT = 1;


INSERT INTO enderecos (rua,cidade, estado,bairro, numero,cep) VALUES
  ('avenida professor luiz odassi neto','agudos', 'SP', 'jardim europa',76,17129068);
  
   INSERT INTO perfis (nome) VALUES
  ('ADMIN')  ;
  INSERT INTO perfis (nome) VALUES
  ('USUARIO')  ;

INSERT INTO clientes (nome, email,senha, telefone,id_endereco,id_perfil) VALUES
  ('donathan', 'donathanbt@gmail.com', '$2a$10$SoWjAnVG0AAvBWrstGKa7e0bLBVJ2eHiTHJfK6JKzOYmwQtbf1L12','14998387470',1,2);

  INSERT INTO categoria_produto (nome) VALUES
  ('lanches')  ;
  INSERT INTO categoria_produto (nome) VALUES
  ('pastéis');
  
INSERT INTO `paladarpastel`.`produtos` (`descricao`, `nome`, `preco`, `id_categoria_produto`) VALUES ('o melhor lanche', 'x-tudo', '25', '1');
INSERT INTO `paladarpastel`.`produtos` (`descricao`, `nome`, `preco`, `id_categoria_produto`) VALUES ('o melhor pastel', 'paladar', '20', '2');
  
  INSERT INTO forma_pagamento (nome) VALUES
  ('dinheiro');
  
   INSERT INTO tipo_pedido (nome) VALUES
  ('web');
  
  
  