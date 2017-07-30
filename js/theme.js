"use strict";

document.getElementById("lessProjectsBtn").classList.add('hidden');

document.getElementById("moreProjectsBtn").onclick = function() {
    document.getElementById("moreProjectsBtn").classList.add('hidden');
    document.getElementById("lessProjectsBtn").classList.remove('hidden');
};

document.getElementById("lessProjectsBtn").onclick = function() {
    document.getElementById("moreProjectsBtn").classList.remove('hidden');
    document.getElementById("lessProjectsBtn").classList.add('hidden');
};