# 3 Version Control 🗃️

**Version Control** is the practice of managing changes to software code over time. It allows developers to track revisions, collaborate effectively, and revert to previous states without fear of losing work.

# 3.1 Git

**🎥 Video Resource (Git Basics):** [Git and GitHub for Beginners - Crash Course](https://www.youtube.com/watch?v=RGOj5yH7evk)

**Git** is the world's most popular **Distributed Version Control System (DVCS)**.

* **Distributed:** Every developer has a complete copy (a local repository) of the entire codebase's history. This allows developers to work offline and provides built-in backup.
* **Snapshot-Based:** Git records changes as a series of snapshots, not just differences (diffs). This makes operations like reverting fast and robust.

### The Three States
Git manages files in three key states:

1.  **Working Directory:** The files you see and edit in your local project folder.
2.  **Staging Area (Index):** A temporary area where you prepare a snapshot of changes before committing them.
3.  **Local Repository (.git folder):** Where Git permanently stores the history, tracking all committed changes as distinct versions.

### Core Commands
| Command | Description |
| :--- | :--- |
| `git init` | Initializes a new Git repository in the current directory. |
| `git clone [url]` | Downloads a copy of an existing remote repository. |
| `git status` | Shows the status of files in the working directory and staging area. |
| `git add [file]` | Moves changes from the Working Directory to the Staging Area. |
| `git commit -m "[message]"` | Permanently records the staged snapshot into the local repository. |
| `git push` | Uploads committed changes from the local repository to a remote repository (e.g., GitHub). |
| `git pull` | Fetches changes from the remote repository and merges them into the local branch. |
| `git branch` | Lists, creates, or deletes local branches. |
| `git checkout [branch]` | Switches to a different branch or restores files from the repository. |
| `git merge [branch]` | Integrates changes from one branch into the current branch. |

# 3.1.1 Git Best Practices 🌟

Adopting consistent practices ensures clean history, effective collaboration, and easier debugging.

### 1. Commit Messages
* **Rule:** Write clear, concise, and meaningful commit messages.
* **Format:** Start with a short (50 characters or less) summary line, followed by a blank line, and then a detailed explanation of *what* and *why* the change was made (if necessary).
* **Tone:** Use the imperative mood (e.g., "Fix: Handle null user data" rather than "Fixed handling of null user data").

### 2. Branching Strategy
* **Feature Branches:** Never commit directly to the `main` or `master` branch. Create a new branch for every feature, fix, or experiment (`git checkout -b feature/new-api-endpoint`).
* **Rebase vs. Merge:** Use **Git Merge** for integration points (like merging a feature into `main`) and consider **Git Rebase** to keep feature branches clean and linear during development.

### 3. Atomic Commits
* **Concept:** Each commit should represent a single, logical unit of work.
* **Action:** Don't commit unrelated changes together. If you fix a bug and add a new feature, stage and commit them separately. This makes `git revert` and `git blame` far more useful.

### 4. Pull Before Pushing
* Always run `git pull` before pushing your local branch to the remote to ensure you have the latest code and to resolve any conflicts locally.

### 5. Review History
* Use `git log --oneline --graph` to occasionally review the history and ensure it's clean and easy to follow.

# 3.1.2 Git Topics

| Topic | Description | Command |
| :--- | :--- | :--- |
| **Branching** | Creating independent lines of development. Essential for parallel work without affecting the stable codebase. | `git branch [name]`, `git checkout [name]` |
| **Merging** | Combining the history of one branch into another, creating a merge commit. | `git merge [branch]` |
| **Fast-Forward Merge** | Occurs when there are no conflicting changes. Git simply moves the pointer of the destination branch forward. | *(Automatic)* |
| **Merge Conflict** | Happens when Git cannot automatically reconcile changes (two people changed the same lines of code). Must be resolved manually before the merge is committed. | *(Manual)* |
| **HEAD** | A pointer to the current commit in the current branch. It always points to the tip of the current branch. | `git log HEAD` |
| **Stash** | Temporarily saves changes that are not ready to be committed, allowing you to switch branches quickly. | `git stash`, `git stash pop` |
| **Tags** | Used to mark specific points in history as important, usually for release versions (e.g., `v1.0.0`). | `git tag v1.0.0` |

# 3.1.3 Git Advanced 🛠️

These commands are crucial for cleaning up history and managing repositories professionally.

### 1. Git Rebase
* **Purpose:** Re-applies commits from one branch onto the tip of another, often used to create a linear, clean history.
* **Caution:** **NEVER** rebase commits that have already been pushed to a public remote repository, as this rewrites history and will break the repositories of collaborators.
* **Interactive Rebase (`-i`):** Allows you to modify, squash (combine), reorder, or drop commits within a branch before merging.
    ```bash
    git rebase -i HEAD~5 # Interactively edit the last 5 commits
    ```

### 2. Git Reset
* **Purpose:** Undoes changes and moves the HEAD pointer to a previous commit. Used to "un-commit" things.
* **Modes:**
    * `--soft`: Moves HEAD, keeps files staged.
    * `--mixed` (Default): Moves HEAD, unstages files, but keeps changes in the working directory.
    * `--hard`: Moves HEAD, and **destroys all changes** in the working directory and staging area. **Use with extreme caution.**

### 3. Git Cherry-Pick
* **Purpose:** Takes a specific commit from one branch and applies it directly to the branch you are currently on.
    ```bash
    git cherry-pick [commit-hash]
    ```

### 4. Git Reflog
* **Purpose:** A safety net. It records every change that updates HEAD and other references. If you accidentally delete a branch or use `git reset --hard` and lose work, `git reflog` often allows you to find the commit hash and restore it.

# 3.1.4 Git Features

| Feature | Description | Relevance to Backend |
| :--- | :--- | :--- |
| **Ignore Files** | Uses the `.gitignore` file to tell Git which files/patterns to ignore (e.g., logs, build outputs, environment secrets). | Essential for preventing sensitive **`.env` files** and generated **`node_modules`** from being committed. |
| **Git Aliases** | Allows you to create shortcuts for longer Git commands. | Speeds up the workflow (e.g., setting `git st` to run `git status`). |
| **Bisect** | A powerful feature that performs a binary search to find the exact commit that introduced a bug. | Invaluable for debugging: saves hours by efficiently tracking down the point of failure in a large history. |
| **Submodules** | Allows one Git repository to be embedded as a subdirectory inside another. | Used when a project needs to track an external dependency (like a common library) at a specific commit. |