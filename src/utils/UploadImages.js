/* eslint-disable consistent-return */
import { storage } from '../../firebaseConfig';

export const uploadImages = async (selectedImages, slugProduct, setUploadedImages) => {
  const storageRef = storage.ref();
  const uploadPromises = [];
  selectedImages.map(async (file) => {
    let fileName = null;
    if (file.includes('file:///')) {
      fileName = file.substring(file.lastIndexOf('/') + 1);
    }

    if (file.includes('https://') || file.includes('http://')) {
      return setUploadedImages((prevState) => [...prevState, file]);
    }

    const response = await fetch(file);
    const blob = await response.blob();
    const fileRef = storageRef.child(`images/fk*${slugProduct}-${fileName}`);

    const uploadTask = fileRef.put(blob).then(async (snapshot) => {
      await snapshot.ref.getDownloadURL().then((url) => {
        setUploadedImages((prevState) => [...prevState, url]);
      });
    });
    uploadPromises.push(uploadTask);
  });
  await Promise.all(uploadPromises);
};

export const removeImageInFirebaseStorage = (url) => {
  // Remove the image from Firebase Storage

  if (url.includes('https://firebasestorage.googleapis.com/')) {
    const deleteImage = url.substring(url.lastIndexOf('fk*'), url.lastIndexOf('?'));
    storage.ref(`images/${deleteImage}`).delete();
  }
};
