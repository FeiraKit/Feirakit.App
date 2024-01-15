import { storage } from '../../firebaseConfig.js'

export const uploadImages = async (
  selectedImages,
  slugProduct,
  setUploadedImages
) => {
  const storageRef = storage.ref()
  const uploadPromises = []
  selectedImages.map(async (file) => {
    let fileName = null
    if (file.includes('file:///')) {
      fileName = file.substring(file.lastIndexOf('/') + 1)
    }

    if (file.includes('https://') || file.includes('http://')) {
      return setUploadedImages((prevState) => [...prevState, file])
    }

    const response = await fetch(file)
    let blob = await response.blob()
    const fileRef = storageRef.child(`images/${slugProduct}-${fileName}`)

    const uploadTask = fileRef.put(blob).then(async (snapshot) => {
      await snapshot.ref.getDownloadURL().then((url) => {
        setUploadedImages((prevState) => [...prevState, url])
      })
    })
    uploadPromises.push(uploadTask)
  })
  await Promise.all(uploadPromises)
}
