# Aplicação

Um rastredor de encomenda com interface intuitiva, pratica e com um design simples, mas estratégico


## Resumo 
no qual os dados serão armazenados no "TrackingSevice.js", esses dados serão representados na interface intuitiva. Caso a encomenda receba a nomeclatura "Entregue" o Icone "Casa" permanecerá Verde, caso o contrario, permanecerá branco, além disso a encomenda é represetada pelo icone "caixa". É possivel verificar a distância do enderenço de entrega e encomenda por meio do digito do CEP, caso o usuário tenha dificuldade ao permitir permissões avançadas no dispositivo.


## ⚙ Ferramentas utilizadas

App Next.js
MUI para acompanhar encomendas (mock em `/api`), mobile first, mapa e prazos de entrega.

## ▶ Como rodar

💨Terminal :
npm install
npm run dev
```

Abra http://localhost:3000

Códigos de demo: `LOG123` (em trânsito), `LOG456` (saiu para entrega), `LOG999` (entregue).

Para usar o Docker (opcional):
💨Terminal :
docker compose up --build
```

## Como testar a aplicação:

Unitários (Jest + Testing Library) — rápidos, sem browser:

💨Terminal :
npm test
```

E2E (Playwright) — abre o app de verdade, desktop e celular:

💨Terminal :
npx playwright install chromium
npm run test:e2e
```

Se `npm run dev` já estiver no ar, o Playwright reutiliza essa instância.

Tudo de uma vez:

💨Terminal :
npm run test:all
```

| Pasta | Tipo | O que cobre |
|---|---|---|
| `tests/unit/mock` | unitário | códigos, status, prazos do mock |
| `tests/unit/services` | unitário | chamadas `/api/tracking` e `/api/geocode` |
| `tests/unit/components` | unitário | busca e badge de status |
| `tests/e2e` | e2e | home, rastreio LOG999, mapa |

Novo teste unitário: `tests/unit/<área>/<arquivo>.test.js`.  
Novo e2e: `tests/e2e/<fluxo>.spec.js`.
