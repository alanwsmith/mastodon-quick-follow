# Mastodon Quick Follow

from alan w. smith
https://hachyderm.io/web/@TheIdOfAlan
alanwsmith.com

## OVERVIEW

This is an exploritory Google Chrome extension
designed to make it a little easier to follow
folks on Mastodon. It captures your account name
when you type it into one of the "Proceed To Follow"
pop-ups and then fills it in automatically on
other instances that use the same format.

This version is a prototype. It works on my machine,
on hachyderm.io. There are no guarantees, but you're
welcome to use it too.

If you're a developer, please feel free to grab
the code and run with it. It's open source and
I'd love to see someone put together a more robust
version.

I also tried setting up a feature for the use case
when a modal/dialog appears directly on the page
instead of a pop-up. I can fill in the URL of the
person to follow, but haven't been able to figure
out how to trigger the search that shows you the
results with the account so you can click on it.
If you know how to do that, please let me know.

## INSTALLATION

I don't have the spoons to deploy this to the
chrome extensions store. You'll need to install
it manually. There's a few steps, but it's not
too bad.

(Note: this involves turning on "Developer mode".
It's a direct feature that Chrome provides but
there can be security implications for it that are
beyond what I have the expertise to speak about.
The best I can tell you is make sure you trust any
extension you install that requires it.)

1. Download the `manifest.json` and `extension.js`
   files into a new folder somewhere convenient
   but out of the way on your computer. You'll
   pretty much only need to worry about the files
   and folder going through this install process.
   So, maybe don't put the folder on your desktop
   unless you want to see it there all the time.

2. Open Chrome's Preferences/Settings and
   click into the "Extensions" page.

3. Toggle the "Developer mode" switch in the
   upper portion of the page.

4. Click the "Load unpacked" button which shows
   up when you turn on "Developer mode".

5. Navigate to the folder what you put the
   "manifest.json" and "extension.js" files and
   select it to complete the process.

This code is open source. Please feel free to
role it into an extension and put it in the store
for easier use if you'd like.

