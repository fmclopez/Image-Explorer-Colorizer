function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $("#imageURL").attr("src", reader.result);
      console.log("imageurl", $("#imageURL")[0].files[0].name)
    };

    reader.readAsDataURL(input.files[0]);

    var form = $('#uploadImage')[0]; 
    var formData = new FormData(form);     
    original_name = $("#imageURL")[0].files[0].name;
    // colorized_name = original_name.substr(0, original_name.lastIndexOf('.'));
    formData.append('imageURL', original_name);
    // formData.append('colorized', `colorized_${colorized_name}.png`);
    $.ajax({
      type: "POST",
      url: "/colorize",
      data: formData,
      //use contentType, processData for sure.
      contentType: false,
      processData: false
    }).done(function (data) {
      console.log("data hereee", data.file_name, data.colorized_name)
      window.location = `/colorizer/${data.file_name}/${data.colorized_name}`
    });

  } else { 
    removeUpload();
  }
}

function removeUpload() {
  $('.preview-tab').prop('disabled', true);
  $('.dl-btn').prop('disabled', true);
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
  $('#image-url').prop('disabled', false);
  $('.url-submit').prop('disabled', false);
  $('.file-upload-btn').prop('disabled', false);
  $('.image-name').hide();
  $('#origTag').removeClass("active");
  $('#colorTag').removeClass("active");
  $("#image-url").val('');
  $('.no-image').show();
  $('.no-image-text').show();
  $('.notif-box-success').hide();
  $('.notif-box-fail').hide();

  $('.no-image-box').show();
}