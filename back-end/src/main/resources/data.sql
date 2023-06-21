--
INSERT INTO
  img_produto (id, path, src)
VALUES
  (
    1,
    'src/main/java/xyz/paladarpastel/backend/imagens/1.jpg',
    'http://localhost:8080/img/1'
  );

INSERT INTO
  img_produto (id, path, src)
VALUES
  (
    2,
    'src/main/java/xyz/paladarpastel/backend/imagens/2.jpg',
    'http://localhost:8080/img/2'
  );

INSERT INTO
  img_produto (id, path, src)
VALUES
  (
    3,
    'src/main/java/xyz/paladarpastel/backend/imagens/3.jpg',
    'http://localhost:8080/img/3'
  );

INSERT INTO
  img_produto (id, path, src)
VALUES
  (
    4,
    'src/main/java/xyz/paladarpastel/backend/imagens/4.jpg',
    'http://localhost:8080/img/4'
  );

INSERT INTO
  img_produto (id, path, src)
VALUES
  (
    5,
    'src/main/java/xyz/paladarpastel/backend/imagens/5.jpg',
    'http://localhost:8080/img/5'
  );

INSERT INTO
  img_produto (id, path, src)
VALUES
  (
    6,
    'src/main/java/xyz/paladarpastel/backend/imagens/6.jpg',
    'http://localhost:8080/img/6'
  );

INSERT INTO
  forma_pagamento (IDFORMA_PAGAMENTO, NOME)
VALUES
  (1, 'PIX');

INSERT INTO
  forma_pagamento (IDFORMA_PAGAMENTO, NOME)
VALUES
  (2, 'DINHEIRO');

INSERT INTO
  forma_pagamento (IDFORMA_PAGAMENTO, NOME)
VALUES
  (3, 'CARTÃO');

INSERT INTO
  categoria_produto (nome)
VALUES
  ('lanches');

INSERT INTO
  categoria_produto (nome)
VALUES
  ('pizzas');

INSERT INTO
  categoria_produto (nome)
VALUES
  ('bebidas');

INSERT INTO
  `produtos` (
    `descricao`,
    `nome`,
    `preco`,
    `id_categoria_produto`,
    id_img_produto
  )
VALUES
  ('o melhor x-tudo', 'x-tudo', '20', '1', 1);

INSERT INTO
  `produtos` (
    `descricao`,
    `nome`,
    `preco`,
    `id_categoria_produto`,
    id_img_produto
  )
VALUES
  ('o melhor x-burger', 'x-burger', '18', '1', 2);

INSERT INTO
  `produtos` (
    `descricao`,
    `nome`,
    `preco`,
    `id_categoria_produto`,
    id_img_produto
  )
VALUES
  ('o melhor x-cheese', 'x-cheese', '19', '1', 3);

INSERT INTO
  `produtos` (
    `descricao`,
    `nome`,
    `preco`,
    `id_categoria_produto`,
    id_img_produto
  )
VALUES
  ('a melhor calabresa', 'Calabresa', '22', '2', 4);

INSERT INTO
  `produtos` (
    `descricao`,
    `nome`,
    `preco`,
    `id_categoria_produto`,
    id_img_produto
  )
VALUES
  ('a melhor Coca ', 'coca-cola lata', '5', '3', 5);

INSERT INTO
  `produtos` (
    `descricao`,
    `nome`,
    `preco`,
    `id_categoria_produto`,
    id_img_produto
  )
VALUES
  (
    'o melhor suco de laranja',
    'suco de laranja',
    '7',
    '3',
    6
  );