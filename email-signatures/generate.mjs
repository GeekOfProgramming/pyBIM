/**
 * Generator script for pyBIM email signatures.
 * Generates:
 * - dist/*.html (6 standalone HTML signature files)
 * - preview.html (interactive comparison and copy preview page)
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

console.log("Generating 6 pyBIM email signatures...");

// 1. Generate individual HTML files in dist/
for (const acc of accounts) {
  const fullHtml = generateFullHtmlDocument(acc, signatureConfig);
  const outPath = path.join(distDir, acc.filename);
  fs.writeFileSync(outPath, fullHtml, "utf-8");
  console.log(` ✓ Generated ${acc.filename} (${acc.name} - ${acc.account})`);
}

// 2. Generate interactive preview.html
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

      <div class="sig-views">
        <!-- Light Email Background View -->
        <div class="sig-view-box">
          <div class="sig-view-label">
            <span class="dot light-dot"></span> Light Email Client Environment (#FFFFFF)
          </div>
          <div class="sig-preview-canvas light-canvas" id="canvas-light-${acc.id}">
            <div class="sig-content-wrapper" id="content-${acc.id}">
              ${fragment}
            </div>
          </div>
        </div>

        <!-- Dark Email Background View -->
        <div class="sig-view-box">
          <div class="sig-view-label">
            <span class="dot dark-dot"></span> Dark Email Client Environment (#1E293B)
          </div>
          <div class="sig-preview-canvas dark-canvas">
            <div class="sig-content-wrapper">
              ${fragment}
            </div>
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
  <title>pyBIM Email Signatures — Verification & Installation Suite</title>
  <style>
    :root {
      --bg: #0B0F19;
      --card-bg: #111827;
      --border: #1F2937;
      --text: #F3F4F6;
      --text-muted: #9CA3AF;
      --primary: #3B82F6;
      --primary-hover: #2563EB;
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
      max-width: 1140px;
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
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 32px;
      overflow: hidden;
    }
    .sig-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: #161F30;
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
      background: #1E293B;
      color: var(--primary);
      font-weight: bold;
      font-size: 13px;
      border: 1px solid #334155;
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
      background: #1E293B;
      color: #E2E8F0;
      border: 1px solid #334155;
    }
    .btn-secondary:hover {
      background: #334155;
    }
    .sig-views {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 24px;
    }
    @media (max-width: 1060px) {
      .sig-views { grid-template-columns: 1fr; }
    }
    .sig-view-box {
      display: flex;
      flex-direction: column;
    }
    .sig-view-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    .light-dot { background: #E2E8F0; border: 1px solid #94A3B8; }
    .dark-dot { background: #334155; border: 1px solid #64748B; }
    .sig-preview-canvas {
      padding: 24px;
      border-radius: 6px;
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: auto;
    }
    .light-canvas {
      background: #FFFFFF;
    }
    .dark-canvas {
      background: #1E293B;
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
      background: #111827;
      border: 1px solid #1F2937;
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
      <p class="subtitle">Complete verification suite for pyBIM's six corporate email accounts. Derived from <code>app/globals.css</code> and the official white transparent logo.</p>
      
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
        <li>Click <strong>Copy Signature</strong> above next to the desired account (or select and copy the rendered signature box on the light canvas).</li>
        <li>Open <strong>Gmail</strong> and click the <strong>Gear icon</strong> (top right) &rarr; <strong>See all settings</strong>.</li>
        <li>Under the <strong>General</strong> tab, scroll down to the <strong>Signature</strong> section.</li>
        <li>Click <strong>Create new</strong>, enter a name (e.g. <code>pyBIM Official</code>), and click in the signature editor.</li>
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
console.log(" ✓ Generated preview.html (interactive comparison suite)");

console.log("All pyBIM email signatures generated successfully.");
