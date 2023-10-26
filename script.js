
var inputValue = document.getElementById('InputValue')
var SubmitBtn = document.getElementById('submit');
var EditBtn = document.getElementById('edit');
var main = document.getElementById('main');
var localStorageValue

//  ***********  page start focues  **********
document.getElementById('InputValue').focus();
//  *********** input par enter KeyPrees thay tyare submit function call thay  **********
inputValue.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        submit();
    }
})



//  ***********  clear localStroage Key   **********
function ClearLocalStroag() {
    localStorage.clear();
    location.reload();
}


//  ***********  Delete Localstroage Value  **********
function DeleteElement(i) {

    // ************** remove Element tag    ****************
    console.log(i);
    console.log(document.getElementById(`${i}`));
    main.removeChild(document.getElementById(`${i}`));

    // *********  remove Item for local stroage ***************

    console.log(localStorageValue);
    let localStorageReplace
    let UpdatedLocalStroageval
    localStorageValue.forEach(element => {
        console.log("element = " + element + "|");
        console.log("local element = " + localStorageValue[i]);
        if (localStorageValue[i] == element) {
            console.log("remove element = " + localStorageValue[i]);
            localStorageValue.splice(i, 1);
        }
    });


    localStorageReplace = localStorageValue + "";
    console.log("localStorageReplace = " + localStorageReplace.replace(/,/g, "|*"));
    UpdatedLocalStroageval = localStorageReplace.replace(/,/g, "|*");
    localStorage.setItem("UserValue", UpdatedLocalStroageval)


    if (localStorageValue.length == 0) {
        console.log("los length call ");
        localStorage.clear()
    }


    location.reload();



}


//  ***********  edit localStroage value  **********

var Edit_Li_ID
function EditElement(i) {
    console.log(localStorageValue[i]);
    SubmitBtn.style.display = 'none'
    EditBtn.style.display = 'block'
    inputValue.value = localStorageValue[i];

    // select edit element
    Edit_Li_ID = i
    console.log(Edit_Li_ID);
    return Edit_Li_ID;
}

EditBtn.addEventListener('click', () => {
    // var editValue = main.getElementsByTagName('li')[Edit_Li_ID];
    // var EditelementSelect = document.querySelectorAll(`.locastroagevalue `)[Edit_Li_ID];

    console.log(localStorageValue);
    console.log(localStorageValue[Edit_Li_ID]);

    localStorageValue[Edit_Li_ID] = inputValue.value;
    // var updatINdex = localStorageValue[Edit_Li_ID];
    // var updatedValue = inputValue.value;

    let localStorageReplace
    let EditLocalStroageval

    // local stroag ni value string ma kanvert karva mate
    localStorageReplace = localStorageValue + "";
    console.log("localStorageReplace = " + localStorageReplace.replace(/,/g, "|*"));
    EditLocalStroageval = localStorageReplace.replace(/,/g, "|*");
    localStorage.setItem("UserValue", EditLocalStroageval)

    // localStorage.setItem("UserValue", localStorageValue);
    location.reload();

})


//  ***********  Add value localStroage  **********

function submit() {
    if (inputValue.value == "") {
        alert("Enter the value first");
    }
    else if (localStorage.getItem("UserValue") != null && inputValue.value != null && inputValue.value != undefined) {
        localStorageValue = inputValue.value + "|*" + localStorage.getItem("UserValue");
        localStorage.setItem("UserValue", localStorageValue);
        location.reload();
        inputValue.value == "";
    } else {
        localStorageValue = inputValue.value;
        localStorage.setItem("UserValue", localStorageValue);
        location.reload();
        inputValue.value == "";

    }

    //  find ip address 


}

//  ***********  Print value Localstroage   *************************************
var li
function PrintLocalStroagValue() {
    localStorageValue = localStorage.getItem("UserValue").split("|*");
    console.log(localStorageValue);

    for (let i = 0; i < localStorageValue.length; i++) {
        li = document.createElement('li');
        li.innerHTML = `
                         ${[i + 1]}
                         <div class='locastroagevalue'>
                             ${localStorageValue[i]} 
                         </div>
                         <div>
                            <button class="${i}" onclick="EditElement(${i})" > ✏️ </button>  
                            <button class="${i}" onclick="DeleteElement(${i})" > ❎  </button>
                         </div> `;
        li.id = i;
        main.appendChild(li);
    }

}
PrintLocalStroagValue();



// ************ search  **************

function Searching() {

    let filter = document.getElementById('InputValue').value.toUpperCase();
    let div = document.getElementById('main');
    let li = div.getElementsByTagName('li');

    console.log(li);

    for (var i = 0; i < li.length; i++) {
        // console.log(li[i]);
        var LiValue = li[i];
        var textValue = LiValue.textContent || LiValue.innerHTML;
        console.log(textValue.toUpperCase());
        // console.log(indexOf(filter));
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }

}



// ************ PDF part  **************


document.getElementById('main_LI_PDF').onclick = function(){
    //  je teg pdf ma convert karvano hoy te
    var main = document.getElementById('main');
    // convert pdf formet selected tag
    html2pdf().from(main).save()
}


// ************ Voice to text Part  **************

document.getElementById('mick').addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    const words = document.querySelector('.words');
    words.appendChild(p);

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        console.log(transcript);
        document.getElementById("InputValue").innerHTML = transcript;
        // console.log(transcript);
    });
      
    if (speech == true) {
        recognition.start();
        recognition.addEventListener('end', recognition.start);
    }
})



