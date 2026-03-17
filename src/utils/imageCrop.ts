import * as ImageManipulator from "expo-image-manipulator";

export async function autoCrop(uri: string): Promise<string> {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          crop: {
            originX: 0,
            originY: 0,
            width: 1000,
            height: 1200,
          },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
    );

    return result.uri;
  } catch (e) {
    console.log("Crop error", e);
    return uri;
  }
}
