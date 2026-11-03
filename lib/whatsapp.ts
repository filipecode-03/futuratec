/** Código do país aplicado quando o número informado não o traz. */
const DEFAULT_COUNTRY_CODE = "55";

/** Remove tudo que não for dígito e garante o DDI (ex.: "+55 95 99151-2122" → "5595991512122"). */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith(DEFAULT_COUNTRY_CODE) && digits.length > 11
    ? digits
    : `${DEFAULT_COUNTRY_CODE}${digits}`;
}

export const WHATSAPP_PHONE_DISPLAY = "+55 95 99151-2122";
export const WHATSAPP_PHONE_E164 = normalizePhone(WHATSAPP_PHONE_DISPLAY);

export const DEFAULT_QUOTE_MESSAGE =
  "Olá! Conheci a Futura Tec pelo site e gostaria de solicitar um orçamento para um projeto de tecnologia e automação.";

/** Monta o link wa.me com a mensagem codificada. */
export function buildWhatsAppUrl(message: string = DEFAULT_QUOTE_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`;
}

/** Mensagem contextualizada com o nome de uma solução ou de um perfil de cliente. */
export function buildContextualMessage(context: string): string {
  return `Olá! Conheci a Futura Tec pelo site e gostaria de solicitar um orçamento para um projeto de tecnologia e automação. Tenho interesse em: ${context}.`;
}

export function buildContextualWhatsAppUrl(context: string): string {
  return buildWhatsAppUrl(buildContextualMessage(context));
}
