import { ArrowUpRight } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/button";
import { CTA_LABEL } from "@/content/site";
import { buildContextualWhatsAppUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

type QuoteLinkProps = VariantProps<typeof buttonVariants> & {
  /** Contexto (solução ou perfil) que entra na mensagem do WhatsApp. */
  context?: string;
  label?: string;
  className?: string;
};

/** CTA que abre o WhatsApp com a mensagem de orçamento, contextualizada quando há `context`. */
export function QuoteLink({
  context,
  label = CTA_LABEL,
  variant,
  size,
  className,
}: QuoteLinkProps) {
  const href = context ? buildContextualWhatsAppUrl(context) : buildWhatsAppUrl();

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
        <ArrowUpRight aria-hidden="true" />
        <span className="sr-only"> (abre o WhatsApp em uma nova aba)</span>
      </a>
    </Button>
  );
}
