$( document ).ready(function() {
    // DOM ready

    // Test data
    /*
     * To test the script you should discomment the function
     * testLocalStorageData and refresh the page. The function
     * will load some test data and the loadProfile
     * will do the changes in the UI
     */
     //testLocalStorageData();
    // Load profile if it exits
   // loadProfile();

});

/**
 * Function that gets the data of the profile in case
 * thar it has already saved in localstorage. Only the
 * UI will be update in case that all data is available
 *
 * A not existing key in localstorage return null
 *
 */
function getLocalProfile(callback){
    var profileImgSrc      = localStorage.getItem("PROFILE_IMG_SRC");
    var profileName        = localStorage.getItem("PROFILE_NAME");
    var profileReAuthUser = localStorage.getItem("PROFILE_REAUTH_User");

    if(profileName !== null
            && profileReAuthUser !== null
            && profileImgSrc !== null) {
        callback(profileImgSrc, profileName, profileReAuthUser);
    }
}

/**
 * Main function that load the profile if exists
 * in localstorage
 */
function loadProfile() {
    if(!supportsHTML5Storage()) { return false; }
    // we have to provide to the callback the basic
    // information to set the profile
    getLocalProfile(function(profileImgSrc, profileName, profileReAuthUser) {
        //changes in the UI
        $("#profile-img").attr("src",profileImgSrc);
        $("#profile-name").html(profileName);
        $("#reauth-User").html(profileReAuthUser);
        $("#inputUser").hide();
        $("#remember").hide();
    });
}

/**
 * function that checks if the browser supports HTML5
 * local storage
 *
 * @returns {boolean}
 */
function supportsHTML5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

/**
 * Test data. This data will be safe by the web app
 * in the first successful login of a auth user.
 * To Test the scripts, delete the localstorage data
 * and comment this call.
 *
 * @returns {boolean}
 */
function testLocalStorageData() {
    if(!supportsHTML5Storage()) { return false; }
    localStorage.setItem("PROFILE_IMG_SRC", "//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" );
    localStorage.setItem("PROFILE_NAME", "César Izquierdo Tello");
    localStorage.setItem("PROFILE_REAUTH_User", "oneaccount@gmail.com");
}


function signIn(){
    var xmlhttp = new XMLHttpRequest();
    var username = document.getElementById("inputUser").value;
    var password = document.getElementById("inputPassword").value;
    var url = "/api_auth/authenticate";
    var params = "name="+ username + "&" + "password=" + password;

    // Fire ajax request
    xmlhttp.open("post", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
    params ='';


        xmlhttp.onreadystatechange = function () {
        // On Sucess save token an redirect to start page
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            console.log(myArr);

           // Check if log in was valid
            if (myArr.success) {
                localStorage.setItem("Auth_Token", myArr.token);

                location.replace("http://localhost:3000/main.html");
                // Decode Token
                var token = myArr.token;
                var decoded = jwt_decode(token);
                console.log(decoded);
                console.log(decoded._doc.name);

            }
            else{
                window.alert(myArr.message);
            }

        }
    };



}

