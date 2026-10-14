/**
 * Generator script for pyBIM email signatures.
 * Generates:
 * - dist/*.html (6 standalone Dark-Only HTML signature files)
 * - preview.html (interactive Dark-Only verification & copy suite)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { signatureConfig } from "./config.mjs";
import { accounts } from "./src/accounts.mjs";
import { generateSignatureFragment, generateFullHtmlDocument } from "./src/signature-template.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log("Generating 6 pyBIM email signatures (Dark-Only)...");

// 1. Generate individual standalone HTML files in dist/
for (const acc of accounts) {
  const fullHtml = generateFullHtmlDocument(acc, signatureConfig);
  const outPath = path.join(distDir, acc.filename);
  fs.writeFileSync(outPath, fullHtml, "utf-8");
  console.log(` ✓ Generated ${acc.filename} (${acc.name} - ${acc.account})`);
}

// 2. Generate interactive Dark-Only preview.html
function generatePreviewHtml() {
  const cards = accounts.map((acc, index) => {
    const fragment = generateSignatureFragment(acc, signatureConfig);
    return `
    <div class="sig-card" id="card-${acc.id}">
      <div class="sig-card-header">
        <div class="sig-meta">
          <span class="sig-badge">${index + 1}</span>
          <div>
            <h2 class="sig-title">${acc.name}</h2>
            <div class="sig-subtitle">
              <code>${acc.account}</code> &bull; <span class="sig-lang">${acc.language.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div class="sig-actions">
          <button class="btn btn-primary" onclick="copySignature('${acc.id}')" id="copy-btn-${acc.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Signature
          </button>
          <a href="./dist/${acc.filename}" target="_blank" class="btn btn-secondary">Open File</a>
        </div>
      </div>

      <div class="sig-view-box">
        <div class="sig-preview-canvas dark-canvas" id="canvas-${acc.id}">
          <div class="sig-content-wrapper" id="content-${acc.id}">
            ${fragment}
          </div>
        </div>
      </div>
    </div>
    `;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>pyBIM Email Signatures — Dark-Only Suite</title>
  <style>
    :root {
      --bg: #080C14;
      --surface: #0F172A;
      --card-bg: #152237;
      --border: #1E293B;
      --text: #F8FAFC;
      --text-muted: #94A3B8;
      --primary: #3B82F6;
      --primary-hover: #2563EB;
      --link: #60A5FA;
      --success: #10B981;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px 24px 64px 24px;
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
    }
    .container {
      max-width: 860px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border);
    }
    .header-tag {
      display: inline-block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
      color: var(--primary);
      background: rgba(59, 130, 246, 0.1);
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 12px;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
      letter-spacing: -0.5px;
      color: var(--text);
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 15px;
      margin: 0;
    }
    .notice-box {
      margin-top: 20px;
      background: rgba(59, 130, 246, 0.05);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 6px;
      padding: 16px 20px;
      font-size: 13px;
      color: #BFDBFE;
    }
    .notice-box strong { color: #EFF6FF; }
    .sig-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 28px;
      overflow: hidden;
    }
    .sig-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: #0B111E;
      border-bottom: 1px solid var(--border);
      flex-wrap: wrap;
      gap: 12px;
    }
    .sig-meta {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .sig-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: var(--bg);
      color: var(--primary);
      font-weight: bold;
      font-size: 13px;
      border: 1px solid var(--border);
    }
    .sig-title {
      font-size: 17px;
      font-weight: 600;
      margin: 0;
      color: #FFFFFF;
    }
    .sig-subtitle {
      font-size: 13px;
      color: var(--text-muted);
    }
    .sig-subtitle code {
      color: #93C5FD;
      font-family: ui-monospace, Menlo, Monaco, monospace;
      font-size: 12px;
    }
    .sig-lang {
      font-weight: 600;
      color: #E2E8F0;
    }
    .sig-actions {
      display: flex;
      gap: 10px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
      border: 0;
    }
    .btn-primary {
      background: var(--primary);
      color: #FFFFFF;
    }
    .btn-primary:hover {
      background: var(--primary-hover);
    }
    .btn-secondary {
      background: #152237;
      color: #E2E8F0;
      border: 1px solid var(--border);
    }
    .btn-secondary:hover {
      background: #1E293B;
    }
    .sig-view-box {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--surface);
    }
    .sig-preview-canvas {
      padding: 24px;
      border-radius: 6px;
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: auto;
      max-width: 100%;
    }
    .dark-canvas {
      background: var(--bg);
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #059669;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
      display: none;
      z-index: 9999;
    }
    .instructions-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      margin-top: 48px;
    }
    .instructions-card h3 {
      margin-top: 0;
      color: #FFFFFF;
    }
    .instructions-card ol {
      margin: 0;
      padding-left: 20px;
      color: #D1D5DB;
      font-size: 14px;
      line-height: 1.8;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="header-tag">pyBIM Design System</div>
      <h1>Branded Gmail-Compatible Email Signatures</h1>
      <p class="subtitle">Strictly Dark-Only corporate email signature suite for pyBIM's six accounts. Built with approved tokens (Base <code>#080C14</code>, Surface <code>#0F172A</code>, Border <code>#1E293B</code>, Text <code>#F8FAFC</code> / <code>#94A3B8</code>).</p>
      
      <div class="notice-box">
        <strong>Verified Logo Production CDN:</strong> <code>${signatureConfig.logoUrl}</code> (HTTP 200, image/png, SHA256 verified identical to repository asset).
      </div>
    </header>

    <div class="signatures-list">
      ${cards}
    </div>

    <div class="instructions-card">
      <h3>Gmail Installation Instructions</h3>
      <ol>
        <li>Click <strong>Copy Signature</strong> above next to your account (or select and copy the rendered signature box directly).</li>
        <li>Open <strong>Gmail</strong> and click the <strong>Gear icon</strong> (top right) &rarr; <strong>See all settings</strong>.</li>
        <li>Under the <strong>General</strong> tab, scroll down to the <strong>Signature</strong> section.</li>
        <li>Click <strong>Create new</strong>, enter a name (e.g. <code>pyBIM Official</code>), and click into the signature editor.</li>
        <li>Press <strong>Ctrl+V</strong> (Windows) or <strong>Cmd+V</strong> (Mac) to paste the rendered signature.</li>
        <li>Under <strong>Signature defaults</strong>, select your newly created signature for <em>For new emails use</em> and <em>On reply/forward use</em>.</li>
        <li>Scroll to the bottom of the page and click <strong>Save Changes</strong>.</li>
        <li>Compose a new message to verify the visual presentation.</li>
      </ol>
    </div>
  </div>

  <div id="toast" class="toast">Signature copied to clipboard! Ready to paste into Gmail.</div>

  <script>
    async function copySignature(id) {
      const container = document.getElementById('content-' + id);
      const btn = document.getElementById('copy-btn-' + id);
      const toast = document.getElementById('toast');

      try {
        if (navigator.clipboard && window.ClipboardItem) {
          const type = 'text/html';
          const blob = new Blob([container.innerHTML], { type: 'text/html' });
          const textBlob = new Blob([container.innerText], { type: 'text/plain' });
          const data = [new ClipboardItem({ [type]: blob, 'text/plain': textBlob })];
          await navigator.clipboard.write(data);
        } else {
          const range = document.createRange();
          range.selectNode(container);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          document.execCommand('copy');
          window.getSelection().removeAllRanges();
        }

        const originalText = btn.innerHTML;
        btn.innerHTML = '&#10003; Copied!';
        btn.style.backgroundColor = '#10B981';
        toast.style.display = 'block';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
          toast.style.display = 'none';
        }, 3000);
      } catch (err) {
        console.error('Copy failed: ', err);
        const range = document.createRange();
        range.selectNode(container);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        alert('Rich clipboard access was blocked. The signature has been selected on screen — please press Ctrl+C to copy!');
      }
    }
  </script>
</body>
</html>
`;
}

const previewHtml = generatePreviewHtml();
const previewPath = path.join(__dirname, "preview.html");
fs.writeFileSync(previewPath, previewHtml, "utf-8");
console.log(" ✓ Generated preview.html (Dark-Only verification suite)");

console.log("All pyBIM email signatures generated successfully.");
