<<<<<<< HEAD
import VKSansExpanded from "../assets/fonts/VK Sans Display Expanded Regular.ttf"
import VKSansDisplay from "../assets/fonts/VKSansDisplay-Regular.ttf"
=======
import VKSansExpanded from "../assets/fonts/VK Sans Display Expanded Regular.ttf";
import VKSansDisplay from "../assets/fonts/VKSansDisplay-Regular.ttf";
>>>>>>> main

export const Fonts = () => (
  <style>
    {`
      @font-face {
        font-family: 'VK Sans Display Expanded';
        src: url(${VKSansExpanded}) format('truetype');
<<<<<<< HEAD
        font-weight: 400;
=======
        font-weight: 700;
>>>>>>> main
        font-style: normal;
      }

      @font-face {
        font-family: 'VK Sans Display';
        src: url(${VKSansDisplay}) format('truetype');
        font-weight: 400;
        font-style: normal;
      }

      body {
<<<<<<< HEAD
        font-family: 'VK Sans Display Expandedt';
        font-family: 'VK Sans Display';
      }
    `}
  </style>
);
=======
        font-family: 'VK Sans Display', 'VK Sans Display Expanded';
      }
    `}
  </style>
);
>>>>>>> main
