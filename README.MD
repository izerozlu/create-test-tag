# create_test_tag

This simple script is being used for creating a new tag from the current git branch and push that tag to the `origin`.

Uses `test_${CURRENT_BRANCH_NAME}_${LATEST_TAG_NUMBER + 1}` pattern.

### Example #1

| Branch | `my-branch`        |                    |                    |     |
| ------ | ------------------ | ------------------ | ------------------ | --- |
| Tags   | `test_my-branch_1` | `test_my-branch_2` | `test_my-branch_3` |     |

Result: `test_my-branch_4` and push to `origin`.

### Example #2

| Branch | `my-branch` |     |     |     |
| ------ | ----------- | --- | --- | --- |
| Tags   | None        |     |

Result: `test_my-branch_1` and push to `origin`.

## Prerequsite

Node >= v12.16.1

[Link to NodeJS](https://nodejs.org/en)

## Usage

`node create_test_tag.js`

## Shell Usage

If you want to make this script shell runnable, you can follow these steps:

1. Copy the `create_test_tag.js` file to $HOME

   `cp create_test_tag.js ~/.create_test_tag.js`

2. Make it runnable

   `chmod +x ~/.create_test_tag.js`

3. Add alias line to startup file (`~/.zshrc`, `~/.bashrc` etc)

   `alias create_test_tag="node ~/.create_test_tag.js"`

4. Restart your terminal or resource the startup file

   `source ~/.zshrc`

5. Run it

   `create_test_tag`