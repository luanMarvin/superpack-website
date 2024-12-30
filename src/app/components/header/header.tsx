import Image from "next/image";
import logo from "../../../../public/Images/superpacklogo.png";

export default function Header() {
    return (
        <header className="h-[62px] w-full bg-[#A9D4EE] flex items-center justify-start px-4">
            <Image
                src={logo}
                alt="logo"
                width={118}
                height={40}
                className="sm:w-[80px] md:w-[100px] lg:w-[118px]" // A logo eu criei para dar melhorar a págian e trazer mais profundidade.
            />
        </header>
    );
}
