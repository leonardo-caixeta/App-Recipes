import { useHistory } from 'react-router-dom';

export default function useRedirectUser(path, id) {
  const history = useHistory();

  history.push(`/${path}/${id}`);
}
