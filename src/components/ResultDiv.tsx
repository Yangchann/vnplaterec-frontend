import { Image } from 'antd';
interface ResultDivProps {
  resultImg: string;
  plateText: string;
}
export default function ResultDiv({ resultImg, plateText }: ResultDivProps) {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className='h-[200px] flex items-center justify-center'>
        {resultImg && <Image src={resultImg} alt="Preview" height={190} style={{ objectFit: 'contain' }} />}
      </div>
      <div className='p-4 text-xl h-[100px] text-center flex items-center justify-center flex-wrap overflow-scroll'>
        {plateText.split(',').map((item, index) => (
          <p key={index} className='flex border border-2 border-[var(--blue)] p-1 m-1 text-nowrap font-mono'>{item}</p>
        ))}
      </div>
    </div>
  );
}