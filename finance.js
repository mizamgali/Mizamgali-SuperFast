document.addEventListener('DOMContentLoaded', function() {
    // Get the price from URL parameters if available
    const urlParams = new URLSearchParams(window.location.search);
    const carPrice = urlParams.get('price');
    
    if (carPrice) {
        document.getElementById('carPrice').value = carPrice;
    }

    document.getElementById('calculateBtn').addEventListener('click', function() {
        const price = parseFloat(document.getElementById('carPrice').value);
        const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
        const loanTerm = parseInt(document.getElementById('loanTerm').value);
        const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
        
        if (isNaN(price)) {
            alert('Please enter a valid vehicle price');
            return;
        }
        
        const loanAmount = price - downPayment;
        const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                              (Math.pow(1 + interestRate, loanTerm) - 1);
        const totalCost = monthlyPayment * loanTerm + downPayment;
        const totalInterest = totalCost - price;
        
        document.getElementById('monthlyPayment').textContent = '$' + monthlyPayment.toFixed(2);
        document.getElementById('totalInterest').textContent = '$' + totalInterest.toFixed(2);
        document.getElementById('totalCost').textContent = '$' + totalCost.toFixed(2);
        
        document.getElementById('results').style.display = 'block';
    });
});