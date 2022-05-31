<div align="center">
  
  [![wakatime](https://wakatime.com/badge/user/81a93aa8-8a08-415d-9a4d-3d47638f0e82/project/388cf993-c005-4785-93b2-928093cc8cc7.svg)](https://wakatime.com/badge/user/81a93aa8-8a08-415d-9a4d-3d47638f0e82/project/388cf993-c005-4785-93b2-928093cc8cc7)

<div align="center">
    <img src="https://github.com/vianaz/15-Boardcamp-API/blob/main/logo.png" alt="Logo" width="200">
  <h3 align="center">
     Board Game Rental Store
  </h3>
    <br />
</div>

<div align="center">
  
  ![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
  ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
  
 </div>


<div align="start">
  
 ## ✅ Requirements
  
- CRUD de Categorias [Create|Read]

  - [x] **GET** `/categories`
  - [x] **POST** `/categories`
    - **Regras de Negócio**
      - [x] `name` não pode estar vazio ⇒ nesse caso, deve retornar **status 400**
      - [x] `name` não pode ser um nome de categoria já existente ⇒ nesse caso deve retornar **status 409**

- CRUD de Jogos [Create|Read]
  - [x] **GET** `/games`
    - **Regras de Negócio**
      - [x] Caso seja passado um parâmetro `name` na **query string** da requisição, os jogos devem ser filtrados para retornar somente os que começam com a string passada (case insensitive). Exemplo:
        - [x] Para a rota `/games?name=ba`, deve ser retornado uma array somente com os jogos que comecem com "ba", como "Banco Imobiliário", "Batalha Naval", etc
  - [x] **POST** `/games`
    - **Regras de Negócio**
      - [x] `name` não pode estar vazio; `stockTotal` e `pricePerDay` devem ser maiores que 0; `categoryId` deve ser um id de categoria existente; ⇒ nesses casos, deve retornar **status 400**
      - [x] `name` não pode ser um nome de jogo já existente ⇒ nesse caso deve retornar **status 409**
- CRUD de Clientes [Create|Read|Update]

  - [x] **GET** `/customers`

    - **Regras de Negócio**
      - [x] Caso seja passado um parâmetro `cpf` na **query string** da requisição, os clientes devem ser filtrados para retornar somente os com CPF que comecem com a string passada.

  - [x] **GET** `/customers/:id`
    - **Regras de Negócio:**
      - [x] Se o cliente com id dado não existir, deve responder com **status 404**
  - [x] **POST** `/customers`
    - **Regras de negócio**
      - [x] `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` não pode ser uma string vazia; `birthday` deve ser uma data válida; ⇒ nesses casos, deve retornar **status 400**
      - [x] `cpf` não pode ser de um cliente já existente; ⇒ nesse caso deve retornar **status 409**
  - [x] **PUT** `/customers/:id`
    - **Regras de negócio:**
      - [x] `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` não pode ser uma string vazia; `birthday` deve ser uma data válida ⇒ nesses casos, deve retornar **status 400**
      - [x] `cpf` não pode ser de um cliente já existente ⇒ nesse caso deve retornar **status 409**

- CRUD de Aluguéis [Create|Read|Update|Delete]

    <details>
    <summary>Schema</summary>

  - Formato de um aluguel (tabela `rentals`)

    ```jsx
    {
      id: 1,
      customerId: 1,
      gameId: 1,
      rentDate: '2021-06-20',    // data em que o aluguel foi feito
      daysRented: 3,             // por quantos dias o cliente agendou o aluguel
      returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
      originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
      delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
    }
    ```

    </details>

    - [x] **GET** `/rentals`
      - **Response:** lista com todos os aluguéis, contendo o `customer` e o `game` do aluguel em questão em cada aluguel
        ```jsx
        [
          {
            id: 1,
            customerId: 1,
            gameId: 1,
            rentDate: "2021-06-20",
            daysRented: 3,
            returnDate: null, // troca pra uma data quando já devolvido
            originalPrice: 4500,
            delayFee: null,
            customer: {
              id: 1,
              name: "João Alfredo",
            },
            game: {
              id: 1,
              name: "Banco Imobiliário",
              categoryId: 1,
              categoryName: "Estratégia",
            },
          },
        ];
        ```
      - **Regras de Negócio**
        - [x] Caso seja passado um parâmetro `customerId` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os do cliente solicitado. Exemplo:
          - Para a rota `/rentals?customerId=1`, deve ser retornado uma array somente com os aluguéis do cliente com id 1
        - [x] Caso seja passado um parâmetro `gameId` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os do jogo solicitado. Exemplo:
          - Para a rota `/rentals?gameId=1`, deve ser retornado uma array somente com os aluguéis do jogo com id 1
    - [x] **POST** `/rentals`
      - **Regras de Negócio**
        - [x] Ao inserir um aluguel, os campos `rentDate` e `originalPrice` devem ser populados automaticamente antes de salvá-lo:
          - `rentDate`: data atual no momento da inserção
          - `originalPrice`: `daysRented` multiplicado pelo preço por dia do jogo no momento da inserção
        - [x] Ao inserir um aluguel, os campos `returnDate` e `delayFee` devem sempre começar como `null`
        - [x] Ao inserir um aluguel, deve verificar se `customerId` se refere a um cliente existente. Se não, deve responder com **status 400**
        - [x] Ao inserir um aluguel, deve verificar se `gameId` se refere a um jogo existente. Se não, deve responder com **status 400**
        - [x] `daysRented` deve ser um número maior que 0. Se não, deve responder com **status 400**
        - [x] Ao inserir um aluguel, deve-se validar que existem jogos disponíveis, ou seja, que não tem alugueis em aberto acima da quantidade de jogos em estoque. Caso contrário, deve retornar **status 400**
    - [x] **POST** `/rentals/:id/return`
      - **Regras de Negócio**
        - [x] Ao retornar um aluguel, o campo `returnDate` deve ser populado com a data atual do momento do retorno
        - [x] Ao retornar um aluguel, o campo `delayFee` deve ser automaticamente populado com um valor equivalente ao número de dias de atraso vezes o preço por dia do jogo no momento do retorno.
        - [x] Ao retornar um aluguel, deve verificar se o `id` do aluguel fornecido existe. Se não, deve responder com **status 404**
        - [x] Ao retornar um aluguel, deve verificar se o aluguel já não está finalizado. Se estiver, deve responder com **status 400**
    - [x] **DELETE** `/rentals/:id`
      - **Regras de Negócio**
        - [x] Ao excluir um aluguel, deve verificar se o `id` fornecido existe. Se não, deve responder com **status 404**
        - [x] Ao excluir um aluguel, deve verificar se o aluguel já não está finalizado (ou seja, `returnDate` já está preenchido). Se estiver, deve responder com **status 400**
 </div>
