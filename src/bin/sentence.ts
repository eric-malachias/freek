export class Sentence {
  constructor (
    private readonly raw: string,
  ) {}

  private getWords (): string[] {
    return this.raw
      .toLowerCase()
      .match(/[a-z][a-z0-9]+/g) ?? []
  }

  public getKebab (): string {
    return this
      .getWords()
      .join('-')
  }

  public getPascal (): string {
    return this
      .getWords()
      .map(word => word.replace(/^./, $0 => $0.toUpperCase()))
      .join('')
  }
}
