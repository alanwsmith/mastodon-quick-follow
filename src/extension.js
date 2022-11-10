let mastodonUserId = null

// const changeBackground = () => {
//   const number = Math.floor(Math.random() * 16777215)
//   const color = `#${number.toString(16).padStart(6, '0')}`
//   document.body.style.backgroundColor = color
// }

// document.body.addEventHandler('click', changeBackground)
// document.body.style.backgroundColor = '#123434'
// document.getElementById('remote_follow_acct').value = 'asdf'

const theFormField = document.getElementById('remote_follow_acct')

const handleTextChange = (event) => {
  // changeBackground()
  if (event.target.value !== mastodonUserId) {
    mastodonUserId = event.target.value
    chrome.storage.sync.set({ mastodonUserId: mastodonUserId }, function () {
      console.log(`mastodonUserId is now: ${mastodonUserId}`)
    })
  }
}

if (theFormField) {
  // changeBackground()
  theFormField.addEventListener('input', handleTextChange)
  chrome.storage.sync.get(['mastodonUserId'], function (result) {
    mastodonUserId = result.mastodonUserId
    theFormField.value = mastodonUserId
    console.log(`Loaded mastodonUserId: ${mastodonUserId}`)
  })
}

// document.addEventListener('DOMContentLoaded', initStuff)

// console.log('ccccccccccccccccc')
