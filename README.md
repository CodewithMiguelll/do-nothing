# Do Nothing 🧘‍♂️

> A productivity app where productivity is the problem.

**Do Nothing** is a minimalist web app that challenges you to do exactly what modern life hates: *nothing*. No mouse movement. No keyboard input. No tab switching. Absolute stillness.

The moment you break the silence — the timer resets. Shame is optional, but encouraged.

---

## 🧠 The Idea

We live in a world obsessed with multitasking, constant motion, and infinite tabs.

**Do Nothing** flips that on its head.

It asks one simple question:

> *How long can you stay completely still?*

Turns out — not very long.

---

## ⚙️ How It Works

* A timer starts counting the moment the app loads
* The app listens for the following events:

  * Mouse movement
  * Keyboard input
  * Mouse clicks
  * Tab switches / window blur
* If **any** of these events fire:

  * You instantly lose
  * Your timer resets to `0`
  * A failure message appears
* Your **best streak** is saved locally and displayed

There are no buttons.
No pause.
No mercy.

---

## ✨ Features

* ⏱ Live timer (seconds)
* 🚨 Instant failure on interaction
* 😈 Random failure messages
* 🏆 Best streak saved via `localStorage`
* 🧘 Zen, distraction-free UI
* 🔁 Automatic reset after failure

---

## 🛠 Tech Stack

* **Next.js / React**
* **TypeScript**
* **Tailwind CSS**
* Browser APIs:

  * `addEventListener`
  * `visibilitychange`
  * `localStorage`

No backend. No database. Just discipline.

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/do-nothing.git

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Then open:

```
http://localhost:3000
```

And… don’t touch anything.

---

## 🧩 Project Structure (Simplified)

* `app/page.tsx` — main app logic & UI
* State-driven timer system
* Event-based failure detection
* Local persistence for best score

The UI is intentionally dumb.
All the intelligence lives in the logic.

---

## 🧪 Known Limitations

* Extremely unforgiving by design
* Mobile support is limited (for now)
* Existing users may lose immediately due to muscle memory

These are not bugs.
They are features.

---

## 🔮 Possible Future Enhancements

* 📱 Mobile version (gyro & touch detection)
* 🏆 Global leaderboard
* 🌗 Themed modes (Zen / Hardcore)
* 🔊 Subtle ambient sound
* 🕶 Fullscreen Monk Mode

---

## 🤍 Why This Exists

Because sometimes the most productive thing you can do…

is nothing.

---

## 👤 Author

Built by **Chikaima Miguel Uwakwe**
Designer • Developer • Professional Overthinker

If you moved your mouse while reading this — you lost.

---

🧘 *Stay still.*
