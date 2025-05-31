'use client';
import React, { useEffect, useState } from 'react';
import { Button, Upload, message, Splitter, Image } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { useUserUUID } from '@/context/UserUUIDContext';
import { uploadImage, PredictResponse } from '@/services/uploadService';
import ResultDiv from '@/components/ResultDiv';

export default function Home() {
  const { userUUID } = useUserUUID();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<PredictResponse>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [plateText, setPlateText] = useState<string | null>(null);
  const props: UploadProps = {
    beforeUpload: (file) => {
      const preview = URL.createObjectURL(file); 
      setPreviewUrl(preview);

      const newFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: preview,
        originFileObj: file,
      };

      setFileList([newFile]);
      return false;
    },
    onRemove: () => {
      setFileList([]);
      setPreviewUrl(null);
    },
    fileList,
    listType: 'picture-card',
    maxCount: 1,
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('Please select an image');
      return;
    }
    if (userUUID === null) {
      return;
    }
    setUploading(true);
    setResult(undefined);

    try {
      const response = await uploadImage(fileList[0].originFileObj as File, userUUID);
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (result) {
      const timestamp = new Date().getTime();
      const platetext = result?.plate_text ? result.plate_text : 'unknown';
      setResultImg(process.env.NEXT_PUBLIC_API_URL + '/images/' + result?.result_path + '?t=' + timestamp);
      setPlateText(platetext === "unknown" ? "Please try again" : platetext);
    }
  }, [result]);

  return (
    <div className='flex flex-col w-[100vw] items-center justify-center px-10'>
      <Splitter className='rounded rounded-xl shadow-xl/20 h-[300px] w-full' >
        <Splitter.Panel defaultSize="50%" resizable={false}
          className='flex flex-col w-full items-center justify-center'>
          <Upload {...props}
            maxCount={1}
            accept="image/*"
            name="avatar"
            listType="picture-card"
            className="avatar-uploader w-full"
            showUploadList={false}
            style={{ height: '200px', width: '100%', borderColor: 'var(--blue)' }}
          >
            {previewUrl ?
              <Image src={previewUrl} alt="Preview" preview={false} height={190} style={{ objectFit: 'contain' }} /> :
              (<div><PictureOutlined className='text-4xl icon' /><br /> <h3 className='text-md font-bold text-[var(--gray)] mt-2'>Drop image or click to upload</h3></div>)
            }
          </Upload>
          <div className='h-[100px] flex items-center justify-center'>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ height: '50px', backgroundColor: 'var(--darkblue)', fontWeight: 'bold', paddingInline: '30px' }}
            >
              {uploading ? 'Reading...' : 'Upload image'}
            </Button>
          </div>
        </Splitter.Panel>
        <Splitter.Panel className='flex flex-col w-full h-full'>
          {resultImg && plateText && <ResultDiv resultImg={resultImg} plateText={plateText} />}
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}
