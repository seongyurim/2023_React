// react를 기본적으로 import 해줘야 함
import React from 'react';

// link import 해주기
import { Link } from 'react-router-dom';

function Header ()
{
    return 
    {
        <header>
            <h1><Link to="/">Welcome to Web Technique!</Link></h1>
        </header>
    }
};

export default Header;