import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { ImUpload2 } from 'react-icons/im';
import { MdVideoLibrary } from 'react-icons/md';
import { MdSubscriptions } from 'react-icons/md';

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
    },
    {
        title: 'Library',
        path: '/library/upload',
        icon: <MdVideoLibrary />,
        cName: 'nav-text'
    }
    // ,
    // {
    //     title: 'Channels',
    //     path: '/channels',
    //     icon: <MdSubscriptions />,
    //     cName: 'nav-text'
    // }

];

// ,
//     {
//         title: 'Account',
//         path: `/users/${sessionUser?.id}`,
//         icon: <MdSwitchAccount />,
//         cName: 'nav-text'
//     }