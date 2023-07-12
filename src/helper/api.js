// api.js

export async function fetchRecipes(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.meals || data.drinks || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function fetchCategories(categoryEndpoint) {
  try {
    const response = await fetch(categoryEndpoint);
    const data = await response.json();
    return data.meals || data.drinks || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
