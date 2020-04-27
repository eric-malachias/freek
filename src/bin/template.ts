import { join } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { Sentence } from './sentence'

export enum TemplateType {
  Controller = 'controller'
}

export function isTemplateType (mixed: unknown): mixed is TemplateType {
  return Object.values(TemplateType).includes(mixed as TemplateType)
}

export class Template {
  constructor (
    private readonly type: TemplateType,
  ) {}

  private generate (
    data: Record<string, string>,
  ): string {
    return this
      .getContent()
      .replace(
        /\{\{(.*?)\}\}/g,
        (_, path: string) => data[path] ?? '',
      )
  }

  private getContent (): string {
    return readFileSync(this.getPath()).toString()
  }

  private getPath (): string {
    return join(__dirname, 'templates', `${this.type}.txt`)
  }

  public generateToFile (sentence: Sentence, data: Record<string, string>): void {
    const content = this.generate(data)

    writeFileSync(
      join(process.cwd(), `${sentence.getKebab()}.controller.ts`),
      content,
    )
  }
}
