$(document).ready(function () {
        $('#fileForm').submit(function (event) {

                event.preventDefault();
                $("#status").empty().text("File is uploading...");
                const files = document.getElementById("uploadedFile2");
                const formData = new FormData();
                console.log(files.files[0].name);
                formData.append("uploadedFile", files.files[0]);
                formData.append("action", "Submit File");

                let request = new XMLHttpRequest(); // create new AJAX request

                request.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) { // sucess from server
                                document.getElementById("status").innerHTML = 'sent' + this.responseText + request.status;
                        } else { // errors occured
                                document.getElementById("status").innerHTML = request.status;
                        }
                }

                request.open("POST", "/upload_files")
                request.send(formData)
        });
});

function deleteUser(id)
{
        alert("Delete");
}