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
  } catch (error) {
    const err = error as Error;
    if (err.name === 'AbortError') {
      throw new Error('Upload timed out');
    }
    throw new Error(`Upload failed: ${err.message}`);
  } finally {
    clearTimeout(timeoutId); 
  }
};