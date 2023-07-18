import Profile from '../pages/Profile';
import FoodProvider from '../contexts/FoodProvider';
import renderWithRouter from '../renderWithRouter';

describe('Componente <Profile.js />', () => {
  test('Teste se a página contém as informações do usuário', () => {
    renderWithRouter(
      <FoodProvider>
        <Profile />
      </FoodProvider>,
    );
  });
});
