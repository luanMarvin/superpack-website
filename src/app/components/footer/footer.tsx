import Image from "next/image";

import facebook from "../../../../public/Images/facebook.svg";
import instagram from "../../../../public/Images/instagram.svg";
import twitter from "../../../../public/Images/twitter.svg";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center px-5 py-10">
      <a href="https://www.instagram.com/ogruposix/" target="blank" className="text-textBlue my-2 text-center">
        Termos de Uso
      </a>
      <a href="https://www.instagram.com/ogruposix/" target="blank" className="text-textBlue my-2 text-center">
        Política de Privacidade
      </a>
      <div className="flex justify-center space-x-6 my-4"> {/** Os links abaixos poderiam ser subtituidos pelas redes sociais*/}
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="blank"><Image src={facebook} alt="Facebook" width={30} height={30} /></a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="blank"><Image src={instagram} alt="Instagram" width={30} height={30} /></a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="blank"><Image src={twitter} alt="Twitter" width={30} height={30} /></a>
      </div>
      <p className="text-textBlue my-2 text-center">
        © SuperPack
      </p>
    </footer>
  );
}
