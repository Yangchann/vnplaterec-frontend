import "./globals.css";
import { UserUUIDProvider } from '@/context/UserUUIDContext';
import { LikeOutlined, SearchOutlined, ThunderboltOutlined, VideoCameraOutlined } from '@ant-design/icons';
import InformationTag from "@/components/InformationTag";
import { Button, Image } from 'antd';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className='flex flex-col w-full h-[220px] items-center justify-center py-10 px-10'>
          <h1 className='title text-5xl pl-4'>PlateReader <SearchOutlined className="text-4xl icon animate-pulse" /></h1>
          <h3 className='subtitle text-xl'>Smart license plate recognition technology</h3>
          <div className="flex w-full items-center justify-center mt-4 gap-4">
            <Button href="/" className="text-2xl"> Upload image</Button>
            <Button href="/camera" className="text-2xl"> Live recognition</Button>
          </div>
        </div>
        <UserUUIDProvider>
          {children}
        </UserUUIDProvider>

        <div className='grid grid-cols-3 gap-10 w-full mt-8 px-10'>
          <div className='flex flex-col'>
            <InformationTag icon={<LikeOutlined className="text-xl icon" />}
              title="Smart Recognition"
              description="Powered by advanced AI models for high accuracy" />
          </div>
          <div className='flex flex-col'>
            <InformationTag icon={<ThunderboltOutlined className="text-xl icon" />}
              title="Real-time Speed"
              description="Process in under 400 milliseconds" />
          </div>
          <div className='flex flex-col'>
            <InformationTag icon={<VideoCameraOutlined className="text-xl icon" />}
              title="Camera & Upload"
              description="Camera or upload image for recognition" />
          </div>

        </div>
        <div className='overflow-hidden w-[100vw]  h-[90px] z-[100]'>
          <div className="animated-line" style={{ animationDelay: '0s' }} >
            <Image alt="Animated" src="/car_blue.png" width={"150px"} height={"80px"} style={{ objectFit: 'contain' }}/>
          </div>
          <div className="animated-line" style={{ animationDelay: '5s' }} >
            <Image alt="Animated" src="/bike_yellow.png" width={"150px"} height={"80px"} style={{ objectFit: 'contain' }}/>
          </div>
          <div className="animated-line" style={{ animationDelay: '10s' }} >
            <Image alt="Animated" src="/car_red.png" width={"150px"} height={"80px"} style={{ objectFit: 'contain' }}/>
          </div>
          <div className="animated-line" style={{ animationDelay: '15s' }} >
            <Image alt="Animated" src="/car_yellow.png" width={"150px"} height={"80px"} style={{ objectFit: 'contain' }}/>
          </div>
        </div>
      </body>
    </html>
  );
}
