import Image from 'next/image';

interface CompostBinImageProps {
    src: string;
    alt?: string;
    className?: string;
  }


export default function CompostBinIllustration  ({ 
    src = '/compost-bin.jpeg', 
    alt = 'Compost bin illustration',
    className = ''
  }: CompostBinImageProps)  {
    return (
    <div className={`mb-8 w-full ${className} flex justify-center my-16`}>
        <Image
            className='rounded-md'
            src={src}
            alt={alt}
            width={960}
            height={240}
        />
    </div>
    )  
};
  