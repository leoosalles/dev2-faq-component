# 🎧 Interactive and Accessible FAQ Component

This project is a responsive and accessible **FAQ (Frequently Asked Questions)** section built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. It was designed to provide an inclusive, visually appealing, and keyboard-navigable interface — especially for users relying on screen readers or non-pointer devices.

---

## 📌 Features

- Responsive layout (Mobile First)
- Keyboard and mouse interaction
- Accordion animation to show/hide answers
- Visual feedback with rotating icons
- Full screen reader support

---

## 📂 Project Structure

📁 src/
<br>
┣ 📂 css/
<br>
┃ ┣ 📄 reset.css
<br>
┃ ┗ 📄 style.css
<br>
┣ 📂 images/
<br>
┃ ┗ 🖼️ details.png
<br>
┃ ┣ 🖼️ logo.png
<br>
┣ 📂 js/
<br>
┃ ┗ 📄 index.js
<br>
📄 index.html

---

## ♿ Accessibility Features

### ✅ `aria-label="Frequently Asked Questions"`
- **Element:** `<section class="faq-container">`
- **Purpose:** Semantically labels the section as a FAQ block.
- **Benefit:** Screen readers announce the purpose of the section clearly to users.

---

### ✅ `aria-expanded` + `aria-controls`
- **Element:** `<button class="faq-question">`
- **Purpose:** 
  - `aria-expanded` indicates whether the associated answer is shown.
  - `aria-controls` links the button to the answer region by ID.
- **Benefit:** Provides dynamic and meaningful feedback to screen readers about each accordion item's state.

---

### ✅ `role="region"` + `aria-labelledby`
- **Element:** `<div class="faq-answer">`
- **Purpose:** Marks the answer content as a navigable region and links it to its corresponding question.
- **Benefit:** Helps users navigate between related sections using assistive technologies.

---

### ✅ Full Keyboard Support
- **Event:** `keydown` on the `<button>` element.
- **Purpose:** Allows opening/closing answers via `Enter` or `Space` keys.
- **Benefit:** Ensures usability for people who don’t use a mouse.

```js
button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        togglePanel(button);
    };
});
```

---

## ✅ `alt` Attributes on Images

- **Example:**
  ```html
  <img src="..." alt="Person using a VR headset...">

- **Benefit:** Provides descriptive alternative text, making images accessible to users who rely on screen readers.

---

## 💡 Interactive Behavior
Only one answer is visible at a time. 
When a question is clicked or triggered with the keyboard:
- The corresponding answer is revealed with smooth animation.
- The button's aria-expanded changes to "true".
- The arrow icon rotates 180° to indicate the open state.
- All other answers are collapsed automatically.

---

## 📱 Responsive Design
The layout adapts based on screen width:
| Screen Width | Main Adjustments                                           |
| ------------ | ---------------------------------------------------------- |
| `< 768px`    | Centered layout with image above content                   |
| `≥ 768px`    | Wider FAQ section with refined spacing                     |
| `≥ 992px`    | Two-column layout: image on the left, content on the right |

---

## 🧪 Technologies Used
- Semantic HTML5
- CSS3 with Flexbox, Transitions, and Media Queries
- Vanilla JavaScript (ES6+)
- Roboto font from Google Fonts

---

## 🙋 About the Author

Developed by **Leonardo Salles de Oliveira**, passionate about accessibility, clean code, and inclusive user interfaces.

💼 [LinkedIn](https://www.linkedin.com/in/leonardosalles/)  
