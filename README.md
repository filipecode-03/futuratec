# Futura Tec: landing page institucional

Página única em Next.js (App Router) para apresentar a Futura Tec e converter visitantes em pedidos de orçamento pelo WhatsApp. Este repositório é o código-fonte entregue. Não há deploy, hospedagem nem domínio configurados.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript estrito · Tailwind CSS 4 · shadcn/ui (radix-nova: Button, Accordion, Sheet) · Lucide React · `motion` (rolagem, revelações, textos) · `animejs` (transição das cenas do hero). Fontes via `next/font`: Archivo (títulos, eixo de largura), Hanken Grotesk (texto) e Geist Mono (dados do corte).

## Onde editar o conteúdo

Tudo que é texto comercial está em `content/`, tipado, fora do JSX.

| Arquivo | O que controla |
| --- | --- |
| `content/site.ts` | Contatos, endereços, navegação, título e descrição de SEO, `SITE_URL` |
| `content/solutions.ts` | Os seis pilares de solução |
| `content/scenes.ts` | Cenas da demonstração do hero (valores ilustrativos) |
| `content/projects.ts` | Etapas do projeto, perfis de cliente, ambientes do carrossel |
| `content/company.ts` | História, diferenciais, missão, visão, propósito e valores |
| `content/faq.ts` | As dez perguntas frequentes |
| `content/media.ts` | **Todas as imagens e vídeos** |
| `lib/whatsapp.ts` | Normalização do número e montagem dos links `wa.me` |

## Como colocar imagens e vídeos

Os locais que precisam de mídia aparecem na página como espaços tracejados, com o **slug** do arquivo esperado, o que mostrar e a proporção ideal (por exemplo `IMG-SOLUCAO-REDES`, `VIDEO-APRESENTACAO-FUTURA-TEC`).

1. Coloque o arquivo em `public/media/`.
2. Em `content/media.ts`, ache o slug e preencha `src` (ex.: `src: "/media/sala-cinema.jpg"`). Para vídeo, preencha também `poster`.
3. Pronto. Imagens passam por `next/image` (AVIF/WebP, `sizes`, carregamento preguiçoso). O texto alternativo já está em `alt`; ajuste se a foto pedir.

Para uma imagem acima da dobra, passe `priority` ao `MediaSlot` correspondente.

## Marca provisória

Não havia arquivo do símbolo oficial no repositório. O mark em "F" (`components/site/wordmark.tsx`), o favicon (`app/icon.tsx`) e a imagem social (`lib/brand-image.tsx`) são provisórios e usam só a paleta oficial. Para trocar:

- Coloque o logotipo em `public/brand/` e use-o em `Wordmark`.
- Para o favicon, adicione `app/icon.png` (e `app/apple-icon.png`) e apague `app/icon.tsx`.
- Para a imagem de compartilhamento, adicione `app/opengraph-image.png` (1200×630) e apague `app/opengraph-image.tsx` e `app/twitter-image.tsx`.

## URL pública (SEO)

Copie `.env.example` para `.env.local` e preencha quando o domínio existir:

```
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
```

Sem a variável, o site funciona normalmente, mas canonical, `robots.txt`, `sitemap.xml`, imagens Open Graph absolutas e a `url` dos dados estruturados ficam de fora. Nenhum domínio é inventado.

## WhatsApp

`buildWhatsAppUrl()` normaliza `+55 95 99151-2122` para `5595991512122` e codifica a mensagem com `encodeURIComponent`. CTAs ligados a uma solução ou a um perfil de cliente usam `buildContextualWhatsAppUrl(nome)`.

## Decisões deliberadas

- **Sem política de privacidade:** a página não coleta dados, não usa cookies nem analytics. Se um dia entrar analytics, formulário ou pixel, crie a política antes.
- **Demonstração do hero:** o corte da casa e as cenas são ilustrativos e rotulados como tal na página. Não representam um projeto real nem especificações de equipamentos.
- **Conteúdo não inventado:** não há depoimentos, números de projetos, certificações, garantias, modelos de equipamento, CNPJ, coordenadas ou preços.
- **Dados estruturados:** `Organization`, duas `LocalBusiness` (Boa Vista e Manaus, com o endereço real) e `FAQPage`. Sem CEP, geo ou horários, que não foram informados.
- **Cabeçalhos de segurança básicos** em `next.config.ts`. Uma CSP estrita depende do domínio e do host finais.

Veja `PRODUCT.md` (contexto do produto) e `DESIGN.md` (sistema visual).
