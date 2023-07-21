import FetchDrinks from '../funcs/FetchDrinks';

const mockFetch = (data) => jest.spyOn(global, 'fetch')
  .mockResolvedValue({
    json: jest.fn().mockResolvedValue(data),
  });

describe('FetchDrinks - Busca por Ingrediente', () => {
  test('deve chamar fetch com a URL correta para a busca por ingrediente', async () => {
    const data = {
      drinks: [
        { strDrink: 'Drink 1' },
        { strDrink: 'Drink 2' },
      ],
    };
    mockFetch(data);

    const store = {
      searchType: 'ingredient',
      searchInput: 'lemon',
      setSearchResults: jest.fn(),
    };

    await FetchDrinks(store);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon',
    );
    expect(store.setSearchResults).toHaveBeenCalledWith(data);
  });
  test('Deve fazer a busca por letra', async () => {
    const data = {
      drinks: [
        { strDrink: 'Drink 1' },
        { strDrink: 'Drink 2' },
      ],
    };
    mockFetch(data);

    const store = {
      searchType: 'letter',
      searchInput: 'a',
      setSearchResults: jest.fn(),
    };

    await FetchDrinks(store);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
    );
    expect(store.setSearchResults).toHaveBeenCalledWith(data);
  });
});
describe('FetchDrinks - Caso Padrão', () => {
  it('não deve chamar fetch para o caso padrão', async () => {
    const setSearchResults = jest.fn();
    const store = {
      searchType: 'outraCoisa', // Valor que não corresponde a 'ingredient', 'name' ou 'letter'
      searchInput: 'qualquerInput',
      setSearchResults,
    };

    await FetchDrinks(store);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('não deve chamar setSearchResults para o caso padrão', async () => {
    const setSearchResults = jest.fn();
    const store = {
      searchType: 'outraCoisa', // Valor que não corresponde a 'ingredient', 'name' ou 'letter'
      searchInput: 'qualquerInput',
      setSearchResults,
    };

    await FetchDrinks(store);

    expect(setSearchResults).not.toHaveBeenCalled();
  });
});
