const dropArea = document.getElementById('drop-area');
const imageFile = document.getElementById('input-image');
const selectedImg = document.getElementById('view-img');
const uploadSection = document.getElementById('upload-section');

imageFile.addEventListener('change',selectImage);

function selectImage()
{
    let imgLink = URL.createObjectURL(imageFile.files[0]);
    selectedImg.src = imgLink;
}

dropArea.addEventListener('dragover', (event) =>
{
    event.preventDefault(); 
})

dropArea.addEventListener('drop',(event)=>
{
    event.preventDefault();
    imageFile.files = event.dataTransfer.files;
    selectImage();
})

function initializeCanvasWithUploadedImage()
{
    uploadSection.style.display='none';
}