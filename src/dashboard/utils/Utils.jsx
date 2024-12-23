import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigFile from '../../../tailwind.config'; // Replace with the actual relative path

// Function to get Tailwind configuration
export const tailwindConfig = () => {
  return resolveConfig(tailwindConfigFile);
};


// Convert a hex color to RGB format
export const hexToRGB = (hex) => {
  let r = 0, g = 0, b = 0;

  if (hex.length === 4) {
    // Short hex format: #RGB
    r = parseInt(`${hex[1]}${hex[1]}`, 16);
    g = parseInt(`${hex[2]}${hex[2]}`, 16);
    b = parseInt(`${hex[3]}${hex[3]}`, 16);
  } else if (hex.length === 7) {
    // Full hex format: #RRGGBB
    r = parseInt(`${hex[1]}${hex[2]}`, 16);
    g = parseInt(`${hex[3]}${hex[4]}`, 16);
    b = parseInt(`${hex[5]}${hex[6]}`, 16);
  }

  return `${r},${g},${b}`;
};

// Format a number into a currency value (USD) with compact notation
export const formatValue = (value) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

// Format a number with compact notation (e.g., thousands, millions)
export const formatThousands = (value) =>
  Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);
