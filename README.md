<div align="center">

# Innovativa SST Website

### Conversion-focused SST landing page · pricing simulator · lead capture

**A responsive B2B web experience for occupational health and workplace safety plans, designed to turn traffic into qualified commercial conversations.**

![HTML5](https://img.shields.io/badge/HTML5-20232A?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-20232A?style=for-the-badge&logo=css3&logoColor=1572B6)
![JavaScript](https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![PHP](https://img.shields.io/badge/PHP-20232A?style=for-the-badge&logo=php&logoColor=777BB4)

</div>

---

## About

This repository contains a **sanitized portfolio edition** of an SST commercial landing-page package.

The source is centered on a campaign page for company SST plans and implements a short conversion path from visitor interest to proposal request.

The package exposes both `index.html` and `planos-sst.html` as entry points for the same campaign experience.

## Implemented features

- responsive B2B landing page;
- Super / Plus plan presentation;
- employee-count pricing simulator;
- dynamic plan estimate;
- CNPJ input formatting;
- lead form with name, e-mail and WhatsApp;
- explicit contact consent checkbox;
- PHP proposal endpoint;
- customer + commercial e-mail dispatch;
- WhatsApp continuation links;
- animated FAQ and reveal effects;
- mobile navigation;
- reduced-motion support;
- deployment configuration separated from the browser.

## Pricing logic represented in the source

For the **Super** plan, the simulator uses:

- up to 25 employees: **R$ 16,25 / employee**;
- 26+ employees: **R$ 14,25 / employee**.

The **Plus** plan is presented as a commercial condition under consultation in this package.

## Structure

```text
index.html
planos-sst.html
assets/
├── app.js
├── proposal-email.js
├── logo.svg
├── hero-illustration.svg
├── workspace-illustration.svg
└── favicon.svg
api/
├── config.php
└── enviar-proposta.php
```

## Run locally

The interface can be previewed with any static HTTP server:

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

The proposal e-mail endpoint requires a **PHP 8+** hosting environment with mail delivery configured.

## Configure proposal e-mail

Edit `api/config.php` and replace the placeholder destination addresses with approved deployment addresses.

No SMTP password, API key or real customer lead data is included in this repository.

## Portfolio sanitization

Direct commercial phone / WhatsApp values and deployment e-mail addresses were replaced with demonstration values or configuration placeholders.

See [`PORTFOLIO_EDITION.md`](PORTFOLIO_EDITION.md).

---

<div align="center">

Built by **Eduardo Lima** · [GitHub](https://github.com/EduSchorr)

</div>
