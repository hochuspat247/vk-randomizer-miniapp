import VKSansExpanded from "../assets/fonts/VK Sans Display Expanded Regular.ttf"
import VKSansDisplay from "../assets/fonts/VKSansDisplay-Regular.ttf"

export const Fonts = () => (
  <style>
    {`
      @font-face {
        font-family: 'VK Sans Display Expanded';
        src: url(${VKSansExpanded}) format('truetype');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'VK Sans Display';
        src: url(${VKSansDisplay}) format('truetype');
        font-weight: 400;
        font-style: normal;
      }

      body {
        font-family: 'VK Sans Display Expandedt';
        font-family: 'VK Sans Display';
      }
    `}
  </style>
);
