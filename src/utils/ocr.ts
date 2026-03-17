import * as FileSystem from "expo-file-system";

export async function runOCR(uri: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `OCR_RESULT_${base64.slice(0, 40)}`;
  } catch (e) {
    console.log("OCR error", e);
    return "";
  }
}
