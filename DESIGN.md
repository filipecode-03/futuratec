# Design: Futura Tec

## Ideia

A casa vista em corte, como numa prancha de arquitetura, e uma única pergunta de interface: "o que acontece quando você toca uma cena?". O hero mostra a casa respondendo (luz, cortinas, som, projeção, câmera) e o resto da página sustenta essa promessa com os seis pilares, o caminho do projeto e a identidade da empresa.

Cena de uso: alguém olhando a página no celular à noite, no sofá, ou um arquiteto no desktop em horário de trabalho. Fundo escuro porque o assunto é luz e cinema, e porque a paleta oficial parte do `#0D0D0D`.

## Cor

Estratégia: base escura restrita, com **um** campo saturado (seção de contato) onde a marca assume a página.

| Papel | Valor | Uso |
| --- | --- | --- |
| `ink` | `#0D0D0D` | Fundo principal |
| `ink-2` / `ink-3` | `#131317` / `#1B1B22` | Superfícies alternadas, espaços de mídia |
| `fg` / `fg-2` / `fg-3` | `#F4F0F2` / `#BDB7BE` / `#948E98` | Texto (contraste ≥ 6:1 sobre `ink`) |
| `cta` | `#D90D58` | Botão principal, texto branco 5,1:1 |
| `signal` | `#F20C49` | Marcadores, foco, estados ativos, tela do cinema |
| `plum` | `#8C2370` | Cortinas, profundidade, início do campo de contato |
| `navy` | `#1A3873` | Atmosfera atrás do corte, fim do campo de contato |

Gradientes só onde há função: atmosfera do corte (luz ambiente), feixe do projetor, campo de contato. Nunca em texto.

## Tipografia

- **Archivo** (eixo de largura 114–122%): títulos e rótulos. Largo, firme, com cara de letreiro de projeto.
- **Hanken Grotesk**: texto corrido, 16–18 px, medida ≤ 62ch.
- **Geist Mono**: apenas dados do corte (legendas dos ambientes, valores das cenas) e etiquetas de espaço de mídia.

Escala de títulos de seção: `clamp(2rem, 3.6vw + .6rem, 3.75rem)`, tracking −0,025em.

## Movimento

Um momento autoral: o corte da casa é "plotado" da esquerda para a direita e depois responde às cenas (anime.js move os níveis de luz, cortina, projeção e som com atraso por ambiente). O restante é discreto: revelação por rolagem com `motion`, linha de progresso das etapas, texto das cenas em troca suave. `prefers-reduced-motion` desliga o autoplay das cenas e reduz as transições. Sem JavaScript, tudo permanece visível.

## Componentes

shadcn/ui (radix-nova) reescrito para a marca: Button pílula com alvo ≥ 44 px, Accordion com ícone que gira, Sheet para o menu móvel. Espaços de mídia são um componente próprio (`MediaSlot`) e viram `next/image` ou `<video>` ao receber `src`.

## O que foi evitado de propósito

Grade de cards iguais, ícones em quadrados arredondados, glassmorphism, texto centralizado em todas as seções, gradiente em texto, eyebrow acima de títulos, métricas de impacto, depoimentos e números inventados.
