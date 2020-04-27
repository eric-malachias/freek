#!/usr/bin/env node

import { Sentence } from './sentence'
import { isTemplateType, Template } from './template'

function getArguments (): string[] {
  return process.argv.slice(2)
}

function isString (mixed: unknown): mixed is string {
  return typeof mixed === 'string'
}

function run (): void {
  const [type, name] = ['controller', 'user email'] ?? getArguments()

  if (!isTemplateType(type) || !isString(name)) {
    throw new Error('Invalid command: try `freek controller user`')
  }

  const sentence = new Sentence(name)
  const template = new Template(type)
  const data = {
    'name.kebab': sentence.getKebab(),
    'name.pascal': sentence.getPascal(),
  }

  template.generateToFile(sentence, data)
}

run()
