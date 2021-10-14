

delete from pedido_possui_produto;
delete from pedido_simples_possui_produto;
delete from produtos;
delete from pedidos;
delete from pedidos_simples;
delete from clientes_simples;
delete from clientes;
delete from enderecos;
delete from img_produto;
delete from perfis;

delete from categoria_produto;
delete from forma_pagamento;
delete from tipo_pedido;


ALTER TABLE img_produto AUTO_INCREMENT = 1;
ALTER TABLE pedidos_simples AUTO_INCREMENT = 1;
ALTER TABLE pedido_simples_possui_produto AUTO_INCREMENT = 1;
ALTER TABLE clientes_simples AUTO_INCREMENT = 1;
ALTER TABLE tipo_pedido AUTO_INCREMENT = 1;
ALTER TABLE tipo_pedido AUTO_INCREMENT = 1;
ALTER TABLE forma_pagamento AUTO_INCREMENT = 1;
ALTER TABLE categoria_produto AUTO_INCREMENT = 1;
ALTER TABLE enderecos AUTO_INCREMENT = 1;
ALTER TABLE clientes AUTO_INCREMENT = 1;
ALTER TABLE produtos AUTO_INCREMENT = 1;
ALTER TABLE pedidos AUTO_INCREMENT = 1;
ALTER TABLE perfis AUTO_INCREMENT = 1;


INSERT INTO img_produto (id,path,src) VALUES
  (1,'/br/com/paladar/backend/imagens/1.png','http://localhost:8080/img/1');

INSERT INTO enderecos (logradouro,cidade, estado,bairro, numero,cep) VALUES
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
  
INSERT INTO `paladarpastel`.`produtos` (`descricao`, `nome`, `preco`, `id_categoria_produto`, id_img_produto) VALUES ('o melhor lanche', 'x-tudo', '25', '1',1);
INSERT INTO `paladarpastel`.`produtos` (`descricao`, `nome`, `preco`, `id_categoria_produto`, id_img_produto) VALUES ('o melhor lanche', 'x-frango', '20', '1',1);
INSERT INTO `paladarpastel`.`produtos` (`descricao`, `nome`, `preco`, `id_categoria_produto`,id_img_produto) VALUES ('o melhor pastel', 'paladar', '20', '2',1);
  
  INSERT INTO forma_pagamento (nome) VALUES
  ('dinheiro');
  
   INSERT INTO tipo_pedido (nome) VALUES
  ('web');
  
  
  