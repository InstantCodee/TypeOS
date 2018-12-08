# TypeOS
[![Build Status](https://travis-ci.com/InstantCodee/TypeOS.svg?branch=master)](https://travis-ci.com/InstantCodee/TypeOS)

TypeOS is a design showcase for a minimalist desktop UI without many icons, just text.

#### Screenshot from early stage
![Screenshot from early stage](https://i.imgur.com/9hxVdzq.png)

## Dependencies
* [**NodeJS**](https://nodejs.org/en/download/) | *curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs*

Everything else gets automatically installed by `npm`.

## Install
Copy this entire thing into your console:
```sh
git clone https://github.com/InstantCodee/TypeOS.git
npm install
npm run build-css
$(npm bin)/electron-rebuild
npm start
```
And here is the explanation of each command:
1. Clone this repository:
```sh
git clone https://github.com/InstantCodee/TypeOS.git
```
2. Change into `TypeOS` and install all dependencies first:
```
npm install
```
3. Next, you need to build SASS to CSS:
```sh
npm run build-css 
```
4. Recompile modules to make them run with Electron:
```
$(npm bin)/electron-rebuild
```
5. And then start the application:
```
npm start
```
Now TypeOS should start on your main monitor in fullscreen mode, If not [tell us](https://github.com/InstantCodee/TypeOS/issues/new).

## Contribute
Fell free to put your mind into this project:
1. Fork this project (button under header of GitHub).
2. Now you can make changes in the source code, because you have a copy.
3. After you're done with your changes, lets say with a bug fix, you can make a PR *(= Pull Request)*.
4. Your PR will trigger a bulid test and we review your code and If all this is done we will merge your code into the offical branch and you contributed to our code. Thanks for your help.

**Note:** Keep your code clean and comment stuff so that other people can easily understand your code and keep your langauge in English. As example look in [this](https://github.com/InstantCodee/TypeOS/blob/master/src/js/data.ts) file.

If you have trouble with GitHub or Git, we recommand you to read [this](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) guide to get in.
### But I'm not a programmer, what can I do else?
*Currently we haven't a language system, keep that in mind.*

You can help translate stuff, as example from English to French or Danish.  **Or** you can create issues [here](https://github.com/InstantCodee/TypeOS/issues/new/choose) If you find a bug or you have a feature request, but do not use it as a review system. For review, we setup a system later, maybe.

## What is the goal of this project?
We want to create a showcase on how a minimalistic desktop can be when there are not many icons but mostly text. You can be inspired by this and develop your own desktop environment based on our design.