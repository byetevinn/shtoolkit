import { previewOutputDelivery } from '../../shared/output/output.delivery.js';

export function formatCopyContentOutput(items, options = {}) {
  if (!items.length) {
    return '';
  }

  if (options.pathsOnly) {
    return items.map((item) => item.displayPath || item.path).join('\n');
  }

  const separator = options.noSeparator
    ? '\n\n'
    : '\n\n----------------------------------------\n\n';

  return items.map((item) => `${item.displayPath || item.path}\n\n${item.content}`).join(separator);
}

export function formatCopyContentDryRun(result, output, options = {}) {
  const deliveryConfig = {};
  if (options.copyAs) {
    deliveryConfig.mode = options.copyAs;
  }
  if (options.textMaxChars !== null) {
    deliveryConfig.textMaxChars = options.textMaxChars;
  }

  const preview = previewOutputDelivery({
    content: output,
    config: { output: deliveryConfig }
  });

  const filesList = result.outputItems.map((item) => `- ${item.displayPath || item.path}`).join('\n');
  const estTokens = Math.ceil(output.length / 4);

  return `
📋 Copy Content Dry Run

📁 Total Files : ${result.stats.total}
✅ Processed   : ${result.stats.success}
⏭ Skipped     : ${result.stats.skipped}
❌ Errors      : ${result.stats.errors}
📄 Total Lines : ${result.stats.lines}
🔢 Characters  : ${output.length}
🧠 Est. Tokens : ~${estTokens}
🚚 Delivery    : ${preview.delivery}
📦 File Name   : shtoolkit-copy-content.txt

Files:
${filesList}
`.trim();
}
