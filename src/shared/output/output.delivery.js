import { copyToClipboard } from '../clipboard.js';
import { resolveOutputConfig, loadOutputConfig } from './output.config.js';
import { writeWindowsTempOutputFile } from './windows-temp-file.js';
import { copyWindowsFileToClipboard } from './windows-file-clipboard.js';

export function deliverOutput({ content, fileName, config }) {
  if (typeof content !== 'string') {
    throw new Error('Invalid content: Content must be a string.');
  }

  const baseConfig = loadOutputConfig();
  
  let resolvedConfig;
  if (config) {
    const manualOutput = config.output || config;
    resolvedConfig = resolveOutputConfig({
      output: {
        ...baseConfig,
        ...manualOutput,
      }
    });
  } else {
    resolvedConfig = baseConfig;
  }

  
  let deliveryMode = resolvedConfig.mode;
  if (deliveryMode === 'auto') {
    deliveryMode = content.length > resolvedConfig.textMaxChars ? 'file' : 'text';
  }

  if (deliveryMode === 'text') {
    const copied = copyToClipboard(content);
    if (!copied) {
      throw new Error('Failed to copy text to clipboard.');
    }

    return {
      delivered: true,
      delivery: 'text',
      mode: resolvedConfig.mode,
      contentLength: content.length,
      textMaxChars: resolvedConfig.textMaxChars
    };
  }

  if (deliveryMode === 'file') {
    if (!fileName || typeof fileName !== 'string') {
      throw new Error('Invalid fileName: A valid filename string is required when delivery mode is "file".');
    }

    const tempFile = writeWindowsTempOutputFile({ fileName, content });
    const clipboardResult = copyWindowsFileToClipboard(tempFile.filePath);

    if (!clipboardResult.copied) {
      throw new Error('Failed to copy temp file to Windows clipboard.');
    }

    return {
      delivered: true,
      delivery: 'file',
      mode: resolvedConfig.mode,
      contentLength: content.length,
      textMaxChars: resolvedConfig.textMaxChars,
      file: {
        filePath: tempFile.filePath,
        windowsPath: tempFile.windowsPath,
        fileName: tempFile.fileName
      }
    };
  }

  throw new Error(`Unsupported delivery mode: ${deliveryMode}`);
}
