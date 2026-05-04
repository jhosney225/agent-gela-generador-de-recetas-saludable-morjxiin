```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Base de datos de ingredientes con calorías por 100g
const ingredientsDB = {
  pollo: { calorias: 165, proteinas: 31, grasas: 3.6, carbohidratos: 0 },
  arroz: { calorias: 130, proteinas: 2.7, grasas: 0.3, carbohidratos: 28 },
  broccoli: { calorias: 34, proteinas: 2.8, grasas: 0.4, carbohidratos: 7 },
  salmon: { calorias: 208, proteinas: 20, grasas: 13, carbohidratos: 0 },
  huevo: { calorias: 155, proteinas: 13, grasas: 11, carbohidratos: 1.1 },
  manzana: { calorias: 52, proteinas: 0.3, grasas: 0.2, carbohidratos: 14 },
  espinaca: { calorias: 23, proteinas: 2.9, grasas: 0.4, carbohidratos: 3.6 },
  zanahoria: { calorias: 41, proteinas: 0.9, grasas: 0.2, carbohidratos: 10 },
  tomate: { calorias: 18, proteinas: 0.9, grasas: 0.2, carbohidratos: 3.9 },
  lechuga: { calorias: 15, proteinas: 1.2, grasas: 0.2, carbohidratos: 2.9 },
  cebolla: { calorias: 40, proteinas: 1.1, grasas: 0.1, carbohidratos: 9 },
  ajo: { calorias: 149, proteinas: 6.4, grasas: 0.5, carbohidratos: 33 },
  lentejas: { calorias: 116, proteinas: 9, grasas: 0.4, carbohidratos: 20 },
  garbanzos: { calorias: 164, proteinas: 8.9, grasas: 2.6, carbohidratos: 27 },
  avocado: { calorias: 160, proteinas: 2, grasas: 15, carbohidratos: 9 },
  platano: { calorias: 89, proteinas: 1.1, grasas: 0.3, carbohidratos: 23 },
  yogur: { calorias: 59, proteinas: 10, grasas: 0.4, carbohidratos: 3.3 },
  queso: { calorias: 402, proteinas: 25, grasas: 33, carbohidratos: 1.3 },
  aceite_oliva: { calorias: 884, proteinas: 0, grasas: 100, carbohidratos: 0 },
  pan_integral: { calorias: 247, proteinas: 8.4, grasas: 3.3, carbohidratos: 41 },
};

// Recetas predefinidas
const recetasBase = [
  {
    nombre: "Ensalada Griega Saludable",
    descripcion: "Ensalada fresca con ingredientes bajos en calorías",
    ingredientes: [
      { nombre: "tomate", cantidad: 200 },
      { nombre: "lechuga", cantidad: 150 },
      { nombre: "cebolla", cantidad: 50 },
      { nombre: "queso", cantidad: 50 },
    ],
    instrucciones: "1. Lavar verduras. 2. Cortar en trozos. 3. Mezclar. 4. Aderezar con aceite de oliva.",
  },
  {
    nombre: "Pechuga de Pollo con Brócoli",
    descripcion: "Proteína magra con vegetales",
    ingredientes: [
      { nombre: "pollo", cantidad: 200 },
      { nombre: "broccoli", cantidad: 300 },
      { nombre: "ajo", cantidad: 10 },
      { nombre: "aceite_oliva", cantidad: 10 },
    ],
    instrucciones: "1. Sazonar pollo. 2. Cocinar al horno 25 min a 180°C. 3. Saltear brócoli. 4. Servir juntos.",
  },
  {
    nombre: "Salmón a la Mostaza",
    descripcion: "Pescado rico en omega-3",
    ingredientes: [
      { nombre: "salmon", cantidad: 250 },
      { nombre: "limon", cantidad: 30 },
      { nombre: "ajo", cantidad: 10 },
    ],
    instrucciones: "1. Sasonar salmón. 2. Hornear 15 min a 200°C. 3. Servir con limón.",
  },
  {
    nombre: "Desayuno Proteico",
    descripcion: "Huevos con pan integral",
    ingredientes: [
      { nombre: "huevo", cantidad: 200 },
      { nombre: "pan_integral", cantidad: 50 },
      { nombre: "tomate", cantidad: 100 },
      { nombre: "espinaca", cantidad: 50 },
    ],
    instrucciones: "1. Freír huevos. 2. Tostar pan. 3. Agregar verduras. 4. Servir caliente.",
  },
];

// Clase para gestionar recetas
class Generador