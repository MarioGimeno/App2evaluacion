// updateBucket.utils.ts
import axios from 'axios';

export async function uploadFileWithoutCredentials(
  fileBuffer: Buffer,
  key: string,
  contentType: string,
): Promise<string> {
  // Construye la URL pública del objeto en S3
  const bucket = 'app2evaluacion';        // Reemplaza con el nombre de tu bucket
  const region = 'us-east-1';        // Ejemplo: us-east-1
  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  // Realiza una petición PUT directamente a S3
  const response = await axios.put(url, fileBuffer, {
    headers: {
      'Content-Type': contentType,
    },
  });

  if (response.status === 200) {
    // Si la subida fue exitosa, la URL del objeto es la misma que usamos
    return url;
  } else {
    throw new Error('Error al subir el archivo');
  }
}
