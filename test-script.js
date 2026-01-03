try {
    document.getElementById('s3').innerText = "PASS";
    document.getElementById('s3').className = "ok";
} catch (e) {
    document.getElementById('s3').innerText = "ERROR: " + e.message;
    document.getElementById('s3').className = "fail";
}
