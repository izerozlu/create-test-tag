const { exec } = require('child_process');

const getTypeParameter = () => {
  const flagIndex = process.argv.indexOf('--type');

  return flagIndex > -1 ? process.argv[flagIndex + 1] : 'test';
};

const createAndPushTag = (tagName) => {
  exec(`git tag ${tagName}`, (error) => {
    if (!error) {
      console.log(`Created the tag ${tagName}`);
      console.log('Pushing...');

      exec(`git push origin ${tagName}`, (error) => {
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
    const latestTagNumber = splitTagName.pop();
    try {
      if (splitTagName[0] === type) {
        if (!Number.isNaN(Number.parseInt(latestTagNumber))) {
          tagNumber = Number.parseInt(latestTagNumber);
        } else {
          tagNumber = 0;
        }
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
  exec(`git tag | grep ${currentBranch}`, (error, stdout) => {
    const type = getTypeParameter();

    if (!error) {
      const branchTags = stdout.split('\n').slice(0, -1);
      const maxTagNumber = findMaxTagNumber(branchTags, type);

      if (Number.isInteger(maxTagNumber)) {
        createAndPushTag(`${type}_${currentBranch}_${maxTagNumber + 1}`);
      }
    } else {
      createAndPushTag(`${type}_${currentBranch}_1`);
    }
  });
};

exec('git branch --show-current', (error, stdout) => {
  if (!error) {
    grepTagNames(stdout.trim());
  }
});
