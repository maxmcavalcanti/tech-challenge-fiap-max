Entidades:

Cliente:

Descrição: Representa um cliente da lanchonete.
Atributos: nome, e-mail, CPF.
Produto:

Descrição: Representa um item disponível para pedido na lanchonete.
Atributos: nome, descrição, preço, categoria.
Pedido:

Descrição: Representa um pedido realizado pelo cliente.
Atributos: cliente, itens do pedido, status, método de pagamento.
Funcionário:

Descrição: Representa um funcionário da lanchonete.
Atributos: nome, cargo, login, senha.
Categoria:

Descrição: Representa as categorias de produtos disponíveis na lanchonete.
Atributos: nome.
ItemPedido:

Descrição: Representa um item específico dentro de um pedido.
Atributos: produto, quantidade, preço unitário.
Cozinha:

Descrição: Representa a área responsável pelo preparo dos pedidos na lanchonete.
TabelaPedidos:

Descrição: Representa a tabela onde os pedidos são exibidos para a cozinha e atendentes acompanharem o status e andamento.
Casos de Uso:

Realizar Pedido:

Descrição: Permite que um cliente faça um pedido de lanches, acompanhamentos, bebidas e sobremesas.
Fluxo:
O cliente seleciona os produtos desejados, especificando a quantidade e possíveis personalizações.
O cliente realiza o pagamento do pedido utilizando o QRCode do Mercado Pago.
O pedido é registrado no sistema, associado ao cliente, aos produtos selecionados e ao método de pagamento.
Acompanhar Pedido:

Descrição: Permite que o cliente acompanhe o progresso do seu pedido.
Fluxo:
O cliente visualiza o status do pedido, que pode estar em uma das seguintes etapas: recebido, em preparação, pronto, finalizado.
Gerenciar Clientes:

Descrição: Permite ao estabelecimento cadastrar, editar e remover informações dos clientes.
Fluxo:
O estabelecimento pode cadastrar novos clientes, fornecendo nome, e-mail e CPF.
O estabelecimento pode editar as informações de clientes existentes.
O estabelecimento pode remover clientes do sistema.
Gerenciar Produtos e Categorias:

Descrição: Permite ao estabelecimento cadastrar, editar e remover produtos e categorias.
Fluxo:
O estabelecimento cadastra novos produtos, fornecendo nome, descrição, preço e categoria.
O estabelecimento pode editar as informações de produtos existentes.
O estabelecimento pode remover produtos do sistema.
O estabelecimento pode cadastrar novas categorias de produtos.
O estabelecimento pode editar as informações de categorias existentes.
O estabelecimento pode remover categorias do sistema.
Acompanhar Pedidos em Andamento:

Descrição: Permite ao estabelecimento visualizar os pedidos em andamento e o