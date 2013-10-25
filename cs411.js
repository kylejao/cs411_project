// This function finds the list of categories and push them into the drop down
// list
newFunc(function() {
  ajaxCall(
    './post.php?request=category',
    null,
    function(result) {
      alert("update category success");
      var search_cat = $("#search_category");
      var post_cat = $("#post_category");
      for (var i=0; i<result.length; i++) {
        var option=document.createElement("option");
        option.text=result[i];
        search_cat.append(option);
        post_cat.append(option);
      }
    },
    function() {alert("update category error");}
  );
});

newClickHandler("post_button", function() {
  alert("post");
  ajaxCall(
    './post.php',
    { 
      method: 'post_question',
      question_desc: $("#question_text").val(),
      category: $("#category").val()
    },
    null,
    null,
    'post'
  );
});

newClickHandler("search_button", function() {
  alert("search");
  ajaxCall(
    './post.php',
    { 
      category: $("#category").val()
    },
    function(result) {
      // TODO: find html element and push result to it
    },
    null,
    'post'
  );
});

newClickHandler("update_button", function() {
  alert("update");
  ajaxCall(
    './post.php',
    {
      question_id: $("#question_id").val(),
      question_desc: $("#question_text").val()
    },
    null,
    null,
    'post'
  );
});

newClickHandler("delete_button", function() {
  alert("delete");
  ajaxCall(
    './post.php',
    {
      method: 'delete_question',
      question_id: $("#question_id").val()
    },
    null,
    null,
    'post'
  );
});

// Helper functions

function newFunc(func) {
  $(document).ready(func);
}

function newClickHandler(id, callback) {
  newFunc(function() {
    id = "#"+id;
    $(id).click(callback);
  });
}

function ajaxCall(url, data, successCallback, errorCallback, type) {
  if (typeof type === "undefined") {
    type = 'get';
  }
  $.ajax({
    url: url,
    type: type,
    dataType: 'json',
    data: data,
    success: successCallback,
    error: errorCallback
  });
}
