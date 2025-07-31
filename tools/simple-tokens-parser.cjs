const fs = require('fs');
const path = require('path');

// Read all token files based on the new structure
function readTokenFiles() {
  const tokensDir = path.join(__dirname, '..', 'tokens');
  const metadata = JSON.parse(fs.readFileSync(path.join(tokensDir, '$metadata.json'), 'utf8'));
  const tokenSetOrder = metadata.tokenSetOrder;
  
  const allTokens = {};
  
  // Read each token set in order
  tokenSetOrder.forEach(tokenSet => {
    let filePath;
    
    if (tokenSet === 'global') {
      filePath = path.join(tokensDir, 'global.json');
    } else {
      // Handle nested paths like "primitive/Mode 1"
      const parts = tokenSet.split('/');
      if (parts.length === 2) {
        filePath = path.join(tokensDir, parts[0], `${parts[1]}.json`);
      } else {
        filePath = path.join(tokensDir, `${tokenSet}.json`);
      }
    }
    
    if (fs.existsSync(filePath)) {
      const tokenData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      allTokens[tokenSet] = tokenData;
    }
  });
  
  return allTokens;
}

// Function to flatten nested objects with proper path tracking
function flattenTokens(obj, prefix = '', result = {}, path = []) {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...path, key];
    const newKey = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.value !== undefined && value.type !== undefined) {
      // This is a token with a value and type
      result[newKey] = {
        value: value.value,
        type: value.type,
        path: currentPath
      };
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // This is a nested object, recurse
      flattenTokens(value, newKey, result, currentPath);
    }
  }
  return result;
}

// Function to sanitize keys for Tailwind
function sanitizeKey(key) {
  return key
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-')
    .toLowerCase();
}

// Function to resolve token references
function resolveTokenReference(value, tokenSets, defaultTokenSetName = 'Token/Mode 1') {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const refKey = value.slice(1, -1);
    const refToken = tokenSets[defaultTokenSetName]?.[refKey];
    if (refToken && refToken.value) {
      let resolvedValue = refToken.value;
      if (typeof resolvedValue === 'string' && resolvedValue.includes('rem')) {
        resolvedValue = `${parseFloat(resolvedValue) * 16}px`;
      } else if (typeof resolvedValue === 'number') {
        resolvedValue = `${resolvedValue}px`;
      }
      return resolvedValue;
    } else {
      // If reference not found, try to parse as number
      const numValue = parseFloat(refKey);
      if (!isNaN(numValue)) {
        return `${numValue}px`;
      }
    }
  }
  return value;
}

// Process all token files
const tokenSets = readTokenFiles();
const flatTokens = {};

// Flatten all token sets with smart naming
Object.entries(tokenSets).forEach(([setName, tokens]) => {
  // Use different strategies for different token sets
  if (setName === 'global') {
    // For global tokens, don't add prefix
    flattenTokens(tokens, '', flatTokens);
  } else if (setName === 'primitive/Mode 1') {
    // For primitive colors, use direct structure
    flattenTokens(tokens, '', flatTokens);
  } else if (setName === 'Token/Mode 1') {
    // For base tokens, don't add prefix
    flattenTokens(tokens, '', flatTokens);
  } else if (setName === 'semantic/Value-set') {
    // For semantic tokens, don't add prefix
    flattenTokens(tokens, '', flatTokens);
  } else {
    // For other sets, use minimal prefix
    const setPrefix = setName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    flattenTokens(tokens, setPrefix, flatTokens);
  }
});

// Organize by categories
const theme = {
  colors: {},
  fontFamily: {},
  fontSize: {},
  fontWeight: {},
  lineHeight: {},
  letterSpacing: {},
  spacing: {},
  borderRadius: {},
  boxShadow: {},
  typography: {}
};

