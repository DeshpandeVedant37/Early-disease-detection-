const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");
const loader = document.getElementById("loader");

let selectedImage = null;

// Add entrance animations on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  selectedImage = file;
  analyzeBtn.disabled = false;

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  
  // Add loading effect
  preview.innerHTML = '<div style="text-align: center; padding: 20px; color: #94a3b8;">📸 Loading image...</div>';
  
  img.onload = () => {
    preview.innerHTML = "";
    preview.appendChild(img);
    
    // Show output section and add success message
    const outputSection = document.getElementById('outputSection');
    outputSection.style.display = 'block';
    
    result.innerHTML = '✅ <strong>Image loaded successfully!</strong><br/>Ready for AI analysis.';
    result.style.background = 'linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))';
    result.style.borderColor = 'rgba(34, 197, 94, 0.5)';
    
    // Animate button
    analyzeBtn.style.animation = 'pulse 1s ease-in-out 3';
  };
});

analyzeBtn.addEventListener("click", async () => {
  if (!selectedImage) return;

  // Disable button and show loading
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = '🔄 Analyzing...';
  loader.style.display = "block";
  
  // Add analyzing class for special effects
  result.classList.add('analyzing');
  result.innerHTML = '🤖 <strong>AI is analyzing your image...</strong><br/>Deep learning model processing...';

  // MOCK RESPONSE with realistic delay
  setTimeout(() => {
    loader.style.display = "none";
    result.classList.remove('analyzing');
    
    // Simulate different possible results
    const mockResults = [
      {
        prediction: 'Benign (Nevus)',
        confidence: '0.92',
        risk: 'Low',
        color: 'rgba(34, 197, 94, 0.1)',
        border: 'rgba(34, 197, 94, 0.5)',
        icon: '✅'
      },
      {
        prediction: 'Malignant (Melanoma)',
        confidence: '0.87',
        risk: 'High',
        color: 'rgba(239, 68, 68, 0.1)',
        border: 'rgba(239, 68, 68, 0.5)',
        icon: '⚠️'
      },
      {
        prediction: 'Suspicious (Requires Review)',
        confidence: '0.74',
        risk: 'Medium',
        color: 'rgba(245, 158, 11, 0.1)',
        border: 'rgba(245, 158, 11, 0.5)',
        icon: '🔍'
      }
    ];
    
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    result.innerHTML = `
      <div class="result-item">${randomResult.icon} <strong>Analysis Complete!</strong></div>
      <div class="result-item"><strong> •Prediction:</strong> ${randomResult.prediction}</div>
      <div class="result-item"><strong> •Confidence:</strong> ${randomResult.confidence}</div>
      <div class="result-item"><strong> •Risk Level:</strong> ${randomResult.risk}</div>
      <div class="result-item"><strong> •Model:</strong> CNN (ResNet-50 Architecture)</div>
    `;
    
    result.style.background = randomResult.color;
    result.style.borderColor = randomResult.border;
    result.style.animation = 'fadeIn 0.5s ease-out';
    
    // Re-enable button
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = '🔄 Analyze Again';
  }, 3000);

  /* REAL BACKEND CALL - Uncomment when backend is ready
  try {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    loader.style.display = "none";
    result.classList.remove('analyzing');
    result.innerHTML = `
      ✅ <strong>Analysis Complete!</strong><br/><br/>
      <strong> Prediction:</strong> ${data.label}<br/>
      <strong> Confidence:</strong> ${data.confidence}<br/>
      <strong> Model:</strong> ${data.model || 'CNN (ResNet-50)'}
    `;
    
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = '🔄 Analyze Again';
  } catch (error) {
    loader.style.display = "none";
    result.classList.remove('analyzing');
    result.innerHTML = '❌ <strong>Error:</strong> Could not connect to AI model. Please try again.';
    result.style.background = 'rgba(239, 68, 68, 0.1)';
    result.style.borderColor = 'rgba(239, 68, 68, 0.5)';
    
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = '🔄 Try Again';
  }
  */
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !analyzeBtn.disabled && selectedImage) {
    analyzeBtn.click();
  }
  if (e.key === 'Escape') {
    // Reset everything
    imageInput.value = '';
    preview.innerHTML = '';
    document.getElementById('outputSection').style.display = 'none';
    result.innerHTML = 'Awaiting input...';
    result.style.background = 'rgba(15, 23, 42, 0.8)';
    result.style.borderColor = 'rgba(51, 65, 85, 0.5)';
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Run Inference';
    selectedImage = null;
  }
});

// Add interactive cursor effect
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.cursor');
  if (!cursor) {
    const newCursor = document.createElement('div');
    newCursor.className = 'cursor';
    newCursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(newCursor);
  }
  
  const cursorElement = document.querySelector('.cursor');
  cursorElement.style.left = e.clientX - 10 + 'px';
  cursorElement.style.top = e.clientY - 10 + 'px';
});