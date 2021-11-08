$(function(){
    get_comment();
    post_comment();
});

//メッセージをgetする関数
function get_comment(){
    $.ajax({
        type: "get",
        url: "/chat_data_api",
        dataType: "json",
      })

        .done((res) => {
            let loginuserid = res.loginuserid;
            $("#comment_area").find(".comment_content").remove();

            for(var i=0;i<res.comments.length;i++){
                if(loginuserid==res.comments[i].user_id){
                    var html =
                '<div class="comment_content mb-4 text-right">'+
                '<span class="name d-block mb-1">' + res.comments[i].user.name +'</span>'+
                '<div class="d-inline-block bg-success border rounded-lg p-2 mw-50">'+
                '<span class="comment">' + res.comments[i].comment + '</span>'+
                '</div>';
                '</div>';
                }else{
                var html =
                '<div class="comment_content mb-4">'+
                '<span class="name d-block mb-1">' + res.comments[i].user.name +'</span>'+
                '<div class="d-inline-block bg-secondary border rounded-lg p-2 mw-50">'+
                '<span class="comment">' + res.comments[i].comment + '</span>'+
                '</div>';
                '</div>';
                }
                $('#comment_area').append(html);
            }
        })

        .fail((error) => {
            alert('接続エラーです(泣)');
        });
        setTimeout("get_comment()", 1000);
}

//メッセージをpostする関数
function post_comment(){
    $("#submit").click(function () {
        $.ajaxSetup({
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
      });
        $.ajax({
          type: "post",
          url: "/post",
          dataType: "json",
          data: {
            comment:$('#comment').val()
          },

        })
          .then((res) => {
            console.log(res);
            $('#comment').val('');
          })
          .fail((error) => {
            alert('接続エラーです(泣)');
          });
      });
}


