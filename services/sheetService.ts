import { MenuItem } from '../types';
import { GOOGLE_SHEET_CSV_URL } from '../constants';

const FALLBACK_MENU: MenuItem[] = [];

export async function fetchMenuData(): Promise<MenuItem[]> {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!response.ok) return FALLBACK_MENU;

    const csvText = await response.text();
    const rawRows = parseCSV(csvText);

    if (rawRows.length === 0) return FALLBACK_MENU;

    const headers = rawRows[0].map(h => h.trim());
    const dataRows = rawRows.slice(1);

    let processedItems: MenuItem[] = [];
    let lastGrupo = 'GENERAL';
    let lastCategory = 'Varios';

    for (let i = 0; i < dataRows.length; i++) {
      const rowArr = dataRows[i];
      const row: any = {};
      headers.forEach((header, idx) => {
        row[header] = (rowArr[idx] || "").trim();
      });

      const name = row['Producto'] || '';
      const ingredients = row['Ingredientes'] || '';
      const comment = row['Comentarios'] || row['Comentario'] || '';

      // If this row has no name, it might be a continuation of the previous item
      if (!name && (ingredients || comment) && processedItems.length > 0) {
        const lastItem = processedItems[processedItems.length - 1];
        if (ingredients) {
          lastItem.ingredients = lastItem.ingredients
            ? `${lastItem.ingredients}\n${ingredients}`
            : ingredients;
        }
        if (comment) {
          lastItem.comment = lastItem.comment
            ? `${lastItem.comment}\n${comment}`
            : comment;
        }
        continue;
      }

      // Fill-down logic for categories if they are empty
      if (row['Grupo']) lastGrupo = row['Grupo'];
      if (row['Categoría']) lastCategory = row['Categoría'];

      const grupo = lastGrupo;
      const category = lastCategory;
      const unit = row['Unidad'] || '';

      // Price handling
      const priceRaw = String(row['Precio'] || '').trim();
      let displayPrice = priceRaw;
      const numericPrice = parseFloat(priceRaw.replace(/\./g, '').replace(',', '.'));
      if (!isNaN(numericPrice) && /^[0-9.,$ ]+$/.test(priceRaw)) {
        displayPrice = formatPrice(numericPrice);
      }

      // Availability
      const availableRaw = String(row['Disponibilidad'] || 'SI').toUpperCase();
      const available = availableRaw === 'SI' || availableRaw === 'TRUE' || availableRaw === 'VERDADERO';

      // Label
      let label = (row['cartel'] || row['Label'] || '').trim();
      if (['NO', 'N/A', 'NONE', 'FALSE', '-'].includes(label.toUpperCase())) label = '';

      const isPromo = String(row['Promocion'] || 'NO').toUpperCase() === 'SI';
      const veggie = String(row['Veggie'] || 'NO').toUpperCase() === 'SI';
      const vegan = String(row['Vegan'] || 'NO').toUpperCase() === 'SI';

      processedItems.push({
        id: `item-${processedItems.length}`,
        grupo,
        category,
        name,
        ingredients,
        comment,
        unit,
        price: displayPrice,
        available,
        isPromo,
        label,
        veggie,
        vegan,
        rating: 4.5 + (Math.random() * 0.5),
        reviewsCount: Math.floor(Math.random() * 80) + 5
      });
    }

    return processedItems;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return FALLBACK_MENU;
  }
}

/**
 * Proper CSV parser that handles newlines inside quoted cells
 */
function parseCSV(text: string): string[][] {
  const result: string[][] = [];
  let currentLine: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      currentField += '"';
      i++; // skip escaped quote
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentField);
      currentField = "";
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentLine.push(currentField);
      result.push(currentLine);
      currentLine = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }

  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField);
    result.push(currentLine);
  }

  return result;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  }).format(price);
}