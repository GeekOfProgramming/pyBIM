/**
 * Central configuration for pyBIM email signatures.
 * 
 * Edit logo URLs and common parameters here. All signatures inherit these settings.
 */

export const signatureConfig = {
  // Production-verified public logo URL (HTTP 200, valid image/png, SHA256 matches repository asset)
  // Currently live on pyBIM's production CDN:
  logoUrl: "https://www.pybim.com/logo_white_transparent.png",
  
  // Future organized asset path (introduced on feature/site-background-system-v1 branch)
  // Switch to this once the asset migration branch merges to main and deploys:
  futureLogoUrl: "https://www.pybim.com/images/shared/brand/logo_white_transparent.png",

  // Dimensions
  totalWidth: 500,
  brandPanelWidth: 150,
  contactPanelWidth: 350,
  logoWidth: 100,
  logoHeight: 100,

  // Colors
  colors: {
    brandBase: "#080C14",       // Left Brand Panel Background
    brandSurface: "#0F172A",    // Right Contact Panel Background
    brandCardElevated: "#152237",
    brandBorder: "#1E293B",     // Outer border and separator
    brandPrimary: "#3B82F6",    // Accent bar / dot
    linkBlue: "#60A5FA",        // High-contrast link text on dark background
    textPrimary: "#F8FAFC",     // Ice white headline / name
    textSecondary: "#94A3B8",   // Silver gray secondary labels
  },

  // Fonts
  fontFamily: "Arial, Helvetica, sans-serif",
  fontMono: "'Courier New', Courier, monospace",
};
