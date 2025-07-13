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
┃ ┣ 🖼️ details.png
<br>
┃ ┗ 🖼️ logo.png
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
- **Benefit:** Screen readers announce the purpose of the section clearly to users.<br><br>

### ✅ `aria-expanded` + `aria-controls`
- **Element:** `<button class="faq-question">`
- **Purpose:** 
  - `aria-expanded` indicates whether the associated answer is shown.
  - `aria-controls` links the button to the answer region by ID.
- **Benefit:** Provides dynamic and meaningful feedback to screen readers about each accordion item's state.<br><br>

### ✅ `role="region"` + `aria-labelledby`
- **Element:** `<div class="faq-answer">`
- **Purpose:** Marks the answer content as a navigable region and links it to its corresponding question.
- **Benefit:** Helps users navigate between related sections using assistive technologies.<br><br>

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
<br>

### ✅ `alt` Attributes on Images

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

## Explanation of JavaScript Code

### 1. Variable and Elements Selection
```js
const buttons = document.querySelectorAll('.faq-question');
```
**Explanation:** You are selecting all elements with the class `.faq-question`, which represent the FAQ question buttons. This allows you to add event listeners and manipulate these buttons later in the code.<br><br>

### 2. Toggling the Expansion and Collapse of FAQ Answers
```js
function togglePanel(button) {
    const content = document.getElementById(button.getAttribute('aria-controls'));

    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    buttons.forEach(btn => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));

        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.btn-details').classList.remove('open');

        if (!panel.hidden) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            void panel.offsetHeight;
            panel.style.maxHeight = '0px';

            panel.addEventListener('transitionend', function handler(e) {
                if (e.propertyName === 'max-height') {
                    panel.hidden = true;
                    panel.removeEventListener('transitionend', handler);
                }
            });
        } else {
            panel.hidden = true;
            panel.style.maxHeight = null;
        };
    });

    if (!isExpanded) {
        button.setAttribute('aria-expanded', 'true');

        content.hidden = false;

        button.querySelector('.btn-details').classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
    };
};
```
#### `function togglePanel(button) {`
- **Purpose:** This is the function declaration of `togglePanel`, which takes the `button` element as an argument. This button represents the FAQ question that was clicked or triggered by keyboard interaction.
- **Explanation:** The function is called whenever a user interacts with an FAQ question button. It will toggle the visibility of the associated answer, either expanding or collapsing it.

#### `const content = document.getElementById(button.getAttribute('aria-controls'));`
- **Purpose:** This line retrieves the content (answer) associated with the clicked button.
- **Explanation:** The `aria-controls` attribute on the button specifies the ID of the element that the button controls (in this case, the corresponding answer). `button.getAttribute('aria-controls')` gets the ID, and `document.getElementById()` selects that element (the answer) from the DOM.

#### `const isExpanded = button.getAttribute('aria-expanded') === 'true';`
- **Purpose:** This checks if the associated content (answer) is already expanded or collapsed.
- **Explanation:** The `aria-expanded` attribute on the button tells whether the content is expanded (`'true'`) or collapsed (`'false'`). This line checks the current state of `aria-expanded` and stores it in the `isExpanded` variable.

#### `buttons.forEach(btn => {`
- **Purpose:** This begins a loop that iterates through all the FAQ question buttons.
- **Explanation:** The loop ensures that every FAQ question button (in the `buttons` array) will be checked and updated if necessary. This is crucial for ensuring that only one answer is expanded at a time, and others are collapsed.

#### `const panel = document.getElementById(btn.getAttribute('aria-controls'));`
- **Purpose:** This retrieves the content panel (answer) associated with the current button in the loop.
- **Explanation:** Similar to the earlier line, `aria-controls` is used to get the ID of the corresponding content (answer). This retrieves the panel (answer) that belongs to each button.

#### `btn.setAttribute('aria-expanded', 'false');`
- **Purpose:** This sets the `aria-expanded` attribute of the button to `'false'`, indicating that the associated answer is collapsed.
- **Explanation:** By setting `aria-expanded` to `false`, the state of each button is updated to reflect that its content is no longer expanded. This is crucial for accessibility, as it informs screen readers about the state of the answer.

#### `btn.querySelector('.btn-details').classList.remove('open');`
- **Purpose:** This removes the `open` class from the button's icon (arrow), indicating that the associated FAQ answer is collapsed.
- **Explanation:**
  - `btn.querySelector('.btn-details')`: This line selects the first child element within the button (`btn`) that has the class `.btn-details`. It specifically targets the icon (usually an arrow or other indicator) that shows whether the FAQ answer is expanded or collapsed.
    - The method `querySelector` is used to retrieve a single element (the first one matching the class `.btn-details`). If there are multiple elements with the class `.btn-details` inside the button, only the first one is selected.<br><br>
  - `.classList.remove('open')`: Once the correct element (the arrow icon) is selected, this line removes the `open` class from it.
    - The `open` class is typically used to apply a style (such as a rotation) to the icon, indicating that the answer is expanded. When the answer is collapsed, the `open` class is removed, so the icon returns to its default state (typically pointing downwards or indicating a collapsed state).

