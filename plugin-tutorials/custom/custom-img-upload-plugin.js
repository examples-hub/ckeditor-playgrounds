export function ImgCustomUploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return createImgUploadAdapter(loader);
    };
}

/** 上传图片到内存，方便演示，仅作为示例 */
function createImgUploadAdapter(loader) {
    return {
        upload: () => {
            return new Promise((resolve, reject) => {
                loader.file.then(file => {
                    const fileReader = new FileReader();

                    fileReader.addEventListener('load', function () {
                        resolve({
                            default: `${fileReader.result}`,
                        });
                    });

                    fileReader.readAsDataURL(file);
                });
            });
        },
    };
}
