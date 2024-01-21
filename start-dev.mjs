import { promisify } from 'util'
import { exec as execCb, spawn } from 'child_process'
import fs from 'fs'

const exec = promisify(execCb)

let ngrok
;(async function () {
  try {
    ngrok = await import('ngrok')
  } catch (error) {
    await exec('npm install --save-dev ngrok')
    ngrok = await import('ngrok')
  }

  // Run the ngrok config add-authtoken command
  const ngrokConfigCommand = spawn(
    'ngrok',
    [
      'config',
      'add-authtoken',
      '2bHYCbtlvDT0f3oTmT27i5UeTVt_26UoCQbihHBohWi4TgW99',
    ],
    {
      stdio: 'inherit', // This will show the ngrok command output in the same terminal
      shell: true, // This will run the command in a shell
    }
  )

  ngrokConfigCommand.on('error', (error) => {
    console.error(`Failed to configure ngrok: ${error.message}`)
  })

  ngrokConfigCommand.on('exit', (code) => {
    if (code !== 0) {
      console.error(`ngrok config command exited with code ${code}`)
      return
    }

    // Open a new terminal and run the ngrok command
    const ngrokCommand = spawn(
      'ngrok',
      ['http', '--domain=mildly-pro-pipefish.ngrok-free.app', '3000'],
      {
        stdio: 'inherit', // This will show the ngrok command output in the same terminal
        shell: true, // This will run the command in a shell
      }
    )

    ngrokCommand.on('error', (error) => {
      console.error(`Failed to start ngrok: ${error.message}`)
    })
  })
})()
