const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, '../screens');

// Get all .js files in the screens directory
const files = fs.readdirSync(screensDir).filter(file => file.endsWith('.js'));

// Convert each file to TypeScript
files.forEach(file => {
  const oldPath = path.join(screensDir, file);
  const newPath = path.join(screensDir, file.replace('.js', '.tsx'));
  
  // Read the file content
  let content = fs.readFileSync(oldPath, 'utf8');
  
  // Add type imports and definitions
  content = `import { NativeStackNavigationProp } from '@react-navigation/native-stack';\n${content}`;
  
  // Write the new TypeScript file
  fs.writeFileSync(newPath, content);
  
  // Remove the old JavaScript file
  fs.unlinkSync(oldPath);
  
  console.log(`Converted ${file} to TypeScript`);
}); 