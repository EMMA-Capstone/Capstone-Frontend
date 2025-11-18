import Image from 'next/image';

interface CompostBinImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function CompostBinIllustration({
  src = '/compost-bin.jpeg',
  alt = 'Compost bin illustration',
  className = '',
}: CompostBinImageProps) {
  return (
    <div className={`w-full flex justify-center my-8 sm:my-16 ${className}`}>
      <div className="relative w-full max-w-4xl aspect-4/1">
        <Image
          src={src}
          alt={alt}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
