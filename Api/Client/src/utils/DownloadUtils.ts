export const downloadBase64Image = (file: string, base64Data: string) => {
    const a = document.createElement('a')
    a.href = base64Data
    a.download = file
    a.click()
}
