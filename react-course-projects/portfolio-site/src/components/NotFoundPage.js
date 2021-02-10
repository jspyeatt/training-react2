import React from 'react';
import {Link} from 'react-router-dom';
const NotFoundPage = () => (
    <div>
        <div>
            404 - not found
            <Link to="/">Lost? go here.</Link>
        </div>
    </div>
);
export default NotFoundPage;