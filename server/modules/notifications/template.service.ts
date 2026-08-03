import { NotificationChannel } from "@prisma/client";
import { TemplateRepository } from "./template.repository";
import { NotFoundError, ConflictError } from "@/server/shared/errors";

export interface RenderedTemplate {
  subject?: string;
  body: string;
  templateId: string | null;
  version: number | null;
}

/**
 * Single-pass, literal substitution only — `{{key}}` is replaced with the
 * plain string value of `variables[key]`, over the ORIGINAL template text.
 * The result is never re-scanned for further `{{...}}` patterns, which is
 * what prevents template injection: a variable value that itself contains
 * `{{something}}` is inserted as inert literal text, not re-interpreted.
 * There is no eval/Function call anywhere in this path.
 */
function renderTemplateString(template: string, variables: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    const value = variables[key];
    return value === undefined ? match : String(value);
  });
}

export class TemplateService {
  /** Falls back to English if no template exists for the requested locale — never throws for a missing translation. */
  static async render(key: string, channel: NotificationChannel, locale: string, variables: Record<string, string | number>): Promise<RenderedTemplate> {
    const template = (await TemplateRepository.findActive(key, channel, locale)) ?? (await TemplateRepository.findActive(key, channel, "en"));

    if (!template) {
      // No template configured for this (event, channel) combination — the
      // caller (QueueService) treats this as "nothing to send", not an error,
      // since not every event needs every channel.
      return { subject: undefined, body: "", templateId: null, version: null };
    }

    return {
      subject: template.subject ? renderTemplateString(template.subject, variables) : undefined,
      body: renderTemplateString(template.body, variables),
      templateId: template.id,
      version: template.version,
    };
  }

  /** Preview mode — render without any dispatch/queue side effects, for admin template editing UI. */
  static async preview(key: string, channel: NotificationChannel, locale: string, variables: Record<string, string | number>): Promise<RenderedTemplate> {
    return this.render(key, channel, locale, variables);
  }

  static async listAll() {
    return TemplateRepository.listAll();
  }

  /** Creating a template for an existing (key, channel, locale) auto-increments the version rather than overwriting — old versions are never mutated. */
  static async createVersion(key: string, channel: NotificationChannel, locale: string, subject: string | undefined, body: string) {
    const latest = await TemplateRepository.findLatestVersion(key, channel, locale);
    const version = (latest?.version ?? 0) + 1;
    return TemplateRepository.create({ key, channel, locale, version, subject, body });
  }

  static async deactivate(id: string) {
    const template = await TemplateRepository.findById(id);
    if (!template) throw new NotFoundError("Template not found.");
    return TemplateRepository.setActive(id, false);
  }

  static async activate(id: string) {
    const template = await TemplateRepository.findById(id);
    if (!template) throw new NotFoundError("Template not found.");
    const existingActive = await TemplateRepository.findActive(template.key, template.channel, template.locale);
    if (existingActive && existingActive.id !== id) {
      throw new ConflictError(`Version ${existingActive.version} is already active for ${template.key}/${template.channel}/${template.locale} — deactivate it first.`);
    }
    return TemplateRepository.setActive(id, true);
  }
}
