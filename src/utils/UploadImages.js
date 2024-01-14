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
    if (file[0] == 'f') {
      fileName = file.substring(file.lastIndexOf('/') + 1)
    } else {
      fileName = file.substring(file.lastIndexOf('*fk*'), file.lastIndexOf('?'))
    }

    const response = await fetch(file)
    let blob = await response.blob()
    const fileRef = storageRef.child(`images/*fk*${slugProduct}-${fileName}`)

    const uploadTask = fileRef.put(blob).then(async (snapshot) => {
      await snapshot.ref.getDownloadURL().then((url) => {
        setUploadedImages((prevState) => [...prevState, url])
      })
    })
    uploadPromises.push(uploadTask)
  })
  await Promise.all(uploadPromises)
}
