import FetchMeals from '../funcs/FetchMeals';

const mockFetch = (data) => jest.spyOn(global, 'fetch').mockResolvedValue({
  json: jest.fn().mockResolvedValue(data),
});

describe('FetchMeals - Casos de Sucesso', () => {
  test('Deve fazer a busca por ingrediente', async () => {
    const data = {
      drinks: [
        { strDrink: 'Drink 1' },
        { strDrink: 'Drink 2' },
      ],
    };
    mockFetch(data);

    const setSearchInput = jest.fn();
    const setSearchResults = jest.fn();

    const store = {
      searchType: 'ingredient',
      searchInput: 'lemon',
      setSearchInput,
      setSearchResults,

    };

    await FetchMeals(store);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=lemon',
    );
    expect(setSearchResults).toHaveBeenCalledWith(data);
    expect(setSearchInput).toHaveBeenCalledWith('');
  });

  test('Deve fazer a busca por letra', async () => {
    const data = {
      drinks: [{ strDrink: 'Drink 1' }, { strDrink: 'Drink 2' }],
    };
    mockFetch(data);
    const setSearchInput = jest.fn();
    const setSearchResults = jest.fn();
    const store = {
      searchType: 'letter',
      searchInput: 'a',
      setSearchInput,
      setSearchResults,
    };
    await FetchMeals(store);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
    );
    expect(setSearchResults).toHaveBeenCalledWith(data);
    expect(setSearchInput).toHaveBeenCalledWith('');
  });
});
describe('FetchMeals - Caso Padrão', () => {
  test('não deve chamar fetch para o caso padrão', async () => {
    const setSearchInput = jest.fn();
    const setSearchResults = jest.fn();

    const store = {
      searchType: 'outraCoisa', // Valor que não corresponde a 'ingredient', 'name' ou 'letter'
      searchInput: 'qualquerInput',
      setSearchInput,
      setSearchResults,
    };

    await FetchMeals(store);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(setSearchResults).not.toHaveBeenCalled();
  });
  test('Deve retornar imediatamente se searchInput for vazio ou não definido', async () => {
    const store = {
      searchType: 'ingredient',
      searchInput: '',
      setSearchInput: jest.fn(),
      setSearchResults: jest.fn(),
    };

    await FetchMeals(store);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(store.setSearchResults).not.toHaveBeenCalled();
    expect(store.setSearchInput).toHaveBeenCalled();
    expect(store.setSearchInput).toHaveBeenCalledWith('');
  });
});
