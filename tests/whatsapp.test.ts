import { describe, expect, it } from "vitest";
import { isWhatsAppLink } from "@/lib/analytics";
import {
  buildContextualWhatsAppUrl,
  buildWhatsAppUrl,
  normalizePhone,
} from "@/lib/whatsapp";

describe("normalizePhone", () => {
  it("remove máscara e mantém o DDI", () => {
    expect(normalizePhone("+55 95 99151-2122")).toBe("5595991512122");
  });
  it("acrescenta o DDI quando falta", () => {
    expect(normalizePhone("95 99151-2122")).toBe("5595991512122");
  });
});

describe("links do WhatsApp", () => {
  it("usa o número da Futura Tec e codifica a mensagem", () => {
    const url = new URL(buildWhatsAppUrl("Olá & tudo bem?"));
    expect(url.hostname).toBe("wa.me");
    expect(url.pathname).toBe("/5595991512122");
    expect(url.searchParams.get("text")).toBe("Olá & tudo bem?");
  });
  it("inclui o contexto da solução", () => {
    const text = new URL(buildContextualWhatsAppUrl("Redes")).searchParams.get("text");
    expect(text).toContain("Tenho interesse em: Redes.");
  });
  it("reconhece só links wa.me", () => {
    expect(isWhatsAppLink(buildWhatsAppUrl())).toBe(true);
    expect(isWhatsAppLink("https://exemplo.com/wa.me")).toBe(false);
    expect(isWhatsAppLink("mailto:futura@futura.ws")).toBe(false);
    expect(isWhatsAppLink(null)).toBe(false);
  });
});
