// react를 기본적으로 import 해줘야 함
import React from 'react';

// link import 해주기
import { Link } from 'react-router-dom';

function Nav ()
{
    return 
    {
        <nav>
            <ol>
                <li><Link to="/html">HTML</Link></li>
                <li><Link to="/css">CSS</Link></li>
                <li><Link to="/js">JAVASCRIPT</Link></li>
            </ol>
        </nav>
    }
};

export default Nav;