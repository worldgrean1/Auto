// This is a helper script to guide you through setting up GitHub for your project
// Run this with: node setup-github.js

import { execSync } from "child_process"
import readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("\n🚀 SocialPro GitHub Setup Guide 🚀\n")
console.log("This script will help you initialize Git and set up your GitHub repository.\n")

console.log("Step 1: Initialize Git repository")
try {
  execSync("git init")
  console.log("✅ Git repository initialized successfully!\n")
} catch (error) {
  console.error("❌ Failed to initialize Git repository:", error.message)
  process.exit(1)
}

console.log("Step 2: Add all files to Git")
try {
  execSync("git add .")
  console.log("✅ Files added to Git successfully!\n")
} catch (error) {
  console.error("❌ Failed to add files to Git:", error.message)
  process.exit(1)
}

console.log("Step 3: Create initial commit")
try {
  execSync('git commit -m "Initial commit"')
  console.log("✅ Initial commit created successfully!\n")
} catch (error) {
  console.error("❌ Failed to create initial commit:", error.message)
  console.log("If you're seeing an error about Git identity, run the following commands:")
  console.log('  git config --global user.email "you@example.com"')
  console.log('  git config --global user.name "Your Name"')
  console.log("Then try running this script again.")
  process.exit(1)
}

console.log("Step 4: Create GitHub repository")
console.log("Please create a new repository on GitHub:")
console.log("1. Go to https://github.com/new")
console.log('2. Enter "socialpro" as the repository name')
console.log("3. Add a description (optional)")
console.log("4. Choose public or private visibility")
console.log("5. DO NOT initialize with README, .gitignore, or license (we already have these)")
console.log('6. Click "Create repository"\n')

rl.question("Have you created the GitHub repository? (yes/no): ", (answer) => {
  if (answer.toLowerCase() !== "yes") {
    console.log("Please create the GitHub repository and run this script again.")
    rl.close()
    return
  }

  rl.question("Enter your GitHub username: ", (username) => {
    const repoUrl = `https://github.com/${username}/socialpro.git`

    console.log(`\nStep 5: Link local repository to GitHub (${repoUrl})`)
    try {
      execSync(`git remote add origin ${repoUrl}`)
      console.log("✅ Remote repository linked successfully!\n")
    } catch (error) {
      console.error("❌ Failed to link remote repository:", error.message)
      process.exit(1)
    }

    console.log("Step 6: Push code to GitHub")
    try {
      execSync("git push -u origin main")
      console.log("✅ Code pushed to GitHub successfully!\n")
    } catch (error) {
      console.log("Trying with master branch instead...")
      try {
        execSync("git push -u origin master")
        console.log("✅ Code pushed to GitHub successfully!\n")
      } catch (pushError) {
        console.error("❌ Failed to push code to GitHub:", pushError.message)
        console.log("You may need to push manually with:")
        console.log("  git push -u origin main  (or)  git push -u origin master")
        process.exit(1)
      }
    }

    console.log("🎉 Your SocialPro project is now on GitHub! 🎉")
    console.log(`Repository URL: ${repoUrl}`)
    console.log("\nNext steps:")
    console.log("1. Set up GitHub Pages or deploy to Vercel/Netlify")
    console.log("2. Set up GitHub Actions for CI/CD")
    console.log("3. Invite collaborators to your repository")
    console.log("4. Start developing awesome features!")

    rl.close()
  })
})

