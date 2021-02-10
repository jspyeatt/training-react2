import React from 'react';
import {Link} from 'react-router-dom';
const PortfolioPage = () => (
    <div>
        <div>
            This is the portfolio page
        </div>
        <ol>
            <li><Link to="/portfolio/1">Item 1</Link></li>
            <li><Link to="/portfolio/2">Item 2</Link></li>
        </ol>
    </div>
);
export default PortfolioPage;