By removing the `open` class, the arrow icon is reset to the collapsed state, providing visual feedback to the user that the FAQ answer has been collapsed.

#### `if (!panel.hidden) {`
- **Purpose:** This checks if the content panel (answer) is currently visible (not hidden).
- **Explanation:** The `panel.hidden` property is `false` when the panel is visible and `true` when it's hidden. This condition allows the code to collapse the panel if it's currently open.

#### `panel.style.maxHeight = panel.scrollHeight + 'px';`
- **Purpose:** This sets the `maxHeight` of the panel to its natural height, allowing the content to expand smoothly.
- **Explanation:** The `scrollHeight` property returns the full height of the content, even if it's not visible. Setting `maxHeight` to `scrollHeight` makes the panel's height match its full content, initiating the expansion animation.

#### `void panel.offsetHeight;`
- **Purpose:** This line forces a reflow (or "layout recalculation") of the panel element.
- **Explanation:** The `void panel.offsetHeight` trick is used to ensure that the browser applies the `maxHeight` transition effect smoothly. This forces the browser to recalculate the panel's height before the `maxHeight` is set to `0px` in the next line.

#### `panel.style.maxHeight = '0px';`
- **Purpose:** This collapses the content by setting its `maxHeight` to `0px`.
- **Explanation:** Setting `maxHeight` to `0px` makes the content collapse. The transition effect, which was initiated earlier, smoothly shrinks the content down to nothing.

#### `panel.addEventListener('transitionend', function handler(e) {`
- **Purpose:** This attaches an event listener to the panel, listening for the end of the transition.
- **Explanation:** The `transitionend` event is triggered when the CSS transition finishes. By attaching this listener, the function can execute further actions after the collapsing transition is complete.

#### `if (e.propertyName === 'max-height') {`
- **Purpose:** This ensures that the event listener only reacts to the `max-height` transition.
- **Explanation:** Since other properties might be animated (e.g., opacity), we check if the property that triggered the event is `max-height`. This makes sure the code executes only after the height transition ends.

#### `panel.hidden = true;
- **Purpose:** This hides the content panel after the collapse transition is completed.
- **Explanation:**
  - `panel.hidden = true;`: The `hidden` property is a Boolean attribute that, when set to `true`, hides the element from the page. It doesn't just visually hide the element but also removes it from the document's layout, meaning it won't take up any space.
  - By setting `hidden` to `true`, we ensure that the FAQ answer is completely removed from the layout after the collapse transition ends, confirming that it's now effectively hidden.

#### `panel.removeEventListener('transitionend', handler);`
- **Purpose:** This removes the event listener attached to the `transitionend` event for the panel, preventing any further function calls after the transition is completed.
- **Explanation:**
  - `panel.removeEventListener('transitionend', handler);`: This line removes the `transitionend` event listener that was previously attached to the `panel`. The `transitionend` event is fired once the CSS transition (like the collapse animation) is completed.
  - The `handler` function, which was added earlier as an event listener, would be called whenever the transition ends. By removing the event listener here, we ensure that the function is not executed again, preventing unnecessary or redundant actions.
  - **Why remove the listener?**
    - Since the purpose of the `handler` function is to hide the panel after the transition finishes, there's no need to keep listening for the transition to end once it's already been hidden. Removing the event listener prevents potential memory leaks and ensures that the code remains efficient, only running what's necessary.

#### `} else {`
- **Purpose:** This line starts the `else` block, which executes when the condition in the preceding `if` is `false`.
- **Explanation:** This line closes the `if` statement and begins the `else` block, which will run when the condition of the `if` is `false`.

#### `panel.hidden = true;`
- **Purpose:** This line hides the content panel after the answer is collapsed.
- **Explanation:** `panel.hidden` is a boolean property. Setting it to `true` will hide the panel (the FAQ answer). By setting `panel.hidden = true`, the content of the FAQ answer is completely removed from the view and layout of the page, as if it is "invisible."

#### `panel.style.maxHeight = null;`
- **Purpose:** This line removes the previously set `maxHeight` value, collapsing the panel back to its initial state.
- **Explanation:** `panel.style.maxHeight` is a style property used to define the maximum height of the panel, which controls the smooth animation when expanding or collapsing the content. Setting `panel.style.maxHeight = null;` effectively removes any previously assigned `maxHeight` value. This reverts the panel back to its default height, ensuring that it collapses properly during the animation.

