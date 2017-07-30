"use strict";

(function() {
    window.onload = function() {
        alert('ee');
        document.getElementById("moreProjectsBtn").onclick = function() {
            document.getElementById("moreProjectsBtn").style.display = 'none';
        }
    }
})