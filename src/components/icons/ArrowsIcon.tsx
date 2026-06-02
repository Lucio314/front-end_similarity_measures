import React from 'react';

function ArrowsIcon(){  
    return(
        <svg 
            className="lucide lucide-chevron w-5 h-5" 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#000000" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            aria-hidden="true"
        >
            <path id="fleche-bas" d="m6 9 6 6 6-6"></path>
            <path id="fleche-haut" d="m18 15-6-6-6 6"></path>
        </svg>
    )
    //Modif à faire dans le css, il faut dire que fleche haut est à la base invisible (visibility: hidden)
    //Lors de l'appui du button, on change les visibility
}

export default ArrowsIcon