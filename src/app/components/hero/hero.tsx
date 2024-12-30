'use client';

import { JSX, useEffect, useState } from "react";

interface HeroInterface {
    title: string,
    headline: string,
    videoUrl: string,
    subHeadline?: string
}

const Hero = ({ title, headline, videoUrl, subHeadline }: HeroInterface): JSX.Element => {
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);

    useEffect(() => {
        const extractVideoId = (url: string): string | null => {
            const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S+\?v=|(?:v|e(?:mbed))\/|\S+\?v%3D)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            //Esse regex foi feito para verificar a url do vídeo no youtube e evitar um problema causado pela URL obtida do site da groupsix, que não conseguiu ser executado pelo ifram
            // uma outra solução poderia ter sido usar uma biblioteca externa, mas o desafio pedia o uso do iframe
            const match = url.match(regex);
            return match ? match[1] : null;
        };
        const videoId = extractVideoId(videoUrl);
        if (videoId) {
            setEmbedUrl(`https://www.youtube.com/embed/${videoId}`); // esse é o link que vai ser acessado, que a força esteja com vocês
        }
    }, [videoUrl]);

    return (
        <div className="flex flex-col items-center justify-center mb-5">
            <h1 className="text-2xl md:text-3xl font-bold text-textTeal text-center px-4 pt-5 pb-3 md:max-w-[20vw] ">
                {title}
            </h1>
            <p className="text-base md:text-lg text-textTeal text-center px-4 pt-1 pb-3 md:max-w-[50vw]">
                {headline}
            </p>

            <div className="w-[88vw] h-[24vh] md:w-[50vw] md:h-[50vh] my-5">
                {embedUrl ? ( //Aqui o vídeo é indexado
                    <iframe
                        src={embedUrl}
                        width="100%"
                        height="100%"
                        className="rounded-lg "
                    ></iframe>
                ) : (
                    <p>Carregando vídeo...</p>
                )}
            </div>

            {subHeadline && ( // Opcional por conta da necessidade do desafio
                <p className="text-base md:text-lg text-textTeal text-center px-4 pt-1 pb-3 md:max-w-[50vw]">
                    {subHeadline}
                </p>
            )}
        </div>
    );
};

export default Hero;
