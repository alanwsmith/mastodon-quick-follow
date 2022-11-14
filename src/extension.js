////////////////////////////////////////////////////////////
//
// from alan w. smith
// https://hachyderm.io/web/@TheIdOfAlan
// alanwsmith.com
//

////////////////////////////////////////////////////////////
//
// This section is for the "Proceed to Follow" pop-up
// windows. The extension looks for the input field
// and stores the value you type in there. When you
// hit another popup, it automatically fills in the
// value.
//
// The process is relatively naive. It explicitly
// target an element with the id 'remtve_follow_acct'
// and work on it. That's been the name every time
// I've seen a pop-up, but I imagine there's
// customizations that change that.
//
// Also, because this operates on every website, any
// site that has a field with that ID will get updated.
// The means any site you visit can get whatever you
// most recently typed in.

////////////////////////////////////////////////////////////

let mastodonUserId = null

// Store the account string for later
const handleTextChange = (event) => {
  if (event.target.value !== mastodonUserId) {
    mastodonUserId = event.target.value
    chrome.storage.sync.set({ mastodonUserId: mastodonUserId })
  }
}

// Grab for the field
const theFormField = document.getElementById('remote_follow_acct')

// Process the field if you find it
if (theFormField) {
  theFormField.addEventListener('input', handleTextChange)
  chrome.storage.sync.get(['mastodonUserId'], function (result) {
    mastodonUserId = result.mastodonUserId
    theFormField.value = mastodonUserId
  })
}

////////////////////////////////////////////////////////////
//
// Phase 2 - DOES NOT WORK YET. The goal of this section
// is to automatically redirect you to your account and
// fill in the search field to find someone you want to
// follow via that structure (this is when you get a
// modal dialog box instead of the distinct pop-up window)
//
// I can capture the persons url and redirect to your
// account page and fill in the search, but I haven't figured
// out how to do the search yet. If you know, please show
// me how. I'd love to add that as a feature.
//
// I'm commenting this all out for now.
//
////////////////////////////////////////////////////////////
//

// let linkIsShowing = false
// const watchForMastodonFollowBox = () => {
//   // Give it a moment to load after catching the click
//   setTimeout(() => {
//     const mastodonUserToFollowInputBoxArea = document.body.querySelector(`
//       div.interaction-modal__choices__choice >
//       div.copypaste
//     `)
//     if (mastodonUserToFollowInputBoxArea) {
//       chrome.storage.sync.get(['mastodonUserAccountUrl'], function (result) {
//         if (result.mastodonUserAccountUrl && linkIsShowing === false) {
//           linkIsShowing = true
//           const newEl = document.createElement('a')
//           newEl.href = result.mastodonUserAccountUrl
//           newEl.text = 'Click here to go to your account'
//           mastodonUserToFollowInputBoxArea.appendChild(newEl)
//         }
//       })
//     }
//   }, 300)
// }
// document.body.addEventListener('click', watchForMastodonFollowBox)

//// See if you're on a mastodon pages that has the same
//// setup as https://hachyderm.io/
//// Look for a how page search field.
//const homePageSearchField = document.querySelector(
//  'div#mastodon input.search__input'
//)
//if (homePageSearchField) {
//  console.log(homePageSearchField)
//  // Store the URL so you can send to it later.
//  // There's probably more logic that can be added
//  // here to make sure you pick up the right thing.
//  const mastodonUserAccountUrl = document.location.href
//  chrome.storage.sync.set(
//    { mastodonUserAccountUrl: mastodonUserAccountUrl },
//    function () {
//      console.log(`Stored: ${mastodonUserAccountUrl}`)
//    }
//  )
//  ///////////////////////////
//  //Testing
//  //
//  homePageSearchField.focus()
//  setTimeout(() => {
//    const event = new KeyboardEvent('keyup', {
//      key: 'a',
//      bubbles: true,
//    })
//    console.log(event)
//  }, 1400)
//}

//  // Now check to see if there's a url in the payload
//  // and drop it in the search box if there is.
//  ///////////// NOTE This may not work the same with with
//  //advanced view and not advanced vie
//  //
//  chrome.storage.sync.get(['mastodonUserToFollowUrl'], function (result) {
//    if (result.mastodonUserToFollowUrl) {
//      homePageSearchField.focus()
//      homePageSearchField.value = `${result.mastodonUserToFollowUrl}`
//      chrome.storage.sync.remove(['mastodonUserToFollowUrl'], function () {
//        console.log('Removing follow URL')
//      })
//    }
//  })
//}

// const changeBackgroundForTesting = () => {
//   const number = Math.floor(Math.random() * 16777215)
//   const color = `#${number.toString(16).padStart(6, '0')}`
//   document.body.style.backgroundColor = color
// }

// document.body.addEventHandler('click', changeBackground)
// document.body.style.backgroundColor = '#123434'
// document.getElementById('remote_follow_acct').value = 'asdf'
