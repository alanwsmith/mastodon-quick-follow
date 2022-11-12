////////////////////////////////////////////////////////////
//
// from alan w. smith
// https://hachyderm.io/web/@TheIdOfAlan
// alanwsmith.com
//

////////////////////////////////////////////////////////////
//
// OVERVIEW
//
// This is a Google Chrome extension designed to make
// it a little easier to follow folks on Mastodon. It
// captures your account name when you type it into
// one of the "Proceed To Follow" pop-ups and then
// fills it in automatically on other instances
// that use the same format.
//
// This version is a prototype. It works on my
// machine, but I haven't done extensive testing
// elsewhere.
//
//

////////////////////////////////////////////////////////////
//
// INSTALLATION
//
// I don't have the spoons to deploy this to the
// chrome extensions store. You'll need to install
// it manually. There's a few steps, but it's not
// too bad. (Note: this involves turing on
// "Developer mode". It's a direct feature that
// Chrome provides but there can be security
// implcaitons for it beyond what I have the
// expertise to speak about. Best I can tell you
// is make sure you trust any extenisons you install
// that require it.)
//
//
// 1. Download the `manifest.json` and `extension.js`
//    files into a new folder somewhere convenient
//    but out of the way on your computer. You'll
//    pretty much only need to worry about the files
//    and folder going through this install process.
//    So, maybe don't put the folder on your desktop
//    unless you want to see it there all the time.
//
// 2. Open Chrome's Prefernces/Settings and
//    click into the "Extensions" page.
//
// 3. Toggle the "Developer mode" switch in the
//    upper portion of the page.
//
// 4. Click the "Load unpaced" button which shows
//    up when you turn on "Developer mode".
//
// 5. Navigate to the folder what you put the
//    "manifest.json" and "extension.js" files and
//    select it to complete the process.
//
//
// This code is open source. Please feel free to
// role it into an extension and put it in the store
// for easier use if you'd like.

////////////////////////////////////////////////////////////
//
// DETAILS
//
// This setion is for the "Proceed to Follow" pop-up
// windows. The extension looks for the input field
// and stores the value you type in there. When you
// hit another popup, it automatially fills in the
// value.
//
// The process is relatively naive. It explictly
// target an element with the id 'remove_follow_acct'
// and work on it. That's been the name every time
// I've seen a pop-up, but I imagine there's
// customizations that change that.
//
// Also, because this operates on every website, any
// site that has a field with that ID will get updated.
// The means any site you visit can get whatever you
// most recently typed in.
//

////////////////////////////////////////////////////////////

// A thing to hold the id

let mastodonUserId = null

// Function to store the account name typed
// into a remote follow box for later use

const handleTextChange = (event) => {
  if (event.target.value !== mastodonUserId) {
    mastodonUserId = event.target.value
    chrome.storage.sync.set({ mastodonUserId: mastodonUserId }, function () {
      // console.log(`mastodonUserId is now: ${mastodonUserId}`)
    })
  }
}

// Make a grab for the form field for
// the asks you for your accound id when
// you try to follow someone

const theFormField = document.getElementById('remote_follow_acct')

// If you find it, stack the event listener
// on it to watch for changes and fill it
// in with an existing account ID if it's set.
// From there, you can manually click the
// follow button to complete the process

if (theFormField) {
  theFormField.addEventListener('input', handleTextChange)
  chrome.storage.sync.get(['mastodonUserId'], function (result) {
    mastodonUserId = result.mastodonUserId
    theFormField.value = mastodonUserId
    // console.log(`Loaded mastodonUserId: ${mastodonUserId}`)
  })
}

////////////////////////////////////////////////////////////
//
// THIS IS NOT YET IMPLEMENTED
//
// This section is for handling the case for when you hit
// a follow button and a modal pops up. The behavoir in this
// case it to grab the url of the use you just clicked the
// follow button on and then open a new browser tab with your
// home page and paste the URL into the search field. From
// there can type enter to do the search.
//
// I haven't been able to figuore out how to make that
// happen automatically yet. If you know the secret sauce,
// hit me up: https://hachyderm.io/web/@TheIdOfAlan

// const watchForMastodonFollowBox = () => {
//   // Give it a half second to load
//   setTimeout(() => {
//     const mastodonUserToFollowInputBox = document.body.querySelector(`
//       div.interaction-modal__choices__choice >
//       div.copypaste >
//       input[type=text]
//     `)
//     console.log(mastodonUserToFollowInputBox)
//     if (mastodonUserToFollowInputBox) {
//       const mastodonUserToFollowUrl = mastodonUserToFollowInputBox.value
//       console.log(mastodonUserToFollowUrl)
//       if (mastodonUserToFollowUrl.indexOf('@') > -1) {
//         chrome.storage.sync.set(
//           { mastodonUserToFollowUrl: mastodonUserToFollowUrl },
//           function () {
//             window.open('https://hachyderm.io/web/home', '_blank')
//             console.log(
//               `mastodonUserToFollowUrl is now: ${mastodonUserToFollowUrl}`
//             )
//           }
//         )
//       }
//       // console.log(searchUserUrlString)
//     }
//   }, 300)
//   console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh')
// }
// document.body.addEventListener('click', watchForMastodonFollowBox)
// console.log('eeeeeeeeeeeeee')

// See if you're on a mastodon pages that has the same
// setup as https://hachyderm.io/

// const homePageSearchField = document.querySelector(
//   'div#mastodon input.search__input'
// )

// if (homePageSearchField) {
//   console.log(homePageSearchField)
//   chrome.storage.sync.get(['mastodonUserToFollowUrl'], function (result) {
//     if (result.mastodonUserToFollowUrl) {
//       console.log(`-- FOUND URL: ${result.mastodonUserToFollowUrl}`)
//       // homePageSearchField.focus()
//       console.log('mmmmmmmmmmmmmmmmm')
//       homePageSearchField.value = `${result.mastodonUserToFollowUrl}`
//       // const ke = new KeyboardEvent('keyup', {
//       //   bubbles: true,
//       //   cancelable: true,
//       //   keyCode: 13,
//       // })
//       // document.body.dispatchEvent(ke)
//       dispatch(submitSearch())
//       // homePageSearchField.submit()
//     }
//     // mastodonUserId = result.mastodonUserId
//     // theFormField.value = mastodonUserId
//     // console.log(`Loaded mastodonUserId: ${mastodonUserId}`)
//   })
// }

// const changeBackgroundForTesting = () => {
//   const number = Math.floor(Math.random() * 16777215)
//   const color = `#${number.toString(16).padStart(6, '0')}`
//   document.body.style.backgroundColor = color
// }

// document.body.addEventHandler('click', changeBackground)
// document.body.style.backgroundColor = '#123434'
// document.getElementById('remote_follow_acct').value = 'asdf'

// document.addEventListener('DOMContentLoaded', initStuff)

// console.log('ccccccccccccccccc')
