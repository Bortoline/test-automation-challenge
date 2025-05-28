# language: pt

Funcionalidade: Login e navegação no Sauce Demo
  Como um usuário
  Eu quero fazer login no sistema Sauce Demo
  Para visualizar e interagir com os produtos

  Cenário: Login com credenciais válidas
    Dado que estou na página de login do Sauce Demo
    Quando preencho o campo de usuário com "standard_user"
    E preencho o campo de senha com "secret_sauce"
    E clico no botão de login
    Então devo ser redirecionado para a página de inventário
    E devo ver o título "Products"

  Cenário: Tentativa de login com usuário bloqueado
    Dado que estou na página de login do Sauce Demo
    Quando preencho o campo de usuário com "locked_out_user"
    E preencho o campo de senha com "secret_sauce"
    E clico no botão de login
    Então devo ver a mensagem de erro "Epic sadface: Sorry, this user has been locked out."

  Cenário: Navegação e ordenação de produtos
    Dado que estou logado no Sauce Demo com "standard_user"
    Quando ordeno os produtos por "Price (low to high)"
    Então o primeiro produto listado deve ter o menor preço

  Cenário: Fluxo completo de compra
    Dado que estou logado no Sauce Demo com "standard_user"
    Quando ordeno os produtos por "Price (low to high)"
    E adiciono o produto "Sauce Labs Backpack" ao carrinho
    E clico no carrinho de compras
    E clico no botão de checkout
    E preencho os dados de checkout com nome "João", sobrenome "Silva" e CEP "12345-678"
    E clico no botão continuar
    E clico no botão finalizar
    Então devo ver a mensagem de confirmação "Thank you for your order!"
