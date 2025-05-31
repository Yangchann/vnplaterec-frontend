import React from "react";

interface InformationTagProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
export default function InformationTag({ icon, title, description }: InformationTagProps) {
  return (
    <div className='items-center justify-center rounded-xl shadow-xl/10  p-6'>
      <div className='flex items-center justify-center'>
        <div className='mr-4 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center'>{icon}</div>
        <h2 className='text-2xl title'>{title}</h2>
      </div>
      <p className='text-md subtitle mt-3 text-center'>{description}</p>
    </div>
  );
}