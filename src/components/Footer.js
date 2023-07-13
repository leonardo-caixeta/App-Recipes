import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link className="footerBtn" to="/drinks">
        <img alt="Drinks" src={ drinkIcon } data-testid="drinks-bottom-btn" />
      </Link>
      <Link className="footerBtn" to="/meals">
        <img alt="Meals" src={ mealIcon } data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
