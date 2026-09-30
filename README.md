# loja-api

API em NestJS para cadastrar e consultar produtos. Os dados ficam em memória e somem quando o processo reinicia.

## Como rodar

```bash
pnpm install
pnpm start:dev
```

A API sobe em `http://localhost:3000`. A porta pode ser alterada com a variável `PORT`.

## Endpoints

| Método | Rota | Status | Descrição |
| --- | --- | --- | --- |
| `GET` | `/` | 200 | Responde `Hello World!` |
| `GET` | `/health` | 200 | Responde `OK` |
| `GET` | `/products` | 200 | Lista os produtos |
| `GET` | `/products/:id` | 200 ou 404 | Busca um produto pelo id |
| `POST` | `/products` | 201 ou 400 | Cria vários produtos de uma vez |
| `PUT` | `/products/:id` | 200 ou 404 | Atualiza um produto |
| `DELETE` | `/products/:id` | 204 ou 404 | Remove um produto |

O `POST` aceita um array. Um objeto solto responde `400`.

```json
[
  { "name": "Chapéu", "price": 600 },
  { "name": "Colher", "price": 200 }
]
```

A resposta inclui o `id` gerado para cada item:

```json
[
  { "id": 1, "name": "Chapéu", "price": 600 },
  { "id": 2, "name": "Colher", "price": 200 }
]
```

## Testes

```bash
pnpm test
pnpm test:e2e
```
