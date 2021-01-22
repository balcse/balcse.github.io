var pa_issues_url = "https://api.github.com/repos/balcse/londonsummer/issues?state=all&per_page=200"

function createissuetable(id){
  function printRepoCount() {
    var responseObj = JSON.parse(this.responseText);
    console.log(responseObj);
    var issuetablediv=document.getElementById("issuetable");
    var issuetable = issuetablediv.appendChild(document.createElement("table"));

    var heads=["Id","Title","Raised by","Created","Last update","Assignee(s)","Labels","Status"]


    function createheads(heads){
      var tablehead = issuetable.appendChild(document.createElement("tr"));
      for (head in heads){
        tablehead.appendChild(document.createElement("th")).innerHTML=heads[head];
      }
    }

    function createrows(rows){
      for (row in rows){
        let curr_row = issuetable.appendChild(document.createElement("tr"));
        curr_row.appendChild(document.createElement("td")).innerHTML="<a href="+rows[row].html_url+" target='_blank' >"+rows[row].number+"</a>";
        curr_row.appendChild(document.createElement("td")).innerHTML=rows[row].title;
        curr_row.appendChild(document.createElement("td")).innerHTML=rows[row].user.login;
        curr_row.appendChild(document.createElement("td")).innerHTML=(rows[row].created_at).replace("T"," ").replace("Z","");
        curr_row.appendChild(document.createElement("td")).innerHTML=(rows[row].updated_at).replace("T"," ").replace("Z","");
        curr_row.appendChild(document.createElement("td")).innerHTML=getsubobject(rows[row].assignees,"login");
        curr_row.appendChild(document.createElement("td")).innerHTML=getsubobject(rows[row].labels,"name");
        let state = curr_row.appendChild(document.createElement("td"))
        state.classList.add(rows[row].state);
        state.innerHTML=rows[row].state;

      }
    }

    function getsubobject(input,key){
      let output = []
      for (i in input){
        output.push(input[i][key])
      }
      return output.join(', ')

    }

    createheads(heads)
    createrows(responseObj)
    // issuetable.innerHTML=responseObj[0].title;
  }
  var request = new XMLHttpRequest();
  request.onload = printRepoCount;
  request.open('get', pa_issues_url, true)
  request.send()


}
