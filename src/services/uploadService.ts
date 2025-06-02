export type PredictResponse = {
  plate_text: string;
  result_path: string;
};
export const uploadImage = async (file: File, userId: string): Promise<PredictResponse> => {
  const BACKEND = process.env.NEXT_PUBLIC_API_URL;
  const formData = new FormData();
  formData.append('image', file);
  formData.append('id_user', userId);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(`${BACKEND}/predict`, {
      method: 'POST',
      body: formData,
      signal: controller.signal, 
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.json();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId); 
  }
};