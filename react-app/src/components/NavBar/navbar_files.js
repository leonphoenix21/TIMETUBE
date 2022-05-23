import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { ImUpload2 } from 'react-icons/im';

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Upload',
        path: '/upload',
        icon: <ImUpload2 />,
        cName: 'nav-text'
    }

];

// ,
//     {
//         title: 'Account',
//         path: `/users/${sessionUser?.id}`,
//         icon: <MdSwitchAccount />,
//         cName: 'nav-text'
//     }