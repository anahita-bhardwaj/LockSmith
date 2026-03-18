const passwordInput = document.getElementById("password")
const strengthFill = document.getElementById("strength-fill")
const strengthText = document.getElementById("strength-text")
const suggestions = document.getElementById("suggestions")
const generateBtn = document.getElementById("generate-btn")
const showPassword = document.getElementById("show-password")
const entropyText = document.getElementById("entropy-text")

// Calculate strength and suggestions
function calculateStrength(password){
    let score = 0
    let advice = []

    if(password.length >= 8) score++
    else advice.push("Use at least 8 characters")
    if(/[A-Z]/.test(password)) score++
    else advice.push("Add uppercase letters")
    if(/[0-9]/.test(password)) score++
    else advice.push("Add numbers")
    if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++
    else advice.push("Add special characters")

    return {score, advice}
}

// Calculate entropy
function calculateEntropy(password){
    let charset = 0
    if(/[a-z]/.test(password)) charset +=26
    if(/[A-Z]/.test(password)) charset +=26
    if(/[0-9]/.test(password)) charset +=10
    if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) charset +=32
    if(charset === 0) return {entropy:0, time:"0 seconds"}

    let entropy = Math.log2(Math.pow(charset, password.length))
    let guessesPerSec = 1e10
    let seconds = Math.pow(2, entropy) / guessesPerSec

    let displayTime
    if(seconds < 60) displayTime = seconds.toFixed(2)+" seconds"
    else if(seconds < 3600) displayTime = (seconds/60).toFixed(2)+" minutes"
    else if(seconds < 86400) displayTime = (seconds/3600).toFixed(2)+" hours"
    else if(seconds < 31536000) displayTime = (seconds/86400).toFixed(2)+" days"
    else displayTime = (seconds/31536000).toFixed(2)+" years"

    return {entropy: entropy.toFixed(2), time: displayTime}
}

// Update UI
function updateUI(password){
    const {score, advice} = calculateStrength(password)
    const {entropy, time} = calculateEntropy(password)

    if(score <= 1){
        strengthFill.style.width = "25%"
        strengthText.innerHTML = "Weak"
        strengthText.style.color = "red"
        strengthFill.style.background = "linear-gradient(90deg, red, darkred, red)"
        strengthFill.style.boxShadow = "0 0 12px red"
    }
    else if(score == 2){
        strengthFill.style.width = "50%"
        strengthText.innerHTML = "Medium"
        strengthText.style.color = "orange"
        strengthFill.style.background = "linear-gradient(90deg, orange, darkorange, orange)"
        strengthFill.style.boxShadow = "0 0 12px orange"
    }
    else if(score == 3){
        strengthFill.style.width = "75%"
        strengthText.innerHTML = "Good"
        strengthText.style.color = "yellowgreen"
        strengthFill.style.background = "linear-gradient(90deg, yellow, greenyellow, yellow)"
        strengthFill.style.boxShadow = "0 0 12px yellowgreen"
    }
    else{
        strengthFill.style.width = "100%"
        strengthText.innerHTML = "Strong"
        strengthText.style.color = "lime"
        strengthFill.style.background = "linear-gradient(90deg, lime, green, lime)"
        strengthFill.style.boxShadow = "0 0 16px lime"
    }

    suggestions.innerHTML = advice.join("<br>")
    entropyText.innerHTML = `Entropy: ${entropy} bits | Estimated crack time: ${time}`
}

// Events
passwordInput.addEventListener("input", () => updateUI(passwordInput.value))

generateBtn.addEventListener("click", function(){
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}"
    let password = ""
    for(let i=0;i<12;i++){
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    passwordInput.type = "text"
    passwordInput.value = password
    updateUI(password)
})

showPassword.addEventListener("change", function(){
    passwordInput.type = showPassword.checked ? "text" : "password"
})