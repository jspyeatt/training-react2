import React from 'react';
const PortfolioItemPage = (props) => (
    <div>
        <div>
            This is the portfolio item page: {props.match.params.id}.
        </div>
    </div>
);
export default PortfolioItemPage;