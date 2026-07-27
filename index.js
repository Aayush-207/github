import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

// CONFIG: Add as many dates as you want
const commitSchedule = [
  { date: "2026-05-06", commits: 6 },
  { date: "2026-05-14", commits: 8 },
  { date: "2026-05-20", commits: 3 },
  { date: "2026-05-26", commits: 3 },
  { date: "2026-05-27", commits: 3 },
];

const git = simpleGit();

const makeCommitsForDate = async (date, count) => {
  for (let i = 1; i <= count; i++) {
    const commitDate = moment(date)
      .hour(10 + Math.floor(Math.random() * 8)) // Random hour (10 AM - 5 PM)
      .minute(Math.floor(Math.random() * 60))
      .second(Math.floor(Math.random() * 60))
      .format();

    const data = {
      date: commitDate,
      commit: i,
    };

    console.log(`Commit ${i}/${count} on ${commitDate}`);

    await jsonfile.writeFile(path, data);

    await git.add([path]);
    await git.commit(`Commit ${i} on ${date}`, {
      "--date": commitDate,
    });
  }
};

const run = async () => {
  for (const { date, commits } of commitSchedule) {
    await makeCommitsForDate(date, commits);
  }

  await git.push();
  console.log("✅ All commits created and pushed!");
};

run().catch(console.error);