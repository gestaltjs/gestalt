import { Project } from '@gestaltjs/core/common/models'
import { relativizePath } from '@gestaltjs/core/node/path'
import {
  formatGreen,
  formatBold,
  formatCyan,
  formatYellow,
} from '@gestaltjs/core/node/terminal'

type PrettyFormatOptions = {
  project: Project
}

export function prettyFormat(options: PrettyFormatOptions): string {
  const lines: string[] = []
  lines.push(formatGreen(formatBold('Project')))
  lines.push(`  ${formatBold('Name:')} ${options.project.configuration.name}`)
  lines.push(
    `  ${formatBold('Directory:')} ${relativizePath(options.project.directory)}`
  )
  lines.push(
    `  ${formatBold('Manifest:')} ${relativizePath(
      options.project.configuration.manifestPath
    )}`
  )
  lines.push(``)

  const plugins = options.project.configuration.plugins ?? []
  if (plugins.length !== 0) {
    lines.push(formatGreen(formatBold('Plugins 🌱')))
    plugins.forEach((plugin) => {
      lines.push(`  ${formatBold(`${plugin.name}:`)}: ${plugin.description}`)
    })
    lines.push('')
  }

  const targets = options.project.targets
  if (Object.keys(targets).length !== 0 || Object.keys(targets).length !== 0) {
    lines.push(formatGreen(formatBold('Targets 📦')))
  }
  if (Object.keys(targets).length !== 0) {
    lines.push(`    ${formatCyan(formatBold('Main'))}`)
    Object.keys(targets).forEach((targetName) => {
      const target = targets[targetName]
      const targetMetadataPrefix = `        `
      lines.push(
        `${targetMetadataPrefix}${formatBold(`Directory:`)} ${relativizePath(
          target.directory
        )}`
      )
      lines.push(
        `${targetMetadataPrefix}${formatBold(`Manifest:`)} ${relativizePath(
          target.manifestPath
        )}`
      )
    })
  }

  lines.push(``)
  return lines.join('\n')
}
