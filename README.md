# loja-api

API em NestJS para cadastrar e consultar produtos. Os dados ficam no Postgres via TypeORM e permanecem depois que o processo reinicia.

## Como rodar

O Postgres precisa estar no ar. Crie um `.env` na raiz:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=
DB_NAME=postgres
```

```bash
pnpm install
pnpm start:dev
```

A API sobe em `http://localhost:3000`. A porta pode ser alterada com a variável `PORT`.

Em desenvolvimento o TypeORM usa `synchronize: true`: a tabela `products` é criada e atualizada a partir da entidade. O `id` é gerado pelo Postgres.

## Endpoints

| Método | Rota | Status | Descrição |
| --- | --- | --- | --- |
| `GET` | `/` | 200 | Responde `Hello World!` |
| `GET` | `/health` | 200 | Responde `OK` |
| `GET` | `/products` | 200 | Lista os produtos |
| `GET` | `/products/:id` | 200 ou 404 | Busca um produto pelo id |
| `POST` | `/products` | 201 ou 400 | Cria vários produtos de uma vez |
| `PUT` | `/products/:id` | 200 ou 404 | Atualiza um produto |
| `PATCH` | `/products/:id` | 200 ou 404 | Atualiza só os campos enviados |
| `DELETE` | `/products/:id` | 204 ou 404 | Remove um produto |

O `POST` aceita um array. Um objeto solto responde `400`. Campos fora do contrato também respondem `400`.

Cada item precisa de `name`, `price` (maior que 0.01), `description` (de 10 a 1000 caracteres) e `quantity` (inteiro a partir de 0). `image` é opcional: uma URL de até 255 caracteres, ou `null`.

```json
[
  {
    "name": "Chapéu",
    "price": 600,
    "description": "Chapéu de feltro azul",
    "quantity": 10,
    "image": "https://exemplo.com/chapeu.png"
  }
]
```

A resposta inclui o `id` gerado para cada item:

```json
[
  {
    "id": 1,
    "name": "Chapéu",
    "price": 600,
    "description": "Chapéu de feltro azul",
    "quantity": 10,
    "image": "https://exemplo.com/chapeu.png"
  }
]
```

O `PUT` e o `PATCH` aceitam qualquer um destes campos: `name`, `price`, `description` e `quantity`.

## Testes

```bash
pnpm test
pnpm test:e2e
```
