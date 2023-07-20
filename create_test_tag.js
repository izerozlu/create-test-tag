const { exec } = require('child_process');

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

const findMaxTagNumber = (branchTags) => {
  return branchTags.reduce((maxTagNumber, tagName) => {
    let tagNumber;
    try {
      tagNumber = Number.parseInt(tagName.split('_').pop());
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
    if (!error) {
      const branchTags = sdtout.split('\n').slice(0, -1);
      const maxTagNumber = findMaxTagNumber(branchTags);

      if (maxTagNumber) {
        createAndPushTag(`test_${currentBranch}_${maxTagNumber + 1}`);
      }
    } else {
      createAndPushTag(`test_${currentBranch}_1`);
    }
  });
};

exec('git branch --show-current', (error, sdtout) => {
  if (!error) {
    grepTagNames(sdtout.trim());
  }
});
