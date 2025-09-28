# Task Tracker App – Documentation

## Overview

The Task Tracker App is a simple Next.js application that allows users to manage tasks efficiently. Users can add new tasks, edit existing ones, mark them as completed, and delete tasks. Tasks are stored locally in the browser using **localStorage**, so they remain available even after refreshing the page.

---

## Features

- Add new tasks with a title.
- Edit existing tasks.
- Delete tasks permanently.
- Mark tasks as **Completed** or keep them as **Pending**.
- Filter tasks by **All**, **Completed**, or **Pending**.
- Data persistence using **localStorage** (no backend required).

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/lenard-dumalagan/simple-task-tracker
   cd simple-task-tracker
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. Open your browser and go to:

   ```
   http://localhost:3000
   ```

---

## How to Use

1. **Add a Task**

   - Type a task name in the input box.
   - Click **Add Task** (or press Enter).

2. **Edit a Task**

   - Click the **Edit** button next to a task.
   - Update the task name and save.

3. **Mark as Completed / Pending**

   - Toggle the checkbox beside a task to mark it as **Completed** or **Pending**.

4. **Delete a Task**

   - Click the **Delete** button to remove the task permanently.

5. **Filter Tasks**

   - Use the filter buttons (**All, Completed, Pending**) to view tasks by status.

---

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **State Management:** React useState, useEffect, & zustand
- **Storage:** Browser localStorage
