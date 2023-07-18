import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Provider from '../contexts/FoodProvider';

describe('Testa o componente FirstRecipes', () => {
  test('Testa se o componente é renderizado', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
