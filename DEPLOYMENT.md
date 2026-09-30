# Como executar

## Preview local

A interface pode ser servida como site estático:

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

## Envio de propostas

O envio real exige hospedagem com PHP 8+.

1. Edite `api/config.php`.
2. Configure `business_email` e `from_email` com endereços aprovados.
3. Publique mantendo as pastas `assets/` e `api/`.
4. Faça um teste de envio e valide também spam/quarentena.
5. Nunca coloque senha SMTP ou token no JavaScript do navegador.

A edição pública usa telefone/WhatsApp demonstrativo e não inclui leads reais.