// Process each token
Object.entries(flatTokens).forEach(([key, tokenData]) => {
  const { value, type } = tokenData;
  const sanitizedKey = sanitizeKey(key);
  
  try {
    switch (type) {
      case 'color':
        if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb'))) {
          theme.colors[sanitizedKey] = value;
        }
        break;
        
      case 'fontFamilies':
        // Remove 'fontfamilies-' prefix for Pretendard and Paperlogy fonts
        let fontKey = sanitizedKey;
        if (sanitizedKey === 'fontfamilies-pretendard') {
          fontKey = 'pretendard';
        } else if (sanitizedKey === 'fontfamilies-paperlogy') {
          fontKey = 'paperlogy';
        }
        theme.fontFamily[fontKey] = Array.isArray(value) ? value : [value];
        break;
        
      case 'fontSizes':
        const size = typeof value === 'number' ? `${value}px` : 
                     typeof value === 'string' && value.includes('rem') ? 
                     `${parseFloat(value) * 16}px` : 
                     typeof value === 'string' && value.includes('px') ? value :
                     `${value}px`;
        theme.fontSize[sanitizedKey] = size;
        break;
        
      case 'fontWeights':
        let weight = value;
        if (typeof value === 'string') {
          const weightMap = {
            'thin': '100',
            'extralight': '200', 
            'light': '300',
            'regular': '400',
            'medium': '500',
            'semibold': '600',
            'bold': '700',
            'extrabold': '800',
            'black': '900'
          };
          const normalized = value.toLowerCase().replace(/\s+/g, '');
          for (const [name, num] of Object.entries(weightMap)) {
            if (normalized.includes(name)) {
              weight = num;
              break;
            }
          }
        }
        theme.fontWeight[sanitizedKey] = weight.toString();
        break;
        
      case 'lineHeights':
        theme.lineHeight[sanitizedKey] = value;
        break;
        
      case 'letterSpacing':
        theme.letterSpacing[sanitizedKey] = value;
        break;
        
      case 'dimension':
        let spacing = resolveTokenReference(value, tokenSets);
        if (typeof spacing === 'string') {
          if (spacing.includes('rem')) {
            spacing = `${parseFloat(spacing) * 16}px`;
          } else if (!spacing.includes('px') && !spacing.includes('%')) {
            const numValue = parseFloat(spacing);
            if (!isNaN(numValue)) {
              spacing = `${numValue}px`;
            }
          }
        } else if (typeof spacing === 'number') {
          spacing = `${spacing}px`;
        }
        theme.spacing[sanitizedKey] = spacing;
        
        // Also add to borderRadius if it looks like a radius token
        if (key.includes('radius') || key.includes('border')) {
          theme.borderRadius[sanitizedKey] = spacing;
        }
        break;
        
      case 'boxShadow':
      case 'dropShadow':
        // Handle shadow tokens
        let shadowValue = '';
        if (typeof value === 'object' && value.x !== undefined) {
          const { x = 0, y = 0, blur = 0, spread = 0, color = 'rgba(0,0,0,0.1)' } = value;
          shadowValue = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
        } else if (Array.isArray(value)) {
          // Handle multiple shadows
          shadowValue = value.map(shadow => {
            const { x = 0, y = 0, blur = 0, spread = 0, color = 'rgba(0,0,0,0.1)' } = shadow;
            return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
          }).join(', ');
        }
        if (shadowValue) {
          theme.boxShadow[sanitizedKey] = shadowValue;
        }
        break;
        
      case 'typography':
        // Handle typography tokens
        if (typeof value === 'object') {
          const typographyStyle = {};
          
          // Helper function to resolve token reference
          const resolveRef = (ref) => {
            const refKey = ref.replace(/[{}]/g, '');
            
            // Try original key first
            let token = flatTokens[refKey];
            
            // If not found, try converting dots to dashes
            if (!token) {
              const dashKey = refKey.replace(/\./g, '-');
              token = flatTokens[dashKey];
            }
            
            // If still not found, try sanitized version
            if (!token) {
              const sanitizedRefKey = sanitizeKey(refKey);
              token = flatTokens[sanitizedRefKey];
            }
            
            return token || null;
          };
          
          // Process each typography property
          if (value.fontFamily) {
            const fontToken = resolveRef(value.fontFamily);
            if (fontToken) {
              typographyStyle.fontFamily = Array.isArray(fontToken.value) ? fontToken.value : [fontToken.value];
            }
          }
          
          if (value.fontWeight) {
            const weightToken = resolveRef(value.fontWeight);
            if (weightToken) {
              let weight = weightToken.value;
              if (typeof weight === 'string') {
                const weightMap = {
                  'thin': '100',
                  'extralight': '200', 
                  'light': '300',
                  'regular': '400',
                  'medium': '500',
                  'semibold': '600',
                  'bold': '700',
                  'extrabold': '800',
                  'black': '900'
                };
                const normalized = weight.toLowerCase().replace(/\s+/g, '');
                for (const [name, num] of Object.entries(weightMap)) {
                  if (normalized.includes(name)) {
                    weight = num;
                    break;
                  }
                }
              }
              typographyStyle.fontWeight = weight.toString();
            }
          }
          
          if (value.fontSize) {
            const sizeToken = resolveRef(value.fontSize);
            if (sizeToken) {
              const size = typeof sizeToken.value === 'number' ? `${sizeToken.value}px` : 
                           typeof sizeToken.value === 'string' && sizeToken.value.includes('rem') ? 
                           `${parseFloat(sizeToken.value) * 16}px` : 
                           typeof sizeToken.value === 'string' && sizeToken.value.includes('px') ? sizeToken.value :
                           `${sizeToken.value}px`;
              typographyStyle.fontSize = size;
            }
          }
          
          if (value.lineHeight) {
            const heightToken = resolveRef(value.lineHeight);
            if (heightToken) {
              typographyStyle.lineHeight = heightToken.value;
            }
          }
          
          if (value.letterSpacing) {
            const spacingToken = resolveRef(value.letterSpacing);
            if (spacingToken) {
              typographyStyle.letterSpacing = spacingToken.value;
            }
          }
          
          
          if (Object.keys(typographyStyle).length > 0) {
            theme.typography[sanitizedKey] = typographyStyle;
          }
        }
        break;
    }
  } catch (error) {
    console.warn(`Error processing token ${key}:`, error);
  }
});

