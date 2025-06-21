"use strict";

let answer = document.querySelector(".ans");
let question = document.querySelector(".question");
let send = document.querySelector(".sending");
console.log("hello");

let questions = [];
let messages = [];

send.addEventListener("click", async function () {
  const questionText = question.value;
  questions.push({ text: questionText });

  messages.push({
    role: "user",
    parts: [
      {
        text: question.value,
      },
    ],
  });

  answer.textContent = "Thinking...";

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyANxVD3XkWpMBmm8wRB8HyE54wNct-glZ8";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: "You are an expert coder. You are made to answer coding questions. You must answer all questions with at least 97% accuracy aiming for 100%. You will focaus on front end development but still answer other coding questions and give a response that is easy to understand and if asked make the response step by step instructions. Remeber only make it step by step if ASKED. You are aloud to crawl the web for results as well. Use  Logical Structure always",
            },
          ],
        },
        contents: messages,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response  not ok" + response.status);
    }

    const data = await response.json();
    console.log(data);

    const foo = data.candidates[0].content.parts[0].text;

    messages.push({
      role: "model",
      parts: [{ text: foo }],
    });

    const converter = new showdown.Converter();
    const html = converter.makeHtml(foo);

    answer.innerHTML = html;
  } catch (e) {
    console.error(e);
  }
});

// send.addEventListener("click", async function () {
//   //   answer.textContent = "I'm AI why should I know the answer!!!!!!!!!";

//   const url = "https://example.com";

//   try {
//     const response = await fetch(url, { method: "GET" });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.text();
//     answer.textContent = data;
//   } catch (e) {
//     console.error(e);
//   }
// });

// send.addEventListener("click", async function () {
//   answer.textContent = "Thinking...";
//   const url = "https://api.openai.com/v1/chat/completions";
//   const questionText = question.value;
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${key}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: questionText }],
//       }),
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     answer.textContent = data.choices[0].message.content;
//   } catch (e) {
