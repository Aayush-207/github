import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";


// CONFIG: set your target date (YYYY-MM-DD) and number of commits
const TARGET_DATE = "2026-07-26";
const NUM_COMMITS = 6;

const makeCommitsOnDate = (n) => {
  if (n === 0) return simpleGit().push();

  const date = moment(TARGET_DATE).format();
  const data = { date };

  console.log(`Making commit ${NUM_COMMITS - n + 1}/${NUM_COMMITS} on ${date}`);

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, makeCommitsOnDate.bind(this, --n));
  });
};

makeCommitsOnDate(NUM_COMMITS);
