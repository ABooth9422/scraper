

$("#scrape").on("click",function(){
    var timer
    $("#load").show()
    $("#articleRow").hide()
    $.get("/scrape",function(response){
        if(response){
            timer=setTimeout(function(){
                location.reload() 
            },2000)
        }  
})
})

$("#clear").on("click",function(){
    console.log("clicked")
    $.post("/clear",function(response){
        location.reload()
    })
})

$(".buttonSave").on("click",function(){
    var id =$(this).data("id")
    console.log(id)
    $.post("/saveArticle/"+id).then(function(data){
        if(data){
        location.reload()
        }
    })
})
$(".buttonDelete").on("click",function(){
    var id=$(this).data("id")
    console.log(id)
    $.post("/removeSaved/"+id)
    .then(function(data){
        if(data){
            console.log("post successful")
            location.reload()
        }
    })

})

function update(){
    $.get("/").
    then(function(data){
        console.log("connection successful")
    })
}

$(".addNote").on("click",function(){
    var id=localStorage.getItem("id")
    console.log(id)
    var message=$("#message-text").val()
    var name=$("#commentName").val()
    var object={
        title:name,
        body:message
    }
    $.post("/addNote/"+id,object)
    .then(function(data){
        if(data){
            console.log("post successful")
        }
        $("#message-text").val("")
    })
   
})

$(".addNotes").on("click",function(){
    var id = $(this).data("id")
    localStorage.setItem("id",id)
    $("#message-text").val("")
   $("#commentName").val("")
    var noteRow=$("#comments")
    noteRow.empty()
    noteRow.addClass("bg-none")
    $.get("/allNotes/"+id,function(data){
        if(data){
            console.log(data.note)
            data.note.forEach(element => {
            var h1=$("<h1>")
            var h3=$("<h3>")
            var row=$("<div>")
            var button=$("<button>")
            button.text("Delete")
            button.addClass("deleteNote btn btn-danger")
            button.attr("test",element._id)
            h1.text(element.title)
            h3.text(element.body)
            h1.appendTo(row)
            h1.addClass("text-primary")
            h3.appendTo(row)
            h3.addClass("text-white")
            button.appendTo(row)
            h1.css("text-decoration","underline")
            row.addClass("bg-secondary my-2 p-3 rounded")
            row.css("box-shadow","black 3px 3px 3px")
            row.appendTo(noteRow)
            console.log("comments successfully added")
            });
            $(".deleteNote").on("click",function(){
                let id= $(this).attr("test")
                console.log(id)
                $.post("/deleteNote/"+id).then(function(data){
                    if(data){
                        $("#exampleModal").modal("hide")
                    }
                })
            })
        }
    })
})
