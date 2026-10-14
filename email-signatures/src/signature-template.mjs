/**
 * Signature HTML template generator.
 * Produces clean, standards-compliant, inline-styled HTML tables
 * optimized for Gmail and desktop Outlook insertion.
 * 
 * Rules:
 * - Table layout with explicit dimensions, cellpadding="0", cellspacing="0", border="0"
 * - All colors and font styles defined inline
 * - aria-hidden="true" on purely decorative elements
 * - Meaningful alt text on logo
 * - No CSS flexbox/grid, no external stylesheets, no scripts, no web fonts
 */

export function generateSignatureFragment(account, config) {
  const { colors, fontFamily, logoUrl, logoWidth, logoHeight, brandPanelWidth, contactPanelWidth, totalWidth } = config;

  const personalRow = account.personalLinkedIn ? `
    <tr>
      <td style="padding: 1px 0; font-family: ${fontFamily}; font-size: 11px; line-height: 16px; color: ${colors.textSecondary}; white-space: nowrap;">
        <span style="display: inline-block; width: 110px; color: ${colors.textSecondary};">${account.labels.personalLinkedIn}:</span>
        <a href="${account.personalLinkedIn}" target="_blank" rel="noopener noreferrer" style="color: ${colors.linkBlue}; text-decoration: none; font-weight: 500;">
          ${account.personalLinkedInDisplay}
        </a>
      </td>
    </tr>
  ` : "";

  return `<!-- pyBIM Branded Email Signature - ${account.name} (${account.account}) -->
<table cellpadding="0" cellspacing="0" border="0" width="${totalWidth}" style="width: ${totalWidth}px; max-width: ${totalWidth}px; min-width: ${totalWidth}px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: ${colors.brandBase}; border: 1px solid ${colors.brandBorder}; border-radius: 4px; overflow: hidden; font-family: ${fontFamily};">
  <tr>
    <!-- LEFT PANEL: Brand & Official Logo -->
    <td width="${brandPanelWidth}" valign="middle" align="center" style="width: ${brandPanelWidth}px; background-color: ${colors.brandBase}; padding: 18px 12px; text-align: center; vertical-align: middle; border-right: 1px solid ${colors.brandBorder};">
      <a href="${account.website}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none; border: 0; outline: none;">
        <img src="${logoUrl}" alt="pyBIM Logo" width="${logoWidth}" height="${logoHeight}" style="display: block; width: ${logoWidth}px; height: ${logoHeight}px; max-width: ${logoWidth}px; max-height: ${logoHeight}px; border: 0; outline: none; margin: 0 auto;" />
      </a>
    </td>

    <!-- RIGHT PANEL: Identity & Verified Channels -->
    <td width="${contactPanelWidth}" valign="top" style="width: ${contactPanelWidth}px; background-color: ${colors.brandSurface}; padding: 16px 20px; vertical-align: top; text-align: left;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <!-- Identity / Name -->
        <tr>
          <td style="font-family: ${fontFamily}; font-size: 16px; font-weight: bold; line-height: 20px; color: ${colors.textPrimary}; letter-spacing: -0.2px;">
            ${account.name}
          </td>
        </tr>

        <!-- Secondary Brand Identity / Capability Subline -->
        <tr>
          <td style="padding-top: 2px; font-family: ${fontFamily}; font-size: 11px; line-height: 15px; color: ${colors.textSecondary}; letter-spacing: 0.3px; text-transform: uppercase;">
            ${account.brandSubtitle}
          </td>
        </tr>

        <!-- Subtle Technical Divider -->
        <tr>
          <td style="padding: 8px 0 10px 0;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td height="1" style="height: 1px; line-height: 1px; font-size: 1px; background-color: ${colors.brandBorder};">
                  <table cellpadding="0" cellspacing="0" border="0" width="36" style="width: 36px; border-collapse: collapse;">
                    <tr>
                      <td height="1" style="height: 1px; line-height: 1px; font-size: 1px; background-color: ${colors.brandPrimary};"></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Contact Rows -->
        <tr>
          <td style="padding: 1px 0; font-family: ${fontFamily}; font-size: 11px; line-height: 16px; color: ${colors.textSecondary}; white-space: nowrap;">
            <span style="display: inline-block; width: 110px; color: ${colors.textSecondary};">${account.labels.email}:</span>
            <a href="mailto:${account.account}" style="color: ${colors.linkBlue}; text-decoration: none; font-weight: 500;">
              ${account.account}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 1px 0; font-family: ${fontFamily}; font-size: 11px; line-height: 16px; color: ${colors.textSecondary}; white-space: nowrap;">
            <span style="display: inline-block; width: 110px; color: ${colors.textSecondary};">${account.labels.website}:</span>
            <a href="${account.website}" target="_blank" rel="noopener noreferrer" style="color: ${colors.linkBlue}; text-decoration: none; font-weight: 500;">
              ${account.websiteDisplay}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 1px 0; font-family: ${fontFamily}; font-size: 11px; line-height: 16px; color: ${colors.textSecondary}; white-space: nowrap;">
            <span style="display: inline-block; width: 110px; color: ${colors.textSecondary};">${account.labels.companyLinkedIn}:</span>
            <a href="${account.companyLinkedIn}" target="_blank" rel="noopener noreferrer" style="color: ${colors.linkBlue}; text-decoration: none; font-weight: 500;">
              ${account.companyLinkedInDisplay}
            </a>
          </td>
        </tr>
        ${personalRow}
      </table>
    </td>
  </tr>
</table>`;
}

/**
 * Wraps signature fragment in a full standalone HTML document for direct file viewing.
 */
export function generateFullHtmlDocument(account, config) {
  const fragment = generateSignatureFragment(account, config);

  return `<!DOCTYPE html>
<html lang="${account.language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>pyBIM Email Signature - ${account.name} (${account.account})</title>
  <style>
    body {
      margin: 24px;
      padding: 0;
      background-color: #F8FAFC;
      font-family: Arial, Helvetica, sans-serif;
    }
    .wrapper {
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    ${fragment}
  </div>
</body>
</html>
`;
}