#### `if (!isExpanded) {`
- **Purpose:** This checks if the clicked button's associated content is not currently expanded.
- **Explanation:** If the content wasn't already expanded (`isExpanded` is `false`), the function proceeds to expand the content.

#### `button.setAttribute('aria-expanded', 'true');`
- **Purpose:** This sets the `aria-expanded` attribute to `'true'` to indicate that the content is now expanded.
- **Explanation:** By setting `aria-expanded` to `true`, we update the state of the button to reflect that the associated answer is now visible.

#### `content.hidden = false;`
- **Purpose:** This makes the content (answer) visible.
- **Explanation:** By setting `content.hidden` to `false`, we ensure that the content becomes visible to the user.

#### `button.querySelector('.btn-details').classList.add('open');`
- **Purpose:** This adds the `open` class to the button's icon (arrow), rotating it to indicate the expanded state.
- **Explanation:** The `open` class is used to rotate the button’s arrow icon, providing a visual cue that the content is now expanded.

#### `content.style.maxHeight = content.scrollHeight + 'px';`
- **Purpose:** This sets the `maxHeight` of the content to its natural height, allowing it to expand smoothly.
- **Explanation:** By setting `maxHeight` to `scrollHeight`, we ensure that the content expands to its full height, initiating the smooth animation.

#### Summary:
- **Accordion Behavior:** This function ensures that only one FAQ answer is visible at a time, expanding or collapsing the answers with smooth animations.
- **Accessibility:** The `aria-expanded` attribute provides dynamic state information, improving accessibility for screen reader users.
- **Smooth Transitions:** The use of `maxHeight` and transitions ensures a smooth visual experience for users when expanding or collapsing content.<br><br>

### 3. Handling Click and Keyboard Events
```js
buttons.forEach(button => {
    button.addEventListener('click', () => {
        togglePanel(button);
    });

    button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            togglePanel(button);
        };
    });
});
```
#### `buttons.forEach(button => {`
- **Purpose:** This line starts a loop that iterates over all the buttons in the buttons NodeList.
- **Explanation:** It uses the `forEach` method to loop through each `button` in the `buttons` collection (which contains all FAQ question buttons). For each button, the subsequent actions will be executed.

#### `button.addEventListener('click', () => {`
- **Purpose:** This attaches a click event listener to the current `button` inside the loop.
- **Explanation:** When the user clicks the button, the code inside the callback function will be triggered. This function will handle the action of expanding or collapsing the FAQ content related to the clicked button.

#### `togglePanel(button);`
- **Purpose:** This calls the `togglePanel` function and passes the `button` as an argument.
- **Explanation:** The `togglePanel` function is responsible for managing the expansion or collapse of the corresponding answer. It toggles the visibility of the content when the user clicks a question button.

#### `button.addEventListener('keydown', (event) => {`
- **Purpose:** This attaches a `keydown` event listener to the current `button`, listening for key presses.
- **Explanation:** The `keydown` event allows keyboard navigation for the FAQ section. When the button is focused, users can press certain keys (like `Enter` or `Space`) to trigger the same action as a mouse click.

#### `if (event.key === 'Enter' || event.key === ' ') {`
- **Purpose:** This checks if the pressed key is either `Enter` or `Space`.
- **Explanation:** The condition ensures that if the user presses `Enter` or `Space`, the same action occurs as if they had clicked the button with the mouse. These keys are commonly used for activating buttons in web interfaces.

#### `event.preventDefault();`
- **Purpose:** This prevents the default behavior associated with pressing the `Enter` or `Space` key.
- **Explanation:** By default, pressing the `Enter` or `Space` key while focusing on a button might trigger unintended behaviors (e.g., form submission or page scrolling). `preventDefault()` ensures that only the desired action (toggling the panel) occurs.

#### `togglePanel(button);`
- **Purpose:** This calls the `togglePanel` function again when the `Enter` or `Space` key is pressed, just like in the `click` event.
- **Explanation:** This triggers the expansion or collapse of the FAQ answer, just like when the user clicks the button. The `togglePanel` function is called, passing the button as the argument to ensure the correct FAQ content is toggled.

#### Summary:
- **Iteration over buttons:** The `forEach` method is used to iterate over all the FAQ question buttons.
- **Click event listener:** Each button has a `click` event listener attached to it. When clicked, the `togglePanel` function is triggered to toggle the visibility of the corresponding FAQ answer.
- **Keyboard event listener:** Each button also listens for a `keydown` event, specifically for the `Enter` and `Space` keys. When one of these keys is pressed, the `togglePanel` function is triggered, allowing users to toggle the FAQ answer via the keyboard.
- **Accessibility:** This approach ensures that the FAQ section is usable both with the mouse and the keyboard, making it more accessible to users with motor disabilities.

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