// Add simplified color names for easier use
const primitiveColors = tokenSets['primitive/Mode 1']?.color;
if (primitiveColors) {
  Object.entries(primitiveColors).forEach(([colorName, colorShades]) => {
    Object.entries(colorShades).forEach(([shade, token]) => {
      if (token.value && token.type === 'color') {
        const key = sanitizeKey(`${colorName}-${shade}`);
        theme.colors[key] = token.value;
      }
    });
  });
}

// Add spacing values from Token set
const tokenSpacing = tokenSets['Token/Mode 1'];
if (tokenSpacing) {
  Object.entries(tokenSpacing).forEach(([key, token]) => {
    if (token.value && token.type === 'dimension') {
      const sanitizedKey = sanitizeKey(key);
      let spacing = token.value;
      if (typeof spacing === 'string' && spacing.includes('rem')) {
        spacing = `${parseFloat(spacing) * 16}px`;
      }
      theme.spacing[sanitizedKey] = spacing;
    }
  });
}

// Add semantic spacing from semantic/Value-set
const semanticTokens = tokenSets['semantic/Value-set'];
if (semanticTokens) {
  ['gap', 'padding', 'radius', 'size-height'].forEach(category => {
    if (semanticTokens[category]) {
      Object.entries(semanticTokens[category]).forEach(([key, token]) => {
        if (token.value && token.type === 'dimension') {
          const sanitizedKey = sanitizeKey(`${category}-${key}`);
          let value = resolveTokenReference(token.value, tokenSets);
          
          // Add both semantic names and simplified names
          if (category === 'radius') {
            theme.borderRadius[sanitizedKey] = value;
            theme.borderRadius[sanitizeKey(key)] = value; // Add simplified name
          } else {
            theme.spacing[sanitizedKey] = value;
            theme.spacing[sanitizeKey(key)] = value; // Add simplified name
          }
        }
      });
    }
  });
}

// Clean up empty objects
Object.keys(theme).forEach(key => {
  if (Object.keys(theme[key]).length === 0) {
    delete theme[key];
  }
});

// Create config directory if it doesn't exist
const configDir = path.join(__dirname, '..', 'config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir);
}

// Write the Tailwind config tokens
const configContent = `module.exports = ${JSON.stringify({ theme }, null, 2)};`;
fs.writeFileSync(path.join(configDir, 'tailwind.tokens.js'), configContent);


console.log('✅ Tailwind tokens generated successfully!');
console.log('📁 Output file: config/tailwind.tokens.js');
console.log('📊 Generated tokens:');
Object.entries(theme).forEach(([category, tokens]) => {
  console.log(`   ${category}: ${Object.keys(tokens).length} tokens`);
});

// Log some example token names for debugging
console.log('\n🔍 Sample tokens:');
console.log('Colors:', Object.keys(theme.colors).slice(0, 5).join(', '));
if (theme.fontSize) {
  console.log('Font sizes:', Object.keys(theme.fontSize).slice(0, 5).join(', '));
}
if (theme.spacing) {
  console.log('Spacing:', Object.keys(theme.spacing).slice(0, 5).join(', '));
}