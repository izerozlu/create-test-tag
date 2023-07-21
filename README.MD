# create_test_tag

This simple script is being used for creating a new tag from the current git branch and push that tag to the `origin`.

Uses `test_${CURRENT_BRANCH_NAME}_${LATEST_TAG_NUMBER + 1}` pattern.

For further documentation please visit the [wiki](https://github.com/izerozlu/create_test_tag/wiki) page.

### Example #1

| Branch      | Tags               |
| ----------- | ------------------ |
| `my-branch` | `test_my-branch_1` |
|             | `test_my-branch_2` |
|             | `test_my-branch_3` |

Result: `test_my-branch_4` and push to `origin`.

### Example #2

| Branch      | Tags |
| ----------- | ---- |
| `my-branch` | None |

Result: `test_my-branch_1` and push to `origin`.

## Prerequsite

Node >= v12.16.1

[Link to NodeJS](https://nodejs.org/en)

## Usage

`node create_test_tag.js`

### Arguments

You can manage the prefix of the tag with the `--type` argument.

`node create_test_tag.js --type staging`

That would generate `staging_my-branch_1`

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

## License

This script is provided under the [MIT License](https://opensource.org/licenses/MIT).
