const { exec } = require('child_process');

const getTypeParameter = () => {
  const flagIndex = process.argv.indexOf('--type');

  return flagIndex > -1 ? process.argv[flagIndex + 1] : 'test';
};

const createAndPushTag = (tagName) => {
  exec(`git tag ${tagName}`, (error, sdtout) => {
    if (!error) {
      console.log(`Created the tag ${tagName}`);
      console.log('Pushing...');

      exec(`git push origin ${tagName}`, (error, stdout) => {
        if (!error) {
          console.log(`Pushed the tag ${tagName}`);
        }
      });
    }
  });
};

const findMaxTagNumber = (branchTags, type) => {
  return branchTags.reduce((maxTagNumber, tagName) => {
    let tagNumber = -1;
    const splitTagName = tagName.split('_');
    try {
      if (splitTagName[0] === type) {
        tagNumber = Number.parseInt(splitTagName.pop());
      }
    } catch (e) {
      tagNumber = -1;
    }

    return !Number.isNaN(tagNumber)
      ? Math.max(tagNumber, maxTagNumber)
      : maxTagNumber;
  }, 0);
};

const grepTagNames = (currentBranch) => {
  exec(`git tag | grep ${currentBranch}`, (error, sdtout) => {
    const type = getTypeParameter();

    if (!error) {
      const branchTags = sdtout.split('\n').slice(0, -1);
      const maxTagNumber = findMaxTagNumber(branchTags, type);

      createAndPushTag(`${type}_${currentBranch}_${maxTagNumber + 1}`);
    } else {
      createAndPushTag(`${type}_${currentBranch}_1`);
    }
  });
};

exec('git branch --show-current', (error, sdtout) => {
  if (!error) {
    grepTagNames(sdtout.trim());
  }
});
